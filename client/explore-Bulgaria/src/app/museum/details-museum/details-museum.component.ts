import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Museum } from 'src/app/types/museum';

@Component({
  selector: 'app-details-museum',
  templateUrl: './details-museum.component.html',
  styleUrls: ['./details-museum.component.css']
})
export class DetailsMuseumComponent implements OnInit {
  museum = {} as Museum;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      const id = data['museumId'];
  
      this.apiService.getMuseum(id).subscribe((museum) => {
        this.museum = museum;
        console.log('This must be a place',museum);

      });

      // this.apiService.delete(id)
    });
}
}
