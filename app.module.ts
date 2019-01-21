import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { ContactComponent } from './contact/contact.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { environment } from '../environments/environment';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './auth-guard-service';
import { AuthService } from './auth-service';
import { HomeComponent } from './home/home.component';

const appRoutes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'messages',
    canActivate: [AuthGuard],
    component: MessagesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    MessagesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
