import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  posts: any[] = [];

  ngOnInit() {
    this.getFormData();
  }

  constructor(private http: HttpClient){}
  
  getFormData() {
    this.http.get('https://softconci-default-rtdb.europe-west1.firebasedatabase.app/form-data.json')
      .subscribe((data: any) => {
        console.log('Form data retrieved successfully:', data);

        // Check if data is an object, and extract values if needed
        if (data && typeof data === 'object') {
          this.posts = Object.values(data);
        } else {
          this.posts = data || [];
        }
      });
  }
  
}