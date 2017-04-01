sap.ui.controller("university_app.controller.roomaddition", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf university_app.roomaddition
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
	 * @memberOf university_app.roomaddition
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf university_app.roomaddition
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf university_app.roomaddition
	 */
	// onExit: function() {
	//
	// }
	onBack : function() {
		var app = new sap.m.App({
			initialPage : this.createId("idroom")
		});

		var page = sap.ui.view({
			id : this.createId("idroom"),
			viewName : "university_app.view.room",
			type : sap.ui.core.mvc.ViewType.XML
		});

		app.addPage(page);
		app.placeAt("content", "only");
	},

	addRoom : function() {
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS16_706_UNIVAPPL_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		
		var oNewRoom = {

			RoomId : sap.ui.getCore().byId(this.createId("roomid")).getValue(),
			Location : sap.ui.getCore().byId(
					this.createId("roomlocationid")).getValue(),
			Capacity : sap.ui.getCore().byId(this.createId("capacityid"))
					.getValue(),
			RoomType : sap.ui.getCore().byId(this.createId("roomtypeid"))
					.getSelectedKey(),
			Projector : sap.ui.getCore().byId(this.createId("projectorid"))
					.getSelectedKey(),
			Whiteboard : sap.ui.getCore().byId(this.createId("whiteboardid"))
					.getSelectedKey(),
			Workstations : sap.ui.getCore().byId(
					this.createId("workstationsid")).getSelectedKey(),
			AirCondition : sap.ui.getCore().byId(
					this.createId("airconditionid")).getSelectedKey()
		}
		
		oModel.create('/RoomSet',oNewRoom, {
			success : function(oData, oResponse){
				sap.m.MessageToast.show("New Room Added");
			},
			error : function(oError){
				sap.m.MessageToast.show("Error creating new room.");				
			}
		});

	}
});