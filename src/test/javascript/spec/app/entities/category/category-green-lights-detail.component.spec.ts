import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GreenLightsTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CategoryGreenLightsDetailComponent } from '../../../../../../main/webapp/app/entities/category/category-green-lights-detail.component';
import { CategoryGreenLightsService } from '../../../../../../main/webapp/app/entities/category/category-green-lights.service';
import { CategoryGreenLights } from '../../../../../../main/webapp/app/entities/category/category-green-lights.model';

describe('Component Tests', () => {

    describe('CategoryGreenLights Management Detail Component', () => {
        let comp: CategoryGreenLightsDetailComponent;
        let fixture: ComponentFixture<CategoryGreenLightsDetailComponent>;
        let service: CategoryGreenLightsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenLightsTestModule],
                declarations: [CategoryGreenLightsDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CategoryGreenLightsService,
                    EventManager
                ]
            }).overrideComponent(CategoryGreenLightsDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryGreenLightsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryGreenLightsService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CategoryGreenLights(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.category).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
