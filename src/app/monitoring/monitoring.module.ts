import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ExtraTableComponent } from '@app/extra-table/extra-table.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MonitoringRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        ExtraTableComponent
    ]
})
export class UsersModule { }
