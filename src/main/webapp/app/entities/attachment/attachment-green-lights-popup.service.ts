import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AttachmentGreenLights } from './attachment-green-lights.model';
import { AttachmentGreenLightsService } from './attachment-green-lights.service';
@Injectable()
export class AttachmentGreenLightsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private attachmentService: AttachmentGreenLightsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.attachmentService.find(id).subscribe((attachment) => {
                attachment.createTime = this.datePipe
                    .transform(attachment.createTime, 'yyyy-MM-ddThh:mm');
                this.attachmentModalRef(component, attachment);
            });
        } else {
            return this.attachmentModalRef(component, new AttachmentGreenLights());
        }
    }

    attachmentModalRef(component: Component, attachment: AttachmentGreenLights): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.attachment = attachment;
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
