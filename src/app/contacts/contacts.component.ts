import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  yourFormGroup: FormGroup;
  isLoading = false;
  submissionSuccess: boolean | null = null;
  entries: { name: string, message: string }[] = [];

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

  ngOnInit() {
    this.fetchRandomEntries();
  }

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
          this.fetchRandomEntries(); // Refresh the random entries after submission
        },
        (error) => {
          console.error('Error submitting form data:', error);
          this.isLoading = false;
          this.submissionSuccess = false;
        }
      );
  }

  fetchRandomEntries() {
    const firebaseUrl = 'https://softconci-default-rtdb.europe-west1.firebasedatabase.app/form-data.json';

    this.http.get<{ [key: string]: { name: string, message: string } }>(firebaseUrl)
      .subscribe(
        (response) => {
          const entriesArray = Object.values(response);
          this.entries = this.getRandomEntries(entriesArray, 3);
        },
        (error) => {
          console.error('Error fetching entries:', error);
        }
      );
  }

  getRandomEntries(array: { name: string, message: string }[], count: number) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
