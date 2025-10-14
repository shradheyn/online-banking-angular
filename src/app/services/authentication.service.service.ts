import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8088/banking/api/register';
  private apiUrlLogin = 'http://localhost:8088/banking/api/users/login';
  private apiUrlUserInfo = 'http://localhost:8088/banking/api/';

  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<string> {
    return this.http.post(this.apiUrl, userData, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<any> {
  const url = this.apiUrlLogin;
  const body = { email, password };

  return this.http.post<any>(url, body).pipe(
    // 👇 handle successful login
    catchError(this.handleError)
  );
}

  getUserInfo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUserInfo).pipe(
      catchError(this.handleError)
    );
  }

  setSession(token: string, email: string): void {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userEmail', email);
    this.userNameSubject.next(email);
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('authToken') !== null;
    }
    return false;
  }

  getLoggedInUserName() {
    return this.userNameSubject.value;
  }

  // ⛔️ Removed Router navigation from here
  logout(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userEmail');
      this.userNameSubject.next('');
    }
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
