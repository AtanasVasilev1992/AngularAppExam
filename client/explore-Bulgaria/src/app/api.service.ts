import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Place } from './types/place';
import { Museum } from './types/museum';

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
    return this.http.post<Place>(`${this.apiUrl}/data/places`, payload);
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
    return this.http.get<Place>(`${this.apiUrl}/data/places/${id}`);
  }

  getMuseum(id: string) {
    return this.http.get<Place>(`${this.apiUrl}/data/museums/${id}`);
  }
}
