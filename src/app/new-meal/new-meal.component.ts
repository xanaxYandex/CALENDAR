import { MainService } from '../main.service';
import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {IIngestion} from '../models/interfaces';

@Component({
    selector: 'app-new-meal',
    templateUrl: './new-meal.component.html',
    styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {
    public thisDay: number;
    @Output() setMeal: EventEmitter<any> = new EventEmitter();
    public inpTitle: string;
    public inpKcal: number;
    public inpTime: string;
    public inpFats: number;
    public inpProteins: number;
    public inpCarbohydrates: number;
    public date: Date = new Date();
    public time = '00:50';
    public ingestion: IIngestion;

    constructor(private mainService: MainService, private router: Router) { }

    public ngOnInit(): void {
        this.mainService.newMeal.subscribe(result => {
            this.ingestion = result['ingestion'];
            this.time = result['hour'];
            this.thisDay = result['day'];
        });
        this.inpTitle = this.ingestion['title'];
        this.inpKcal = this.ingestion['calories'];
        this.inpTime = this.time;
        this.inpFats = this.ingestion['fats'];
        this.inpProteins = this.ingestion['proteins'];
        this.inpCarbohydrates = this.ingestion['carbohydrates'];
    }

    public addMeal(isCancel: boolean): void {
        if (isCancel) {
            this.router.navigate(['/calendar', {
                isCanceled: isCancel
            }]);
        } else {
            this.ingestion['title'] = this.inpTitle;
            this.ingestion['calories'] = this.inpKcal;
            this.ingestion['fats'] = this.inpFats;
            this.ingestion['proteins'] = this.inpProteins;
            this.ingestion['carbohydrates'] = this.inpCarbohydrates;
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
        }
    }
}
