import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigCourseEditorComponent } from './big-course-editor.component';

describe('BigCourseEditorComponent', () => {
  let component: BigCourseEditorComponent;
  let fixture: ComponentFixture<BigCourseEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigCourseEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BigCourseEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
