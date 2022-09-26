import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMatchFormComponent } from './new-match-form.component';

describe('NewMatchFormComponent', () => {
  let component: NewMatchFormComponent;
  let fixture: ComponentFixture<NewMatchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMatchFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
