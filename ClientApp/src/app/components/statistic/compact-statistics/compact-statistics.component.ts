import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../../services/backend-api.service';
import { BasicStatistics } from '../../../models/basic-statistics';

@Component({
  selector: 'compact-statistics',
  templateUrl: './compact-statistics.component.html'
})
export class CompactStatisticsComponent implements OnInit {
  public basicStatistics: BasicStatistics;
  constructor(private dataService: BackendApiService) { }

  ngOnInit() {
    this.dataService.basicStatistics().subscribe(res => {
      if (res != null) {
        this.basicStatistics = res;
      }
    });
  }
}
