import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { UserService } from '../user.service';
import { Place } from '../../types/place';
import { Museum } from '../../types/museum';

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

  constructor(
    private apiService: ApiService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserContent();
  }

  loadUserContent() {
    const userId = this.userService.user?._id;
    if (!userId) return;

    // Зареждаме създадените места и музеи
    Promise.all([
      this.apiService.getUserPlaces(userId).toPromise(),
      this.apiService.getUserMuseums(userId).toPromise(),
      this.apiService.getUserLikes(userId).toPromise()
    ]).then(([places, museums, likes]) => {
      this.userPlaces = places || [];
      this.userMuseums = museums || [];
      
      // Зареждаме харесаните места и музеи
      if (likes) {
        // Тук ще добавим логика за зареждане на харесаните елементи
        this.loadLikedItems(likes);
      }
      
      this.isLoading = false;
    }).catch(error => {
      console.error('Error loading user content:', error);
      this.isLoading = false;
    });
  }

  async loadLikedItems(likes: { places: string[], museums: string[] }) {
    // Имплементация на зареждането на харесани елементи
  }

  switchTab(tab: 'created' | 'liked') {
    this.activeTab = tab;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  updateProfile(formData: any) {
    // Имплементация на обновяване на профила
  }
}