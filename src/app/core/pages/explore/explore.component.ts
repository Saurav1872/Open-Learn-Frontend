import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingCardComponent } from '../../components/lodings/loading-card/loading-card.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { error, log } from 'console';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CourseCardComponent, HttpClientModule, CommonModule, MatProgressSpinnerModule,LoadingCardComponent, MatPaginatorModule,],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  constructor(private http: HttpClient) { }

  isLoading:boolean = false;

  listOfCourses: any = [];
  listSizeOptions = [10, 25, 50];
  listSize = this.listSizeOptions[0];
  dataSource: any = [];
  ngOnInit(): void {
    this.isLoading = true;
    this.http.get('http://localhost:5000/api/v1/videos/trending', { withCredentials: true }).subscribe((res: any) => {
      if (res.ok) {
        this.isLoading = false;
        this.listOfCourses = res.topCourses;
        this.dataSource = this.listOfCourses.slice(0, this.listSize);
        this.paginator.length = this.listOfCourses.length;
        // console.log(this.listOfCourses)  // no need to bombard my console
      }
    }, (error:HttpErrorResponse) => {
      // console.log(error.error.message);
      
    })
  }

  onListPageChange(event: PageEvent) {
    const from = event.pageIndex * event.pageSize;
    const to = from + event.pageSize;
    this.dataSource = this.listOfCourses.slice(from, to);
  }
}
