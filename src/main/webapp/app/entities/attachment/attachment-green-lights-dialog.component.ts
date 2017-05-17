import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { AttachmentGreenLights } from './attachment-green-lights.model';
import { AttachmentGreenLightsPopupService } from './attachment-green-lights-popup.service';
import { AttachmentGreenLightsService } from './attachment-green-lights.service';
import { ContentGreenLights, ContentGreenLightsService } from '../content';

@Component({
    selector: 'jhi-attachment-green-lights-dialog',
    templateUrl: './attachment-green-lights-dialog.component.html'
})
export class AttachmentGreenLightsDialogComponent implements OnInit {

    attachment: AttachmentGreenLights;
    authorities: any[];
    isSaving: boolean;

    contents: ContentGreenLights[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private attachmentService: AttachmentGreenLightsService,
        private contentService: ContentGreenLightsService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.contentService.query().subscribe(
            (res: Response) => { this.contents = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.attachment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.attachmentService.update(this.attachment));
        } else {
            this.subscribeToSaveResponse(
                this.attachmentService.create(this.attachment));
        }
    }

    private subscribeToSaveResponse(result: Observable<AttachmentGreenLights>) {
        result.subscribe((res: AttachmentGreenLights) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: AttachmentGreenLights) {
        this.eventManager.broadcast({ name: 'attachmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackContentById(index: number, item: ContentGreenLights) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-attachment-green-lights-popup',
    template: ''
})
export class AttachmentGreenLightsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attachmentPopupService: AttachmentGreenLightsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.attachmentPopupService
                    .open(AttachmentGreenLightsDialogComponent, params['id']);
            } else {
                this.modalRef = this.attachmentPopupService
                    .open(AttachmentGreenLightsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
