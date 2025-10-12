// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   imports: [FormsModule, CommonModule], // using template-driven forms (ngModel)
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'] // fixed typo 'styleUrl' -> 'styleUrls'
// })
// export class LoginComponent {
//   loginData = { email: '', password: '' };
//   errorMessage: string = '';
//   successMessage: string = '';

//   // Hardcoded credentials
//   private readonly validEmail = 'test@example.com';
//   private readonly validPassword = 'password123';

//   constructor(private router: Router) {}

//   onSubmit() {
//     this.errorMessage = '';
//     this.successMessage = '';

//     // Check against static values
//     if (this.loginData.email === this.validEmail && this.loginData.password === this.validPassword) {
//       this.successMessage = 'Login Success. Redirecting...';
      
//       // Redirect after short delay
//       setTimeout(() => {
//         this.router.navigate(['/']); // navigate to dashboard or home
//       }, 500);
//     } else {
//       this.errorMessage = 'Invalid login credentials.';
//     }
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';

  private readonly validEmail = 'test@example.com';
  private readonly validPassword = 'password123';

  constructor(private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginData.email === this.validEmail && this.loginData.password === this.validPassword) {
      this.successMessage = 'Login Success. Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 500);
    } else {
      this.errorMessage = 'Invalid login credentials.';
    }
  }

  onForgotId() {
    this.router.navigate(['/forgotid']);
  }

  onForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }
}

