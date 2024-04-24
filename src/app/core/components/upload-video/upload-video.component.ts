import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { youtubeLinkValidator } from './validators/youtubeLinkValidator';

interface Course {
  id: number;
  name: String;
}

@Component({
  selector: 'app-upload-video',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, MatCardModule],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.scss'
})

export class UploadVideoComponent {
  // course select start
  selectedCourse: Course | null = null;
  

  coursesList: Course[] = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
    { id: 4, name: 'D' },
    { id: 5, name: 'E' },
    { id: 6, name: 'F' },
    { id: 7, name: 'G' },
    { id: 8, name: 'H' }
  ];

  onCourseSelected(): void {
    this.selectedCourse = this.selectCourseFormControl.value;
    /*
        use case:

        <p>{{selectedCourse?.name}}</p>

        @ this only works when something is selected in the course 
    */
   
  }

  trackByFn(index: number, item: Course): number {
    return item.id;
  }

  selectCourseFormControl = new FormControl<Course | null>(null, [Validators.required]);
  // course select end
  
  youtubeFormControl = new FormControl('', [Validators.required, youtubeLinkValidator()]);
  lectureTitleControl = new FormControl('', [Validators.required]);

  // thubnail part start
  imageName: string | ArrayBuffer | null = null;
  imageUrl: string | ArrayBuffer | null = null;

  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.previewImage(file);
    this.imageName = file.name;
    
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }

  uploadImage(): void {
    console.log('Image uploaded:', this.imageUrl);
  }
  // thumbnail part end

}
