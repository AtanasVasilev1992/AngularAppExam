import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { AddPlaceComponent } from './add-place.component';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AddPlaceComponent', () => {
    let component: AddPlaceComponent;
    let fixture: ComponentFixture<AddPlaceComponent>;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const apiSpy = jasmine.createSpyObj('ApiService', ['createPlace']);
        const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

        apiSpy.createPlace.and.returnValue(
            of({
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
            })
        );

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
            ],
            declarations: [AddPlaceComponent],
            providers: [
                { provide: ApiService, useValue: apiSpy },
                { provide: Router, useValue: routerSpyObj },
            ],
        }).compileComponents();

        apiServiceSpy = TestBed.inject(
            ApiService
        ) as jasmine.SpyObj<ApiService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddPlaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add new place and redirect', fakeAsync(() => {
        const formValue = {
            name: 'Test Place',
            image: 'https://test.jpg',
            city: 'Test City',
            description: 'Test Description',
            workTime: '9-5',
        };

        const form = {
            valid: true,
            value: formValue,
            reset: () => {},
        } as NgForm;

        component.addPlace(form);
        tick();

        expect(apiServiceSpy.createPlace).toHaveBeenCalledWith(
            formValue.name,
            formValue.image,
            formValue.city,
            formValue.description,
            formValue.workTime
        );
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/places']);
    }));

    it('should not submit if form is invalid', () => {
        const form = {
            valid: false,
            value: {},
        } as any;

        component.addPlace(form);

        expect(apiServiceSpy.createPlace).not.toHaveBeenCalled();
    });

    it('should not add place if image URL is invalid', () => {
        const formValue = {
            name: 'Test Place',
            image: 'invalid-url',
            city: 'Test City',
            description: 'Test Description',
            workTime: '9-5',
        };

        const form = {
            valid: true,
            value: formValue,
        } as NgForm;

        component.addPlace(form);

        expect(apiServiceSpy.createPlace).not.toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
});
