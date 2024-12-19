import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { UserService } from '../user.service';
import { Place } from '../../types/place';
import { Museum } from '../../types/museum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, forkJoin, map, of, throwError } from 'rxjs';
import { Like } from '../../types/like';
import { profileAnimations } from 'src/app/animations/profile.animations';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    animations: [
        profileAnimations.tabSwitch,
        profileAnimations.contentCards,
        profileAnimations.sectionFade,
        profileAnimations.buttonHover,
    ],
})
export class ProfileComponent implements OnInit {
    userPlaces: Place[] = [];
    userMuseums: Museum[] = [];
    likedPlaces: Place[] = [];
    likedMuseums: Museum[] = [];
    activeTab: 'created' | 'liked' = 'created';
    isLoading = true;
    isEditMode = false;
    editForm: FormGroup;

    // Pagination properties
    itemsPerPage = 3;
    currentPagePlaces = 1;
    currentPageMuseums = 1;
    currentPageLikedPlaces = 1;
    currentPageLikedMuseums = 1;

    constructor(
        private apiService: ApiService,
        public userService: UserService,
        private fb: FormBuilder
    ) {
        this.editForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    ngOnInit(): void {
        if (this.userService.user) {
            this.editForm.patchValue({
                username: this.userService.user.username,
                email: this.userService.user.email,
            });
            this.loadUserContent();
        }
    }

    loadUserContent() {
        const userId = this.userService.user?._id;
        if (!userId) {
            this.isLoading = false;
            return;
        }

        this.isLoading = true;

        this.apiService
            .getLikesByUser(userId)
            .pipe(
                catchError(() => of([])),
                map((likes) => likes.map((like) => like.itemId))
            )
            .subscribe({
                next: (likedIds) => {
                    if (likedIds.length === 0) {
                        this.loadCreatedContent(userId);
                        return;
                    }

                    forkJoin({
                        places: this.apiService.getPlaces().pipe(
                            map((places) =>
                                places.filter((place) =>
                                    likedIds.includes(place._id)
                                )
                            ),
                            catchError(() => of([]))
                        ),
                        museums: this.apiService.getMuseums().pipe(
                            map((museums) =>
                                museums.filter((museum) =>
                                    likedIds.includes(museum._id)
                                )
                            ),
                            catchError(() => of([]))
                        ),
                    }).subscribe({
                        next: (content) => {
                            this.likedPlaces = content.places;
                            this.likedMuseums = content.museums;
                            this.loadCreatedContent(userId);
                        },
                        error: () => {
                            this.loadCreatedContent(userId);
                        },
                    });
                },
                error: () => {
                    this.loadCreatedContent(userId);
                },
            });
    }

    private loadCreatedContent(userId: string) {
        forkJoin({
            places: this.apiService
                .getUserPlaces(userId)
                .pipe(catchError(() => of([]))),
            museums: this.apiService
                .getUserMuseums(userId)
                .pipe(catchError(() => of([]))),
        }).subscribe({
            next: (content) => {
                this.userPlaces = content.places;
                this.userMuseums = content.museums;
            },
            complete: () => {
                this.isLoading = false;
            },
        });
    }

    loadLikedItems(likes: Like[]) {
        const itemIds = new Set(likes.map((like) => like.itemId));
        let loadedItems = 0;
        const totalItems = itemIds.size;

        itemIds.forEach((itemId) => {
            this.apiService
                .getPlace(itemId)
                .pipe(catchError(() => of(null)))
                .subscribe((place) => {
                    if (place) {
                        this.likedPlaces.push(place);
                    } else {
                        this.apiService
                            .getMuseum(itemId)
                            .pipe(catchError(() => of(null)))
                            .subscribe((museum) => {
                                if (museum) {
                                    this.likedMuseums.push(museum);
                                }
                                loadedItems++;
                                if (loadedItems === totalItems) {
                                    this.isLoading = false;
                                }
                            });
                    }
                });
        });
    }

    // Pagination getters
    get totalPagesPlaces(): number {
        return Math.ceil(this.userPlaces.length / this.itemsPerPage);
    }

    get totalPagesMuseums(): number {
        return Math.ceil(this.userMuseums.length / this.itemsPerPage);
    }

    get totalPagesLikedPlaces(): number {
        return Math.ceil(this.likedPlaces.length / this.itemsPerPage);
    }

    get totalPagesLikedMuseums(): number {
        return Math.ceil(this.likedMuseums.length / this.itemsPerPage);
    }

    get paginatedUserPlaces(): Place[] {
        const start = (this.currentPagePlaces - 1) * this.itemsPerPage;
        return this.userPlaces.slice(start, start + this.itemsPerPage);
    }

    get paginatedUserMuseums(): Museum[] {
        const start = (this.currentPageMuseums - 1) * this.itemsPerPage;
        return this.userMuseums.slice(start, start + this.itemsPerPage);
    }

    get paginatedLikedPlaces(): Place[] {
        const start = (this.currentPageLikedPlaces - 1) * this.itemsPerPage;
        return this.likedPlaces.slice(start, start + this.itemsPerPage);
    }

    get paginatedLikedMuseums(): Museum[] {
        const start = (this.currentPageLikedMuseums - 1) * this.itemsPerPage;
        return this.likedMuseums.slice(start, start + this.itemsPerPage);
    }

    // Page change handlers
    onPageChangePlaces(page: number): void {
        this.currentPagePlaces = page;
    }

    onPageChangeMuseums(page: number): void {
        this.currentPageMuseums = page;
    }

    onPageChangeLikedPlaces(page: number): void {
        this.currentPageLikedPlaces = page;
    }

    onPageChangeLikedMuseums(page: number): void {
        this.currentPageLikedMuseums = page;
    }

    switchTab(tab: 'created' | 'liked') {
        this.activeTab = tab;
    }
}
