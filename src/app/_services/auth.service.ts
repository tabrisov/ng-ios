import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    setApiURL(url: string) {
        environment.apiUrl = url;
        localStorage.setItem('server', JSON.stringify(url));
    }

    setCredentials(username: string, password: string) {
        localStorage.setItem('username', JSON.stringify(username));
        localStorage.setItem('password', JSON.stringify(password));
    }

    getCredentials() {
        const l = localStorage.getItem('username');
        const p = localStorage.getItem('password');

        return {
            username: l ? JSON.parse(l) : l,
            password: p ? JSON.parse(p) : p
        };
    }

    login(username: string, password: string) {
        const wislaOptions = {
            headers: new HttpHeaders({ "X-Requested-With": "XMLHttpRequest" })
        };
        return this.http.post<User>(`${environment.apiUrl}/engine/api/auth/login`, { username, password }, wislaOptions)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/engine/api/v1/users/${id}`);
    }
}
