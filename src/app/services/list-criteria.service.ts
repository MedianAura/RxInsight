import {Injectable} from '@angular/core';
import {AddCriteria, CloneCriteria, EmptyCriteria, ImportCriteria, RemoveCriteria} from "@actions/criteria.actions";
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
        let criteria = new Criteria();
        criteria.setDefaultValue();
        this.store.dispatch(new AddCriteria(criteria));
    }

    deleteCriteria(ndx: number) {
        this.store.dispatch(new RemoveCriteria(ndx));
    }

    cloneCriteria(criteria: Criteria) {
        this.store.dispatch(new CloneCriteria(criteria));
    }

    emptyCriteria() {
        this.store.dispatch(new EmptyCriteria());
    }

    importCriteria(criteria: Criteria[]) {
        this.store.dispatch(new ImportCriteria(criteria));
    }
}
