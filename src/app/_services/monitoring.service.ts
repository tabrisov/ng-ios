import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models/user';

@Injectable({ providedIn: 'root' })
export class MonitoringService {
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

    getAll(postOptions: any = {}) {
        return this.http.post<any>(
            `${environment.apiUrl}/engine/api/v1/services/?limit=16`, 
            {...postOptions}
        );
    }
    loadMore(start = 0, limit = 16) {
        return this.http.post<any>(
            `${environment.apiUrl}/engine/api/v1/services/?limit=${limit}&offset=${start}`, {}
        );
    }
}
