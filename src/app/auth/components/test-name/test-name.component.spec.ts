import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNameComponent } from './test-name.component';

describe('TestNameComponent', () => {
  let component: TestNameComponent;
  let fixture: ComponentFixture<TestNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestNameComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
