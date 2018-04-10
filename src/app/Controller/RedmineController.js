const Backbone = require("backbone");
const lodash = require("lodash");
const nunjucks = require("nunjucks");

module.exports = Backbone.View.extend({
    "el": "#RedmineContainer",
    "template": "RedmineView.twig",

    // DATA
    parent: null,
    oListCriteria: null,
    oProjects: null,
    oGroups: null,
    oUsers: null,

    events: {
        "click .btnCreateIssue": "eventClickBtnCreateIssue"
    },

    initialize: function (options) {
        this.oListCriteria = null;
        this.oProjects = null;
        this.oGroups = null;
        this.oUsers = null;
        this.parent = lodash.get(options, "parent", null);
    },
    render: function () {
        this.$el.html(nunjucks.render(this.template, {"item": ""}));
        return this;
    },

    // PUBLIC
    setModel: function (oListCriteria) {
        this.oListCriteria = oListCriteria;
        this.loadInterfaceData();
    },
    loadInterfaceData: function () {
        let self = this;

        $.when(self.__loadProjectList(), self.__loadGroupList(), self.__loadUserList()).done(function (oProjects, oGroups, oUsers) {
            self.oProjects = oProjects;
            self.oGroups = oGroups;
            self.oUsers = oUsers;

            self.render();
        });
    },

    // PRIVATE
    __loadProjectList: function () {
        return $.getJSON("/projects.json");
    },
    __loadGroupList: function () {
        return $.getJSON("/groups.json");
    },
    __loadUserList: function () {
        return $.getJSON("/users.json");
    },

    // EVENTS
    eventClickBtnCreateIssue: function () {
        $.post("/issues.json", {
            "issue": {
                "project_id": 1,
                "subject": "Example",
                "priority_id": 4,
                "description": 4,
                "assigned_to_id": 4,
                "parent_issue_id": 4,
                "estimated_hours": 4,
                "watcher_user_ids": 4
            }
        }).done(function () {
            console.log(arguments);
        }).fail(function () {
            console.log(arguments);
        });
    },

});