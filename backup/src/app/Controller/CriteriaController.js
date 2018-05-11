const Backbone = require("backbone");
const lodash = require("lodash");
const nunjucks = require("nunjucks");

module.exports = Backbone.View.extend({
    "tagName": "div",
    "className": "list-group-item list-criteria-item",
    "template": "CriteriaView.twig",

    // DATA
    parent: null,

    events: {
        "click": "eventOpenCriteria",
        "click .glyphicon-trash": "eventRemoveCriteria",
        "click .glyphicon-copy": "eventCopyCriteria"
    },

    initialize: function (options) {
        this.$el.data("id", this.model.cid);
        this.parent = lodash.get(options, "parent", null);
        this.render();
    },
    render: function () {
        this.$el.html(nunjucks.render(this.template, {"item": this.model}));
        return this;
    },

    // PUBLIC

    // PRIVATE
    __highlightCurrent: function () {
        this.parent.$el.find(".list-criteria-item").each(function () {
            $(this).removeClass("active")
        });
        this.$el.addClass("active");
    },

    // EVENTS
    eventRemoveCriteria: function (event) {
        event.stopPropagation();
        this.parent.removeCriteria(this.model);
    },
    eventCopyCriteria: function (event) {
        event.stopPropagation();
        this.parent.copyCriteria(this.model);
    },
    eventOpenCriteria: function (event) {
        this.parent.showCriteria(this.model);
        this.__highlightCurrent();
    }
});