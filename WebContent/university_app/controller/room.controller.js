sap.ui.controller("university_app.controller.room", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf university_app.room
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
	 * @memberOf university_app.room
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf university_app.room
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf university_app.room
	 */
	// onExit: function() {
	//
	// }
	navigate : function(evt) {
		var viewlink = "university_app.view." + evt.getSource().data("link");
		var viewid = "id" + evt.getSource().data("link");

		var app = new sap.m.App({
			initialPage : this.createId(viewid)
		});

		var page = sap.ui.view({
			id : this.createId(viewid),
			viewName : viewlink,
			type : sap.ui.core.mvc.ViewType.XML
		});

		app.addPage(page);
		app.placeAt("content", "only");
	}
});