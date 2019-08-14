import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-new-meal',
    templateUrl: './new-meal.component.html',
    styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {

    public date: Date = new Date();

    public time = '00:00';

    public ingestion: object = {
        title: '',
        calories: 0,
        fats: 0,
        proteins: 0,
        carbohydrates: 0
    };

    @Input() newMeal: object;
    @Output() setMeal: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.time = this.newMeal['hour'];
    }

    addMeal(isCancel: boolean) {
        if (isCancel) {
            this.setMeal.emit(false);
        } else {
            this.setMeal.emit({
                day: this.newMeal['day'],
                hour: this.time,
                ingestion: this.ingestion
            });
        }
    }

}
