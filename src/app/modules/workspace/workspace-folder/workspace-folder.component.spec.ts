import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceFolderComponent } from './workspace-folder.component';

describe('WorkspaceFolderComponent', () => {
  let component: WorkspaceFolderComponent;
  let fixture: ComponentFixture<WorkspaceFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
