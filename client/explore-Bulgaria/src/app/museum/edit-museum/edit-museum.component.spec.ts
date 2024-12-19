import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditMuseumComponent } from './edit-museum.component';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('EditMuseumComponent', () => {
    let component: EditMuseumComponent;
    let fixture: ComponentFixture<EditMuseumComponent>;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let userServiceSpy: jasmine.SpyObj<UserService>;

    const mockMuseum = {
        _id: '1',
        name: 'Test Museum',
        image: 'https://test.jpg',
        city: 'Test City',
        description: 'Test Description',
        workTime: '9-5',
        _ownerId: 'user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
    };

    beforeEach(async () => {
        const apiSpy = jasmine.createSpyObj('ApiService', [
            'getMuseum',
            'editMuseum',
        ]);
        const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
        const userSpy = jasmine.createSpyObj('UserService', [], {
            user: { _id: 'user1' },
        });

        apiSpy.getMuseum.and.returnValue(of(mockMuseum));
        apiSpy.editMuseum.and.returnValue(of(mockMuseum));

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
            ],
            declarations: [EditMuseumComponent],
            providers: [
                { provide: ApiService, useValue: apiSpy },
                { provide: Router, useValue: routerSpyObj },
                { provide: UserService, useValue: userSpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: { museumId: '1' },
                        },
                    },
                },
            ],
        }).compileComponents();

        apiServiceSpy = TestBed.inject(
            ApiService
        ) as jasmine.SpyObj<ApiService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        userServiceSpy = TestBed.inject(
            UserService
        ) as jasmine.SpyObj<UserService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditMuseumComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load museum on init', async () => {
        const mockMuseum = {
            _id: '1',
            name: 'Test Museum',
            image: 'https://test.jpg',
            city: 'Test City',
            description: 'Test Description',
            workTime: '9-5',
            _ownerId: 'user1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            __v: 0,
        };

        apiServiceSpy.getMuseum.and.returnValue(of(mockMuseum));

        component.ngOnInit();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(component.museum).toEqual(mockMuseum);
    });

    it('should edit museum and redirect', fakeAsync(() => {
        component.museumForm.patchValue({
            _id: '1',
            name: 'Test Museum',
            image: 'https://test.jpg',
            city: 'Test City',
            description: 'Test Description',
            workTime: '9-5',
        });

        component.editMuseum();
        tick();

        expect(apiServiceSpy.editMuseum).toHaveBeenCalledWith(
            '1',
            'Test Museum',
            'https://test.jpg',
            'Test City',
            'Test Description',
            '9-5'
        );
        expect(routerSpy.navigate).toHaveBeenCalledWith([
            '/museums',
            mockMuseum._id,
        ]);
    }));

    it('should not edit if image URL is invalid', fakeAsync(() => {
        component.museumForm.setValue({
            name: 'Test Museum',
            image: 'invalid-url',
            city: 'Test City',
            description: 'Test Description',
            workTime: '9-5',
        });

        component.editMuseum();

        expect(apiServiceSpy.editMuseum).not.toHaveBeenCalled();
    }));
});
