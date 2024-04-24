import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ErrorComponent } from '../../components/popups/error/error.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent,ErrorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
