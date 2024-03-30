
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Place } from './types/place';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  getHome() {
    const { apiUrl } = environment

    return this.http.get<Place[]>(`${apiUrl}places`);
  }
  
  
  getPlace(id:string) {
    const { apiUrl }  = environment;

    return this.http.get<Place>(`${apiUrl}places/${id}`)
  }
}
