import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChatBoxComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'chat', component: ChatBoxComponent }
    ])
  ]
})
export class ChatModule { }
