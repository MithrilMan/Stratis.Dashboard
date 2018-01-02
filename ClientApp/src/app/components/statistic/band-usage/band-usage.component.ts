import { Component, OnInit } from '@angular/core';
import { BandUsage } from '../../../models/band-usage';
import { BackendApiService } from '../../../services/backend-api.service';

@Component({
  selector: 'band-usage',
  templateUrl: './band-usage.component.html',
  styleUrls: ['./band-usage.component.scss']
})
export class BandUsageComponent implements OnInit {
  bandUsage: BandUsage;


  //tooltipFillColor: "rgba(51, 51, 51, 0.55)",
  public chartData: number[];
  public chartOptions: any = { legend: false, responsive: false }
  public chartLabels: string[] = ["Received", "Sent"]
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        "#3498DB",
        "#26B99A"
      ],
      hoverBackgroundColor: [
        "#49A9EA",
        "#36CAAB"
      ]
    }];
  public chartType: string = 'doughnut';

  constructor(private dataService: BackendApiService) { }

  ngOnInit() {
    this.dataService.bandUsage().subscribe(res => {
      if (res != null) {
        this.bandUsage = res;

        this.setChartDatasets();
      }
    });
  }


  private setChartDatasets() {
    this.chartData = [this.bandUsage.received, this.bandUsage.sent];
  }
}
