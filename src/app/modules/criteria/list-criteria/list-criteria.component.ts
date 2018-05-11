import {Component, OnInit} from '@angular/core';
import {Criteria} from "@model/criteria";
import {Observable} from "rxjs";
import {ListCriteriaService} from "@services/list-criteria.service";

@Component({
    selector: 'app-list-criteria',
    templateUrl: './list-criteria.component.html',
    styleUrls: ['./list-criteria.component.css']
})
export class ListCriteriaComponent implements OnInit {
    constructor(private listCriteria: ListCriteriaService) {
    }

    ngOnInit() {
    }

    addCriteria() {
        this.listCriteria.addCriteria();
    }

    deleteCriteria(ndx: number) {
        this.listCriteria.deleteCriteria(ndx);
    }

    cloneCriteria(criteria: Criteria) {
        this.listCriteria.cloneCriteria(criteria);
    }

    getAllCriteria(): Observable<Criteria[]> {
        return this.listCriteria.getAllCriteria();
    }

    getCriteria(ndx: number): Observable<Criteria> {
        return this.listCriteria.getCriteria(ndx);
    }
}
