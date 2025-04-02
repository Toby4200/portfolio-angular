import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectsResponse, Project } from '../types/project.interface';

export interface SingleProjectResponse {
  data: Project;
  meta: {};
}

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private baseUrl: string = 'https://grant-api.tobybabin.site/api';
  // read only
  private apiToken: string =
    '46dbcb1b929c070f09453f1672fdbf61f287abdeeaff92409ea4bee2980af2bf2bb9278ca4c5eb329e03b0283489a9d46e26602e96ff025d0c5f60c5275624581355d3efa8433c21e0ab7c6d02c6ada37f74c68e1812f949537710cf4404e3410f81818cdd55c1fb057c691dedc93c8f3874a651a51429805aeda84a2572421d';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `bearer ${this.apiToken}`,
    });
  }

  getProjects(): Observable<ProjectsResponse> {
    return this.get<ProjectsResponse>('projects?populate=*');
  }

  getProject(id: string): Observable<SingleProjectResponse> {
    return this.get<SingleProjectResponse>(`projects/${id}?populate=*`);
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
