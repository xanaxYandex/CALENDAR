import { Router } from '@angular/router';
import { MainService } from './../main.service';
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input
} from '@angular/core';

@Component({
    selector: 'app-current-meal',
    templateUrl: './current-meal.component.html',
    styleUrls: ['./current-meal.component.scss']
})
export class CurrentMealComponent implements OnInit {
    public ingestion: object;
    @Output() currentMeal: EventEmitter<any> = new EventEmitter();

    constructor(private mainService: MainService, private router: Router) { }

    public ngOnInit(): void {
        this.mainService.currentMeal.subscribe(result => {
            this.ingestion = result;
        });
    }

    public backToCalendar(): void {
        this.router.navigate(['/calendar', { isCanceled: true }]);
    }

}
