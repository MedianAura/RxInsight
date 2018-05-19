import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCriteriaComponent } from './preview-criteria.component';

describe('PreviewCriteriaComponent', () => {
  let component: PreviewCriteriaComponent;
  let fixture: ComponentFixture<PreviewCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
