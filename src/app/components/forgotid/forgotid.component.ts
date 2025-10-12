import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-id',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgotid.component.html',
  styleUrls: ['./forgotid.component.css']
})
export class ForgotIdComponent {
  formData = { accountNumber: '', otp: '' };
  errorMessage = '';

  private readonly validAccountNumber = '1234567890';
  private readonly validOtp = '1234';

  constructor(private router: Router) {}

  onSubmit() {
    this.errorMessage = '';

    if (
      this.formData.accountNumber === this.validAccountNumber &&
      this.formData.otp === this.validOtp
    ) {
      // ✅ Direct login after validation
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid account number or OTP.';
    }
  }
}
