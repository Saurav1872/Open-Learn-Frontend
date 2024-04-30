import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
interface Courses {
  position: number,
  name: string
}


@Component({
  selector: 'app-big-course-editor',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule, 
    MatCardModule, 
    MatTableModule, 
    MatPaginator,
    MatFormFieldModule
  ],
  templateUrl: './big-course-editor.component.html',
  styleUrl: './big-course-editor.component.scss'
})
export class BigCourseEditorComponent {

  constructor(private router: Router) {
    
  }

  courses: Courses[] = [
    { position: 1, name: 'Course A'},
    { position: 2, name: 'Course B'},
    { position: 3, name: 'Course C'},
    { position: 4, name: 'Course D'},
    { position: 5, name: 'Course E'},
    { position: 6, name: 'Course F'},
    { position: 7, name: 'Course G'},
    { position: 8, name: 'Course H'},
    { position: 9, name: 'Course I'},
    { position: 10, name: 'Course J'},
    { position: 11, name: 'Course K'},
    { position: 12, name: 'Course L'},
    { position: 13, name: 'Course M'},
  ];

  // Define your delete and edit actions here
  deleteCourse(course: Courses) {
    // Implement delete logic here
    console.log("Delete course: " + course.name);
  }

  editCourse(course: Courses) {
    // Implement edit logic here
    console.log("Edited course " + course.name);
    this.router.navigate(['editorPanel']);
  }

  dataSource = new MatTableDataSource<Courses>(this.courses);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
