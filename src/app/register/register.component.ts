import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private authService: AuthService) { }

  onSubmit() {
    try {
      const response = this.authService.register(this.username, this.email, this.password);
      console.log('Registration successful', response);
      // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration error
    }
  }
}
