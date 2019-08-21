import { MainService } from './../main.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { MONTH_NAMES, DAYS, HOURS } from '../data/data';
import { range, BehaviorSubject } from 'rxjs';
import { Logs, logging } from 'selenium-webdriver';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    // --------EXTENDS FROM SERVICE-------------------

    public currentWeekDays: number[] = [];
    public hours = HOURS;
    public daysArr: string[] = this.mainService.daysArr;
    public ingestions: object = {};
    public date: Date = new Date();

    // --------COMPONENT TOGGLES----------------------

    public isNewMeal = false;
    public isSettings = false;
    public isCurrentMeal = false;
    public isDay = false;

    // -----------------------------------------------

    public currentDay = new Date().getDate();
    public isStarted = true;
    public keysArr: string[] = [];
    public monthNames: string[] = MONTH_NAMES;
    public currentIngestion: object = {};
    public dayCalories: object = {};
    public forNewMeal: object = {
        day: new Date().getDate(),
        hour: '05:00'
    };
    public calories: object = {
        min: 0,
        max: 0
    };
    public colors: object = {
        yellow: '#F5D45E',
        blue: '#799CF4',
        red: '#F47981'
    };

    constructor(private mainService: MainService) {
        this.setCorrectDay();
    }

    ngOnInit() {
        this.ingestions = this.mainService.getIngestions(this.currentDay);
        this.updateDays();
        this.setDefaultCalories();
        this.mainService.userSettings.subscribe(result => {
            this.calories['min'] = +result['minKcal'];
            this.calories['max'] = +result['maxKcal'];
            this.currentWeekDays.forEach(day => {
                this.setKcalColor(day);
            });
        });
        if (this.isStarted) {
            this.currentWeekDays.forEach(day => {
                this.hours.forEach(hour => {
                    const INGESTION = this.ingestions[day][hour];
                    if (INGESTION !== undefined) {
                        this.dayCalories[day]['kcal'] += +INGESTION['calories'];
                        this.dayCalories[day]['proteins'] += +INGESTION['proteins'];
                        this.dayCalories[day]['fats'] += +INGESTION['fats'];
                        this.dayCalories[day]['carbohydrates'] += +INGESTION['carbohydrates'];
                        this.setKcalColor(day);
                    }
                });
            });
            this.isStarted = false;
        }
    }

    setDefaultCalories() {
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

    updateDays() {
        this.currentWeekDays = [];
        this.keysArr = [];
        Object.keys(this.ingestions).forEach(elem => this.keysArr.push(elem));
        if (this.currentWeekDays.length === 0) {
            range(+this.keysArr[0], this.keysArr.length).subscribe(result => {
                this.currentWeekDays.push(result);
            });
        }
    }

    setMeal(event) {
        this.isNewMeal = false;
        if (event !== false) {
            const INGESTIONS = this.ingestions[event['day']][event['hour']];
            this.mainService.addIngestion({
                day: event['day'],
                hour: event['hour'],
                ingestion: event['ingestion']
            });
            this.dayCalories[event['day']]['kcal'] += +event['ingestion']['calories'];
            this.dayCalories[event['day']]['proteins'] += +event['ingestion']['proteins'];
            this.dayCalories[event['day']]['fats'] += +event['ingestion']['fats'];
            this.dayCalories[event['day']]['carbohydrates'] += +event['ingestion']['carbohydrates'];
            this.setKcalColor(event['day']);
        }
    }

    setKcalColor(day: number) {
        const INGESTION = this.dayCalories[day]['kcal'];
        if (+INGESTION > this.calories['max']) {
            this.dayCalories[day]['color'] = this.colors['red'];
        } else if (+INGESTION < this.calories['min']) {
            this.dayCalories[day]['color'] = this.colors['yellow'];
        } else {
            this.dayCalories[day]['color'] = this.colors['blue'];
        }
    }

    addIngestion(day: number, hour: string) {
        if (day <= this.date.getDate()) {
            this.forNewMeal['day'] = day;
            this.forNewMeal['hour'] = hour;
            this.isNewMeal = true;
        }
    }

    settings() {
        this.isSettings = !this.isSettings;
        this.mainService.updateSettings();
    }

    currentMeal(day: number, hour: string) {
        this.currentIngestion = {
            ingestion: this.ingestions[day][hour],
            now: hour
        };
        this.toCurrMeal();
    }

    toCurrMeal() {
        this.isCurrentMeal = !this.isCurrentMeal;
    }

    nowDay(day: number) {
        this.currentIngestion = {
            info: this.dayCalories[day],
            thisDay: this.daysArr[day - 1],
            ingestions: this.ingestions[day]
        };
        this.toDay();
    }

    toDay() {
        this.isDay = !this.isDay;
    }

    changeWeek(day: number) {
        this.currentDay = day;
        this.isStarted = true;
        this.ngOnInit();
    }

    setCorrectDay() {
        while (this.daysArr[--this.currentDay] !== 'Tue') { }
    }
}
