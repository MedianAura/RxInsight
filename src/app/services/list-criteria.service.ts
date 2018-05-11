import {Injectable} from '@angular/core';
import {AddCriteria, CloneCriteria, RemoveCriteria} from "@actions/criteria.actions";
import {lorem} from "faker";
import {Criteria} from "@model/criteria";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {CriteriaState} from "@stores/criteria.state";

@Injectable({
    providedIn: 'root'
})
export class ListCriteriaService {
    @Select(CriteriaState.getCriterias) criterias$: Observable<Criteria[]>;

    constructor(private store: Store) {
    }

    getAllCriteria(): Observable<Criteria[]> {
        return this.criterias$;
    }

    getCriteria(ndx: number): Observable<Criteria> {
        return this.store.select(state => state.criteria.criterias[ndx]);
    }

    addCriteria() {
        this.store.dispatch(new AddCriteria(new Criteria(lorem.paragraph(2))))
    }

    deleteCriteria(ndx: number) {
        this.store.dispatch(new RemoveCriteria(ndx));
    }

    cloneCriteria(criteria: Criteria) {
        this.store.dispatch(new CloneCriteria(criteria));
    }
}
