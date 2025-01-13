import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bizz',
  templateUrl: './bizz.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class BizzComponent  {
  private readonly stockService = inject(StockService);

  ticker = signal<string>('');
  stockForm = new FormGroup({
    stockTicket: new FormControl('', Validators.required),
  });

  stockQuery = injectQuery(() => this.stockService.getDaily(this.ticker()))

  addTicket() {
    if (this.stockForm.valid) {
      const ticket = this.stockForm.controls.stockTicket.value?.trim();
      if (!!ticket) {
        this.ticker.set(ticket);
        this.stockForm.reset();
      }
    }
  }
}
