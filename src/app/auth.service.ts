import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5189/api';

  constructor() {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.httpPost(`${this.apiUrl}/Auth/login`, loginData);
  }

  register(username: string, email: string, password: string): Observable<any> {
    const registerData = { username, email, password };
    return this.httpPost(`${this.apiUrl}/Users/register`, registerData);
  }

  private httpPost(url: string, data: any): Observable<any> {
    return new Observable<any>((observer) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.responseText));
            observer.complete();
          } else {
            observer.error(xhr.statusText);
          }
        }
      };
      xhr.send(JSON.stringify(data));
    });
  }
}
