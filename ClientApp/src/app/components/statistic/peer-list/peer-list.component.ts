import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeerInfo } from '../../../models/peer-info';
import { BackendApiService } from '../../../services/backend-api.service';
import { BytesPipe } from '../../../pipes/bytes.pipe';

@Component({
  selector: 'peer-list',
  templateUrl: './peer-list.component.html',
  styleUrls: ['./peer-list.component.scss']
})
export class PeerListComponent implements OnInit {
  connectedPeers: PeerInfo[];
  @Input() limit: number;

  constructor(private dataService: BackendApiService) { }

  ngOnInit() {
    this.dataService.connectedPeers().subscribe(res => {
      this.connectedPeers = res.slice(0, this.limit);
    });
  }
}
