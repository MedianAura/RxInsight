import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceFileComponent } from './workspace-file.component';

describe('WorkspaceFileComponent', () => {
  let component: WorkspaceFileComponent;
  let fixture: ComponentFixture<WorkspaceFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
