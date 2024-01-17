import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        LayoutComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
})
export class AuthModule { }
