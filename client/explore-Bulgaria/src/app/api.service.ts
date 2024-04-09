import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Place } from './types/place';
import { Museum } from './types/museum';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getHome() {
    return this.http.get<Place[]>(`/api/places`);
  }

  createPlace(
    name: string,
    image: string,
    city: string,
    description: string,
    workTime: string
  ) {
    const payload = { name, image, city, description, workTime };
    return this.http.post<Place>('/api/places/create', payload);
  }

 
  getMuseums() {
    return this.http.get<Museum[]>(`/api/museums`);
  }

  getPlace(id: string) {
    return this.http.get<Place>(`/api/places/${id}`);
  }

  getMuseum(id: string) {
    return this.http.get<Place>(`/api/museums/${id}`);
  }
}
