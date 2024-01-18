import { Component, Input, OnInit } from '@angular/core';
import { statusNames } from '@app/_models/status.constants';

@Component({
  selector: 'app-extra-table',
  templateUrl: './extra-table.component.html',
  styleUrls: ['./extra-table.component.scss']
})
export class ExtraTableComponent implements OnInit {
  @Input() item?: any;

  isOpened = false;
  statuses = statusNames;

  constructor() { }

  ngOnInit(): void {
  }
  open() {
    this.isOpened = !this.isOpened;
  }

  get statusName() {
    type status = 'ACTIVE' | 'NOT_IN_USAGE' | 'ARCHIVED' | 'DRAFT';
    return this.statuses[this.item.status as status];
  }

}
