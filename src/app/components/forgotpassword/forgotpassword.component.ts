import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewPasswordComponent } from '../newpassword/newpassword.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent {
  formData = { email: '', otp: '' };
  errorMessage = '';

  private readonly validEmail = 'test@example.com';
  private readonly validOtp = '1234';

  constructor(private router: Router) {}

  onSubmit() {
    this.errorMessage = '';

    if (this.formData.email === this.validEmail && this.formData.otp === this.validOtp) {
      this.router.navigate(['/newpassword']);
    } else {
      this.errorMessage = 'Invalid User ID or OTP.';
    }
  }
}
