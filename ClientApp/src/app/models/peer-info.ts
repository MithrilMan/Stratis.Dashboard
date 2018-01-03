export class PeerInfo {
  ConnectedAt: Date;
  Read: number;
  Written: number;
  EndPoint: string;
  PeerUserAgent: string;
  PeerVersion: string;
  EndPointAddress: string;
  NegotiatedVersion: string;

  constructor() {
    this.ConnectedAt = null;
    this.Read = 0;
    this.Written = 0;
    this.EndPoint = null;
    this.PeerUserAgent = null;
    this.PeerVersion = null;
    this.EndPointAddress = null;
    this.NegotiatedVersion = null;
  }
}
