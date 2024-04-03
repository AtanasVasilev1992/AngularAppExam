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
    const { apiUrl } = environment;

    return this.http.get<Place[]>(`${apiUrl}/places`);
  }

  createPlace(
    name: string,
    image: string,
    country: string,
    city: string,
    description: string,
    workTime: string
  ) {
    const payload = { name, image, country, city, description, workTime };
    return this.http.post<Place>('/api/places', payload);
  }

  getMuseums() {
    const { apiUrl } = environment;

    return this.http.get<Museum[]>(`${apiUrl}/museums`);
  }

  getPlace(id: string) {
    const { apiUrl } = environment;

    return this.http.get<Place>(`${apiUrl}/places/${id}`);
  }
}
