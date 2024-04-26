import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CustomSnackComponent } from '../../../components/popups/custom-snack/custom-snack.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HttpClientModule, FormsModule, MatProgressSpinner, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName = "";
  password = "";

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {

  }

  // ngOnInit(): void {
  //   this.sendUserDetails();
  // }

  isLoading: boolean = false;
  isLogging: boolean  = false;

  sendUserDetails(event: Event) {
    this.isLoading = true;
    this.isLogging = true;
    event.preventDefault();
    console.log({
      userName: this.userName,
      password: this.password
    });

    this.http.post('https://atomic-marjie-openlearn.koyeb.app/auth/login', {
      userName: this.userName,
      password: this.password
    }, { withCredentials: true }).subscribe((res: any) => {
      
      if (res.ok) {

        this._snackBar.openFromComponent(CustomSnackComponent, {
          duration: 3000,
          data: {message: res.message, snackType: "success"}
        });
        
        setTimeout(() => {
          window.location.href = '/';
          // this.isLogging = false;
        }, 3000);
      }
      else {
        this._snackBar.openFromComponent(CustomSnackComponent, {
          duration: 2000,
          data: {message: res.message, snackType: "warn"}
        });
        this.isLogging = false;
      }
      this.isLoading = false;
      console.log(res);

    }, (error: HttpErrorResponse) => {
      
      this._snackBar.openFromComponent(CustomSnackComponent, {
        duration: 2000,
        // data: {message: "Login Failed: Wrong username/password", snackType: "error"}
        data: {message: error.error.message, snackType: "error"}
      });
      this.isLoading = false;
      this.isLogging = false;
    });
  }
}