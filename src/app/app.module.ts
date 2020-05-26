import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { HttpServiceService } from './http-service.service';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ChatModule,
    UserModule,
    HttpClientModule,
    RouterModule.forRoot([

      { path: 'login', component: SigninComponent, pathMatch: 'full' },
      { path: '', component: SigninComponent, pathMatch: 'full' },
      { path: '*', component: SigninComponent },
      { path: '**', component: SigninComponent }




    ])
  ],
  providers: [HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
