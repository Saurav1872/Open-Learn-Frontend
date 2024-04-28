import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
    // this.checkCookie().subscribe((res: any) => {
    //   if (res.ok) {
    //     console.log('cookies found!');
    //     this.profileFloatingNavigation[0].link = '/user/'+res.userName;
    //     console.log(res);

    //     this.isuserLoggedIn = true;
    //   } else {
    //     console.log('cookies not found!');
    //     // window.location.href = '/login';   // this is infinite loop donot uncomment
    //   }
    // });

    this.http.get('https://atomic-marjie-openlearn.koyeb.app/auth/is-valid-Cookie', { withCredentials: true }).subscribe(
      (res: any) => {
        if (res.ok) {
          console.log('cookies found!');
          this.profileFloatingNavigation[0].link = '/user/' + res.userName;
          console.log(res);

          this.isuserLoggedIn = true;
        } else {
          console.log('cookies not found!');
          // window.location.href = '/login';   // this is infinite loop donot uncomment
        }
      }, (error:HttpErrorResponse) => {
        // do nothing
      }
    )
  }

  private handleError(error: HttpErrorResponse): any {
    // do nothing for now

    return of([]);
  }

  checkCookie(): Observable<any> {
    return this.http.get('https://atomic-marjie-openlearn.koyeb.app/auth/is-valid-Cookie', { withCredentials: true }).pipe(
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
    this.http.post('https://atomic-marjie-openlearn.koyeb.app/auth/logout', {}, { withCredentials: true }).subscribe((res: any) => {
      if (!res.ok) {
        return;
      }
      window.location.href = '/login';
      console.log(res);
    });
  }
}
