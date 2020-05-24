import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
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
  constructor(public http: HttpServiceService) { }
  ngOnInit(): void {
  }
  public signupVerify() {
    if (!this.firstName) {
      alert('please enter first name')

    }
    if (!this.lastName) {
      alert('please enter first name')

    }
    if (!this.email) {
      alert('please enter first name')

    }
    if (!this.mobileNumber) {
      alert('please enter first name')

    }
    if (!this.password) {
      alert('please enter first name')

    }
    if (!this.apiKey) {
      alert('please enter first name')

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
          alert('user is created successfully')

        },
        error => {
          console.log('error');

        }

      )
    }
  }
}
