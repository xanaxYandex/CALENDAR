import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input
}

    from '@angular/core';

@Component({
    selector: 'app-current-meal',
    templateUrl: './current-meal.component.html',
    styleUrls: ['./current-meal.component.scss']
}

) export class CurrentMealComponent implements OnInit {

    @Input() ingestion: object;
    @Output() currentMeal: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    backToCalendar() {
        this.currentMeal.emit();
    }

}