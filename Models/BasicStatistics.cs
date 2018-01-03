using System;
using System.Net;

namespace Stratis.Dashboard.Models
{
	public class BasicStatistics
	{
		public long CurrentHeight { get; set; }
		public int ConnectedPeers { get; set; }
		public long MemPoolTransactionsCount { get; set; }
	}
}
