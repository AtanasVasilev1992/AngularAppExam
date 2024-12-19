import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { UserService } from '../user.service';
import { Place } from '../../types/place';
import { Museum } from '../../types/museum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, forkJoin, of, throwError } from 'rxjs';
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
            console.error('No user ID available');
            return;
        }

        this.isLoading = true;

        const createdContent = forkJoin({
            places: this.apiService.getUserPlaces(userId).pipe(
                catchError((err) => {
                    console.error('Error loading places:', err);
                    return of([]);
                })
            ),
            museums: this.apiService.getUserMuseums(userId).pipe(
                catchError((err) => {
                    console.error('Error loading museums:', err);
                    return of([]);
                })
            ),
        });

        createdContent.subscribe({
            next: (content) => {
                this.userPlaces = content.places;
                this.userMuseums = content.museums;
            },
            error: (err) => console.error('Error loading content:', err),
            complete: () => (this.isLoading = false),
        });

        this.apiService
            .getLikesByUser(userId)
            .pipe(
                catchError((err) => {
                    console.error('Error loading likes:', err);
                    return of([]);
                })
            )
            .subscribe((likes) => {
                if (likes.length > 0) {
                    this.loadLikedItems(likes);
                } else {
                    this.isLoading = false;
                }
            });
    }

    loadLikedItems(likes: Like[]) {
        const itemIds = new Set(likes.map((like) => like.itemId));
        const loadedItems = 0;

        itemIds.forEach((itemId) => {
            this.apiService
                .getPlace(itemId)
                .pipe(
                    catchError((error) => {
                        if (error.status === 404) {
                            return of(null);
                        }
                        return throwError(() => error);
                    })
                )
                .subscribe((place) => {
                    if (place) {
                        this.likedPlaces.push(place);
                    } else {
                        this.apiService
                            .getMuseum(itemId)
                            .pipe(
                                catchError((error) => {
                                    if (error.status === 404) {
                                        return of(null);
                                    }
                                    return throwError(() => error);
                                })
                            )
                            .subscribe((museum) => {
                                if (museum) {
                                    this.likedMuseums.push(museum);
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
