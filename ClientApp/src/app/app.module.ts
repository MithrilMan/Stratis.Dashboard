import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { PeerListComponent } from './components/statistic/peer-list/peer-list.component';
import { BandUsageComponent } from './components/Statistic/band-usage/band-usage.component';

import { BackendApiService } from './services/backend-api.service';
import { BytesPipe } from './pipes/bytes.pipe';
import { ChartsModule } from 'ng2-charts';
import { FooterComponent } from './components/footer/footer.component';
import { CompactStatisticsComponent } from './components/compact-statistics/compact-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    TopMenuComponent,
    PeerListComponent,
    BandUsageComponent,
    BytesPipe,
    FooterComponent,
    CompactStatisticsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
      //{ path: 'counter', component: CounterComponent },
    ])
  ],
  providers: [BackendApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
