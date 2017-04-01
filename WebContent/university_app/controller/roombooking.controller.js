sap.ui.controller("university_app.controller.roombooking", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf university_app.roombooking
*/
	onInit: function() {
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS16_706_UNIVAPPL_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		this.getView().setModel(oModel);		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf university_app.roombooking
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf university_app.roombooking
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf university_app.roombooking
*/
//	onExit: function() {
//
//	}
	onBack : function(){
		var app = new sap.m.App({
			initialPage : this.createId("idallot")
		});
		
		var page = sap.ui.view({
			id : this.createId("idallot"),
			viewName : "university_app.view.allot",
			type : sap.ui.core.mvc.ViewType.XML
		});
		
		app.addPage(page);
		app.placeAt("content","only");
	},
	
	confirmBooking : function(){
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS16_706_UNIVAPPL_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		
		var courseid = sap.ui.getCore().byId(this.createId("CourseId")).getSelectedKey();
		var roomid = sap.ui.getCore().byId(this.createId("RoomId")).getSelectedKey();
		var allotmentdate = sap.ui.getCore().byId(this.createId("AllotmentDate")).getValue();
		var timefrom = sap.ui.getCore().byId(this.createId("TimeFrom")).getValue();
		var timeto = sap.ui.getCore().byId(this.createId("TimeTo")).getValue();
		
		var formattedallotmentdate = allotmentdate.replace("/", '');
		var formattedtimefrom = timefrom.replace(":","");
		var formattedtimeto = timeto.replace(":","");
		
		var allotkey = courseid+roomid+formattedallotmentdate.replace("/", '')+formattedtimefrom+formattedtimeto;
		
		var oNewAllot = {
				AllotKey : allotkey,
				CourseId : courseid,
				RoomId : roomid,
				AllotmentDate : allotmentdate,
				TimeFrom : timefrom,
				TimeTo : timeto
		};
		
		oModel.create('/AllotSet',oNewAllot, {
			success : function(oData, oResponse){
				sap.m.MessageToast.show("New Booking Confirmed");
			},
			error : function(oError){
				sap.m.MessageToast.show("Error creating new booking");				
			}
		})
		
	}
});