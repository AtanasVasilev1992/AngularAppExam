import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';
import { Place } from 'src/app/types/place';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  place = {} as Place;
  isLoading = true;
  likes: number = 0;
  hasLiked = false;

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
          this.isLoading = false;
          console.log('Place loaded:', place);
        },
        error: (err) => {
          console.error('Error loading place:', err);
          this.isLoading = false;
        }
      });
    });

    this.loadLikes();
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

    if (confirm('Are you sure you want to delete this place?')) {
      this.apiService.deletePlace(this.place._id).subscribe({
        next: () => {
          this.router.navigate(['/places']);
        },
        error: (err) => {
          console.error('Delete failed:', err);
        }
      });
    }
  }

  loadLikes() {
    this.apiService.getLikes(this.place._id).subscribe(likes => {
      this.likes = likes.length;
      this.hasLiked = likes.some(like => like.userId === this.userService.user?._id);
    });
  }

  likePlace() {
    if (!this.userService.user) return;
    
    this.apiService.likePlace(this.place._id).subscribe({
      next: () => {
        this.loadLikes();
      },
      error: (err) => console.error('Error liking place:', err)
    });
  }
}