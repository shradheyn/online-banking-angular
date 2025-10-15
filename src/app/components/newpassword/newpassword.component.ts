// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-new-password',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './newpassword.component.html',
//   styleUrls: ['./newpassword.component.css']
// })
// export class NewPasswordComponent {
//   passwordData = {
//     newPassword: '',
//     confirmPassword: ''
//   };
//   errorMessage: string = '';
//   successMessage: string = '';

//   constructor(private router: Router) {}

//   onSubmit() {
//     this.errorMessage = '';
//     this.successMessage = '';

//     // ✅ Check if passwords match
//     if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
//       this.errorMessage = 'Passwords do not match.';
//       return;
//     }

//     // 🛠️ Normally here you'd call a backend API to update the password
//     // For now, we just simulate success
//     this.successMessage = 'Password updated successfully. Redirecting to login...';

//     setTimeout(() => {
//       this.router.navigate(['/login']);
//     }, 1500);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service.service';

@Component({
  selector: 'app-set-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewPasswordComponent implements OnInit {
  email = '';
  newPassword = '';
  message = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit() {
    if (!this.email || !this.newPassword) {
      this.error = 'Please fill all fields.';
      return;
    }

    this.authService.setNewPassword(this.email, this.newPassword).subscribe({
      next: (res: any) => {
        this.message = 'Password updated successfully! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = 'Failed to update password. Try again.';
      }
    });
  }
}

