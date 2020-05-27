import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public baseUrl = "https://chatapi.edwisor.com/api/v1/users";
  private socket;
  constructor() {
    this.socket = io(this.baseUrl);
  }
  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data)
      })
    })
  }
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

}
