import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

    @Output() toCalendar: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    _toCalendar() {
        this.toCalendar.emit();
    }

}
