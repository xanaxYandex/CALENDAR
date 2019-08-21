import { DAYS, HOURS } from './data/data';
import { BehaviorSubject, range } from 'rxjs';

export class MainService {

    public userSettings: BehaviorSubject<object> = new BehaviorSubject({});
    public date: Date = new Date();
    public allIngestions: {};
    public daysArr: string[] = [];
    public hours = HOURS;
    public alldaysInMonth: number[] = [];

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
    }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    addIngestion(result: object) {
        this.allIngestions[result['day']][result['hour']] = result['ingestion'];
        localStorage.setItem('allIngestions', JSON.stringify(this.allIngestions));
    }

    updateSettings() {
        this.userSettings.subscribe(result => {
            localStorage.setItem('settings', JSON.stringify(result));
        });
    }

    getIngestions(currentDay: number) {
        currentDay = (currentDay <= 0) ?
            1 : currentDay;
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
