import { BehaviorSubject } from 'rxjs';

export class MainService {

    public userSettings: BehaviorSubject<object> = new BehaviorSubject({});

    public allIngestions: object = {
        Mon: {},
        Tue: {},
        Wed: {},
        Thu: {},
        Fri: {},
        Sat: {},
        Sun: {}
    };

    constructor() {
        const settingsFromStorage = JSON.parse(localStorage.getItem('settings'));

        if (settingsFromStorage) {
            this.userSettings.next(settingsFromStorage);
        } else {
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

        if (JSON.parse(localStorage.getItem('allIngestions')) !== null) {
            this.allIngestions = JSON.parse(localStorage.getItem('allIngestions'));
        }
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

}
