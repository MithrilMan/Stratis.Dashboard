export class BasicStatistics {
  currentHeight: number;
  connectedPeers: number;
  memPoolTransactionsCount: number;

  constructor() {
    this.connectedPeers = 0;
    this.currentHeight = 0;
    this.memPoolTransactionsCount = 0;
  }
}
