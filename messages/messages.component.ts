import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact/contact.component.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public messageList;
  public loading: boolean = true;
  constructor(public contactService: ContactService, private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('messages').valueChanges().subscribe((value) => {
      this.loading = false;
      this.messageList = value;
    });
  }



}
