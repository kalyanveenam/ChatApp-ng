import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { SocketService } from 'src/app/socket.service';
import { HttpServiceService } from 'src/app/http-service.service';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {
  public authToken;
  public userInfo; //stored in local storage
  public recieverId; //stored in cookie
  public receiverName;//stored in cookie
  public userList = [];//stores list of users
  public disconnectedSocket: boolean


  constructor(public socketservice: SocketService, public HttpServiceService: HttpServiceService, public router: Router) { }
  reieverId = Cookie.get('receiverId');
  recieverName = Cookie.get('receiverName');


  ngOnInit(): void {

    this.authToken = Cookie.get('authtoken');
    this.userInfo = this.HttpServiceService.getLocalStorageItem();

    console.log(this.userInfo)

    this.checkStatus();
    this.getOnlineUserList();
    this.verifyUserConfirmation();


  }
  checkStatus = () => {
    console.log('inside check status')
    if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === null || Cookie.get('authtoken') === '') {

      this.router.navigate(['/']);
      return false;
    }
    else {
      return true;
    }
  }
  verifyUserConfirmation: any = () => {
    console.log('inside verify user conf status')
    this.socketservice.verifyUser().subscribe((data) => {
      this.disconnectedSocket = false;
      this.socketservice.setUser(this.authToken);
      this.getOnlineUserList();
    })

  }
  getOnlineUserList = () => {
    console.log('inside get user list')
    this.socketservice.onlineUserList().subscribe((user) => {

      this.userList = [];
      for (let x in user) {
        let tmp = { 'user': x, 'name': user[x], 'unread': 0, 'chatting': false }
        this.userList.push(tmp);
      }
      console.log(this.userList)
    })
  }
}


