import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            server: [server, [Validators.required, Validators.pattern('(https://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
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
}
