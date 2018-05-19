import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListCriteriaService} from "@services/list-criteria.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Criteria} from "@model/criteria";
import {Observable} from "rxjs/index";

@Component({
    selector: 'app-preview-criteria',
    templateUrl: './preview-criteria.component.html',
    styleUrls: ['./preview-criteria.component.less']
})
export class PreviewCriteriaComponent implements OnInit, OnDestroy {

    constructor(private listCriteria: ListCriteriaService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    getAllCriteria(): string {
        return this.listCriteria.prettyPrint();
    }
}
