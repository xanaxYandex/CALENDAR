import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { MONTH_NAMES, DAYS, HOURS } from '../data/data';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    public isNewMeal = false;
    public isCancel = false;
    public monthNames = MONTH_NAMES;
    public days = DAYS;
    public hours = HOURS;

    public ingestions: object;
    public dayCalories: object = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0,
    };

    public date: Date = new Date();

    constructor(private mainService: MainService) { }

    ngOnInit() {
        this.ingestions = this.mainService.allIngestions;
    }


    setMeal(event) {
        this.isNewMeal = false;

        if (event !== Boolean) {
            this.mainService.addIngestion({
                day: DAYS[event['day']],
                hour: event['hour'],
                ingestion: event['ingestion']
            });
        }
        this.dayCalories[DAYS[event['day']]] += +this.ingestions[DAYS[event['day']]][event['hour']]['calories'];
    }

}
