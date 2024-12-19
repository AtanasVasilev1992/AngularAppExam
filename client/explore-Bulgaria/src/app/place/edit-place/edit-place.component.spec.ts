import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { EditPlaceComponent } from './edit-place.component';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('EditPlaceComponent', () => {
    let component: EditPlaceComponent;
    let fixture: ComponentFixture<EditPlaceComponent>;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let userServiceSpy: jasmine.SpyObj<UserService>;

    const mockPlace = {
        _id: '1',
        name: 'Test Place',
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
            'getPlace',
            'editPlace',
        ]);
        const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
        const userSpy = jasmine.createSpyObj('UserService', [], {
            user: { _id: 'user1' },
        });

        apiSpy.getPlace.and.returnValue(of(mockPlace));
        apiSpy.editPlace.and.returnValue(of(mockPlace));

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
            ],
            declarations: [EditPlaceComponent],
            providers: [
                { provide: ApiService, useValue: apiSpy },
                { provide: Router, useValue: routerSpyObj },
                { provide: UserService, useValue: userSpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: { placeId: '1' },
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
        fixture = TestBed.createComponent(EditPlaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load place on init', async () => {
        const mockPlace = {
            _id: '1',
            name: 'Test Place',
            image: 'https://test.jpg',
            city: 'Test City',
            description: 'Test Description',
            workTime: '9-5',
            _ownerId: 'user1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            __v: 0,
        };

        apiServiceSpy.getPlace.and.returnValue(of(mockPlace));

        component.ngOnInit();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(component.place).toEqual(mockPlace);
    });

    it('should edit place and redirect', fakeAsync(() => {
        const formValue = {
            name: 'Updated Place',
            image: 'https://updated.jpg',
            city: 'Updated City',
            description: 'Updated Description',
            workTime: '10-6',
        };

        const form = {
            valid: true,
            value: formValue,
            reset: () => {},
        } as NgForm;

        component.place = mockPlace;
        component.editPlace(form);
        tick();

        expect(apiServiceSpy.editPlace).toHaveBeenCalledWith(
            mockPlace._id,
            formValue.name,
            formValue.image,
            formValue.city,
            formValue.description,
            formValue.workTime
        );
        expect(routerSpy.navigate).toHaveBeenCalledWith([
            '/places',
            mockPlace._id,
        ]);
    }));

    it('should not edit if image URL is invalid', fakeAsync(() => {
        const formValue = {
            name: 'Updated Place',
            image: 'invalid-url',
            city: 'Updated City',
            description: 'Updated Description',
            workTime: '10-6',
        };

        const form = {
            valid: true,
            value: formValue,
        } as NgForm;

        component.place = mockPlace;
        component.editPlace(form);
        tick();

        expect(apiServiceSpy.editPlace).not.toHaveBeenCalled();
    }));
});
