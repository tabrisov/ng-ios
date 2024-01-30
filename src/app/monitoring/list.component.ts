import { Component, OnInit } from '@angular/core';
import { first, tap } from 'rxjs/operators';

import { MonitoringService } from '@app/_services/monitoring.service';
import { AuthService } from '@app/_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: 'list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    start: number = 0;
    limit: number = 16;
    total: number = 0;
    data: any[] = [];
    isLoading = false;
    isRefreshing = false;
    sortColumn:'name' | 'currentStatus' | null = null;
    sortDirection: { [k in 'name' | 'currentStatus']: 'ASC' | 'DESC' } = {
        'name': 'ASC',
        'currentStatus': 'ASC'
    }
    isError = false;
    isErrorTextCollapsed = true;
    errorMsg = '';
    fullError = '';

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
            .subscribe({
                next: (res: any) => {
                    this.data = res.list;
                    this.total = res.size;
                    this.start = this.limit;
                    this.isLoading = false;
                },
                error: error => this.handleError(error)
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
                    this.isError = false;
                    this.sortList(this.sortColumn, true);
                },
                error: error => this.handleError(error)
            });
    }

    refresh() {
        this.isRefreshing = true;
        this.monitoringService.loadMore(0, this.data.length)
            .subscribe({
                next: (res) => {
                    this.data = res.list;
                    this.isRefreshing = false;
                    this.isError = false;
                },
                error: error => this.handleError(error)
            });
    }

    logout() {
        this.authService.logout();
    }

    sortList(key: 'name' | 'currentStatus' | null, keepDirection?:boolean) {
        if (!key) return;
        this.sortColumn = key;
        if (!keepDirection) {
            this.sortDirection[key] = (this.sortDirection[key] === 'DESC') ? 'ASC' : 'DESC';
        }

        this.data.sort(
            (a, b) => (this.sortDirection[key] === 'ASC')
                ? b[key] > a[key]
                    ? 1 : -1
                : a[key] > b[key]
                    ? 1 : -1
        );
    }

    handleError(error: HttpErrorResponse) {
        this.isError = true;
        this.errorMsg = error?.statusText || 'Unknown error'
        this.fullError = JSON.stringify(error);
        this.isLoading = false
    }
}
