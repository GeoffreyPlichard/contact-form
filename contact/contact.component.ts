import { Component, OnInit } from '@angular/core';
import  { FormGroup, FormBuilder, Validators, FormControl } from  '@angular/forms'; 
import  { Observable } from  'rxjs';
import { ContactService } from './contact.component.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;
  public responseMessage: string;
  public loading: boolean = false;

  public validationMessages = {
    'name': [
      { type: 'required', message: 'Veuillez entrer un nom' },
      { type: 'minlength', message: 'Le nom doit comporter au moins 2 caractères' },
      { type: 'maxlength', message: 'Le nom ne doit pas comporter plus de 20 caractères' },
      { type: 'pattern', message: 'Votre nom doit comporter uniquement des lettres' }
    ],
    'email': [
      { type: 'required', message: 'Veuillez entrer un email' },
      { type: 'pattern', message: 'Veuillez entrer un email valide' }
    ],
    'subject': [
      { type: 'required', message: 'Veuillez entrer un objet' },
      { type: 'minlength', message: 'L\'objet doit comporter au moins 5 caractères' },
      { type: 'maxlength', message: 'L\'objet ne doit pas comporter plus de 20 caractères' }
    ]
  }


  constructor(private fb: FormBuilder, 
              public contactService: ContactService, 
              private db: AngularFirestore) { }

  ngOnInit() {
    this.initContactForm();
  }
  
  initContactForm() {
    this.contactForm = this.fb.group({
      contactFormName: [
        '', 
        Validators.compose(
          [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]
        )],
      contactFormEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      contactFormSubject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      contactFormMessage: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get contactFormName() {
    return this.contactForm.get('contactFormName');
  }

  get contactFormEmail() {
    return this.contactForm.get('contactFormEmail');
  }

  get contactFormSubject() {
    return this.contactForm.get('contactFormSubject');
  }

  get contactFormMessage() {
    return this.contactForm.get('contactFormMessage');
  }

  resetForm() {
    this.contactForm.reset();
  }

  onSubmit() {
    this.loading = true;
    this.contactService.addMessage(this.contactForm.value).then(() => {
      this.responseMessage = "Votre message a bien été envoyé";
      this.loading = false;
    }).catch((error) => {
      this.responseMessage = "Une erreur est survenue";
      this.loading = false;
    });
    // this.contactForm.reset();
  }

  

}
