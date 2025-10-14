import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service.service';
export interface TransferData {
  fromAccountId: number | null;
  toAccountId: number | null;
  amount: number | null;
  transferMode: string;
  transactionPassword: string;
  remarks: string;
}
@Component({
  selector: 'app-fund-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})


export class FundTransferComponent implements OnInit {
  transferData: TransferData= {
    fromAccountId: null,
    toAccountId: null,
    amount: null,
    transferMode: '',
    transactionPassword: '',
    remarks: ''
  };

  historyData: any[] = [];
  showTransferForm = false;
  showHistoryTable = false;
  errorMessage = '';
  successMessage = '';
  userId: number | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    const storedUserId = sessionStorage.getItem('userId'); // string | null
    if (storedUserId) {
      this.userId = Number(storedUserId); // convert to number
      this.transferData.fromAccountId = this.userId;
    } else {
      this.errorMessage = 'Session expired. Please log in again.';
    }
  }

  toggleTransferForm() {
    this.showTransferForm = true;
    this.showHistoryTable = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  toggleHistoryTable() {
    if (!this.userId) {
      this.errorMessage = 'User ID not found in session.';
      return;
    }

    this.errorMessage = '';
    this.showTransferForm = false;
    this.showHistoryTable = true;

    this.authService.getTransactionHistory(this.userId).subscribe({
      next: (res) => {
        this.historyData = res;
        if (this.historyData.length === 0) {
          this.errorMessage = 'No transaction history found.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to load history.';
        console.error(err);
      }
    });
  }

  makeTransfer() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.transferData.toAccountId || !this.transferData.amount || !this.transferData.transactionPassword) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.authService.makeFundTransfer(this.transferData).subscribe({
      next: (res) => {
        this.successMessage = 'Fund transfer successful!';
        // Reset only the user-entered fields
        this.transferData.toAccountId = null;
        this.transferData.amount = null;
        this.transferData.transferMode = '';
        this.transferData.transactionPassword = '';
        this.transferData.remarks = '';
      },
      error: (err) => {
        this.errorMessage = 'Transfer failed. Please try again.';
        console.error(err);
      }
    });
  }
}
