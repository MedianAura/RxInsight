import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Criteria} from "@model/criteria";
import {Observable} from "rxjs";
import {ListCriteriaService} from "@services/list-criteria.service";
import {DragulaService} from "ng2-dragula";
import {CriteriaComponent} from "../criteria/criteria.component";

@Component({
    selector: 'app-list-criteria',
    templateUrl: './list-criteria.component.html',
    styleUrls: ['./list-criteria.component.css']
})
export class ListCriteriaComponent implements OnInit {

    @ViewChildren(CriteriaComponent) criteriaViewChild: QueryList<CriteriaComponent>;

    constructor(private listCriteria: ListCriteriaService, private dragulaService: DragulaService) {
        dragulaService.drop.subscribe((value) => {
            this.onDrop();
        });
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

    sortCriteria() {
        let listCriteriaComponent: CriteriaComponent[] = this.criteriaViewChild.toArray();
        let listCriteria: Criteria[] = [];

        listCriteriaComponent.forEach(function (oCriteriaComponent: CriteriaComponent) {
            listCriteria.push(oCriteriaComponent.criteria);
        });

        this.listCriteria.emptyCriteria();
        this.listCriteria.importCriteria(listCriteria);
    }

    getAllCriteria(): Observable<Criteria[]> {
        return this.listCriteria.getAllCriteria();
    }

    private onDrop() {
        this.sortCriteria();
    }
}
