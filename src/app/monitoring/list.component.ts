import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

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

    constructor(
        private monitoringService: MonitoringService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.monitoringService.getAll()
            .pipe(first())
            .subscribe((res:any) => {
                this.data = res.list;
                this.total = res.size;
                this.start = this.limit;
            });
    }

    loadMore() {
        this.monitoringService.loadMore(this.start).subscribe((res) => {
            this.data = [...this.data!, ...res.list];
            this.start += this.limit;
        })
    }

    refresh() {
        this.monitoringService.loadMore(0, this.data.length).subscribe((res) => {
            this.data = res.list;
        })
    }

    logout() {
        this.authService.logout();
    }
}
