import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HoverColorDirective } from '../hover-color.directive';
import { CaseConverterPipe } from '../case-converter.pipe';
import { TooltipDirective } from '../tooltip.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HoverColorDirective, CaseConverterPipe, TooltipDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = "Welcome to the Home Page";
  description = "You are logged in!";
  
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
