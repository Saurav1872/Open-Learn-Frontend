import { Component } from '@angular/core';
import { ProgressCardComponent } from '../../components/progress-card/progress-card.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ProgressCardComponent, CommonModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  constructor(private http: HttpClient) {}
  listOfCourses: any = [];
  ngOnInit(): void {
    this.http
      .get('http://localhost:5000/api/v1/trackProgress', { withCredentials: true })
      .subscribe((res: any) => {
        if (res.ok) {
          console.log(res);

          this.listOfCourses = res.courses;
        }
      });
  }
}
