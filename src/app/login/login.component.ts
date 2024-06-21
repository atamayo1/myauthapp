import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password)
      .pipe(
        catchError(error => {
          console.error('Login failed', error);
          return of(false);
        })
      )
      .subscribe(success => {
        if (success) {
          console.log('Login successful');
          this.router.navigate(['/home']);
        }
      });
  }
}
