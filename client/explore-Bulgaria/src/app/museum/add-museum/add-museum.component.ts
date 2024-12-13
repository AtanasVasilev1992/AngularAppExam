import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-museum',
  templateUrl: './add-museum.component.html',
  styleUrls: ['./add-museum.component.css']
})
export class AddMuseumComponent {
constructor (private apiService: ApiService, private router: Router){}
  addMuseum(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { name, image, city, description, workTime } = form.value;

    this.apiService.createMuseum(name, image, city, description, workTime).subscribe(()=>{
      console.log(name);
      this.router.navigate(['/museums'])
    })
   
  }
}
