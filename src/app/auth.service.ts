import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5189/api';
  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  
  getUserInfo(): { username: string } | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<any>(token); // Adjusted to use jwtDecode properly
      const isExpired = decodedToken.exp && decodedToken.exp * 1000 < Date.now(); // Adjusted for milliseconds comparison
      if (decodedToken && !isExpired) {
        return { username: decodedToken.unique_name }; // Adjusted to return the username
      }
    }
    return null;
  }

  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    return this.http.post<{ token: string }>(`${this.apiUrl}/Auth/login`, loginData).pipe(
      map(response => {
        sessionStorage.setItem('token', response.token);
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
    return this.http.post<any>(`${this.apiUrl}/Users/register`, registerData).pipe(
      map(response => {
        console.log('Registro exitoso:', response);
        sessionStorage.setItem('token', response.token);
        this.isAuthenticated = true;
        return true;
      }),
      catchError(error => {
        console.error('Error en el registro:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token') || !!localStorage.getItem('token');
  }
}
