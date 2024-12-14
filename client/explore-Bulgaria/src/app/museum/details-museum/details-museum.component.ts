import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Museum } from 'src/app/types/museum';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details-museum',
  templateUrl: './details-museum.component.html',
  styleUrls: ['./details-museum.component.css']
})
export class DetailsMuseumComponent implements OnInit {
  museum = {} as Museum;
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
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const museumId = params['museumId'];
        if (!museumId) {
          this.router.navigate(['/museums']);
          return;
        }

        this.apiService.getMuseum(museumId).subscribe({
          next: (museum) => {
            this.museum = museum;
            this.isLoading = false;
            console.log('Museum loaded:', museum);
          },
          error: (err) => {
            console.error('Error loading museum:', err);
            this.isLoading = false;
            this.router.navigate(['/museums']);
          }
        });
      },
      error: (err) => {
        console.error('Error getting params:', err);
        this.router.navigate(['/museums']);
      }
    });

    this.loadLikes();
  }

  get isOwner(): boolean {
    return this.userService.user?._id === this.museum._ownerId;
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
    this.apiService.getLikes(this.museum._id).subscribe(likes => {
      this.likes = likes.length;
      this.hasLiked = likes.some(like => like.userId === this.userService.user?._id);
    });
  }

  likeMuseum() {
    if (!this.userService.user) return;
    
    this.apiService.likeMuseum(this.museum._id).subscribe({
      next: () => {
        this.loadLikes();
      },
      error: (err) => console.error('Error liking museum:', err)
    });
  }
}