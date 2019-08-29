import { CurrentMealComponent } from './../current-meal/current-meal.component';
import { CalendarComponent } from './../calendar/calendar.component';
import { StartPageComponent } from './../start-page/start-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { NewMealComponent } from '../new-meal/new-meal.component';
import { DayModalComponent } from '../day-modal/day-modal.component';

const appRoutes: Routes = [
    { path: '', component: StartPageComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'new', component: NewMealComponent },
    { path: 'current', component: CurrentMealComponent },
    { path: 'day/:numberOfDay', component: DayModalComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
