import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { ContentGreenLights } from './content-green-lights.model';
import { ContentGreenLightsPopupService } from './content-green-lights-popup.service';
import { ContentGreenLightsService } from './content-green-lights.service';

@Component({
    selector: 'jhi-content-green-lights-delete-dialog',
    templateUrl: './content-green-lights-delete-dialog.component.html'
})
export class ContentGreenLightsDeleteDialogComponent {

    content: ContentGreenLights;

    constructor(
        private contentService: ContentGreenLightsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contentListModification',
                content: 'Deleted an content'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-content-green-lights-delete-popup',
    template: ''
})
export class ContentGreenLightsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contentPopupService: ContentGreenLightsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.contentPopupService
                .open(ContentGreenLightsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
