import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { AttachmentGreenLights } from './attachment-green-lights.model';
import { AttachmentGreenLightsService } from './attachment-green-lights.service';

@Component({
    selector: 'jhi-attachment-green-lights-detail',
    templateUrl: './attachment-green-lights-detail.component.html'
})
export class AttachmentGreenLightsDetailComponent implements OnInit, OnDestroy {

    attachment: AttachmentGreenLights;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private attachmentService: AttachmentGreenLightsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAttachments();
    }

    load(id) {
        this.attachmentService.find(id).subscribe((attachment) => {
            this.attachment = attachment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAttachments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'attachmentListModification',
            (response) => this.load(this.attachment.id)
        );
    }
}
