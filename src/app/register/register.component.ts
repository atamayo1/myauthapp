import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.register(this.username, this.email, this.password).pipe(
      catchError(error => {
        console.error('Register failed', error);
        return of(false);
      })
    ).subscribe(success => {
      if (success) {
        console.log('Register successful');
        this.router.navigate(['/login']);
      }
    });
  }
}
