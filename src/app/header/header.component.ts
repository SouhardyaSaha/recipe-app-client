import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false
  authUserSubscription: Subscription
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authUserSubscription = this.authService.user.subscribe(
      (user: User) => {
        this.isAuthenticated = user ? true : false
        console.log(`Authenticated: ${this.isAuthenticated}`);

      }
    )
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.authUserSubscription.unsubscribe()
  }

}
