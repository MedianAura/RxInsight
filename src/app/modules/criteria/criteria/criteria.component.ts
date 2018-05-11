import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Criteria} from "@model/criteria";
import {sprintf} from "sprintf-js";

@Component({
    selector: 'app-criteria',
    templateUrl: './criteria.component.html',
    styleUrls: ['./criteria.component.less']
})
export class CriteriaComponent implements OnInit {

    @Input() criteria: Criteria;
    @Input() ndx: number;
    @Output() onDelete = new EventEmitter<number>();
    @Output() onClone = new EventEmitter<Criteria>();

    constructor() {
    }

    ngOnInit() {
    }

    deleteCriteria(event: MouseEvent) {
        event.stopPropagation();
        this.onDelete.emit(this.ndx);
    }

    cloneCriteria(event: MouseEvent) {
        event.stopPropagation();
        this.onClone.emit(this.criteria);
    }

    toggleCriteria() {
        // let $this = $(event.target);
        // if ($this.hasClass("glyphicon")) return;
        this.criteria.isShown = !this.criteria.isShown;
    }

    prettyGiven(): string {
        if (this.criteria.given.trim() === "") return "";
        let given = "";
        let aGiven = this.criteria.given.split("\n");
        if (aGiven.length > 0) {
            given = sprintf("<span style='color: #AAAAAA;'>(Given)</span> %s", aGiven[0]);
            for (let i = 1; i < aGiven.length; i++) {
                if (aGiven[i].indexOf("~") === 0) {
                    given += sprintf("<br /><span style='color: #AAAAAA;'>(or given)</span> %s", aGiven[i].replace("~", ""));
                } else {
                    given += sprintf("<br /><span style='color: #AAAAAA;'>(and given)</span> %s", aGiven[i]);
                }
            }
        }

        return given;
    }

    prettyWhen(): string {
        if (this.criteria.when.trim() === "") return "";
        let when = "";
        let aWhen = this.criteria.when.split("\n");
        if (aWhen.length > 0) {
            when = sprintf("<span style='color: #AAAAAA;'>(When)</span> %s", aWhen[0]);
            for (let i = 1; i < aWhen.length; i++) {
                if (aWhen[i].indexOf("~") === 0) {
                    when += sprintf("<br /><span style='color: #AAAAAA;'>(or when)</span> %s", aWhen[i].replace("~", ""));
                } else {
                    when += sprintf("<br /><span style='color: #AAAAAA;'>(and when)</span> %s", aWhen[i]);
                }
            }
        }

        return when;
    }

    prettyThen(): string {
        if (this.criteria.then.trim() === "") return "";
        let then = "";
        let aThen = this.criteria.then.split("\n");
        if (aThen.length > 0) {
            then = sprintf("<span style='color: #AAAAAA;'>(Then)</span> %s", aThen[0]);
            for (let i = 1; i < aThen.length; i++) {
                if (aThen[i].indexOf("~") === 0) {
                    then += sprintf("<br /><span style='color: #AAAAAA;'>(or then)</span> %s", aThen[i].replace("~", ""));
                } else {
                    then += sprintf("<br /><span style='color: #AAAAAA;'>(and then)</span> %s", aThen[i]);
                }
            }
        }

        return then;
    }

    prettyPrint(): string {
        let given = this.prettyGiven();
        let when = this.prettyWhen();
        let then = this.prettyThen();

        if (given === "" && then === "" && when === "") return "";
        return sprintf("%s<br />%s<br />%s", given, when, then);
    }
}
