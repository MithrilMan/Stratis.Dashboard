using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Stratis.Bitcoin;
using Stratis.Bitcoin.Connection;
using Stratis.Bitcoin.Utilities;
using Stratis.Dashboard.Models;

namespace Stratis.Dashboard.Controllers
{
	[Route("api/[controller]")]
	public class DataController : Controller
	{
		private IFullNode node;
		private IConnectionManager connectionManager;

		public DataController(IFullNode node, IConnectionManager connectionManager)
		{
			this.node = node;
			this.connectionManager = connectionManager;

			Guard.NotNull(node, nameof(node));
			Guard.NotNull(connectionManager, nameof(ConnectionManager));
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
	}
}
