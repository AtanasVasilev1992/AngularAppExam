import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { urlValidator } from 'src/app/shared/validators/url.validator';
import { Museum } from 'src/app/types/museum';

@Component({
    selector: 'app-edit-museum',
    templateUrl: './edit-museum.component.html',
    styleUrls: ['./edit-museum.component.css'],
})
export class EditMuseumComponent implements OnInit {
    museum: Museum | undefined;
    museumForm: FormGroup;
    isLoading = true;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.museumForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            image: ['', [Validators.required, urlValidator]],
            city: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            workTime: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params['museumId'];
        this.apiService.getMuseum(id).subscribe({
            next: (museum) => {
                this.museum = museum;
                this.museumForm.patchValue({
                    name: museum.name,
                    image: museum.image,
                    city: museum.city,
                    description: museum.description,
                    workTime: museum.workTime,
                });
                this.isLoading = false;
            },
            error: () => {
                this.router.navigate(['/museums']);
            },
        });
    }

    editMuseum(): void {
        if (this.museumForm.invalid || !this.museum) {
            return;
        }

        const { name, image, city, description, workTime } =
            this.museumForm.value;

        this.apiService
            .editMuseum(
                this.museum._id,
                name,
                image,
                city,
                description,
                workTime
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['/museums', this.museum?._id]);
                },
                error: (err) => {
                    console.error('Edit failed:', err);
                },
            });
    }

    get f() {
        return this.museumForm.controls;
    }
}
