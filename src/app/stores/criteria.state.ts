import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Criteria} from '@model/criteria'
import {AddCriteria, CloneCriteria, EmptyCriteria, ImportCriteria, RemoveCriteria} from '@actions/criteria.actions';
import {cloneDeep} from 'lodash';

export class CriteriaStateModel {
    criterias: Criteria[];
}

@State<CriteriaStateModel>({
    name: 'criteria',
    defaults: {
        criterias: []
    }
})
export class CriteriaState {

    @Selector()
    static getCriterias(state: CriteriaStateModel): Criteria[] {
        return state.criterias
    }

    @Action(AddCriteria)
    add({getState, patchState}: StateContext<CriteriaStateModel>, {payload}: AddCriteria) {
        const state = getState();
        state.criterias.push(payload);

        patchState({
            criterias: state.criterias
        })
    }

    @Action(RemoveCriteria)
    remove({getState, patchState}: StateContext<CriteriaStateModel>, {payload}: RemoveCriteria) {
        let criteria = getState().criterias;
        criteria.splice(payload, 1);

        patchState({
            criterias: criteria
        })
    }

    @Action(CloneCriteria)
    clone({getState, patchState}: StateContext<CriteriaStateModel>, {payload}: CloneCriteria) {
        const state = getState();
        state.criterias.push(cloneDeep(payload));

        patchState({
            criterias: state.criterias
        })
    }

    @Action(EmptyCriteria)
    empty({patchState}: StateContext<CriteriaStateModel>) {
        patchState({
            criterias: []
        })
    }

    @Action(ImportCriteria)
    import({getState, patchState}: StateContext<CriteriaStateModel>, {payload}: ImportCriteria) {
        const state = getState();
        state.criterias = payload;

        patchState({
            criterias: state.criterias
        })
    }

}