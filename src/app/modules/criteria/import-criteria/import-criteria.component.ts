import {Component, ComponentRef, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Criteria} from "@model/criteria";
import {each} from 'lodash';
import RegEx from 'regex-match-all';
import {ListCriteriaService} from "@services/list-criteria.service";

@Component({
    selector: 'app-import-criteria',
    templateUrl: './import-criteria.component.html',
    styleUrls: ['./import-criteria.component.less']
})
export class ImportCriteriaComponent implements OnInit, OnDestroy {
    componentRef: ComponentRef<ImportCriteriaComponent>;
    criteriaText: string;

    constructor(private viewContainerRef: ViewContainerRef, private service: ListCriteriaService) {
    }

    ngOnInit() {
        this.criteriaText = "";
        $("#ImportModal").modal('show').on('hidden.bs.modal', () => this.componentRef.destroy())
    }

    ngOnDestroy() {
    }

    setComponentRef(componentRef: ComponentRef<ImportCriteriaComponent>) {
        this.componentRef = componentRef;
    }

    importCriteria() {
        if ("" === this.criteriaText.trim()) {
            $("#ImportModal").modal('hide');
            return;
        }

        let aLine = this.criteriaText.replace(/\r\n/gmi, "\n").trim().split("\n");

        const updateCriteriaField = function (oCriteria, fullMatch, fieldType, field, text) {
            if (fieldType.toLowerCase() === field) {

                if (fullMatch.toLowerCase().indexOf("or") > -1) {
                    oCriteria.set(field, oCriteria.get(field) + "\r\n~ " + text);
                } else if (fullMatch.toLowerCase().indexOf("and") > -1) {
                    oCriteria.set(field, oCriteria.get(field) + "\r\n" + text);
                } else {
                    oCriteria.set(field, text);
                }
            }
        };

        let aListCriteria = [];
        let oCriteria = new Criteria();
        each(aLine, function (sLine, ndx) {
            if (sLine.trim() === "" && ndx !== 0) {
                aListCriteria.push(oCriteria);
                oCriteria = new Criteria();
                return;
            }

            let oMatch = RegEx.matchAll(/\((?:and|or)?\s*(given|when|then)\)/gmi, sLine);
            let sCondition = sLine.split(oMatch[0][0])[1].trim();

            updateCriteriaField(oCriteria, oMatch[0][0], oMatch[1][0], "given", sCondition);
            updateCriteriaField(oCriteria, oMatch[0][0], oMatch[1][0], "when", sCondition);
            updateCriteriaField(oCriteria, oMatch[0][0], oMatch[1][0], "then", sCondition);
        });

        aListCriteria.push(oCriteria);

        this.service.emptyCriteria();
        this.service.importCriteria(aListCriteria);
        $("#ImportModal").modal('hide');
    }

}