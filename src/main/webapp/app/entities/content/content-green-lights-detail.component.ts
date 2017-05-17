import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , DataUtils } from 'ng-jhipster';

import { ContentGreenLights } from './content-green-lights.model';
import { ContentGreenLightsService } from './content-green-lights.service';

@Component({
    selector: 'jhi-content-green-lights-detail',
    templateUrl: './content-green-lights-detail.component.html'
})
export class ContentGreenLightsDetailComponent implements OnInit, OnDestroy {

    content: ContentGreenLights;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private dataUtils: DataUtils,
        private contentService: ContentGreenLightsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContents();
    }

    load(id) {
        this.contentService.find(id).subscribe((content) => {
            this.content = content;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contentListModification',
            (response) => this.load(this.content.id)
        );
    }
}
