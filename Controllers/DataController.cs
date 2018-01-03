using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NBitcoin;
using Stratis.Bitcoin;
using Stratis.Bitcoin.Connection;
using Stratis.Bitcoin.Features.BlockStore;
using Stratis.Bitcoin.Features.MemoryPool;
using Stratis.Bitcoin.Interfaces;
using Stratis.Bitcoin.Utilities;
using Stratis.Dashboard.Models;

namespace Stratis.Dashboard.Controllers
{
	[Route("api/[controller]")]
	public class DataController : Controller
	{
		private IFullNode node;
		private IConnectionManager connectionManager;
		private ConcurrentChain chain;
		private MempoolManager mempoolManager;

		public DataController(IFullNode node, IConnectionManager connectionManager, ConcurrentChain chain, MempoolManager mempoolManager)
		{
			this.node = node;
			this.connectionManager = connectionManager;
			this.chain = chain;
			this.mempoolManager = mempoolManager;

			Guard.NotNull(node, nameof(node));
			Guard.NotNull(connectionManager, nameof(connectionManager));
			Guard.NotNull(chain, nameof(chain));
			Guard.NotNull(mempoolManager, nameof(mempoolManager));
		}


		[HttpGet("[action]")]
		public IEnumerable<PeerItem> ConnectedPeers(int? limit)
		{
			var peers = (
				from connectedNode in connectionManager.ConnectedNodes
				where connectedNode.IsConnected
				let peer = connectedNode.Peer
				select new PeerItem
				{
					ConnectedAt = connectedNode.ConnectedAt,
					Read = connectedNode.Counter.ReadBytes,
					Written = connectedNode.Counter.WrittenBytes,
					EndPoint = peer.Endpoint.ToString(),
					EndPointAddress = peer.Endpoint.Address.ToString(),
					PeerUserAgent = connectedNode.PeerVersion.UserAgent,
					PeerVersion = connectedNode.PeerVersion.Version.ToString(),
					NegotiatedVersion = connectedNode.Version.ToString(),
				})
				.Take(limit ?? int.MaxValue);

			return peers;
		}


		[HttpGet("[action]")]
		public BandStatistics BandStatistics()
		{
			var statistics = this.connectionManager.ConnectedNodes.Select(n => n.Counter).Aggregate(
			  new BandStatistics(),
			  (accumulator, it) =>
			  {
				  accumulator.Received += it.ReadBytes;
				  accumulator.Sent += it.WrittenBytes;
				  return accumulator;
			  }
		  );

			return statistics;
		}


		[HttpGet("[action]")]
		public BasicStatistics BasicStatistics()
		{
			var basicStatistics = new BasicStatistics
			{
				ConnectedPeers = this.connectionManager.ConnectedNodes.Count(),
				CurrentHeight = this.chain.Height,
				MemPoolTransactionsCount = this.mempoolManager.PerformanceCounter.MempoolSize
			};

			return basicStatistics;
		}
	}
}
