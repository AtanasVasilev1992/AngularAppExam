import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';
import { Place } from 'src/app/types/place';

@Component({
    selector: 'app-edit-place',
    templateUrl: './edit-place.component.html',
    styleUrls: ['./edit-place.component.css'],
})
export class EditPlaceComponent implements OnInit {
    place: Place | undefined;
    isLoading = true;

    constructor(
        private apiService: ApiService,
        private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params['placeId'];
        this.apiService.getPlace(id).subscribe({
            next: (place) => {
                if (this.canEdit(place)) {
                    this.place = place;
                } else {
                    this.router.navigate(['/places']);
                }
                this.isLoading = false;
            },
            error: () => {
                this.router.navigate(['/places']);
            },
        });
    }

    editPlace(form: NgForm): void {
        if (form.invalid || !this.place) {
            return;
        }

        const { name, image, city, description, workTime } = form.value;

        this.apiService
            .editPlace(this.place._id, name, image, city, description, workTime)
            .subscribe({
                next: () => {
                    this.router.navigate(['/places', this.place?._id]);
                },
                error: (err) => {
                    console.error('Edit failed:', err);
                },
            });
    }

    canEdit(place: Place): boolean {
        return this.userService.user?._id === place._ownerId;
    }
}
