import { MainService } from './main.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SettingsComponent } from './settings/settings.component';
import { NewMealComponent } from './new-meal/new-meal.component';
import { CurrentMealComponent } from './current-meal/current-meal.component';
import { DayModalComponent } from './day-modal/day-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        StartPageComponent,
        CalendarComponent,
        SettingsComponent,
        NewMealComponent,
        CurrentMealComponent,
        DayModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [MainService],
    bootstrap: [AppComponent]
})
export class AppModule { }
