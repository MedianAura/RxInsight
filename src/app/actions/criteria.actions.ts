import {Criteria} from '@model/criteria'

export class AddCriteria {
    static readonly type = '[Criteria] Add';

    constructor(public payload: Criteria) {
    }
}

export class RemoveCriteria {
    static readonly type = '[Criteria] Remove';

    constructor(public payload: number) {
    }
}

export class CloneCriteria {
    static readonly type = '[Criteria] Clone';

    constructor(public payload: Criteria) {
    }
}

export class EmptyCriteria {
    static readonly type = '[Criteria] Empty';

    constructor() {
    }
}

export class ImportCriteria {
    static readonly type = '[Criteria] Import';

    constructor(public payload: Criteria[]) {
    }
}