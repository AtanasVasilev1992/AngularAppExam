import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
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
  constructor(private api: ApiService, private injector: Injector) {}

  ngOnInit(): void {
    const httpInterceptor = this.injector.get(HTTP_INTERCEPTORS);
    this.api.getMuseums().subscribe((museums) => {
     
      this.museums = museums;
      setTimeout(()=>{
        this.isLoading = false;
      },500)
    });
  }
}
