import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Transaction {
  transactionId: number;
  type: string;
  amount: number;
  remarks: string;
  transactionDate: string;
  reference: string | null;
}

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  errorMessage = '';

  private baseUrl = 'http://localhost:8088/banking/api/transactions/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      const userId = Number(storedUserId);
      this.loadTransactions(userId);
    } else {
      this.errorMessage = 'Session expired. Please log in again.';
    }
  }

  loadTransactions(userId: number): void {
    const url = `${this.baseUrl}${userId}`;
    this.http.get<Transaction[]>(url).subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load transaction history.';
        console.error('Error fetching transactions:', err);
      }
    });
  }
}
