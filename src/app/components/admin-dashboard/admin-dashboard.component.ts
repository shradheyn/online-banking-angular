import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  pendingRequests: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadPendingRequests();
  }

 loadPendingRequests(): void {
  this.isLoading = true;
  this.adminService.getPendingRequests().subscribe({
    next: (res) => {
      this.pendingRequests = res;
      this.isLoading = false;
    },
    error: (err: HttpErrorResponse) => {
      console.error('Failed to load pending requests:', err);
      this.errorMessage = 'Failed to load pending requests.';
      this.isLoading = false;
    }
  });
}

approve(accountId: number): void {
  this.adminService.approveRequest(accountId).subscribe({
    next: () => {
      this.successMessage = `Account ${accountId} approved successfully!`;
      this.loadPendingRequests();
    },
    error: (err: HttpErrorResponse) => {
      console.error('Error approving account:', err);
      this.errorMessage = `Failed to approve account ${accountId}.`;
    }
  });
}

reject(accountId: number): void {
  this.adminService.rejectRequest(accountId).subscribe({
    next: () => {
      this.successMessage = `Account ${accountId} rejected successfully!`;
      this.loadPendingRequests();
    },
    error: (err: HttpErrorResponse) => {
      console.error('Error rejecting account:', err);
      this.errorMessage = `Failed to reject account ${accountId}.`;
    }
  });
}
}