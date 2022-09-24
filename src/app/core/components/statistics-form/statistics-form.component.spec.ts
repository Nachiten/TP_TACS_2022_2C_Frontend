import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsFormComponent } from './statistics-form.component';

describe('StatisticsFormComponent', () => {
  let component: StatisticsFormComponent;
  let fixture: ComponentFixture<StatisticsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
