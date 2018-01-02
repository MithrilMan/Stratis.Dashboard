using System;
using System.Net;

namespace Stratis.Dashboard.Models
{
	public class PeerItem
	{
		public string EndPoint { get; set; }
		public string EndPointAddress { get; set; }
		public string PeerUserAgent { get; set; }
		public string PeerVersion { get; set; }
		public string NegotiatedVersion { get; set; }
		public DateTimeOffset ConnectedAt { get; set; }
		public long Read { get; set; }
		public long Written { get; set; }
	}
}
