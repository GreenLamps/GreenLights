import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GreenLightsTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ContentGreenLightsDetailComponent } from '../../../../../../main/webapp/app/entities/content/content-green-lights-detail.component';
import { ContentGreenLightsService } from '../../../../../../main/webapp/app/entities/content/content-green-lights.service';
import { ContentGreenLights } from '../../../../../../main/webapp/app/entities/content/content-green-lights.model';

describe('Component Tests', () => {

    describe('ContentGreenLights Management Detail Component', () => {
        let comp: ContentGreenLightsDetailComponent;
        let fixture: ComponentFixture<ContentGreenLightsDetailComponent>;
        let service: ContentGreenLightsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenLightsTestModule],
                declarations: [ContentGreenLightsDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ContentGreenLightsService,
                    EventManager
                ]
            }).overrideComponent(ContentGreenLightsDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContentGreenLightsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContentGreenLightsService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ContentGreenLights(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.content).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
