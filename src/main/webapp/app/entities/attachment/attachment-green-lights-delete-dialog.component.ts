import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { AttachmentGreenLights } from './attachment-green-lights.model';
import { AttachmentGreenLightsPopupService } from './attachment-green-lights-popup.service';
import { AttachmentGreenLightsService } from './attachment-green-lights.service';

@Component({
    selector: 'jhi-attachment-green-lights-delete-dialog',
    templateUrl: './attachment-green-lights-delete-dialog.component.html'
})
export class AttachmentGreenLightsDeleteDialogComponent {

    attachment: AttachmentGreenLights;

    constructor(
        private attachmentService: AttachmentGreenLightsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.attachmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'attachmentListModification',
                content: 'Deleted an attachment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-attachment-green-lights-delete-popup',
    template: ''
})
export class AttachmentGreenLightsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attachmentPopupService: AttachmentGreenLightsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.attachmentPopupService
                .open(AttachmentGreenLightsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
