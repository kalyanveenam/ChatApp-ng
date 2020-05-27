import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  public email;
  public password;
  constructor(public http: HttpServiceService, public toastr: ToastrService, public router: Router) { }



  ngOnInit(): void {
  }
  public signInVerify() {
    if (!this.email || !this.password) {
      this.toastr.error('Please fill all the mandatory fields')
    }
    else {
      let params = {
        email: this.email,
        password: this.password
      }

      console.log('params')
      console.log(params)
      this.http.getUserSignIn(params)
        .subscribe(response => {
          if (response.status === 200) {
            this.toastr.success('User is logged in Successfully')
            this.router.navigate(['chat']);

            console.log(response.data.authToken)

            Cookie.set('authtoken', response.data.authToken);
            Cookie.set('receiverId', response.data.userDetails.userId);
            Cookie.set('receiverName', response.data.userDetails.firstName + ' ' + response.data.userDetails.lastName);
            this.http.setLocalStorage(response.data.userDetails)

          }
        }
        )
    }
  }

}
