import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Place } from './types/place';
import { Museum } from './types/museum';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getPlaces() {
    return this.http.get<Place[]>(`${this.apiUrl}/data/places`);
  }

  getMuseums() {
    console.log('Fetching museums...');
    return this.http.get<Museum[]>(`${this.apiUrl}/data/museums`).pipe(
      tap(response => console.log('Museums response:', response)),
      catchError(error => {
        console.error('Error fetching museums:', error);
        return throwError(() => error);
      })
    );
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

    return this.http.post<Museum>(`${this.apiUrl}/data/museums`, payload).pipe(
      tap((response: any) => console.log('Created museum:', response))
    );
  }

  getPlace(id: string) {
    return this.http.get<Place>(`${this.apiUrl}/data/places/${id}`).pipe(
      tap(response => console.log('Fetched place:', response))
    );
  }

  getMuseum(id: string) {
    console.log('Fetching museum with id:', id);
    return this.http.get<Museum>(`${this.apiUrl}/data/museums/${id}`).pipe(
      tap(museum => console.log('Museum data received:', museum)),
      catchError(error => {
        console.error('Error fetching museum:', error);
        return throwError(() => error);
      })
    );
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
