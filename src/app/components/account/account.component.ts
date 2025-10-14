import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  openAccountForm!: FormGroup;
  depositForm!: FormGroup;
  isLoading = false;
  currentUserId!: number;
  userAccounts: any[] = []; // to populate account dropdown

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUserId = sessionStorage.getItem('userId');
    if (!storedUserId) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/login']);
      return;
    }
    this.currentUserId = Number(storedUserId);

    // Open Account Form
    this.openAccountForm = this.fb.group({
      accountType: ['', Validators.required],
      initialBalance: ['', [Validators.required, Validators.min(1)]]
    });

    // Deposit Form
    this.depositForm = this.fb.group({
      accountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      transactionPassword: ['', Validators.required],
      remarks: ['']
    });

    this.loadUserAccounts();
  }

  // Fetch accounts to populate deposit dropdown
  loadUserAccounts() {
    this.authService.getUserAccounts(this.currentUserId).subscribe({
      next: (res) => this.userAccounts = res,
      error: (err) => console.error('Error loading accounts:', err)
    });
  }

  // Open a new account
  openAccount() {
    if (this.openAccountForm.valid) {
      this.isLoading = true;
      const payload = {
        userId: this.currentUserId,
        accountType: this.openAccountForm.value.accountType,
        initialBalance: this.openAccountForm.value.initialBalance
      };
      this.authService.openAccount(payload).subscribe({
        next: () => {
          this.isLoading = false;
          alert('✅ Account created successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Open account error:', err);
          alert('❌ Account creation failed. Try again.');
        }
      });
    }
  }

  // Deposit money
  depositMoney() {
    if (this.depositForm.valid) {
      this.isLoading = true;
      const { accountId, amount, transactionPassword, remarks } = this.depositForm.value;

      this.authService.depositMoney(this.currentUserId, accountId, amount, transactionPassword, remarks)
        .subscribe({
          next: () => {
            this.isLoading = false;
            alert('✅ Deposit request successful!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Deposit error:', err);
            alert('❌ Deposit failed. Try again.');
          }
        });
    }
  }
}
