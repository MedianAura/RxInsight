const Backbone = require("backbone");
const nunjucks = require("nunjucks");
const lodash = require("lodash");

const EditorController = require("./EditorController");
const CriteriaController = require("./CriteriaController");
const Criteria = require("../Model/Criteria");

module.exports = Backbone.View.extend({
    "el": "#MainContainer",
    "template": "MainApp.twig",

    // DATA
    oCurrentCriteria: null,
    oListCriteria: null,
    oEditorCtrl: null,

    events: {
        "click #btnAddCriteria": "eventAddCriteria",
        "sortupdate .list-criteria": "eventListSorted"
    },

    initialize: function () {
        this.oCurrentCriteria = null;
        this.oListCriteria = new Backbone.Collection(null, {model: Criteria});

        // Ensure our methods keep the `this` reference to the view itself
        lodash.bindAll(this, 'renderList');

        // Bind collection changes to re-rendering
        this.oListCriteria.on('change', this.renderList);
        this.oListCriteria.on('reset', this.renderList);
        this.oListCriteria.on('add', this.renderList);
        this.oListCriteria.on('remove', this.renderList);

        this.render();
        this.oEditorCtrl = new EditorController();
        $(".list-criteria").sortable();

        this.addCriteria();
    },
    render: function () {
        this.$el.html(nunjucks.render(this.template));
    },
    renderList: function() {
        let self = this;
        let $container = this.$el.find(".list-criteria");
        $container.empty();

        // Go through the collection items
        this.oListCriteria.forEach(function (item) {
            let criteriaView = new CriteriaController({"model": item, "parent": self});
            criteriaView.render().$el.appendTo($container);
            if (item === self.oCurrentCriteria) {
                criteriaView.__highlightCurrent();
            }
        });

        return this;
    },

    // PUBLIC
    showCriteria: function (criteria) {
        this.$el.find("#EditorPanel").html(this.oEditorCtrl.$el);
        this.oCurrentCriteria = criteria;
        this.oEditorCtrl.setCriteria(criteria);
    },
    copyCriteria: function (criteria) {
        let oCriteria = criteria.clone();
        this.oCurrentCriteria = oCriteria;
        this.oListCriteria.add(oCriteria);
        this.oEditorCtrl.setCriteria(oCriteria);
    },
    addCriteria: function () {
        let oCriteria = new Criteria();
        oCriteria.setDefaultValue();
        this.oCurrentCriteria = oCriteria;
        this.oListCriteria.add(oCriteria);
        this.oEditorCtrl.setCriteria(oCriteria);
    },
    removeCriteria: function (criteria) {
        if (criteria === this.oCurrentCriteria) {
            this.oCurrentCriteria = null;
            this.oEditorCtrl.setCriteria(null);
        }
        this.oListCriteria.remove(criteria);
    },
    sortCriteria: function () {
        let self = this;
        let aListCriteria = [];
        $(".list-criteria").find(".list-criteria-item").each(function () {
            let id = $(this).data("id");
            aListCriteria.push(self.oListCriteria.get(id));
        });
        self.oListCriteria.reset(aListCriteria);
    },

    // PRIVATE

    // EVENTS
    eventAddCriteria: function () {
        this.addCriteria();
    },
    eventListSorted: function (event, ui) {
        this.sortCriteria();
    }
});