import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-add-museum',
    templateUrl: './add-museum.component.html',
    styleUrls: ['./add-museum.component.css'],
})
export class AddMuseumComponent implements OnInit {
    museumForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private router: Router
    ) {
        this.museumForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            image: ['', [Validators.required]],
            city: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            workTime: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {}

    addMuseum(): void {
        if (this.museumForm.invalid) {
            Object.keys(this.museumForm.controls).forEach((key) => {
                const control = this.museumForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        const { name, image, city, description, workTime } =
            this.museumForm.value;

        this.apiService
            .createMuseum(name, image, city, description, workTime)
            .subscribe({
                next: () => {
                    this.router.navigate(['/museums']);
                },
                error: (err) => {
                    console.error('Error creating museum:', err);
                },
            });
    }

    get f() {
        return this.museumForm.controls;
    }
}
