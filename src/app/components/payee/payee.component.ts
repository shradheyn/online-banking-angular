import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Payee {
  payeeId?: number;
  beneficiaryName: string;
  beneficiaryAccountNumber: string;
  nickname: string;
}

@Component({
  selector: 'app-payee',
  imports: [CommonModule,FormsModule],
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css']
})
export class PayeeComponent implements OnInit {
  showAddForm = false;
  showList = false;
  showDeleteForm = false;

  successMessage = '';
  errorMessage = '';

  userId!: number;
  transactionPassword: string = '';

  newPayee: Payee = {
    beneficiaryName: '',
    beneficiaryAccountNumber: '',
    nickname: ''
  };

  payees: Payee[] = [];
  deletePayeeId: number | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
    } else {
      this.errorMessage = 'Session expired. Please log in again.';
    }
  }

  toggleAddForm() {
    this.showAddForm = true;
    this.showList = false;
    this.showDeleteForm = false;
    this.clearMessages();
  }

  toggleList() {
    this.showList = true;
    this.showAddForm = false;
    this.showDeleteForm = false;
    this.clearMessages();
    this.listPayees();
  }

  toggleDeleteForm() {
    this.showDeleteForm = true;
    this.showAddForm = false;
    this.showList = false;
    this.clearMessages();
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  addPayee() {
    if (!this.transactionPassword) {
      this.errorMessage = 'Please enter your transaction password.';
      return;
    }
    const url = `http://localhost:8088/banking/api/payee/add?userId=${this.userId}&transactionPassword=${this.transactionPassword}`;
    this.authService.http.post(url, this.newPayee).subscribe({
      next: () => {
        this.successMessage = 'Payee added successfully!';
        this.errorMessage = '';
        this.newPayee = { beneficiaryName: '', beneficiaryAccountNumber: '', nickname: '' };
      },
      error: (err) => {
        this.errorMessage = 'Failed to add payee.';
        console.error(err);
      }
    });
  }

  listPayees() {
    const url = `http://localhost:8088/banking/api/payee/list/${this.userId}`;
    this.authService.http.get<Payee[]>(url).subscribe({
      next: (res) => {
        this.payees = res;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch payees.';
        console.error(err);
      }
    });
  }

  deletePayee() {
    if (!this.deletePayeeId || !this.transactionPassword) {
      this.errorMessage = 'Please enter payee ID and transaction password.';
      return;
    }
    const url = `http://localhost:8088/banking/api/payee/${this.deletePayeeId}?transactionPassword=${this.transactionPassword}`;
    this.authService.http.delete(url).subscribe({
      next: () => {
        this.successMessage = 'Payee deleted successfully!';
        this.errorMessage = '';
        this.deletePayeeId = null;
        this.transactionPassword = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to delete payee.';
        console.error(err);
      }
    });
  }
}
