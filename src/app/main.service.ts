import { BehaviorSubject } from 'rxjs';

export class MainService {

    public allIngestions: object = {
        Mon: {},
        Tue: {},
        Wed: {},
        Thu: {},
        Fri: {},
        Sat: {},
        Sun: {}
    };

    addIngestion(result: object) {
        this.allIngestions[result['day']][result['hour']] = result['ingestion'];
    }
}
