import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AttachmentGreenLights } from './attachment-green-lights.model';
import { DateUtils } from 'ng-jhipster';

@Injectable()
export class AttachmentGreenLightsService {

    private resourceUrl = 'api/attachments';
    private resourceSearchUrl = 'api/_search/attachments';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(attachment: AttachmentGreenLights): Observable<AttachmentGreenLights> {
        const copy = this.convert(attachment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(attachment: AttachmentGreenLights): Observable<AttachmentGreenLights> {
        const copy = this.convert(attachment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<AttachmentGreenLights> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.createTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.createTime);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    private convertResponse(res: Response): Response {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].createTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].createTime);
        }
        res.json().data = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }

    private convert(attachment: AttachmentGreenLights): AttachmentGreenLights {
        const copy: AttachmentGreenLights = Object.assign({}, attachment);

        copy.createTime = this.dateUtils.toDate(attachment.createTime);
        return copy;
    }
}
