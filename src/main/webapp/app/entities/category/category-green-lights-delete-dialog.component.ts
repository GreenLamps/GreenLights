import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { CategoryGreenLights } from './category-green-lights.model';
import { CategoryGreenLightsPopupService } from './category-green-lights-popup.service';
import { CategoryGreenLightsService } from './category-green-lights.service';

@Component({
    selector: 'jhi-category-green-lights-delete-dialog',
    templateUrl: './category-green-lights-delete-dialog.component.html'
})
export class CategoryGreenLightsDeleteDialogComponent {

    category: CategoryGreenLights;

    constructor(
        private categoryService: CategoryGreenLightsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoryListModification',
                content: 'Deleted an category'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-category-green-lights-delete-popup',
    template: ''
})
export class CategoryGreenLightsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryGreenLightsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.categoryPopupService
                .open(CategoryGreenLightsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
