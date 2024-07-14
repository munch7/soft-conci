import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  yourFormGroup: FormGroup;
  posts: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.yourFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // corrected 'emai' to 'email'
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {
    const formData = this.yourFormGroup.value;
    this.http.post('https://softconci-default-rtdb.europe-west1.firebasedatabase.app/form-data.json', formData)
      .subscribe(
        (response) => {
          console.log('Form Data submitted successfully:', response);
          this.yourFormGroup.reset();
        },
        (error) => {
          console.error('Error submitting form data:', error);
        }
      );
  }
}
