import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Place } from 'src/app/types/place';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  isLoading = true
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getHome().subscribe((places) => {
     
      this.places = places;
      setTimeout(()=>{
        this.isLoading = false;
      },1000)
    });
  }
}
