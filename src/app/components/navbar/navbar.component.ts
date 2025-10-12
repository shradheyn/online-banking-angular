import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isUserLoggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Check login status from localStorage on load
    const user = localStorage.getItem('user');
    if (user) {
      this.isUserLoggedIn = true;
      this.username = JSON.parse(user).email;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.isUserLoggedIn = false;
    this.username = '';
    this.router.navigate(['/home']);
  }
}
