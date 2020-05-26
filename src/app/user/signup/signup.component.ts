import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName;
  public lastName;
  public email;
  public mobileNumber;
  public password;
  public apiKey;
  constructor(public http: HttpServiceService, public toastr: ToastrService, public router: Router) { }
  ngOnInit(): void {
  }
  public signupVerify() {
    if (!this.firstName || !this.lastName || !this.email || !this.mobileNumber || !this.password || !this.apiKey) {
      this.toastr.warning('Mandatory fields are missing')

    }

    else {
      let userData = {
        'firstName': this.firstName,
        'lastName': this.lastName,
        'email': this.email,
        'mobileNumber': this.mobileNumber,
        'password': this.password,
        'apiKey': this.apiKey

      }
      this.http.createUser(userData).subscribe(
        data => {
          console.log(data)
          this.toastr.success('User is created Successfully')
          this.toastr.show('Taking you to Sign in page')
          this.router.navigate(['/']);

        },
        error => {
          console.log('error');

        }

      )
    }
  }
}
