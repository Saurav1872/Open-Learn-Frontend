import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { error } from 'console';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';



@Component({
  selector: 'app-course-visit',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterLink, MarkdownModule],
  templateUrl: './course-visit.component.html',
  styleUrl: './course-visit.component.scss'
})
export class CourseVisitComponent implements OnInit {
  constructor(private http: HttpClient,private route: ActivatedRoute){}
  courseData:any = {};
  nowEnroled = false;
  id = this.route.snapshot.params['id'];
  courseVideoLink = '/coursePlayer/'+this.id;
  ngOnInit() {
   
    this.http.get(`https://atomic-marjie-openlearn.koyeb.app/api/v1/video-url/${this.id}/video-details`,{withCredentials:true}).subscribe((res:any)=>{
      if(res.ok){
        this.courseData=res.info;
      }
      console.log(res);
      
      this.nowEnroled = res.isEnrolled;

      
        
    }, (error:HttpErrorResponse) => {
      // console.log(error.error.message);
    })
  }
  EnrollCourse(){
    this.http.put<any>(`https://atomic-marjie-openlearn.koyeb.app/auth/enroll/${this.id}`, {}, { withCredentials: true }).subscribe((res:any)=>{
        if(!res.ok){
          return ;
        }
        console.log(res);
        
        this.nowEnroled = true;

        
    }, (error:HttpErrorResponse) => {
      
    })

  }
  

}

