import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model'; // Ensure the model is updated

const baseUrl = 'http://localhost:8083/Blogs';  // Your Spring Boot API URL

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  // Get all tutorials
  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  // Get a tutorial by ID
  get(id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  }

  // Create a new tutorial
  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add`, data);  // Updated URL to include "/add"
  }


  // Update an existing tutorial
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // Delete a tutorial by ID
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // Delete all tutorials
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  // Find tutorials by title
  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }


  findByCategory(category: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}/category/${category}`);
  }

  // Advanced search with keyword
  searchBlogs(keyword: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}/search?keyword=${keyword}`);
  }
}
