import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigCourseEditorPanelComponent } from './big-course-editor-panel.component';

describe('BigCourseEditorPanelComponent', () => {
  let component: BigCourseEditorPanelComponent;
  let fixture: ComponentFixture<BigCourseEditorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigCourseEditorPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BigCourseEditorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
