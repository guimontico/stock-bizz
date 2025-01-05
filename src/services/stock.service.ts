import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly http = inject(HttpClient)

  baseURL = import.meta.env.NG_APP_POLYGON_BASE_URL;
  secretKey = import.meta.env.NG_APP_POLYGON_KEY;

  getAggregates(ticker: string) {
    const todayDate = new Date().toISOString().split('T')[0];
    const previousDate = new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0];
    return this.http.get(`${this.baseURL}/v2/aggs/ticker/${ticker}/range/1/day/${previousDate}/${todayDate}?apiKey=${this.secretKey}`);
  }



}

// https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=u_8jR0FTUFrBk4uJCdN__j6CwLpMuYlN
