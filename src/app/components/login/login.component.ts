import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    loginType: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  private adminCredentials = [
    { email: 'admin1@gmail.com', password: 'admin123' },
    { email: 'admin2@gmail.com', password: 'admin456' }
  ];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    const { loginType, email, password } = this.loginData;

    if (!loginType || !email || !password) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    if (loginType === 'admin') {
      const isAdminValid = this.adminCredentials.some(
        admin => admin.email === email && admin.password === password
      );

      if (isAdminValid) {
        this.successMessage = 'Admin login successful!';
        setTimeout(() => this.router.navigate(['/admin-dashboard']), 1000);
      } else {
        this.errorMessage = 'Invalid Admin credentials.';
      }
    } else if (loginType === 'customer') {
      this.authService.login(this.loginData.email, this.loginData.password)
  .subscribe({
    next: (res) => {
      // 🟢 Save session
      // if backend gives you a token, replace 'dummyToken' with res.token
      this.authService.setSession('dummyToken', res.email);

      this.successMessage = 'Login successful!';
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.errorMessage = 'Invalid credentials.';
    }
  });

    }
  }

  onForgotId() {
    this.router.navigate(['/forgotid']);
  }

  onForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }
}
