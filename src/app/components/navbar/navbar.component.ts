// import { Component, OnInit } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { AuthenticationService } from '../../services/authentication.service.service';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {
//   isUserLoggedIn = false;
//   username = '';

//   constructor(
//     private router: Router,
//     private authService: AuthenticationService
//   ) {}

//   ngOnInit() {
//     // 🟢 Subscribe to userName$ to update UI automatically
//     this.authService.userName$.subscribe(name => {
//       this.isUserLoggedIn = this.authService.isLoggedIn();
//       this.username = name;
//     });

//     // ✅ Also check if user was already logged in on refresh
//     const email = sessionStorage.getItem('userEmail');
//     if (email) {
//       this.username = email;
//       this.isUserLoggedIn = true;
//     }
//   }

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/home']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn = false;
  username = '';
  loginType: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // Subscribe to userName$ to update dynamically
    this.authService.userName$.subscribe(name => {
      this.username = name;
      this.isUserLoggedIn = !!sessionStorage.getItem('userName') || !!sessionStorage.getItem('loginType');
      this.loginType = sessionStorage.getItem('loginType');
    });

    // On page refresh, restore values from sessionStorage
    const storedName = sessionStorage.getItem('userName');
    if (storedName) {
      this.username = storedName;
      this.isUserLoggedIn = true;
    }
    this.loginType = sessionStorage.getItem('loginType');
  }

  logout() {
    this.authService.logout();
    sessionStorage.clear(); // clear loginType and all
    this.isUserLoggedIn = false;
    this.username = '';
    this.loginType = null;
    this.router.navigate(['/home']);
  }
}


