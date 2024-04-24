import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './progress-card.component.html',
  styleUrl: './progress-card.component.scss',
})
export class ProgressCardComponent {
  @Input() course: any;
  constructor() {}
  progressPercentage: number = 0;
  date: String = "";
  ngOnInit(): void {
    this.progressPercentage = (this.course.progress / this.course.totalDuration) * 100;
    this.date = new Date(this.course.enrolledOn).toLocaleDateString();
  }
}
