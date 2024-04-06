import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Museum } from 'src/app/types/museum';

@Component({
  selector: 'app-museums',
  templateUrl: './museums.component.html',
  styleUrls: ['./museums.component.css']
})
export class MuseumsComponent implements OnInit {
  museums: Museum[] = [];
  isLoading = true
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getMuseums().subscribe((museums) => {
     
      this.museums = museums;
      setTimeout(()=>{
        this.isLoading = false;
      },500)
    });
  }
}
