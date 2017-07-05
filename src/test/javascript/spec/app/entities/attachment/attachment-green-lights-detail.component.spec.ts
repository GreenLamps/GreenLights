import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GreenLightsTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AttachmentGreenLightsDetailComponent } from '../../../../../../main/webapp/app/entities/attachment/attachment-green-lights-detail.component';
import { AttachmentGreenLightsService } from '../../../../../../main/webapp/app/entities/attachment/attachment-green-lights.service';
import { AttachmentGreenLights } from '../../../../../../main/webapp/app/entities/attachment/attachment-green-lights.model';

describe('Component Tests', () => {

    describe('AttachmentGreenLights Management Detail Component', () => {
        let comp: AttachmentGreenLightsDetailComponent;
        let fixture: ComponentFixture<AttachmentGreenLightsDetailComponent>;
        let service: AttachmentGreenLightsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenLightsTestModule],
                declarations: [AttachmentGreenLightsDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AttachmentGreenLightsService,
                    EventManager
                ]
            }).overrideComponent(AttachmentGreenLightsDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttachmentGreenLightsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttachmentGreenLightsService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AttachmentGreenLights(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.attachment).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
