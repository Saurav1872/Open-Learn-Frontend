import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Url } from 'url';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {
  @Input() course: any;
  image: String = "";
  constructor() {
    
  }
  date: String = "";
  
  ngOnInit() {
    this.date = new Date(this.course.uploadDate).toLocaleDateString();
    this.image = this.course.thumbnail.base64;
  }
  
  

}
