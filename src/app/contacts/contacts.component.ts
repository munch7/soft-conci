import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule, // Import CommonModule for ngClass and other common directives
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  yourFormGroup: FormGroup;
  isLoading = false;
  submissionSuccess: boolean | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.yourFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.yourFormGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.submissionSuccess = null;
    const formData = {
      ...this.yourFormGroup.value,
      timestamp: new Date().toISOString()
    };

    const firebaseUrl = 'https://softconci-default-rtdb.europe-west1.firebasedatabase.app/form-data.json';

    this.http.post(firebaseUrl, formData)
      .subscribe(
        (response) => {
          console.log('Form Data submitted successfully:', response);
          this.yourFormGroup.reset();
          this.isLoading = false;
          this.submissionSuccess = true;
        },
        (error) => {
          console.error('Error submitting form data:', error);
          this.isLoading = false;
          this.submissionSuccess = false;
        }
      );
  }
}
