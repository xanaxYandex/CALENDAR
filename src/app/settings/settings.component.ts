import { MainService } from './../main.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    @Output() userSettings: EventEmitter<any> = new EventEmitter();
    public inpWeight: FormControl;
    public inpHeight: FormControl;
    public inpAge: FormControl;
    public inpMinKcal: FormControl;
    public inpMaxKcal: FormControl;
    public inpFats: FormControl;
    public inpProteins: FormControl;
    public inpCarbohydrates: FormControl;
    public weightValid = true;
    public heightValid = true;
    public ageValid = false;
    public minKcalValid = true;
    public maxKcalValid = true;
    public fatsValid = true;
    public proteinsValid = true;
    public carbohydratesValid = true;
    public settings: object = {};
    public circles = [true, false];

    constructor(private mainService: MainService) { }

    ngOnInit() {
        this.mainService.userSettings.subscribe(result => {
            this.settings = result;
        });
        this.inpWeight = new FormControl(this.settings['weight'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(3),
            Validators.pattern('[0-9]*')
        ]);
        this.inpHeight = new FormControl(this.settings['height'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(3),
            Validators.pattern('[0-9]*')
        ]);
        this.inpAge = new FormControl(25, [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(2),
            Validators.pattern('[0-9]*')
        ]);
        this.inpMinKcal = new FormControl(this.settings['minKcal'], [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(5),
            Validators.pattern('[0-9]*')
        ]);
        this.inpMaxKcal = new FormControl(this.settings['maxKcal'], [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(5),
            Validators.pattern('[0-9]*')
        ]);
        this.inpFats = new FormControl(this.settings['fats'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(5),
            Validators.pattern('[0-9]*')
        ]);
        this.inpProteins = new FormControl(this.settings['proteins'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(5),
            Validators.pattern('[0-9]*')
        ]);
        this.inpCarbohydrates = new FormControl(this.settings['carbohydrates'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(5),
            Validators.pattern('[0-9]*')
        ]);
        this.selectOption(this.settings['gender']);
        this.onChange();
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
        if (this.weightValid &&
            this.heightValid &&
            this.ageValid &&
            this.minKcalValid &&
            this.maxKcalValid &&
            this.fatsValid &&
            this.proteinsValid &&
            this.carbohydratesValid
        ) {
            if (this.settings['gender'] === 0) {
                const kcal = 88.36 + (13.4 * +this.inpWeight.value) + (4.8 * +this.inpHeight.value) - (5.7 * this.inpAge.value);
                this.inpMinKcal.setValue(Math.floor(kcal) - 200);
                this.inpMaxKcal.setValue(Math.floor(kcal) + 200);
            } else {
                const kcal = 447.6 + (9.2 * +this.inpWeight.value) + (3.1 * +this.inpHeight.value) - (4.3 * this.inpAge.value);
                this.inpMinKcal.setValue(Math.floor(kcal) - 200);
                this.inpMaxKcal.setValue(Math.floor(kcal) + 200);
            }
        }

    }

    saveSettings(isCancel: boolean) {
        if (isCancel) {
            this.userSettings.emit();
        } else {
            if (this.weightValid &&
                this.heightValid &&
                this.ageValid &&
                this.minKcalValid &&
                this.maxKcalValid &&
                this.fatsValid &&
                this.proteinsValid &&
                this.carbohydratesValid
            ) {
                this.mainService.userSettings.next(this.settings);
                this.userSettings.emit();
            }
        }
    }

    onChange() {
        this.inpWeight.valueChanges.subscribe(result => this.settings['weight'] = result);
        this.inpHeight.valueChanges.subscribe(result => this.settings['height'] = result);
        this.inpMinKcal.valueChanges.subscribe(result => this.settings['minKcal'] = result);
        this.inpMaxKcal.valueChanges.subscribe(result => this.settings['maxKcal'] = result);
        this.inpFats.valueChanges.subscribe(result => this.settings['fats'] = result);
        this.inpProteins.valueChanges.subscribe(result => this.settings['proteins'] = result);
        this.inpCarbohydrates.valueChanges.subscribe(result => this.settings['carbohydrates'] = result);

        this.inpWeight.statusChanges.subscribe(
            result => result === 'VALID' ? this.weightValid = true : this.weightValid = false);
        this.inpHeight.statusChanges.subscribe(
            result => result === 'VALID' ? this.heightValid = true : this.heightValid = false);
        this.inpAge.statusChanges.subscribe(
            result => result === 'VALID' ? this.ageValid = true : this.ageValid = false);
        this.inpMinKcal.statusChanges.subscribe(
            result => result === 'VALID' ? this.minKcalValid = true : this.minKcalValid = false);
        this.inpMaxKcal.statusChanges.subscribe(
            result => result === 'VALID' ? this.maxKcalValid = true : this.maxKcalValid = false);
        this.inpFats.statusChanges.subscribe(
            result => result === 'VALID' ? this.fatsValid = true : this.fatsValid = false);
        this.inpProteins.statusChanges.subscribe(
            result => result === 'VALID' ? this.proteinsValid = true : this.proteinsValid = false);
        this.inpCarbohydrates.statusChanges.subscribe(
            result => result === 'VALID' ? this.carbohydratesValid = true : this.carbohydratesValid = false);
    }
}
