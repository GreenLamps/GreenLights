import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { AttachmentGreenLights } from './attachment-green-lights.model';
import { AttachmentGreenLightsService } from './attachment-green-lights.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-attachment-green-lights',
    templateUrl: './attachment-green-lights.component.html'
})
export class AttachmentGreenLightsComponent implements OnInit, OnDestroy {
attachments: AttachmentGreenLights[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private attachmentService: AttachmentGreenLightsService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.attachmentService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.attachments = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.attachmentService.query().subscribe(
            (res: Response) => {
                this.attachments = res.json();
                this.currentSearch = '';
            },
            (res: Response) => this.onError(res.json())
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAttachments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AttachmentGreenLights) {
        return item.id;
    }
    registerChangeInAttachments() {
        this.eventSubscriber = this.eventManager.subscribe('attachmentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
