// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import { AuthenticationService } from '../../services/authentication.service.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

//   loginData = {
//     loginType: '',
//     email: '',
//     password: ''
//   };

//   errorMessage: string = '';
//   successMessage: string = '';

//   private adminCredentials = [
//     { email: 'admin1@gmail.com', password: 'admin123' },
//     { email: 'admin2@gmail.com', password: 'admin456' }
//   ];

//   constructor(
//     private router: Router,
//     private authService: AuthenticationService
//   ) { }

//   onSubmit() {
//     this.errorMessage = '';
//     this.successMessage = '';

//     const { loginType, email, password } = this.loginData;

//     if (!loginType || !email || !password) {
//       this.errorMessage = 'Please fill all required fields.';
//       return;
//     }

//     if (loginType === 'admin') {
//       const isAdminValid = this.adminCredentials.some(
//         admin => admin.email === email && admin.password === password
//       );

//       if (isAdminValid) {
//         this.successMessage = 'Admin login successful!';
//         setTimeout(() => this.router.navigate(['/admin-dashboard']), 1000);
//       } else {
//         this.errorMessage = 'Invalid Admin credentials.';
//       }
//     } else if (loginType === 'customer') {
//       this.authService.login(email, password).subscribe({
//         next: (res: any) => {
//           // Backend returns user object with userId, firstName, lastName
//           sessionStorage.setItem('userId', res.userId); // correct field
//           sessionStorage.setItem('userName', res.firstName + ' ' + res.lastName); // optional, for welcome

//           this.authService.setSession('dummyToken', res.email); // replace with real token if available

//           this.successMessage = 'Login successful! Redirecting to dashboard...';

//           setTimeout(() => this.router.navigate(['/dashboard']), 1000);
//         },
//         error: (err) => {
//           this.errorMessage = 'Invalid credentials.';
//         }
//       });

//     }
//   }

//   onForgotId() {
//     this.router.navigate(['/forgotid']);
//   }

//   onForgotPassword() {
//     this.router.navigate(['/forgotpassword']);
//   }
// }
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
    loginType: '', // 'admin' or 'customer'
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
      // ✅ Admin login
      const isAdminValid = this.adminCredentials.some(
        admin => admin.email === email && admin.password === password
      );

      if (isAdminValid) {
        sessionStorage.setItem('loginType', 'admin'); // important for admin navbar and routing
        this.successMessage = 'Admin login successful!';
        setTimeout(() => this.router.navigate(['/admin-dashboard']), 1000);
      } else {
        this.errorMessage = 'Invalid Admin credentials.';
      }
    } else if (loginType === 'customer') {
      // ✅ Customer login
      this.authService.login(email, password).subscribe({
        next: (res: any) => {
          if (res && res.userId) {
            sessionStorage.setItem('loginType', 'user'); // important for user navbar and routing
            
            sessionStorage.setItem('userId', res.userId.toString());
            sessionStorage.setItem('userName', `${res.firstName} ${res.lastName}`);

            this.authService.setSession('dummyToken', res.email); // replace with real token if available

            this.successMessage = 'Login successful! Redirecting to dashboard...';
            setTimeout(() => this.router.navigate(['/dashboard']), 1000);
          }
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
