sap.ui.controller("university_app.controller.allot", {

/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf university_app.allot
 */
	onInit: function() {
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS16_706_UNIVAPPL_SRV/";		
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		this.getView().setModel(oModel);		
	},	
	

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf university_app.allot
 */
// onBeforeRendering: function() {
//
// },

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf university_app.allot
 */
// onAfterRendering: function() {
//	 
//		
// },

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf university_app.allot
 */
// onExit: function() {
//
// }
	
	navigate : function(evt){
		var viewlink = "university_app.view."+ evt.getSource().data("link");
		var viewid = "id"+evt.getSource().data("link");
		
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
	},
	
	cancelBooking : function(e){

		var oModel = this.getView().getModel();
		var sPath = e.getSource().getBindingContext().getPath();
		
		sap.m.MessageBox.confirm("Confirm Delete",{
			onClose : function(oAction){
				if(oAction=="OK"){
					oModel.remove(sPath, {
					  method: "DELETE",
					  success: function(data) {
						  sap.m.MessageToast.show("Entry Deleted.");  
					  },
					  error: function(e) {
						  sap.m.MessageToast.show("Error deleting.");
					  }
					});
				}
			}
		});			
			
	},
	
	editBooking : function(e){
		var oModel = this.getView().getModel();
		var sPath = e.getSource().getBindingContext().getPath();
		
		var obj = oModel.getProperty(sPath);
		
		var cancelButton = new sap.m.Button({
			text : "Cancel",
			type : sap.m.ButtonType.Reject,
			press : function(){
				sap.ui.getCore().byId("Popup").destroy();
			}
		})
		var saveButton = new sap.m.Button({
			text : "Save",
			type : sap.m.ButtonType.Accept,
			press : function() {
				var serviceURL = "/sap/opu/odata/sap/ZY_WS16_706_UNIVAPPL_SRV/";
				var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
				
				var oUpdateBooking = {
						AllotKey : obj.AllotKey,
						AllotmentDate : sap.ui.getCore().byId("AllotmentDatePopup").getValue(),										
						RoomId : sap.ui.getCore().byId("RoomIdPopup").getValue(),
						CourseId : sap.ui.getCore().byId("CourseIdPopup").getValue(),
						TimeFrom : sap.ui.getCore().byId("TimeFromPopup").getValue(),
						TimeTo : sap.ui.getCore().byId("TimeToPopup").getValue(),						
				};
				
				
				oModel.update(sPath,oUpdateBooking,false, function(oData, oResponse){
						sap.m.MessageToast.show("Allotment Updated");
						sap.ui.getCore().byId("Popup").destroy();
					},function(oError){
						sap.m.MessageToast.show("Room with ID already exists.");						
					}
				);				
				
				sap.m.MessageToast.show("Allotment Updated. You may have to refresh the page");
				sap.ui.getCore().byId("Popup").destroy();
				oModel.refresh(true);
				
			}
		})
		
		var oDialog = new sap.m.Dialog("Popup",{
			title : "Edit Booking",
			modal : true,
			contentWidth : "1em",
			buttons : [saveButton , cancelButton],
			content : [ 
			            new sap.m.Label({
			            	text : "Date"
						}), new sap.m.Input({
							id : "AllotmentDatePopup",
							placeholder : "e.x. 01/01/2016"							
						}),new sap.m.Label({
			            	text : "Room ID"			            	
						}), new sap.m.Input({
							id : "RoomIdPopup",
							placeholder : "e.x. A101"
						}),new sap.m.Label({
			            	text : "Course ID"
						}), new sap.m.Input({
							maxLength : 20,
							id : "CourseIdPopup",							
							placeholder : "e.x. C101"
						}),new sap.m.Label({
			            	text : "Time From"
						}), new sap.m.Input({
							id : "TimeFromPopup",
							placeholder : "e.x. 12:00"
						}),new sap.m.Label({
			            	text : "Time To"
						}), new sap.m.Input({
							id : "TimeToPopup",
							placeholder : "e.x. 13:00"
						})
			            ]
		});
		
		sap.ui.getCore().byId("Popup").open();
		
	}

});