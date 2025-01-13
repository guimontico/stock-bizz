import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { queryOptions } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Daily } from '../routes/bizz/models/daily.interface';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly http = inject(HttpClient)

  baseURL = import.meta.env.NG_APP_ALPHA_VANTAGE_BASE_URL;
  secretKey = import.meta.env.NG_APP_ALPHA_VANTAGE_KEY;

  getDaily(ticker: string) {
    return queryOptions({
      queryKey: ['daily', ticker],
      queryFn: () => {
        return lastValueFrom(
          this.http.get<Daily>(
            `${this.baseURL}/query?function=TIME_SERIES_DAILY&symbol=${ticker}.LON&outputsize=compact&apikey=${this.secretKey}`,
          ),
        )
      },
      enabled: !!ticker,
    })
  }

  getAggregates(ticker: string) {
    const todayDate = new Date().toISOString().split('T')[0];
    const previousDate = new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0];
    return this.http.get(`${this.baseURL}/v2/aggs/ticker/${ticker}/range/1/day/${previousDate}/${todayDate}?apiKey=${this.secretKey}`);
  }
}
