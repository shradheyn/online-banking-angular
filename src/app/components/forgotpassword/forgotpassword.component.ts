
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  enteredOtp = '';
  sentOtp = '';
  message = '';
  showOtpField = false;
  error = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  onSendOtp() {
    if (!this.email) {
      this.error = 'Please enter your email.';
      return;
    }
    this.error = '';
    this.authService.forgotPassword(this.email).subscribe({
      next: (res: any) => {
        this.message = res;
        // OTP comes in the response string for testing purposes
        const match = res.match(/OTP sent \(for testing\):\s*(\w+)/);
        if (match) {
          this.sentOtp = match[1];
        }
        this.showOtpField = true;
      },
      error: (err) => {
        this.error = 'Failed to send OTP. Check your email.';
      }
    });
  }

  onVerifyOtp() {
    if (this.enteredOtp === this.sentOtp) {
      this.router.navigate(['/newpassword'], { queryParams: { email: this.email } });
    } else {
      this.error = 'Invalid OTP. Please try again.';
    }
  }
}
