import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Comment } from '../types/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() itemId!: string;
  comments: Comment[] = [];
  newComment: string = '';
  isLoading = false;
  currentUser = this.userService.user;

  constructor(
    private apiService: ApiService,
    public userService: UserService
  ) {}

  ngOnInit() {
    console.log('Comments component initialized with itemId:', this.itemId);
    if (this.itemId) {
      this.loadComments();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemId'] && changes['itemId'].currentValue) {
      console.log('ItemId changed to:', changes['itemId'].currentValue);
      this.loadComments();
    }
  }

  loadComments() {
    if (!this.itemId) return;
    
    this.isLoading = true;
    
    this.apiService.getCommentsByItem(this.itemId).subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments.sort((a, b) => 
          new Date(b._createdOn).getTime() - new Date(a._createdOn).getTime()
        );
        this.isLoading = false;
      },
      error: () => {
        this.comments = [];
        this.isLoading = false;
      }
    });
  }

  addComment() {
    if (!this.newComment.trim() || !this.userService.user) return;

    this.apiService.addComment(
        this.itemId,
        this.newComment,
        this.userService.user.username
    ).subscribe({
        next: () => {
            this.loadComments();
            this.newComment = '';
        },
        error: (err) => console.error('Error adding comment:', err)
    });
}

  deleteComment(commentId: string) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.apiService.deleteComment(commentId).subscribe({
        next: () => this.loadComments(), 
        error: (err) => console.error('Error deleting comment:', err),
      });
    }
  }

  isCommentOwner(comment: Comment): boolean {
    return this.userService.user?._id === comment._ownerId;  
}
}