import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './progress-card.component.html',
  styleUrl: './progress-card.component.scss',
})
export class ProgressCardComponent {
  @Input() course: any;
  constructor(private router: Router) {}
  progressPercentage: number = 0;
  date: String = "";
  ngOnInit(): void {
    this.progressPercentage = (this.course.progress / this.course.totalDuration) * 100;
    this.date = new Date(this.course.enrolledOn).toLocaleDateString();
  }


  loadCourse() {
    this.router.navigate([`coursePlayer/+${this.course._id}`])
  }
}
