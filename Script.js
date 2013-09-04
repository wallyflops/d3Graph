var template_path = Qva.Remote + "?public=only&name=Extensions/jamesExt/";

function extension_Init() {
if( typeof jQuery == 'undefined') {
	Qva.LoadScript('/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/jamesExt/jquery.js', function() {
		Qva.LoadScript('/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/jamesExt/d3.js', function() {
			Qva.LoadScript('/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/jamesExt/d3.layout.cloud.js', extension_Done);
		});
	});
} else {
	Qva.LoadScript('/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/jamesExt/d3.js', function() {
		Qva.LoadScript('/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/jamesExt/d3.layout.cloud.js', extension_Done);
	});
}
}
function extension_Done(){
	Qva.AddExtension('jamesExt', function(){
		//Qva.LoadCSS(template_path + "style.css");
		var _this = this;
		
		//get first text box
		//var text1 = _this.Layout.Text0.text.toString();
		//get check box value
		//var checkbox1 = _this.Layout.Text1.text.toString();
		//var select = _this.Layout.Text2.text.toString();
		
		//add a unique name to the extension in order to prevent conflicts with other extensions.
		//basically, take the object ID and add it to a DIV
		var divName = _this.Layout.ObjectId.replace("\\", "_");
		if(_this.Element.children.length == 0) {//if this div doesn't already exist, create a unique div with the divName
			var ui = document.createElement("div");
			ui.setAttribute("id", divName);
			_this.Element.appendChild(ui);
		} else {
			//if it does exist, empty the div so we can fill it again
			$("#" + divName).empty();
		}
		//ATN: The below 2 lines will show you a demo- writing HTML into the extension box.
		//var html = "test html";
		//$("#" + divName).html(html);
		
		
		//The below line is where are problem is- this isn't getting displayed in any way, shape or form and I'm
		//very unsure how to debug.
	   //d3.select("#" + divName).append("svg").attr("width", _this.GetWidth()).attr("height", _this.GetHeight()).data(_this_Data).enter().append("rect").attr("x",1).attr("y",25);
		
	    
	});
}
//Initiate extension
extension_Init();

