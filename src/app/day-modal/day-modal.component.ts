import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

    @Input() ingestion: object;
    @Output() nowDay: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    backToCalendar() {
        this.nowDay.emit();
    }

}
