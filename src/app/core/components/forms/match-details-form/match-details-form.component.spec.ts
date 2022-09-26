import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailsFormComponent } from './match-details-form.component';

describe('MatchDetailsFormComponent', () => {
  let component: MatchDetailsFormComponent;
  let fixture: ComponentFixture<MatchDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchDetailsFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
