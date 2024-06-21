import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private authService: AuthService) { }

  onSubmit() {
    try {
      const response = this.authService.login(this.username, this.password);
      console.log('Login successful', response);
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Login failed', error);
      // Handle login error
    }
  }
}
