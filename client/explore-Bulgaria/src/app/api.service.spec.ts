import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { UserService } from './user/user.service';
import { environment } from '../environments/environment';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    const mockPlace = {
        _id: '1',
        name: 'Test Place',
        city: 'Test City',
        image: 'test.jpg',
        description: 'Test Description',
        workTime: '9-5',
        _ownerId: 'user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService, UserService],
        });

        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get places', () => {
        service.getPlaces().subscribe((places) => {
            expect(places).toEqual([mockPlace]);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/data/places`);
        expect(req.request.method).toBe('GET');
        req.flush([mockPlace]);
    });

    it('should get single place', () => {
        service.getPlace('1').subscribe((place) => {
            expect(place).toEqual(mockPlace);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/data/places/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockPlace);
    });

    it('should create place', () => {
        const newPlace = {
            name: 'New Place',
            image: 'new.jpg',
            city: 'New City',
            description: 'New Description',
            workTime: '10-6',
        };

        service
            .createPlace(
                newPlace.name,
                newPlace.image,
                newPlace.city,
                newPlace.description,
                newPlace.workTime
            )
            .subscribe((place) => {
                expect(place).toEqual({ ...mockPlace, ...newPlace });
            });

        const req = httpMock.expectOne(`${environment.apiUrl}/data/places`);
        expect(req.request.method).toBe('POST');
        req.flush({ ...mockPlace, ...newPlace });
    });
});
