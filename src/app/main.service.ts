import { HOURS } from './data/data';
import { BehaviorSubject, range } from 'rxjs';

export interface IIngestion {
    title: string;
    calories: number;
    fats: number;
    proteins: number;
    carbohydrates: number;
}

export interface ICurrentMeal {
    ingestion: IIngestion;
    now: string;
}

export interface INewMeal {
    day: number;
    hour: string;
    ingestion: IIngestion;
}

export interface IDayCalories {
    kcal: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    color: string;
}

export interface ISelectedDay {
    info: IDayCalories;
    thisDay: string;
    ingestions: IIngestion[];
}

export class MainService {

    public userSettings: BehaviorSubject<object> = new BehaviorSubject({});
    public currentMeal: BehaviorSubject<ICurrentMeal> = new BehaviorSubject({
        ingestion: {
            title: '',
            calories: 0,
            fats: 0,
            proteins: 0,
            carbohydrates: 0
        },
        now: ''
    });
    public newMeal: BehaviorSubject<INewMeal> = new BehaviorSubject({
        day: 1,
        hour: '00:05',
        ingestion: {
            title: '',
            calories: 0,
            fats: 0,
            proteins: 0,
            carbohydrates: 0
        }
    });
    public date: Date = new Date();
    public allIngestions: {};
    public daysArr: string[] = [];
    public hours = HOURS;
    public alldaysInMonth: number[] = [];
    public dayCalories: object = {};
    public colors: object = {
        yellow: '#F5D45E',
        blue: '#799CF4',
        red: '#F47981'
    };

    constructor() {
        this.allIngestions = {
            1: {
                '05:00': {
                    calories: 0,
                    fats: 0,
                    proteins: 0,
                    carbohydrates: 0,
                }
            }
        };
        range(1, this.daysInMonth(this.date.getMonth(), this.date.getFullYear())).subscribe(elem => this.alldaysInMonth.push(elem));
        this.alldaysInMonth.forEach(day => {
            this.allIngestions[day] = {};
        });
        this.daysArr = this.getDaysInMonth(new Date().getMonth(), new Date().getFullYear());
        const settingsFromStorage = JSON.parse(localStorage.getItem('settings'));
        if (settingsFromStorage) {
            this.userSettings.next(settingsFromStorage);
        } else {
            this.setDefaultSettings();
        }

        if (JSON.parse(localStorage.getItem('allIngestions')) !== null) {
            this.allIngestions = JSON.parse(localStorage.getItem('allIngestions'));
        }
        this.setCalories();
    }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    addIngestion(result: object) {
        this.allIngestions[result['day']][result['hour']] = result['ingestion'];
        localStorage.setItem('allIngestions', JSON.stringify(this.allIngestions));
        this.setCalories();
        this.setKcalColor(result['day']);
    }

    setKcalColor(day: number) {
        this.userSettings.subscribe(settings => {
            const INGESTION = this.dayCalories[day]['kcal'];
            if (+INGESTION > settings['maxKcal']) {
                this.dayCalories[day]['color'] = this.colors['red'];
            } else if (+INGESTION < settings['minKcal']) {
                this.dayCalories[day]['color'] = this.colors['yellow'];
            } else {
                this.dayCalories[day]['color'] = this.colors['blue'];
            }
        });

    }

    updateSettings() {
        this.userSettings.subscribe(result => {
            localStorage.setItem('settings', JSON.stringify(result));
        });
    }

    getIngestions(currentDay: number) {
        currentDay = (currentDay <= 0) ? 1 : currentDay;
        const ingestion = {};
        for (const key in this.alldaysInMonth) {
            if (this.alldaysInMonth.hasOwnProperty(key)) {
                const element = this.alldaysInMonth[key];
                if (element >= currentDay) {
                    ingestion[element] = this.allIngestions[element];
                    if (this.daysArr[element - 1] === 'Sun') {
                        break;
                    }
                }
            }
        }
        return ingestion;
    }

    setCalories() {
        this.setDefaultCalories();
        this.alldaysInMonth.forEach(day => {
            this.hours.forEach(hour => {
                const INGESTION = this.allIngestions[day][hour];
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

    setDefaultCalories() {
        this.alldaysInMonth.forEach(elem => {
            this.dayCalories[elem] = {
                kcal: 0,
                proteins: 0,
                fats: 0,
                carbohydrates: 0,
                color: ''
            };
        });
    }

    getDaysInMonth(month, year) {
        const date1 = new Date(Date.UTC(year, month, 1));
        const days1 = [];

        while (date1.getMonth() === month) {
            days1.push(new Date(date1).toDateString());
            date1.setDate(date1.getDate() + 1);
        }
        return days1.map(elem => elem.slice(0, 3));
    }

    setDefaultSettings() {
        this.userSettings.next({
            gender: 1,
            weight: 62,
            height: 167,
            minKcal: 0,
            maxKcal: 0,
            fats: 60,
            proteins: 60,
            carbohydrates: 60,
        });
    }

}
