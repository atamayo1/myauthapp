import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5189/api';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    return this.http.post<{ token: string }>(`${this.apiUrl}/Auth/login`, loginData).pipe(
      map(response => {
        localStorage.setItem('token', response.token);
        this.isAuthenticated = true;
        return true;
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(false);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<boolean> {
    const registerData = { username, email, password };
    return this.http.post(`${this.apiUrl}/Users/register`, registerData).pipe(
      map(() => true),
      catchError(error => {
        console.error('Registration failed', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
