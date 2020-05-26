import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule,
    RouterModule.forChild([
      { path: 'signup', component: SignupComponent }
    ])
  ]
})
export class UserModule { }
