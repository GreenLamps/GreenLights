import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CategoryGreenLights } from './category-green-lights.model';
import { CategoryGreenLightsService } from './category-green-lights.service';
@Injectable()
export class CategoryGreenLightsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private categoryService: CategoryGreenLightsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.categoryService.find(id).subscribe((category) => {
                category.createTime = this.datePipe
                    .transform(category.createTime, 'yyyy-MM-ddThh:mm');
                this.categoryModalRef(component, category);
            });
        } else {
            return this.categoryModalRef(component, new CategoryGreenLights());
        }
    }

    categoryModalRef(component: Component, category: CategoryGreenLights): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.category = category;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
