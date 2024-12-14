import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Place } from './types/place';
import { Museum } from './types/museum';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getHome() {
    return this.http.get<Place[]>(`${this.apiUrl}/data/places`);
  }

  createPlace(
    name: string,
    image: string,
    city: string,
    description: string,
    workTime: string
  ) {
    const payload = { name, image, city, description, workTime };
    
    return this.http.post<Place>(`${this.apiUrl}/data/places`, payload).pipe(
      tap((response: any) => console.log('Created place:', response))
    );
  }

  createMuseum(
    name: string,
    image: string,
    city: string,
    description: string,
    workTime: string
  ) {
    const payload = { name, image, city, description, workTime };
    return this.http.post<Museum>(`${this.apiUrl}/data/museums`, payload);
  }

 
  getMuseums() {
    return this.http.get<Museum[]>(`${this.apiUrl}/data/museums`);
  }

  getPlace(id: string) {
    return this.http.get<Place>(`${this.apiUrl}/data/places/${id}`).pipe(
      tap(response => console.log('Fetched place:', response))
    );
  }

  getMuseum(id: string) {
    return this.http.get<Place>(`${this.apiUrl}/data/museums/${id}`);
  }

  deletePlace(id: string) {
    return this.http.delete<Place>(`${this.apiUrl}/data/places/${id}`);
  }
  
  deleteMuseum(id: string) {
    return this.http.delete<Museum>(`${this.apiUrl}/data/museums/${id}`);
  }
  
  editPlace(
    id: string,
    name: string,
    image: string,
    city: string,
    description: string,
    workTime: string
  ) {
    const payload = { name, image, city, description, workTime };
    return this.http.put<Place>(`${this.apiUrl}/data/places/${id}`, payload);
  }
  
  editMuseum(
    id: string,
    name: string,
    image: string,
    city: string,
    description: string,
    workTime: string
  ) {
    const payload = { name, image, city, description, workTime };
    return this.http.put<Museum>(`${this.apiUrl}/data/museums/${id}`, payload);
  }
}
