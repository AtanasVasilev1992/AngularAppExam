import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { UserService } from "../user/user.service";
import { Comment } from '../types/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() itemId!: string;
  comments: Comment[] = [];
  newComment: string = '';
  isLoading = false;

  constructor(
      private apiService: ApiService,
      public userService: UserService
  ) {}

  ngOnInit() {
      this.loadComments();
  }

  loadComments() {
      this.isLoading = true;
      this.apiService.getCommentsByItem(this.itemId).subscribe({
          next: (comments) => {
              this.comments = comments;
              this.isLoading = false;
          },
          error: (err) => {
              console.error('Error loading comments:', err);
              this.isLoading = false;
          }
      });
  }

  addComment() {
      if (!this.newComment.trim()) return;

      this.apiService.addComment(this.itemId, this.newComment).subscribe({
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
              error: (err) => console.error('Error deleting comment:', err)
          });
      }
  }

  isCommentOwner(comment: Comment): boolean {
      return this.userService.user?._id === comment.userId;
  }
}