import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { log } from 'console';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private http: HttpClient) { }
  logoImage = "/assets/img/logo.png";
  isuserLoggedIn = false;
  navbarLinks = [
    { link: '/', name: 'Home' },
    { link: '/explore', name: 'Explore' },
    { link: '/progress', name: 'Progress' },
    { link: '/about', name: 'About' },
    { link: '/docs', name: 'Docs' },
  ];
  profileFloatingNavigation = [
    { link: '/user/0', name: 'Profile' },
    { link: '/videoForm', name: 'Create' },
    { link: '/settings', name: 'Settings' },
  ]
  toggleprofile = false;

  isNavbarOpen = false;

  cookies: string = "";

  ngOnInit(): void {
    this.checkCookie().subscribe((res: any) => {
      if (res.ok) {
        console.log('cookies found!');
        this.profileFloatingNavigation[0].link = '/user/'+res.userName;
        console.log(res);
        
        this.isuserLoggedIn = true;
      } else {
        console.log('cookies not found!');
        // window.location.href = '/login';   // this is infinite loop donot uncomment
      }
    });
  }

  private handleError(error: HttpErrorResponse):any {
    // do nothing for now
    
    return of([]);
  }

  checkCookie(): Observable<any> {
    return this.http.get('http://localhost:5000/auth/is-valid-Cookie', { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleprofilefunc() {
    this.toggleprofile = !this.toggleprofile;
  }

  logout() {
    this.http.post('http://localhost:5000/auth/logout', {}, { withCredentials: true }).subscribe((res: any) => {
      if (!res.ok) {
        return;
      }
      window.location.href = '/login';
      console.log(res);
    });
  }
}
