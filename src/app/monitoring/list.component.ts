import { Component, OnInit } from '@angular/core';
import { first, tap } from 'rxjs/operators';

import { MonitoringService } from '@app/_services/monitoring.service';
import { AuthService } from '@app/_services/auth.service';

@Component({
    templateUrl: 'list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    start: number = 0;
    limit: number = 15;
    total: number = 0;
    data: any[] = [];
    isLoading = false;
    isRefreshing = false;
    sortDirection: { [k in 'name' | 'currentStatus']: 'ASC' | 'DESC' } = {
        'name': 'ASC',
        'currentStatus': 'ASC'
    }

    constructor(
        private monitoringService: MonitoringService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.monitoringService.getAll()
            .pipe(
                first(),
                tap(() => this.isLoading = true)
            )
            .subscribe((res:any) => {
                this.data = res.list;
                this.total = res.size;
                this.start = this.limit;
                this.isLoading = false;
            });
    }

    loadMore() {
        this.isLoading = true;
        this.monitoringService.loadMore(this.start)
            .subscribe({
                next: (res) => {
                    this.data = [...this.data!, ...res.list];
                    this.start += this.limit;
                    this.isLoading = false;
                },
                error: (e) => this.isLoading = false
            });
    }

    refresh() {
        this.isRefreshing = true;
        this.monitoringService.loadMore(0, this.data.length)
            .subscribe({
                next: (res) => {
                    this.data = res.list;
                    this.isRefreshing = false;
                },
                error: (e) => this.isRefreshing = false
            });
    }

    logout() {
        this.authService.logout();
    }

    sortList(key: 'name' | 'currentStatus') {
        this.sortDirection[key] = (this.sortDirection[key] === 'DESC') ? 'ASC' : 'DESC';
        const order = this.sortDirection[key];
        console.log('sort', key, order)

        this.data.sort(
            (a, b) => (this.sortDirection[key] === 'ASC')
                ? b[key] > a[key]
                    ? 1 : -1
                : a[key] > b[key]
                    ? 1 : -1
        );
    }
}
