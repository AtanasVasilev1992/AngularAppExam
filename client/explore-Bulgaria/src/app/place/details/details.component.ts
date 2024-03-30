import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Place } from 'src/app/types/place';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  place = {} as Place;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      const id = data['placeId'];
  
      this.apiService.getPlace(id).subscribe((place) => {
        this.place = place;
        console.log('Thsi must be a place',place);
        
      });
    });
  }
}
