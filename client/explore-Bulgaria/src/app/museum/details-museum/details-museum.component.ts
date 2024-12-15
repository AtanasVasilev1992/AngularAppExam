import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Museum } from 'src/app/types/museum';
import { UserService } from 'src/app/user/user.service';
import { Like } from 'src/app/types/like';

@Component({
  selector: 'app-details-museum',
  templateUrl: './details-museum.component.html',
  styleUrls: ['./details-museum.component.css']
})
export class DetailsMuseumComponent implements OnInit {
  museum = {} as Museum;
  isLoading = true;
  likesCount = 0;
  hasLiked = false;
  currentLike: Like | null = null;

  constructor(
    private apiService: ApiService,
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      const id = data['museumId'];
      this.loadMuseum(id);
    });
  }

  loadMuseum(id: string) {
    this.apiService.getMuseum(id).subscribe({
      next: (museum) => {
        this.museum = museum;
        this.loadLikes();
        this.isLoading = false;
        console.log('Museum loaded:', museum);
      },
      error: (err) => {
        console.error('Error loading museum:', err);
        this.isLoading = false;
        this.router.navigate(['/museums']);
      }
    });
  }

  get isOwner(): boolean {
    if (!this.userService.user || !this.museum._ownerId) {
      return false;
    }
    
    return this.userService.user._id === this.museum._ownerId;
  }

  deleteMuseum(): void {
    if (!this.isOwner) {
      return;
    }

    if (confirm('Are you sure you want to delete this museum?')) {
      this.apiService.deleteMuseum(this.museum._id).subscribe({
        next: () => {
          this.router.navigate(['/museums']);
        },
        error: (err) => {
          console.error('Delete failed:', err);
        }
      });
    }
  }

  loadLikes() {
    this.apiService.getItemLikes(this.museum._id).subscribe({
      next: (likes: Like[]) => {
        this.likesCount = likes.length;
        if (this.userService.user) {
          const userLike = likes.find(like => like._ownerId === this.userService.user?._id);
          this.hasLiked = !!userLike;
          this.currentLike = userLike || null;
        }
      },
      error: (err: Error) => console.error('Error loading likes:', err)
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
        error: (err: Error) => console.error('Error removing like:', err)
      });
    } else {
      this.apiService.addLike(this.museum._id).subscribe({
        next: (like: Like) => {
          this.hasLiked = true;
          this.currentLike = like;
          this.likesCount++;
        },
        error: (err: Error) => console.error('Error adding like:', err)
      });
    }
  }
}