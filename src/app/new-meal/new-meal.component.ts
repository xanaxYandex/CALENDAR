import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-meal',
    templateUrl: './new-meal.component.html',
    styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {

    @Input() newMeal: object;
    @Output() setMeal: EventEmitter<any> = new EventEmitter();
    public inpTitle: FormControl;
    public inpKcal: FormControl;
    public inpTime: FormControl;
    public inpFats: FormControl;
    public inpProteins: FormControl;
    public inpCarbohydrates: FormControl;
    public titleValid = false;
    public kcalValid = true;
    public timeValid = true;
    public fatsValid = true;
    public proteinsValid = true;
    public carbohydratesValid = true;
    public date: Date = new Date();
    public time = '00:00';
    public ingestion: object = {
        title: '',
        calories: 50,
        fats: 50,
        proteins: 50,
        carbohydrates: 50
    };

    constructor() { }

    ngOnInit() {
        this.inpTitle = new FormControl(this.ingestion['title'], [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('[a-zA-Z0-9 ]*')
        ]);
        this.inpKcal = new FormControl(this.ingestion['calories'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(5),
            Validators.pattern('[0-9]*')
        ]);
        this.inpTime = new FormControl(this.newMeal['hour'], [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5),
            Validators.pattern('[0-9][0-9]:[0-9][0-9]')
        ]);
        this.inpFats = new FormControl(this.ingestion['fats'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(5),
            Validators.pattern('[0-9]*')
        ]);
        this.inpProteins = new FormControl(this.ingestion['proteins'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(5),
            Validators.pattern('[0-9]*')
        ]);
        this.inpCarbohydrates = new FormControl(this.ingestion['carbohydrates'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(5),
            Validators.pattern('[0-9]*')
        ]);
        this.time = this.newMeal['hour'];
        this.onChange();
    }

    addMeal(isCancel: boolean) {
        if (isCancel) {
            this.setMeal.emit(false);
        } else {
            if (this.titleValid &&
                this.kcalValid &&
                this.timeValid &&
                this.fatsValid &&
                this.proteinsValid &&
                this.carbohydratesValid
            ) {
                this.setMeal.emit({
                    day: this.newMeal['day'],
                    hour: this.time,
                    ingestion: this.ingestion
                });
            }
        }
    }

    onChange() {
        this.inpTitle.valueChanges.subscribe(result => this.ingestion['title'] = result);
        this.inpKcal.valueChanges.subscribe(result => this.ingestion['calories'] = result);
        this.inpTime.valueChanges.subscribe(result => this.time = result);
        this.inpFats.valueChanges.subscribe(result => this.ingestion['fats'] = result);
        this.inpProteins.valueChanges.subscribe(result => this.ingestion['proteins'] = result);
        this.inpCarbohydrates.valueChanges.subscribe(result => this.ingestion['carbohydrates'] = result);

        this.inpTitle.statusChanges.subscribe(
            result => result === 'VALID' ? this.titleValid = true : this.titleValid = false);
        this.inpKcal.statusChanges.subscribe(
            result => result === 'VALID' ? this.kcalValid = true : this.kcalValid = false);
        this.inpTime.statusChanges.subscribe(
            result => result === 'VALID' ? this.timeValid = true : this.timeValid = false);
        this.inpFats.statusChanges.subscribe(
            result => result === 'VALID' ? this.fatsValid = true : this.fatsValid = false);
        this.inpProteins.statusChanges.subscribe(
            result => result === 'VALID' ? this.proteinsValid = true : this.proteinsValid = false);
        this.inpCarbohydrates.statusChanges.subscribe(
            result => result === 'VALID' ? this.carbohydratesValid = true : this.carbohydratesValid = false);
    }

}
