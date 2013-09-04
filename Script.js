var template_path = Qva.Remote + "?public=only&name=Extensions/jamesExt/";
function extension_Init()
{
	// Use QlikView's method of loading other files needed by an extension. These files should be added to your extension .zip file (.qar)
	if (typeof jQuery == 'undefined') {
	    Qva.LoadScript(template_path + 'd3.js', extension_Done);
	}
	else {
	    extension_Done();
	}        
    
    //If more than one script is needed you can nest the calls to get them loaded in the correct order
    //Qva.LoadScript(template_path + "file1.js", function() {
    //Qva.LoadScript(template_path + "file2.js", extension_Done);
    //});

}
/*	//UNCOMMENT THIS BLOCK OF CODE TO ENABLE SELECT BOXES IN PROPERTIES
	if (Qva.Mgr.mySelect == undefined) {
    Qva.Mgr.mySelect = function (owner, elem, name, prefix) {
        if (!Qva.MgrSplit(this, name, prefix)) return;
        owner.AddManager(this);
        this.Element = elem;
        this.ByValue = true;
 
        elem.binderid = owner.binderid;
        elem.Name = this.Name;
 
        elem.onchange = Qva.Mgr.mySelect.OnChange;
        elem.onclick = Qva.CancelBubble;
    }
    Qva.Mgr.mySelect.OnChange = function () {
        var binder = Qva.GetBinder(this.binderid);
        if (!binder.Enabled) return;
        if (this.selectedIndex < 0) return;
        var opt = this.options[this.selectedIndex];
        binder.Set(this.Name, 'text', opt.value, true);
    }
    Qva.Mgr.mySelect.prototype.Paint = function (mode, node) {
        this.Touched = true;
        var element = this.Element;
        var currentValue = node.getAttribute("value");
        if (currentValue == null) currentValue = "";
        var optlen = element.options.length;
        element.disabled = mode != 'e';
        //element.value = currentValue;
        for (var ix = 0; ix < optlen; ++ix) {
            if (element.options[ix].value === currentValue) {
                element.selectedIndex = ix;
            }
        }
        element.style.display = Qva.MgrGetDisplayFromMode(this, mode);
 
    }
}*/
function extension_Done(){
	//Add extension
	Qva.AddExtension('jamesExt', function(){
		//Load a CSS style sheet
		Qva.LoadCSS(template_path + "style.css");
		var _this = this;
		//get first text box
		var text1 = _this.Layout.Text0.text.toString();
		//get check box value
		var checkbox1 = _this.Layout.Text1.text.toString();
		var select = _this.Layout.Text2.text.toString();
		
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
		//create a variable to put the html into
		var html = "test html";
		//$("#" + divName).html(html);

	   d3.select("#" + divName).append("svg").attr("width", _this.GetWidth()).attr("height", _this.GetHeight()).data(_this_Data).enter().append("rect").attr("x",1).attr("y",25);
		
	    
	});
}
//Initiate extension
extension_Init();

