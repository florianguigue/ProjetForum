import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningAdministrationComponent } from './planning-administration.component';

describe('PlanningAdministrationComponent', () => {
  let component: PlanningAdministrationComponent;
  let fixture: ComponentFixture<PlanningAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
