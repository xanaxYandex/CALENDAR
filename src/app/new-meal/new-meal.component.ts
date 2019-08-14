import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-new-meal',
    templateUrl: './new-meal.component.html',
    styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent {

    public date: Date = new Date();

    public time = '00:00';

    public ingestion: object = {
        title: '',
        calories: 0,
        fats: 0,
        proteins: 0,
        carbohydrates: 0
    };

    @Output() setMeal: EventEmitter<any> = new EventEmitter();

    constructor() { }

    addMeal(isCancel: boolean) {
        if (isCancel) {
            this.setMeal.emit(false);
        } else {
            this.setMeal.emit({
                day: this.date.getDay() - 1,
                hour: this.time,
                ingestion: this.ingestion
            });
        }
    }

}
