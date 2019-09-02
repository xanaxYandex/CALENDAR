import { Router } from '@angular/router';
import { MainService } from './../main.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    @Output() userSettings: EventEmitter<any> = new EventEmitter();
    public inpWeight: number;
    public inpHeight: number;
    public inpAge: number;
    public inpMinKcal: number;
    public inpMaxKcal: number;
    public inpFats: number;
    public inpProteins: number;
    public inpCarbohydrates: number;
    public settings: object = {};
    public circles = [true, false];

    constructor(private mainService: MainService, private router: Router) { }

    public ngOnInit(): void {
        this.mainService.userSettings.subscribe(result => {
            this.settings = result;
        });
        this.inpWeight = this.settings['weight'];
        this.inpHeight = this.settings['height'];
        this.inpAge = 25;
        this.inpMinKcal = this.settings['minKcal'];
        this.inpMaxKcal = this.settings['maxKcal'];
        this.inpFats = this.settings['fats'];
        this.inpProteins = this.settings['proteins'];
        this.inpCarbohydrates = this.settings['carbohydrates'];
        this.selectOption(this.settings['gender']);
    }

    public selectOption(optionId): void {
        this.circles.map((elem, i, arr) => {
            if (i === optionId) {
                this.settings['gender'] = optionId;
                return arr[i] = true;
            } else {
                return arr[i] = false;
            }
        });
    }

    public calcParams(): void {
        if (true) {
            if (this.settings['gender'] === 0) {
                const kcal = 88.36 + (13.4 * +this.inpWeight) + (4.8 * +this.inpHeight) - (5.7 * this.inpAge);
                this.inpMinKcal = Math.floor(kcal - 200);
                this.inpMaxKcal = Math.floor(kcal + 200);
            } else {
                const kcal = 447.6 + (9.2 * +this.inpWeight) + (3.1 * +this.inpHeight) - (4.3 * this.inpAge);
                this.inpMinKcal = Math.floor(kcal - 200);
                this.inpMaxKcal = Math.floor(kcal + 200);
            }
        }
    }

    public saveSettings(isCancel: boolean): void {
        if (!isCancel) {
            this.settings['weight'] = this.inpWeight;
            this.settings['height'] = this.inpHeight;
            this.settings['minKcal'] = this.inpMinKcal;
            this.settings['maxKcal'] = this.inpMaxKcal;
            this.settings['fats'] = this.inpFats;
            this.settings['proteins'] = this.inpProteins;
            this.settings['carbohydrates'] = this.inpCarbohydrates;
            this.mainService.userSettings.next(this.settings);
            this.mainService.updateSettings();
            this.router.navigate(['/calendar', { isCanceled: true }]);
        } else {
            this.router.navigate(['/calendar', { isCanceled: true }]);
        }
    }
}
