import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HoverColorDirective } from '../directives/hover-color.directive';
import { CaseConverterPipe } from '../pipes/case-converter.pipe';
import { TooltipDirective } from '../directives/tooltip.directive';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HoverColorDirective, CaseConverterPipe, TooltipDirective, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = "Welcome to the Home Page";
  description = "Logged in as:";
  userInfo: { username:string } | null = null;
  
  constructor(private authService: AuthService, private router: Router) {
    this.userInfo = this.authService.getUserInfo();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
