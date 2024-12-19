import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlacesComponent } from './places.component';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShortenTextPipe } from 'src/app/shared/pipes/shorten-text.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('PlacesComponent', () => {
    let component: PlacesComponent;
    let fixture: ComponentFixture<PlacesComponent>;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;

    const mockPlaces = [
        {
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
        },
    ];

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('ApiService', ['getPlaces']);
        spy.getPlaces.and.returnValue(of(mockPlaces));

        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                BrowserAnimationsModule,
                RouterTestingModule,
            ],
            declarations: [
                PlacesComponent,
                PaginationComponent,
                ShortenTextPipe,
            ],
            providers: [{ provide: ApiService, useValue: spy }, UserService],
        }).compileComponents();

        apiServiceSpy = TestBed.inject(
            ApiService
        ) as jasmine.SpyObj<ApiService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlacesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load places on init', () => {
        component.ngOnInit();
        expect(apiServiceSpy.getPlaces).toHaveBeenCalled();
        expect(component.places).toEqual(mockPlaces);
    });

    it('should calculate total pages correctly', () => {
        component.places = mockPlaces;
        component.itemsPerPage = 3;
        expect(component.totalPages).toBe(1);
    });
});
