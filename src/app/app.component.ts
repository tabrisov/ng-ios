import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user?: User | null;
  title = 'ng-ios';

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(x => this.user = x);

    let apiUrl = localStorage.getItem('server');
    if (apiUrl) {
      this.authService.setApiURL(JSON.parse(apiUrl));  
    }
  }

  logout() {
      this.authService.logout();
  }
}
