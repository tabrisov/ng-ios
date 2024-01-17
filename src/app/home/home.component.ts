import { Component } from '@angular/core';

import { User } from '@app/_models/user';
import { AuthService } from '@app/_services/auth.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User | null;

    constructor(private authService: AuthService) {
        this.user = this.authService.userValue;
    }
}
