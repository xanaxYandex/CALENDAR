import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

    @Output() toCalendar: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router) { }

    ngOnInit() {
    }

    _toCalendar() {
        // this.toCalendar.emit();
        this.router.navigate(['/calendar', { isCanceled: true }]);
    }

}
