const Backbone = require("backbone");
const {sprintf} = require("sprintf-js");

module.exports = Backbone.Model.extend({
    initialize: function () {},
    setDefaultValue: function () {
        this.set("given", "");
        this.set("when", "");
        this.set("then", "");
    },
    prettyGiven: function () {
        if (this.get("given").trim() === "") return "";
        let given = "";
        let aGiven = this.get("given").split("\n");
        if (aGiven.length > 0) {
            given = sprintf("<span style='color: #AAAAAA;'>(Given)</span> %s", aGiven[0]);
            for (let i = 1; i < aGiven.length; i++) {
                given += sprintf("<br /><span style='color: #AAAAAA;'>(and given)</span> %s", aGiven[i]);
            }
        }

        return given;
    },
    prettyWhen: function () {
        if (this.get("when").trim() === "") return "";
        let when = "";
        let aWhen = this.get("when").split("\n");
        if (aWhen.length > 0) {
            when = sprintf("<span style='color: #AAAAAA;'>(When)</span> %s", aWhen[0]);
            for (let i = 1; i < aWhen.length; i++) {
                when += sprintf("<br /><span style='color: #AAAAAA;'>(and when)</span> %s", aWhen[i]);
            }
        }

        return when;
    },
    prettyThen: function () {
        if (this.get("then").trim() === "") return "";
        let then = "";
        let aThen = this.get("then").split("\n");
        if (aThen.length > 0) {
            then = sprintf("<span style='color: #AAAAAA;'>(Then)</span> %s", aThen[0]);
            for (let i = 1; i < aThen.length; i++) {
                then += sprintf("<br /><span style='color: #AAAAAA;'>(and then)</span> %s", aThen[i]);
            }
        }

        return then;
    },
    prettyPrint: function () {
        let given = this.prettyGiven();
        let then = this.prettyThen();
        let when = this.prettyWhen();

        if (given === "" && then === "" && when === "") return "";
        return sprintf("%s<br />%s<br />%s", given, then, when);
    }
});