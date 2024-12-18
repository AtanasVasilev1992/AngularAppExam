import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-add-place',
    templateUrl: './add-place.component.html',
    styleUrls: ['./add-place.component.css'],
})
export class AddPlaceComponent {
    constructor(private apiService: ApiService, private router: Router) {}
    addPlace(form: NgForm) {
        if (form.invalid) {
            return;
        }

        const { name, image, city, description, workTime } = form.value;
        
        const urlPattern = /^https?:\/\/.+/i;
        if (!urlPattern.test(image)) {
            return;
        }

        this.apiService
            .createPlace(name, image, city, description, workTime)
            .subscribe(() => {
                this.router.navigate(['/places']);
            });
    }
}
