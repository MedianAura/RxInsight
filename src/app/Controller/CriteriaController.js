const Backbone = require("backbone");
const lodash = require("lodash");
const nunjucks = require("nunjucks");

module.exports = Backbone.View.extend({
    "tagName": "div",
    "className": "list-group-item",
    "template": "CriteriaView.twig",

    // DATA
    parent: null,

    events: {
        "click": "eventOpenCriteria",
        "click .glyphicon-trash": "eventRemoveCriteria"
    },

    initialize: function (options) {
        this.parent = lodash.get(options, "parent", null);
        this.render();
    },
    render: function () {
        this.$el.html(nunjucks.render(this.template, {"item": this.model}));
        return this;
    },

    // PUBLIC

    // PRIVATE

    // EVENTS
    eventRemoveCriteria: function (event) {
        event.stopPropagation();
        this.parent.removeCriteria(this.model);
    },
    eventOpenCriteria: function (event) {
        this.parent.showCriteria(this.model);
    }
});