import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8088/banking/api/admin';

  constructor(private http: HttpClient) {}

  // Get all pending requests
  getPendingRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/requests`).pipe(
      catchError(this.handleError)
    );
  }

  // Approve a request
  approveRequest(accountId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/approve/${accountId}`, null).pipe(
      catchError(this.handleError)
    );
  }

  // Reject a request
  rejectRequest(accountId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/reject/${accountId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
