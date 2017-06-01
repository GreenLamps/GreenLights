import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, DataUtils } from 'ng-jhipster';

import { ContentGreenLights } from './content-green-lights.model';
import { ContentGreenLightsPopupService } from './content-green-lights-popup.service';
import { ContentGreenLightsService } from './content-green-lights.service';
import { CategoryGreenLights, CategoryGreenLightsService } from '../category';

@Component({
    selector: 'jhi-content-green-lights-dialog',
    templateUrl: './content-green-lights-dialog.component.html'
})
export class ContentGreenLightsDialogComponent implements OnInit {

    content: ContentGreenLights;
    authorities: any[];
    isSaving: boolean;

    categories: CategoryGreenLights[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private contentService: ContentGreenLightsService,
        private categoryService: CategoryGreenLightsService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.categoryService.findByLevel(2).subscribe(
            (res: Response) => { this.categories = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, content, field, isImage) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                content[field] = base64Data;
                content[`${field}ContentType`] = file.type;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.content.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contentService.update(this.content));
        } else {
            this.subscribeToSaveResponse(
                this.contentService.create(this.content));
        }
    }

    private subscribeToSaveResponse(result: Observable<ContentGreenLights>) {
        result.subscribe((res: ContentGreenLights) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ContentGreenLights) {
        this.eventManager.broadcast({ name: 'contentListModification', content: 'OK'});
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

    trackCategoryById(index: number, item: CategoryGreenLights) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-content-green-lights-popup',
    template: ''
})
export class ContentGreenLightsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contentPopupService: ContentGreenLightsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.contentPopupService
                    .open(ContentGreenLightsDialogComponent, params['id']);
            } else {
                this.modalRef = this.contentPopupService
                    .open(ContentGreenLightsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
