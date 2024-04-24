import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { CustomSnackComponent } from '../../../components/popups/custom-snack/custom-snack.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, HttpClientModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
// export class SignupComponent implements OnInit{
export class SignupComponent {

  public fullName = "";
  userName = "";
  email = "";
  password = "";

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {

  }

  // ngOnInit(): void {
  //   this.sendUserDetails();
  // }

  isLoading: boolean = false;
  isSigning: boolean = false;

  sendUserDetails(event: Event) {
    this.isLoading = true;
    this.isSigning = true;
    event.preventDefault();
    console.log({
      fullName: this.fullName,
      userName: this.userName,
      email: this.email,
      password: this.password
    });

    this.http.post('http://localhost:5000/auth/register', {
      fullName: this.fullName,
      userName: this.userName,
      email: this.email,
      password: this.password
    }, { withCredentials: true }).subscribe((res: any) => {
      if (res.ok) {
        // window.location.href = '/';
        this._snackBar.openFromComponent(CustomSnackComponent, {
          duration: 3000,
          data: {message: res.message, snackType: "success"}
        });
        
        // Use Router for programmatic redirection with timeout
        setTimeout(() => {
          window.location.href = '/';
          // this.isSigning = false;
        }, 3000);
      }
      else {
        this._snackBar.openFromComponent(CustomSnackComponent, {
          duration: 2000,
          data: {message: res.message, snackType: "warn"}
        });
        this.isSigning = false;
      }
      this.isLoading = false;
      console.log(res);
      // Handle response as needed
    }, (error: HttpErrorResponse) => {
      this._snackBar.openFromComponent(CustomSnackComponent, {
        duration: 2000,
        data: {message: error.error.message, snackType: "error"}
      });
      this.isLoading = false;
      this.isSigning = false;
    });

  }


}