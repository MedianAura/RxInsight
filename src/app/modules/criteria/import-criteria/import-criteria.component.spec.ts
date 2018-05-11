import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCriteriaComponent } from './import-criteria.component';

describe('ImportCriteriaComponent', () => {
  let component: ImportCriteriaComponent;
  let fixture: ComponentFixture<ImportCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
