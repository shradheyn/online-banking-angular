import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //User APIs
  private baseUrl = 'http://localhost:8088/banking/api/users';
  private apiUrl = `${this.baseUrl}/register`;
  private apiUrlLogin = `${this.baseUrl}/login`;
  private apiUrlUserInfo = `${this.baseUrl}/all`;

  //Fund Transfer APIs
  private fundTransferUrl = 'http://localhost:8088/banking/api/fund-transfer/transfer';
  private fundHistoryUrl = 'http://localhost:8088/banking/api/fund-transfer/history';

  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();

  constructor(public http: HttpClient) {}

  /** -------------------------
   * USER AUTH & REGISTRATION
   ------------------------- */
  registerUser(userData: any): Observable<string> {
    return this.http.post(this.apiUrl, userData, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  // login(email: string, password: string): Observable<any> {
  //   const body = { email, password };
  //   return this.http.post<any>(this.apiUrlLogin, body).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  login(email: string, password: string): Observable<any> {
  const body = { email, password };
  return this.http.post<any>(this.apiUrlLogin, body).pipe(
    tap((res) => {
      if (res && res.userId) {
        sessionStorage.setItem('userId', res.userId.toString());
        sessionStorage.setItem('userEmail', email);
      }
    }),
    catchError(this.handleError)
  );
}

  getUserInfo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUserInfo).pipe(
      catchError(this.handleError)
    );
  }

  /** -------------------------
   * SESSION MANAGEMENT
   ------------------------- */
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

  logout(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userEmail');
      this.userNameSubject.next('');
    }
  }

   // ---------------- FUND TRANSFER ----------------
  makeFundTransfer(transferData: any): Observable<any> {
    return this.http.post<any>(this.fundTransferUrl, transferData).pipe(
      catchError(this.handleError)
    );
  }

  // ---------------- TRANSACTION HISTORY ----------------
  getTransactionHistory(userId: number): Observable<any[]> {
    const url = `${this.fundHistoryUrl}/${userId}`;
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError)
    );
  }

// Open a new account
openAccount(payload: { userId: number; accountType: string; initialBalance: number }): Observable<any> {
  return this.http.post<any>('http://localhost:8088/banking/api/accounts/open', payload).pipe(
    catchError(this.handleError)
  );
}

// Deposit money
depositMoney(
  userId: number,
  accountId: number,
  amount: number,
  transactionPassword: string,
  remarks: string
): Observable<any> {
  const url = `http://localhost:8088/banking/api/accounts/deposit/${userId}?accountId=${accountId}&amount=${amount}&transactionPassword=${transactionPassword}&remarks=${remarks}`;
  return this.http.post(url, null, { responseType: 'text' }).pipe(
    catchError(this.handleError)
  );
}

// Get all accounts of a user (for populating select in deposit form)
getUserAccounts(userId: number): Observable<any[]> {
  const url = `http://localhost:8088/banking/api/accounts/summary/${userId}`;
  return this.http.get<any[]>(url).pipe(
    catchError(this.handleError)
  );
}
  // ---------------- ERROR HANDLER ----------------
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