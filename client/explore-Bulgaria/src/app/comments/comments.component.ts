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
    showDeleteDialog = false;
    commentToDelete: string | null = null;

    constructor(
        private apiService: ApiService,
        public userService: UserService
    ) {}

    ngOnInit() {
        if (this.itemId) {
            this.loadComments();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['itemId'] && changes['itemId'].currentValue) {
            this.loadComments();
        }
    }

    loadComments() {
        if (!this.itemId) return;

        this.isLoading = true;

        this.apiService.getCommentsByItem(this.itemId).subscribe({
            next: (comments: Comment[]) => {
                this.comments = comments.sort(
                    (a, b) =>
                        new Date(b._createdOn).getTime() -
                        new Date(a._createdOn).getTime()
                );
                this.isLoading = false;
            },
            error: () => {
                this.comments = [];
                this.isLoading = false;
            },
        });
    }

    addComment() {
        if (!this.newComment.trim() || !this.userService.user) return;

        this.apiService
            .addComment(
                this.itemId,
                this.newComment,
                this.userService.user.username
            )
            .subscribe({
                next: () => {
                    this.loadComments();
                    this.newComment = '';
                },
                error: (err) => console.error('Error adding comment:', err),
            });
    }

    deleteComment(commentId: string) {
        this.commentToDelete = commentId;
        this.showDeleteDialog = true;
    }

    confirmDelete() {
        if (this.commentToDelete) {
            this.apiService.deleteComment(this.commentToDelete).subscribe({
                next: () => {
                    this.loadComments();
                    this.showDeleteDialog = false;
                    this.commentToDelete = null;
                },
                error: (err) => {
                    console.error('Error deleting comment:', err);
                    this.showDeleteDialog = false;
                    this.commentToDelete = null;
                },
            });
        }
    }

    cancelDelete() {
        this.showDeleteDialog = false;
        this.commentToDelete = null;
    }

    isCommentOwner(comment: Comment): boolean {
        return this.userService.user?._id === comment._ownerId;
    }
}
