import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MuseumsComponent } from './museums.component';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShortenTextPipe } from 'src/app/shared/pipes/shorten-text.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('MuseumsComponent', () => {
    let component: MuseumsComponent;
    let fixture: ComponentFixture<MuseumsComponent>;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;

    const mockMuseums = [
        {
            _id: '1',
            name: 'Test Museum',
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
        const spy = jasmine.createSpyObj('ApiService', ['getMuseums']);
        spy.getMuseums.and.returnValue(of(mockMuseums));

        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                BrowserAnimationsModule,
                RouterTestingModule,
            ],
            declarations: [
                MuseumsComponent,
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
        fixture = TestBed.createComponent(MuseumsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load museums on init', () => {
        component.ngOnInit();
        expect(apiServiceSpy.getMuseums).toHaveBeenCalled();
        expect(component.museums).toEqual(mockMuseums);
    });

    it('should calculate total pages correctly', () => {
        component.museums = mockMuseums;
        component.itemsPerPage = 3;
        expect(component.totalPages).toBe(1);
    });
});
