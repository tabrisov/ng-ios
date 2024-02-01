import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '@app/_services/auth.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    isError = false;
    isErrorTextCollapsed = true;
    errorMsg = '';
    fullError = '';
    isPasswordVisible = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        let apiUrl = localStorage.getItem('server');
        let server = apiUrl ? JSON.parse(apiUrl) : 'https://';
        this.authService.setApiURL(server);

        this.form = this.formBuilder.group({
            server: [server, [Validators.required, LoginComponent.urlValidator]],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.authService.setApiURL(this.f['server'].value);

        this.loading = true;
        this.authService.login(this.f['username'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                    this.authService.setCredentials(this.f['username'].value, this.f['password'].value);
                },
                error: error => {
                    console.error(error);
                    if (typeof(error) == 'undefined') {
                        error = {};
                        error.status = 0;
                    }
                    this.loading = false;
                    this.isError = true;
                    switch(error.status) {
                        case 0:
                            this.errorMsg = 'Укажите корректный адрес сервера';
                            break;
                        case 401:
                            this.errorMsg = 'Ошибочный адрес эл. почты/пароль или пользователь заблокирован';
                            break;
                        default:
                            this.errorMsg = error.statusText
                            break;
                    }
                    
                    this.fullError = JSON.stringify(error);
                }
            });
    }
    private static urlValidator({value}: AbstractControl): null | ValidationErrors {
        try {
           if (value.startsWith('https://')) {
             return null;
           }
           return {pattern: true};
        } catch {
           return {pattern: true};
        }
    }
}
