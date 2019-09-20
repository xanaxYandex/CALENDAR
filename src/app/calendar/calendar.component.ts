import { MainService } from '../main.service';
import { Component, OnInit } from '@angular/core';
import { MONTH_NAMES } from '../data/data';
import { range } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    // --------EXTENDS FROM SERVICE-------------------

    public currentWeekDays: number[] = [];
    public hours = this.mainService.hours;
    public daysArr: string[] = this.mainService.daysArr;
    public ingestions: object = {};

    // -----------------------------------------------

    public date: Date = new Date();
    public currentDay = this.date.getDate();
    public isStarted = true;
    public keysArr: string[] = [];
    public monthNames: string[] = MONTH_NAMES;
    public dayCalories: object = {};

    constructor(private mainService: MainService, private router: Router, private route: ActivatedRoute) {
        this.setMondayOfCurrentWeek();
    }

    public ngOnInit(): void {
        this.ingestions = this.mainService.getIngestions(this.currentDay);
        this.updateDays();
        this.setDefaultCalories();
        this.route.params.subscribe(params => {
            if (params['isCanceled'] !== undefined) {
                if (!params['isCanceled']) {
                    this.dayCalories = this.mainService.dayCalories;
                }
            }
        });
        if (this.isStarted) {
            this.dayCalories = this.mainService.dayCalories;
            this.isStarted = false;
        }
    }

    private setDefaultCalories(): void {
        this.dayCalories = {};
        this.currentWeekDays.forEach(elem => {
            this.dayCalories[elem] = {
                kcal: 0,
                proteins: 0,
                fats: 0,
                carbohydrates: 0,
                color: ''
            };
        });
    }

    private setMondayOfCurrentWeek() {
        if (this.daysArr[this.currentDay] === 'Mon') {
            return;
        } else {
            let tempDay = this.currentDay;
            while (this.daysArr[tempDay] !== 'Tue') {
                tempDay--;
            }
            this.currentDay = tempDay;
        }
    }

    private updateDays(): void {
        this.currentWeekDays = [];
        this.keysArr = [];
        Object.keys(this.ingestions).forEach(elem => this.keysArr.push(elem));
        if (this.currentWeekDays.length === 0) {
            range(+this.keysArr[0], this.keysArr.length).subscribe(result => {
                this.currentWeekDays.push(result);
            });
        }
    }

    public addIngestion(day: number, hour: string = '07:00'): void {
        console.log(1313);
        if (day <= this.date.getDate()) {
            this.mainService.newMeal.next({
                day,
                hour,
                ingestion: {
                    title: '',
                    calories: 0,
                    fats: 0,
                    proteins: 0,
                    carbohydrates: 0
                }
            });
            this.router.navigate(['/new']);
        }
    }

    public settings(): void {
        this.router.navigate(['/settings']);
    }

    public currentMeal(day: number, hour: string): void {
        this.mainService.currentMeal.next({
            ingestion: this.ingestions[day][hour],
            now: hour
        });
        this.router.navigate(['/selected']);
    }

    public nowDay(day: number): void {
        this.router.navigate([`/day/${day}`]);
    }

    public changeWeek(day: number): void {
        this.currentDay = day;
        this.isStarted = true;
        this.ngOnInit();
    }
}
