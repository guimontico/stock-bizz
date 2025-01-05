import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-bizz',
  templateUrl: './bizz.component.html',
  imports: [ReactiveFormsModule],
})
export class BizzComponent implements OnInit {
  private readonly stockService = inject(StockService);

  tickers = signal<string[]>([]);
  stockForm = new FormGroup({
    stockTicket: new FormControl('', Validators.required),
  });

  stockQuery = injectQuery(() => ({
    queryKey: ['stock'],
    queryFn: () => lastValueFrom(this.stockService.getAggregates('AAPL')),
  }))
  ngOnInit() {
    this.stockQuery.data()
  }

  addTicket() {
    if (this.stockForm.valid) {
      const ticket = this.stockForm.controls.stockTicket.value?.trim();
      if (ticket) {
        this.tickers.update((tickets) => [...tickets, ticket]);
        const listItem = document.createElement('li');
        listItem.textContent = ticket;
        document.getElementById('ticketList')?.appendChild(listItem);
        this.stockForm.reset();
      }
    }
  }

  requestTickets() {
    console.log('Requesting with tickets:', this.tickers());
    // Add your request logic here
  }
}
