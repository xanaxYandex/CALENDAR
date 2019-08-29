import { MainService, IIngestion } from './../main.service';
import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-new-meal',
    templateUrl: './new-meal.component.html',
    styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {
    public thisDay: number;
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
    public time = '00:50';
    public ingestion: IIngestion;

    constructor(private mainService: MainService, private router: Router) { }

    ngOnInit() {
        this.mainService.newMeal.subscribe(result => {
            this.ingestion = result['ingestion'];
            this.time = result['hour'];
            this.thisDay = result['day'];
        });
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
        this.inpTime = new FormControl(this.time, [
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
        this.onChange();
    }

    addMeal(isCancel: boolean) {
        if (this.titleValid &&
            this.kcalValid &&
            this.timeValid &&
            this.fatsValid &&
            this.proteinsValid &&
            this.carbohydratesValid && !isCancel
        ) {
            this.mainService.addIngestion({
                day: this.thisDay,
                hour: this.time,
                ingestion: this.ingestion
            });
            this.router.navigate(['/calendar', {
                isCanceled: isCancel,
                day: this.thisDay,
                hour: this.time,
                ingestion: this.ingestion
            }]);
        } else {
            this.router.navigate(['/calendar', {
                isCanceled: isCancel
            }]);
        }
    }


    onChange() {
        this.inpTitle.valueChanges.subscribe(result => this.ingestion['title'] = result);
        this.inpKcal.valueChanges.subscribe(result => this.ingestion['calories'] = result);
        this.inpTime.valueChanges.subscribe(result => {
            result = result.split('');
            for (let i = result.length - 1; i > result.length - 3; i--) {
                result[i] = '0';
            }
            result = result.join('');
            this.time = result;
        });
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
