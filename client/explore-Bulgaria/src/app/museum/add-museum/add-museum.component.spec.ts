import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMuseumComponent } from './add-museum.component';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AddMuseumComponent', () => {
    let component: AddMuseumComponent;
    let fixture: ComponentFixture<AddMuseumComponent>;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const apiSpy = jasmine.createSpyObj('ApiService', ['createMuseum']);
        const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

        apiSpy.createMuseum.and.returnValue(
            of({
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
            })
        );

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
            ],
            declarations: [AddMuseumComponent],
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
        fixture = TestBed.createComponent(AddMuseumComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a new museum and navigate to /museums', fakeAsync(() => {
        component.museumForm.setValue({
            name: 'Test Museum',
            image: 'https://test.jpg',
            city: 'Test City',
            description: 'Test Description',
            workTime: '9-5',
        });

        component.addMuseum();
        tick();

        expect(apiServiceSpy.createMuseum).toHaveBeenCalledWith(
            'Test Museum',
            'https://test.jpg',
            'Test City',
            'Test Description',
            '9-5'
        );
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/museums']);
    }));

    it('should not submit if form is invalid', () => {
        component.museumForm.setValue({
            name: '',
            image: '',
            city: '',
            description: '',
            workTime: '',
        });

        component.addMuseum();

        expect(apiServiceSpy.createMuseum).not.toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should not add museum if image URL is invalid', () => {
        component.museumForm.setValue({
            name: 'Test Museum',
            image: 'invalid-url',
            city: 'Test City',
            description: 'Test Description',
            workTime: '9-5',
        });

        component.addMuseum();

        expect(apiServiceSpy.createMuseum).not.toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
});
