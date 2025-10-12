import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewPasswordComponent {
  passwordData = {
    newPassword: '',
    confirmPassword: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    // ✅ Check if passwords match
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // 🛠️ Normally here you'd call a backend API to update the password
    // For now, we just simulate success
    this.successMessage = 'Password updated successfully. Redirecting to login...';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
