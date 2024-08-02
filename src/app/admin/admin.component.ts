import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getFormData();
  }

  getFormData() {
    this.http.get('https://softconci-default-rtdb.europe-west1.firebasedatabase.app/form-data.json')
      .subscribe((data: any) => {
        console.log('Form data retrieved successfully:', data);
  
        if (data && typeof data === 'object') {
          this.posts = Object.values(data);
  
          // Check for the presence and validity of timestamp
          this.posts.forEach(post => {
            if (post.timestamp) {
              const date = new Date(post.timestamp);
              if (!isNaN(date.getTime())) {
                post.timestamp = date.toISOString(); // Ensure the format is consistent
              } else {
                console.warn('Invalid date format:', post.timestamp);
                post.timestamp = new Date().toISOString(); // Assign current date as fallback
              }
            } else {
              console.warn('Missing timestamp field:', post);
              post.timestamp = new Date().toISOString(); // Assign current date as fallback
            }
          });
  
          // Sort posts by date if timestamp is valid
          this.posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        } else {
          this.posts = data || [];
        }
  
        console.log('Posts:', this.posts); // Debugging line to check posts
      });
  }
  
}
