import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { MonitoringService } from '@app/_services/monitoring.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    data?: any[];

    constructor(private monitoringService: MonitoringService) {}

    ngOnInit() {
        this.monitoringService.getAll()
            .pipe(first())
            .subscribe((res:any) => this.data = res.list);
    }
}
