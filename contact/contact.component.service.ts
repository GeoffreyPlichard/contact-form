import { Injectable } from '@angular/core';
import { Message } from './contact.component.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
    providedIn: 'root'
})

export class ContactService {
    private basePath: string = 'messages';
    messages: AngularFirestoreCollection<Message>;

    constructor(private db: AngularFirestore) {
        this.messages = this.db.collection<Message>(this.basePath);
    }

    addMessage(message: Message) {
        return this.messages.add(message);
    }

    getMessages() {
        return this.messages;
    }
}