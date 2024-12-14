import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Museum } from 'src/app/types/museum';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-museum',
  templateUrl: './edit-museum.component.html',
  styleUrls: ['./edit-museum.component.css']
})
export class EditMuseumComponent implements OnInit {
museum: Museum | undefined;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['museumId'];
    this.apiService.getMuseum(id).subscribe({
      next: (museum) => {
        if (this.canEdit(museum)) {
          this.museum = museum;
        } else {
          this.router.navigate(['/museums']);
        }
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['/museums']);
      }
    });
  }

  editMuseum(form: NgForm): void {
    if (form.invalid || !this.museum) {
      return;
    }

    const { name, image, city, description, workTime } = form.value;

    this.apiService
      .editMuseum(this.museum._id, name, image, city, description, workTime)
      .subscribe({
        next: () => {
          this.router.navigate(['/museums', this.museum?._id]);
        },
        error: (err) => {
          console.error('Edit failed:', err);
        }
      });
  }

  canEdit(museum: Museum): boolean {
    return this.userService.user?._id === museum._ownerId;
  }
}
