import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMealComponent } from './current-meal.component';

describe('CurrentMealComponent', () => {
  let component: CurrentMealComponent;
  let fixture: ComponentFixture<CurrentMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
