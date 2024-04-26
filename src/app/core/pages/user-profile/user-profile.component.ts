import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  constructor(private http : HttpClient,private route: ActivatedRoute){}
  totalCourses = 0;
  
  data : any = {
    fullName: "",
	  userName: "",
	  platformFollowers: 0,
	  social: [],
	  courses: [],
    owner:false,
  };
  
  parameter:any = this.route.snapshot.params["userName"];
  
  ngOnInit(): void {
    console.log(this.parameter);
    this.http.get(`https://atomic-marjie-openlearn.koyeb.app/auth/get-user-details/${this.parameter}`,{withCredentials:true}).subscribe((res : any )=>{
     console.log(res);
     this.totalCourses = res?.courses?.length;
     if(!this.totalCourses) this.totalCourses = 0;
      this.data = res;
  })
    

  }
}
