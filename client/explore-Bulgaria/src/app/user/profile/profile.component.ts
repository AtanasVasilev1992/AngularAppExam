import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { UserService } from '../user.service';
import { Place } from '../../types/place';
import { Museum } from '../../types/museum';
import { Like, User } from '../../types/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
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

  constructor(
    private apiService: ApiService,
    public userService: UserService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.userService.user) {
      this.editForm.patchValue({
        username: this.userService.user.username,
        email: this.userService.user.email
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
        catchError(err => {
          console.error('Error loading places:', err);
          return of([]);
        })
      ),
      museums: this.apiService.getUserMuseums(userId).pipe(
        catchError(err => {
          console.error('Error loading museums:', err);
          return of([]);
        })
      )
    });

    createdContent.subscribe({
      next: (content) => {
        this.userPlaces = content.places;
        this.userMuseums = content.museums;
        console.log('Created content loaded:', content);
      },
      error: (err) => console.error('Error loading content:', err),
      complete: () => this.isLoading = false
    });

    this.apiService.getLikesByUser(userId).pipe(
      catchError(err => {
        console.error('Error loading likes:', err);
        return of([]);
      })
    ).subscribe(likes => {
      console.log('User likes loaded:', likes);
      if (likes.length > 0) {
        this.loadLikedItems(likes);
      } else {
        this.isLoading = false;
      }
    });
  }

  loadLikedItems(likes: Like[]) {
    likes.forEach(like => {
      this.apiService.getPlace(like.itemId).pipe(
        catchError(() => of(null))
      ).subscribe(place => {
        if (place) {
          this.likedPlaces.push(place);
        } else {
          this.apiService.getMuseum(like.itemId).pipe(
            catchError(() => of(null))
          ).subscribe(museum => {
            if (museum) {
              this.likedMuseums.push(museum);
            }
          });
        }
      });
    });
  }
  switchTab(tab: 'created' | 'liked') {
    this.activeTab = tab;
  }

  toggleEditMode() {
    if (!this.isEditMode) {
      this.editForm.patchValue({
        username: this.userService.user?.username,
        email: this.userService.user?.email
      });
    }
    this.isEditMode = !this.isEditMode;
  }

  updateProfile() { 
    if (this.editForm.invalid) {
      return;
    }

    const { username, email } = this.editForm.value;
    
    this.userService.updateProfile(username, email).subscribe({
      next: () => {
        this.isEditMode = false;
        console.log('Profile updated successfully');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
      }
    });
  }
}