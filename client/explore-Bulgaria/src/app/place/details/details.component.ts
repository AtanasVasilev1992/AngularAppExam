import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';
import { Place } from 'src/app/types/place';
import { Like } from 'src/app/types/like';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
    place = {} as Place;
    isLoading = true;
    likesCount = 0;
    hasLiked = false;
    currentLike: Like | null = null;
    showDeleteDialog = false;

    constructor(
        private apiService: ApiService,
        public userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((data) => {
            const id = data['placeId'];

            this.apiService.getPlace(id).subscribe({
                next: (place) => {
                    this.place = place;
                    this.loadLikes();
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error('Error loading place:', err);
                    this.isLoading = false;
                    this.router.navigate(['/places']);
                },
            });
        });
    }

    get isOwner(): boolean {
        if (!this.userService.user || !this.place._ownerId) {
            return false;
        }

        return this.userService.user._id === this.place._ownerId;
    }

    deletePlace(): void {
        if (!this.isOwner) {
            return;
        }

        this.showDeleteDialog = true;
    }

    confirmDelete(): void {
        this.apiService.deletePlace(this.place._id).subscribe({
            next: () => {
                this.showDeleteDialog = false;
                this.router.navigate(['/places']);
            },
            error: (err) => {
                console.error('Delete failed:', err);
                this.showDeleteDialog = false;
            },
        });
    }

    cancelDelete(): void {
        this.showDeleteDialog = false;
    }

    loadLikes() {
        this.apiService.getItemLikes(this.place._id).subscribe({
            next: (likes) => {
                this.likesCount = likes.length;
                if (this.userService.user) {
                    const userLike = likes.find(
                        (like) => like._ownerId === this.userService.user?._id
                    );
                    this.hasLiked = !!userLike;
                    this.currentLike = userLike || null;
                }
            },
            error: (err) => console.error('Error loading likes:', err),
        });
    }

    toggleLike() {
        if (!this.userService.user) {
            this.router.navigate(['/auth/login']);
            return;
        }

        if (this.hasLiked && this.currentLike) {
            this.apiService.removeLike(this.currentLike._id).subscribe({
                next: () => {
                    this.hasLiked = false;
                    this.currentLike = null;
                    this.likesCount--;
                },
                error: (err) => console.error('Error removing like:', err),
            });
        } else {
            this.apiService.addLike(this.place._id).subscribe({
                next: (like) => {
                    this.hasLiked = true;
                    this.currentLike = like;
                    this.likesCount++;
                },
                error: (err) => console.error('Error adding like:', err),
            });
        }
    }
}
