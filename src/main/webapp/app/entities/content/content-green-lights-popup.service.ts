import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ContentGreenLights } from './content-green-lights.model';
import { ContentGreenLightsService } from './content-green-lights.service';
@Injectable()
export class ContentGreenLightsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private contentService: ContentGreenLightsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.contentService.find(id).subscribe((content) => {
                content.createTime = this.datePipe
                    .transform(content.createTime, 'yyyy-MM-ddThh:mm');
                this.contentModalRef(component, content);
            });
        } else {
            return this.contentModalRef(component, new ContentGreenLights());
        }
    }

    contentModalRef(component: Component, content: ContentGreenLights): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.content = content;
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
