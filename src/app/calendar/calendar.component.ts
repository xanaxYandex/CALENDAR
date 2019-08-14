import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { MONTH_NAMES, DAYS, HOURS } from '../data/data';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    public isNewMeal = false;
    public isSettings = false;
    public isCurrentMeal = false;
    public isDay = false;
    public date: Date = new Date();
    public monthNames = MONTH_NAMES;
    public days = DAYS;
    public hours = HOURS;
    public ingestions: object;
    public currentIngestion: object;
    public dayCalories: object = {
        Mon: {
            kcal: 0,
            fats: 0,
            proteins: 0,
            carbohydrates: 0,
            color: ''
        },
        Tue: {
            kcal: 0,
            fats: 0,
            proteins: 0,
            carbohydrates: 0,
            color: ''
        },
        Wed: {
            kcal: 0,
            fats: 0,
            proteins: 0,
            carbohydrates: 0,
            color: ''
        },
        Thu: {
            kcal: 0,
            fats: 0,
            proteins: 0,
            carbohydrates: 0,
            color: ''
        },
        Fri: {
            kcal: 0,
            fats: 0,
            proteins: 0,
            carbohydrates: 0,
            color: ''
        },
        Sat: {
            kcal: 0,
            fats: 0,
            proteins: 0,
            carbohydrates: 0,
            color: ''
        },
        Sun: {
            kcal: 0,
            fats: 0,
            proteins: 0,
            carbohydrates: 0,
            color: ''
        },
    };
    public forNewMeal: object = {
        day: '',
        hour: ''
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
        this.ngOnInit();
        this.days.forEach(day => {
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
    }

    ngOnInit() {
        this.ingestions = this.mainService.allIngestions;
        this.mainService.userSettings.subscribe(result => {
            this.calories['min'] = +result['minKcal'];
            this.calories['max'] = +result['maxKcal'];
            this.days.forEach(day => {
                this.setKcalColor(day);
            });
        });
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
            this.dayCalories[event['day']]['kcal'] += +INGESTIONS['calories'];
            this.dayCalories[event['day']]['proteins'] += +INGESTIONS['proteins'];
            this.dayCalories[event['day']]['fats'] += +INGESTIONS['fats'];
            this.dayCalories[event['day']]['carbohydrates'] += +INGESTIONS['carbohydrates'];
            this.setKcalColor(event['day']);
        }
    }

    setKcalColor(day: string) {
        const INGESTION = this.dayCalories[day]['kcal'];
        if (+INGESTION > this.calories['max']) {
            this.dayCalories[day]['color'] = this.colors['red'];
        } else if (+INGESTION < this.calories['min']) {
            this.dayCalories[day]['color'] = this.colors['yellow'];
        } else {
            this.dayCalories[day]['color'] = this.colors['blue'];
        }
    }

    addIngestion(day: string, hour: string) {
        this.forNewMeal['day'] = day;
        this.forNewMeal['hour'] = hour;
        this.isNewMeal = true;
    }

    settings() {
        this.isSettings = !this.isSettings;
        this.mainService.updateSettings();
    }

    currentMeal(day: string, hour: string) {
        this.currentIngestion = {
            ingestion: this.ingestions[day][hour],
            now: hour
        };
        this.toCurrMeal();
    }

    toCurrMeal() {
        this.isCurrentMeal = !this.isCurrentMeal;
    }

    nowDay(day: string) {
        this.currentIngestion = this.dayCalories[day];
        this.toDay();
    }

    toDay() {
        this.isDay = !this.isDay;
    }

}
