export interface PeerInfo {
  ConnectedAt: Date;
  Read: number;
  Written: number;
  EndPoint: string;
  PeerUserAgent: string;
  PeerVersion: string;
  EndPointAddress: string;
  NegotiatedVersion: string;
}
