import {sprintf} from "sprintf-js";

export class Criteria {
    public given: string;
    public when: string;
    public then: string;
    public isShown: boolean;

    constructor() {
        this.given = "";
        this.when = "";
        this.then = "";
        this.isShown = false;
    }

    setDefaultValue(): void {
        this.given = "En considérant que ";
        this.when = "Lorsque ";
        this.then = "Alors ";
    }

    get(key: string) {
        return this[key];
    }

    set(key: string, value: string): Criteria {
        this[key] = value;
        return this;
    }

    prettyGiven(): string {
        if (this.given.trim() === "") return "";
        let given = "";
        let aGiven = this.given.split("\n");
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
        if (this.when.trim() === "") return "";
        let when = "";
        let aWhen = this.when.split("\n");
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
        if (this.then.trim() === "") return "";
        let then = "";
        let aThen = this.then.split("\n");
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