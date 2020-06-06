import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { SocketService } from 'src/app/socket.service';
import { HttpServiceService } from 'src/app/http-service.service';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { ToastrService, Toast } from 'ngx-toastr';


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
  public messageList = [];// maintains list of messages
  public disconnectedSocket: boolean
  public loadingPreviousChat: boolean
  public messageText: any;
  public pageValue: number = 1;
  constructor(public socketservice: SocketService, public HttpServiceService: HttpServiceService, public router: Router, public toastr: ToastrService, ) { }
  reieverId = Cookie.get('receiverId');
  recieverName = Cookie.get('receiverName');


  ngOnInit(): void {

    this.authToken = Cookie.get('authtoken');
    this.userInfo = this.HttpServiceService.getLocalStorageItem();

    console.log(this.userInfo)

    this.recieverId = Cookie.get("receiverId");

    this.receiverName = Cookie.get('receiverName');
    if (this.recieverId != null && this.recieverId != undefined && this.recieverId != '') {
      this.userSelectedToChat(this.recieverId, this.receiverName)
    }

    this.checkStatus();

    this.verifyUserConfirmation();
    this.getOnlineUserList()

    this.getMessageFromUser()
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
  //enables user to send message by enter key press
  //if there is message, it calls sendMessage fn

  //sending chat message code starts here
  public sendMessageUsingKeyPress = (event: any) => {

    if (event.keyCode === 13) {
      this.sendMessage()
    }
  }
  public sendMessage = () => {
    console.log('Entered sendMessage');
    if (this.messageText) {
      let chatMessageObject = {
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: Cookie.get('recieverName'),
        receiverId: Cookie.get('recieverId'),

        message: this.messageText,
        createdOn: new Date()
      }
      console.log('This is going to create a message :')
      console.log(chatMessageObject)
      this.socketservice.sendChatMessage(chatMessageObject);
      this.pushToChatWindow(chatMessageObject);
    }
    else {
      this.toastr.warning('No messages available')

    }

  }
  public pushToChatWindow = (data) => {
    this.messageText = '';
    console.log("data->" + data);
    console.log(data);
    this.messageList.push(data);
    console.log("messageList:" + this.messageList);
    console.log(this.messageList);
    //this.scrollToChatTop = false;

  }
  //sending chat message code ends here

  //recieving chat message code starts here
  public getMessageFromUser = () => {
    this.socketservice.chatByUserId(this.userInfo.userId).subscribe((data) => {
      console.log("recieverID:" + this.recieverId)
      this.recieverId == data.userId ? this.messageList.push(data) : '';
      this.toastr.success(data.senderName + ' says ' + data.message);
      // this.scrollToTop = false;
    })
    //recieving chat message code ends here


  }

  //set user as active
  public userSelectedToChat = (id, name) => {

    this.userList.map((user) => {
      if (user.userId == id) {
        user.chatting = true;
      }
      else {
        user.chatting = false;
      }
      console.log("isUserSelected:" + user.chatting)
    })
    Cookie.set('recieverId', id)
    Cookie.set('recieverName', name)
    console.log("recieverID Seleted:" + id);
    console.log("Reciever Name Seleted:" + name);
    this.recieverId = id;
    this.recieverName = name;
    this.messageList = [];
    //  this.pageValue = 0;
    let chatDetails = {
      userId: this.userInfo.userId,
      senderId: id
    }

    this.socketservice.markChatAsSeen(chatDetails)
    this.getPreviousChatWithUser()
  }
  public getPreviousChatWithUser = () => {
    console.log(this.messageList.length)
    let previousData = (this.messageList.length > 0 ? this.messageList.slice() : [])
    this.HttpServiceService.getChat(this.userInfo.userId, this.recieverId, this.pageValue * 10).subscribe(
      (apiResponse) => {
        if (apiResponse.status == 200) {
          console.log(apiResponse)
          this.messageList = apiResponse.data.concat(previousData);
        }
        else {
          console.log(apiResponse)
          this.messageList = previousData;
          this.toastr.warning('No messages to display')
        }
        this.loadingPreviousChat = false;
      }
    )
  }
  public loadEarlierMessagesOfChat: any = () => {
    this.loadingPreviousChat = true;
    this.pageValue++;
    this.getPreviousChatWithUser();
  }

}
