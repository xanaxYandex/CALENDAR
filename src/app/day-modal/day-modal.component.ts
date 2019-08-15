import { HOURS } from './../data/data';
import { MainService } from './../main.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

    @Input() ingestion: object;
    @Output() nowDay: EventEmitter<any> = new EventEmitter();
    public hours = HOURS;
    public settings: object;
    public days: object = {
        Mon: 'Monday',
        Tue: 'Tuesday',
        Wed: 'Wednesday',
        Thu: 'Thursday',
        Fri: 'Friday',
        Sat: 'Saturday',
        Sun: 'Sunday'
    };

    constructor(private mainService: MainService) { }

    ngOnInit() {
        this.mainService.userSettings.subscribe(result => {
            this.settings = result;
        });
    }

    backToCalendar() {
        this.nowDay.emit();
    }

}
