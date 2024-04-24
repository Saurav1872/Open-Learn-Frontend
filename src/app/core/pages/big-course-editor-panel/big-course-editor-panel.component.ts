import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, NgModel } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { log } from 'console';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
interface Lecture {
  _id: Object,
  title: string,
  description: string,
  url: string,
}

interface Module {
  _id: Object,
  name: string,
  description: string,
  lectures: Lecture[]
}

interface Course {
  _id: Object,
  name: string,
  description: string,
  public: boolean,
  thumbnail: string,
  price: number,
  modules: Module[]
}

// module Form component
@Component({
  selector: "module-form",
  standalone: true,
  templateUrl: './module-form.component.html',
  styleUrl: './big-course-editor-panel.component.scss',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, FormsModule, ReactiveFormsModule]
})
export class ModuleFormComponent implements OnInit {
  moduleForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModuleFormComponent>
  ) { }

  ngOnInit(): void {
    this.moduleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.moduleForm.valid) {
      this.dialogRef.close(this.moduleForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

// lecture Form component
@Component({
  selector: "lecture-form",
  standalone: true,
  templateUrl: './lecture-form.component.html',
  styleUrl: './big-course-editor-panel.component.scss',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, FormsModule, ReactiveFormsModule]
})
export class LectureFormComponent implements OnInit {
  lectureForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LectureFormComponent>
  ) { }

  ngOnInit(): void {
    this.lectureForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.lectureForm.valid) {
      this.dialogRef.close(this.lectureForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'app-big-course-editor-panel',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    MatCardModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTableModule,
    NgIf,
    CdkAccordionModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  templateUrl: './big-course-editor-panel.component.html',
  styleUrl: './big-course-editor-panel.component.scss'
})
export class BigCourseEditorPanelComponent {
  // temporary storage variable

  course: Course = {
    _id: {},
    name: 'Java Programming',
    description: 'This is just beginning',
    public: true,
    thumbnail: '',
    price: 1000,
    modules: [
      {
        _id: "1",
        name: "Module 1",
        description: "Desc",
        lectures: [
          {
            _id: "1",
            title: "Lecture 1",
            description: "lecture 1",
            url: "youtube"
          }
        ]
      }
    ]
  };


  selectedModule: Module | null = null;

  courseFormGroup!: FormGroup;
  modulesFormGroup!: FormGroup;
  lectureFormGroup!: FormGroup;
  ngOnInit(): void {
    this.courseFormGroup = this.formBuilder.group({
      courseTitleCtrl: [this.course.name, Validators.required],
      coursePriceCtrl: [this.course.price, Validators.required],
      courseDescriptionCtrl: [this.course.description, Validators.required],
      courseThumbnailCtrl: [this.course.thumbnail, Validators.required],
      coursePublicCtrl: [this.course.public, Validators.required]
    });


    this.courseFormGroup.get('courseTitleCtrl')?.valueChanges.subscribe(newVal => {
      this.course.name = newVal;
    })
    this.courseFormGroup.get('coursePriceCtrl')?.valueChanges.subscribe(newVal => {
      this.course.price = newVal;
    })
    this.courseFormGroup.get('courseDescriptionCtrl')?.valueChanges.subscribe(newVal => {
      this.course.name = newVal;
    })
    this.courseFormGroup.get('courseThumbnailCtrl')?.valueChanges.subscribe(newVal => {
      this.course.thumbnail = newVal;
    })
    this.courseFormGroup.get('coursePublicCtrl')?.valueChanges.subscribe(newVal => {
      this.course.public = newVal;
    })

    this.modulesFormGroup = this.formBuilder.group({});
    this.course.modules.forEach((module, index) => {
      this.addModuleFormGroup(module, index);
    });

    this.lectureFormGroup = this.formBuilder.group({});
    // this.lectures.forEach((lecture, index) => {
    //   this.addLectureFormGroup(lecture, index);
    // });


  }
  // course Overview

  // course tags
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }



  // course thubnail
  imageName: string | ArrayBuffer | null = null;
  imageUrl: string | ArrayBuffer | null = null;


  uploadImage(): void {
    console.log('Image uploaded:', this.imageUrl);
  }
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

  getErrorMessageCourse() {
    if (this.courseFormGroup.hasError('required', ['courseTitleCtrl'])) {
      return "Course title is required";
    }
    else if (this.courseFormGroup.hasError('required', ['coursePriceCtrl'])) {
      return "Course price is required";
    }
    else if (this.courseFormGroup.hasError('required', ['courseThumbnailCtrl'])) {
      return "Course thumbnail is required";
    }
    else if (this.courseFormGroup.hasError('required', ['courseDescriptionCtrl'])) {
      return "Course description is required";
    }
    else {
      return "Some feilds are not filled";
    }
  }



  // Modules
  addModuleFormGroup(module: Module, index: number): void {
    const group: any = {
      moduleNameCtrl: [module.name, Validators.required],
      moduleDescriptionCtrl: [module.description, Validators.required]
    };
    this.modulesFormGroup.addControl(`moduleFormGroupItem${index}`, this.formBuilder.group(group));

    this.modulesFormGroup.get(`moduleFormGroupItem${index}.moduleNameCtrl`)?.valueChanges.subscribe(newVal => {
      this.course.modules[index].name = newVal;
    });
    this.modulesFormGroup.get(`moduleFormGroupItem${index}.moduleDescriptionCtrl`)?.valueChanges.subscribe(newVal => {
      this.course.modules[index].description = newVal;
    });
  }

  deleteModule(module: Module): void {
    const moduleIndex = this.course.modules.findIndex(m => m === module);
    this.course.modules.splice(moduleIndex, 1);

    this.modulesFormGroup.removeControl(`moduleFormGroupItem${moduleIndex}`);

    if (moduleIndex !== -1) {

      // Update the keys of the remaining form groups
      // for (let i = moduleIndex; i < this.modules.length; i++) {
      for (let i = this.course.modules.length - 1; i >= moduleIndex; i--) {
        const control = this.modulesFormGroup.get(`moduleFormGroupItem${i + 1}`);
        if (control) {
          this.modulesFormGroup.removeControl(`moduleFormGroupItem${i + 1}`);
          // this.modulesFormGroup.addControl(`moduleFormGroupItem${i}`, control);
          this.addModuleFormGroup(module, i);
        }
      }
    }
    else {
      console.log("Module not found in the list");
    }

  }

  openModuleDialog() {
    const dialogRef = this.dialog.open(ModuleFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) { // User submitted the form
        const dum: Module = {
          _id: ("" + (this.course.modules.length + 1)),
          name: result.name,
          description: result.description,
          lectures: []
        }
        this.course.modules.push(dum);
        this.addModuleFormGroup(dum, this.course.modules.length - 1);
      }
    });
  }

  getErrorMessageModule(): string {
    let errorMessage = "";

    for (let i = 0; i < this.course.modules.length; i++) {
      const moduleFormGroup = this.modulesFormGroup.get(`moduleFormGroupItem${i}`);

      if (moduleFormGroup && moduleFormGroup.invalid && moduleFormGroup.touched) {
        errorMessage += `${this.course.modules[i].name} is incomplete.`;
      }
    }

    return errorMessage;
  }




  // Videos

  changeLectureFormControl(): void {
    // Remove all existing lecture form controls
    Object.keys(this.lectureFormGroup.controls).forEach(key => {
      this.lectureFormGroup.removeControl(key);
    });

    // Add lecture form controls based on the lectures of the selected module
    if (this.selectedModule) {
      this.selectedModule.lectures.forEach((lecture, index) => {
        this.addLectureFormGroup(lecture, index);
      });
    }
  }


  addLectureFormGroup(lecture: Lecture, index: number): void {
    const group: any = {
      lectureTitleCtrl: [lecture.title, Validators.required],
      lectureDescriptionCtrl: [lecture.description, Validators.required],
      lectureUrlCtrl: [lecture.url, Validators.required]
    };
    const formGroupName = `lectureFormGroupItem${index}`;

    this.lectureFormGroup.addControl(formGroupName, this.formBuilder.group(group));

    this.lectureFormGroup.get(formGroupName)?.valueChanges.subscribe(newVal => {
      if (this.selectedModule) {
        this.selectedModule.lectures[index].title = newVal.lectureTitleCtrl;
        this.selectedModule.lectures[index].description = newVal.lectureDescriptionCtrl;
        this.selectedModule.lectures[index].url = newVal.lectureUrlCtrl;
      }
    });
  }


  // addLecture(lecture: Lecture): void {
  //   const newIndex = this.lectures.length;
  //   this.lectures.push(lecture);
  //   this.addLectureFormGroup(lecture, newIndex);
  // }

  deleteLecture(lecture: Lecture): void {
    if (this.selectedModule) {

      const lectureIndex = this.selectedModule?.lectures.findIndex(l => l === lecture);
      this.selectedModule?.lectures.splice(lectureIndex, 1);

      this.lectureFormGroup.removeControl(`lectureFormGroupItem${lectureIndex}`);

      if (lectureIndex !== -1) {

        for (let i = this.selectedModule.lectures.length - 1; i >= lectureIndex; i--) {
          const control = this.lectureFormGroup.get(`lectureFormGroupItem${i + 1}`);
          if (control) {
            this.lectureFormGroup.removeControl(`lectureFormGroupItem${i + 1}`);
            this.addLectureFormGroup(lecture, i);
          }
        }
      }
    }
    else {
      console.log("Lecture/Module not found in the list");
    }
  }

  openLectureDialog() {
    const dialogRef = this.dialog.open(LectureFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && this.selectedModule) { // User submitted the form
        const dum: Lecture = {
          _id: ("" + (this.course.modules.length + 1)),
          title: result.title,
          description: result.description,
          url: result.url
        }
        this.selectedModule.lectures.push(dum);

        this.addLectureFormGroup(dum, this.selectedModule.lectures.length - 1);
      }
    });
  }





  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    breakpointObserver: BreakpointObserver,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }


  submitCourseDetails() {

    if (this.courseFormGroup.valid && this.modulesFormGroup.valid && this.lectureFormGroup.valid) {
      console.log(JSON.stringify(this.course, null, 4));
    }

  }
}
