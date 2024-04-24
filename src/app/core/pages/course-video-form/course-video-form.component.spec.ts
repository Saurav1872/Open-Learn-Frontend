import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseVideoFormComponent } from './course-video-form.component';

describe('CourseVideoFormComponent', () => {
  let component: CourseVideoFormComponent;
  let fixture: ComponentFixture<CourseVideoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseVideoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
