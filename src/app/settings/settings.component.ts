import { MainService } from './../main.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public settings: object = {};
    public circles = [true, false];

    @Output() userSettings: EventEmitter<any> = new EventEmitter();

    constructor(private mainService: MainService) { }

    ngOnInit() {
        this.mainService.userSettings.subscribe(result => {
            this.settings = result;
        });
        this.selectOption(this.settings['gender']);
    }

    selectOption(optionId) {
        this.circles.map((elem, i, arr) => {
            if (i === optionId) {
                this.settings['gender'] = optionId;
                return arr[i] = true;
            } else {
                return arr[i] = false;
            }
        });
    }

    calcParams() {
        if (this.settings['gender'] === 0) {
            const kcal = 88.36 + (13.4 * +this.settings['weight']) + (4.8 * +this.settings['height']) - (5.7 * 25);
            this.settings['minKcal'] = Math.floor(kcal) - 200;
            this.settings['maxKcal'] = Math.floor(kcal) + 200;
        } else {
            const kcal = 447.6 + (9.2 * +this.settings['weight']) + (3.1 * +this.settings['height']) - (4.3 * 23);
            this.settings['minKcal'] = Math.floor(kcal) - 200;
            this.settings['maxKcal'] = Math.floor(kcal) + 200;
        }

    }

    saveSettings(isCancel: boolean) {
        if (isCancel) {
            this.userSettings.emit();
        } else {
            this.mainService.userSettings.next(this.settings);
            this.userSettings.emit();
        }
    }

}
