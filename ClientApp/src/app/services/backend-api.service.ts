import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PeerInfo } from '../models/peer-info';
import { BandUsage } from '../models/band-usage';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BackendApiService {
  //dictionary to store current periodic refreshes
  private _periodicRefreshesDictionary: PeriodicRefreshableCall[] = [];

  private _connectedPeers = new BehaviorSubject<PeerInfo[]>([]);
  connectedPeers = () => this._connectedPeers.asObservable();

  private _bandUsage = new BehaviorSubject<BandUsage>({ received: 0, sent: 0 });
  bandUsage = () => this._bandUsage.asObservable();

  constructor(private http: HttpClient, @Inject('BASE_URL') private apiUrl: string) {
    this.apiUrl += 'api/Data/';

    this.initializePeriodicRefreshes();
  }


  initializePeriodicRefreshes() {
    this._periodicRefreshesDictionary.push(new PeriodicRefreshableCall("connectedPeers", 5000, () => {
      this.getPeers(null);
    }));

    this._periodicRefreshesDictionary.push(new PeriodicRefreshableCall("bandUsage", 5000, () => {
      this.getBandUsage();
    }));
  }

  getPeers(limit?: number) {
    console.debug("getting peers");

    var params = new HttpParamsBuilder()
      .setParam("limit", limit)
      .build();

    this.http.get<PeerInfo[]>(this.apiUrl + "ConnectedPeers", { params: params })
      .subscribe(res => {
        this._connectedPeers.next(res);
      }, error => console.error(error));
  }

  getBandUsage() {
    console.debug("getting bandUsage");

    this.http.get<BandUsage>(this.apiUrl + "BandStatistics")
      .subscribe(res => {
        this._bandUsage.next(res);
      }, error => console.error(error));
  }
}



class PeriodicRefreshableCall {
  public interval: number = null;

  constructor(public name: string, public frequency: number, public periodicCallback: (...args: any[]) => void) {
    this.start();
  }

  public start() {
    this.stop();

    this.interval = window.setInterval(() => {
      try {
        this.stop();
        this.periodicCallback();
      } catch (e) {
        console.error(e);
      }
      finally {
        console.debug(`Restarting ${this.name} Periodic Refresh`);
        this.start();
      }
    }, this.frequency);
  }

  public stop() {
    if (this.interval != null) {
      console.debug(`Clearing ${this.name} Periodic Refresh`);
      window.clearInterval(this.interval);
      this.interval = null;
    }
  }
}

//helper class to build safe parameters with default values
class HttpParamsBuilder {
  private params = new HttpParams();

  constructor() { }

  //fluent way to specify parameters, converting value to string, if not null
  //if value is null, apply defaultValue
  public setParam(key: string, value: any, defaultValue: string = null): HttpParamsBuilder {
    this[value] = value == null ? defaultValue : value.toString();

    return this;
  }

  public build(): HttpParams {
    return this.params;
  }
}
