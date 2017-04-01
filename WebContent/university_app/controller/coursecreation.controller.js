sap.ui.controller("university_app.controller.coursecreation", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf university_app.coursecreation
	 */
	onInit : function() {
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS16_706_UNIVAPPL_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		this.getView().setModel(oModel);
	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf university_app.coursecreation
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf university_app.coursecreation
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf university_app.coursecreation
	 */
	// onExit: function() {
	//
	// }
	onBack : function() {
		var app = new sap.m.App({
			initialPage : this.createId("idcourse")
		});

		var page = sap.ui.view({
			id : this.createId("idcourse"),
			viewName : "university_app.view.course",
			type : sap.ui.core.mvc.ViewType.XML
		});

		app.addPage(page);
		app.placeAt("content", "only");
	},

	addCourse : function() {

		var serviceUrl = "/sap/opu/odata/sap/ZY_WS16_706_UNIVAPPL_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);

		var oNewCourse = {

			CourseId : sap.ui.getCore().byId(this.createId("courseid"))
					.getValue(),					
			CourseName : sap.ui.getCore().byId(this.createId("coursenameid"))
					.getValue(),
			CourseType : sap.ui.getCore().byId(this.createId("coursetypeid"))
					.getSelectedKey(),
			Lecturer : sap.ui.getCore().byId(this.createId("lecturerid"))
					.getValue(),
			Department : sap.ui.getCore().byId(this.createId("departmentid"))
					.getValue(),
			WeeklyHrs : parseInt(sap.ui.getCore().byId(this.createId("weeklyhoursid"))
					.getValue()),
			Content : sap.ui.getCore().byId(this.createId("contentid"))
					.getValue(),
			Prerequisites : sap.ui.getCore().byId(
					this.createId("prerequisitesid")).getValue(),
			Credits : parseInt(sap.ui.getCore().byId(this.createId("creditsid"))
					.getValue()),
			SemesterOfferedIn : sap.ui.getCore().byId(
					this.createId("semesterofferedinid")).getSelectedKey(),
			LanguageOfInstruction : sap.ui.getCore().byId(
					this.createId("languageid")).getValue(),
			Contact : sap.ui.getCore().byId(this.createId("contactid"))
					.getValue()
		}
		
		oModel.create('/CourseSet', oNewCourse, {
			success : function(oData, oResponse) {
				sap.m.MessageToast.show("New Course Added");
			},
			error : function(oError) {
				sap.m.MessageToast.show("Course with ID could not be created.");				
			}
		})

	}
});