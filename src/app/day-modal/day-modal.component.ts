import { HOURS } from './../data/data';
import { MainService } from './../main.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

    public ingestion: object;
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

    constructor(private mainService: MainService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.ingestion = {
                info: this.mainService.dayCalories[params['numberOfDay']],
                thisDay: this.mainService.daysArr[params['numberOfDay'] - 1],
                ingestions: this.mainService.allIngestions[params['numberOfDay']]
            };
        });

        this.mainService.userSettings.subscribe(result => {
            this.settings = result;
        });
    }

    backToCalendar() {
        this.router.navigate(['/calendar', { isCanceled: true }]);
    }

}
