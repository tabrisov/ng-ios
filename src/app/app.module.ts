import { TuiRootModule, TuiDialogModule, TuiAlertModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from "src/_helpers/jwt.interceptor";
import { ErrorInterceptor } from "src/_helpers/error.interceptor";
import { ExtraTableComponent } from './extra-table/extra-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExtraTableComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule, // Required by Taiga UI
        TuiRootModule, // Has to go after BrowserAnimationsModule
        TuiDialogModule,
        TuiAlertModule
      ],
    
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
