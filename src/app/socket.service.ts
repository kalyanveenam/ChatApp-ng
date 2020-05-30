import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public baseUrl = "https://chatapi.edwisor.com";
  private socket;

  constructor(public http: HttpServiceService) {
    this.socket = io(this.baseUrl);
  }
  public verifyUser = () => {

    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      })//end socket
    })//end Observable
  }//end verifyUser
  public onlineUserList = () => {

    return Observable.create((observer) => {
      this.socket.on('online-user-list', (data) => {
        observer.next(data)
      })
    })
  }
  public disconnectUser = () => {
    return Observable.create((observer) => {
      this.socket.on('disconnect', () => {
        observer.next()
      })
    })
  }

  public setUser = (data) => {
    this.socket.emit('set-user', data)
  }
  public chatByUserId = (userId) => {
    return Observable.create((observer) => {
      this.socket.on(userId, (data) => {
        observer.next(data);

      })
    })
  }
  public sendChatMessage = (chatMessageObject) => {
    this.socket.emit('chat-msg', chatMessageObject)
  }
  public markChatAsSeen = (userDetails) => {
    this.socket.emit('mark-chat-as-seen', userDetails)
  }


}
