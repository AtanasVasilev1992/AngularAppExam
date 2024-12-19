import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Place } from './types/place';
import { Museum } from './types/museum';
import { Like } from './types/like';
import { Comment } from './types/comment';
import { UserService } from './user/user.service';
import {
    Observable,
    catchError,
    forkJoin,
    map,
    of,
    tap,
    throwError,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private userService: UserService) {}

    // Places Methods
    getPlaces(): Observable<Place[]> {
        return this.http.get<Place[]>(`${this.apiUrl}/data/places`);
    }

    getPlace(id: string): Observable<Place> {
        return this.http.get<Place>(`${this.apiUrl}/data/places/${id}`).pipe(
            catchError((error) => {
                console.error('Error fetching place:', error);
                return throwError(() => error);
            })
        );
    }

    createPlace(
        name: string,
        image: string,
        city: string,
        description: string,
        workTime: string
    ): Observable<Place> {
        const payload = { name, image, city, description, workTime };
        return this.http.post<Place>(`${this.apiUrl}/data/places`, payload);
    }

    editPlace(
        id: string,
        name: string,
        image: string,
        city: string,
        description: string,
        workTime: string
    ): Observable<Place> {
        const payload = { name, image, city, description, workTime };
        return this.http.put<Place>(
            `${this.apiUrl}/data/places/${id}`,
            payload
        );
    }

    deletePlace(id: string): Observable<Place> {
        return this.http.delete<Place>(`${this.apiUrl}/data/places/${id}`);
    }

    getUserPlaces(userId: string): Observable<Place[]> {
        return this.http.get<Place[]>(
            `${this.apiUrl}/data/places?where=_ownerId%3D%22${userId}%22`
        );
    }

    // Museums Methods
    getMuseums(): Observable<Museum[]> {
        return this.http.get<Museum[]>(`${this.apiUrl}/data/museums`).pipe(
            catchError((error) => {
                console.error('Error loading museums:', error);
                return throwError(() => error);
            })
        );
    }

    getMuseum(id: string): Observable<Museum> {
        return this.http.get<Museum>(`${this.apiUrl}/data/museums/${id}`).pipe(
            catchError((error) => {
                console.error('Error loading museum:', error);
                return throwError(() => error);
            })
        );
    }

    createMuseum(
        name: string,
        image: string,
        city: string,
        description: string,
        workTime: string
    ): Observable<Museum> {
        const payload = { name, image, city, description, workTime };
        return this.http.post<Museum>(`${this.apiUrl}/data/museums`, payload);
    }

    editMuseum(
        id: string,
        name: string,
        image: string,
        city: string,
        description: string,
        workTime: string
    ): Observable<Museum> {
        const payload = { name, image, city, description, workTime };
        return this.http.put<Museum>(
            `${this.apiUrl}/data/museums/${id}`,
            payload
        );
    }

    deleteMuseum(id: string): Observable<Museum> {
        return this.http.delete<Museum>(`${this.apiUrl}/data/museums/${id}`);
    }

    getUserMuseums(userId: string): Observable<Museum[]> {
        return this.http.get<Museum[]>(
            `${this.apiUrl}/data/museums?where=_ownerId%3D%22${userId}%22`
        );
    }

    // Likes Methods
    addLike(itemId: string): Observable<Like> {
        return this.http.post<Like>(`${this.apiUrl}/data/likes`, {
            itemId,
            _ownerId: this.userService.user?._id,
            _createdOn: Date.now(),
        });
    }

    removeLike(likeId: string): Observable<Like> {
        return this.http.delete<Like>(`${this.apiUrl}/data/likes/${likeId}`);
    }

    getItemLikes(itemId: string): Observable<Like[]> {
        return this.http.get<Like[]>(
            `${this.apiUrl}/data/likes?where=itemId%3D%22${itemId}%22`
        );
    }

    getLikesByUser(userId: string): Observable<Like[]> {
        return this.http.get<Like[]>(
            `${this.apiUrl}/data/likes?where=_ownerId%3D%22${userId}%22`
        );
    }

    hasUserLiked(itemId: string, userId: string): Observable<boolean> {
        return this.http
            .get<Like[]>(
                `${this.apiUrl}/data/likes?where=itemId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22`
            )
            .pipe(map((likes) => likes.length > 0));
    }

    search(
        searchTerm: string
    ): Observable<{ places: Place[]; museums: Museum[] }> {
        const searchTermLower = searchTerm.toLowerCase();

        return forkJoin({
            places: this.getPlaces().pipe(
                map((places) =>
                    places.filter(
                        (place) =>
                            place.name
                                .toLowerCase()
                                .includes(searchTermLower) ||
                            place.city
                                .toLowerCase()
                                .includes(searchTermLower) ||
                            place.description
                                .toLowerCase()
                                .includes(searchTermLower)
                    )
                )
            ),
            museums: this.getMuseums().pipe(
                map((museums) =>
                    museums.filter(
                        (museum) =>
                            museum.name
                                .toLowerCase()
                                .includes(searchTermLower) ||
                            museum.description
                                .toLowerCase()
                                .includes(searchTermLower)
                    )
                )
            ),
        });
    }

    // Comments methods
    getCommentsByItem(itemId: string) {
        return this.http.get<Comment[]>(`${this.apiUrl}/data/comments`).pipe(
            map((comments) =>
                comments.filter((comment) => comment.itemId === itemId)
            ),
            catchError((error) => {
                console.error('Error fetching comments:', error);
                return of([]);
            })
        );
    }

    addComment(itemId: string, text: string, username: string) {
        return this.http.post<Comment>(`${this.apiUrl}/data/comments`, {
            text,
            itemId,
            username,
            _ownerId: this.userService.user?._id,
            _createdOn: Date.now(),
        });
    }
    deleteComment(commentId: string) {
        return this.http.delete<Comment>(
            `${this.apiUrl}/data/comments/${commentId}`
        );
    }
}
