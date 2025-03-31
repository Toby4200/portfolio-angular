import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectsResponse } from '../types/project.interface';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private baseUrl: string = 'https://grant-api.tobybabin.site/api';
  // read only
  private apiToken: string = '';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `bearer ${this.apiToken}`,
    });
  }

  getProjects(): Observable<ProjectsResponse> {
    return this.get<ProjectsResponse>('projects?populate=*');
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders(),
    });
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders(),
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }
}
