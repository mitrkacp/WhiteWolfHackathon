import { Component, OnInit } from '@angular/core';
import {ConversationServices} from '../services/conversationServices';
import {ActivatedRoute} from '@angular/router';
import {Conv} from '../data/conv';

@Component({
  selector: 'app-chat-doctor',
  templateUrl: './chat-doctor.component.html',
  styleUrls: ['./chat-doctor.component.css']
})
export class ChatDoctorComponent  {

  private value = '';
  private chatMessage = '';
  messages = [];
  private id: string;
  private sentByDoctor = true;
  private animals;

  constructor(private conversationServices: ConversationServices, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (!this.id) {
        conversationServices.getNewConversationId().subscribe(
          ob => {
            this.id = ob.id + '';
            this.animals = ob.name;
            this.getMessages(this.id);
          });
      }
      this.getMessages(this.id);
    });
  }

  getMessages(id) {
    this.conversationServices.getChatMessages(id).subscribe(msg => {
      this.messages = [];
      msg.forEach(m => this.messages.push(m));
    });
  }

  sendMessage(message) {
    if (message.length > 0) {
      this.conversationServices.addNewMessage(message, this.id, this.sentByDoctor).subscribe(
        asd => {
          this.getMessages(this.id);
        }
      );
      this.chatMessage = '';
    }
  }

}
