import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any = {};
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    this.router.navigate(['/login']);
    return;
  }

  this.http.get(`http://localhost:8088/banking/api/users/profile/${userId}`)
    .subscribe({
      next: (res: any) => {
        // Map backend fields to what dashboard template expects
        this.userData = {
          id: res.userId,
          name: res.firstName + ' ' + res.lastName,
          email: res.email,
          dob: res.dob,
          address: res.address,
          phone: res.phoneNumber,
          upiId: res.upiId
        };
      },
      error: (err) => this.errorMessage = 'Failed to load user data.'
    });
}
}
