//AJL: will need to make sure this is updated whenever the final extension is packaged.  I.E. the folder name will need to be whatever the final product name will be
var template_path = Qva.Remote + "?public=only&name=Extensions/d3Bar/";


function extension_Init()
{ 
	//jQuery not defined, so load the jQuery.js
	if (typeof jQuery == 'undefined') {
	
	   	Qva.LoadScript(template_path+'jquery.js',function() {
	   		Qva.LoadScript(template_path+'json2.js',function() {
				Qva.LoadScript(template_path+'d3.v3.min.js', extension_Done());
			});
		});
	}
	else {		  
	   		Qva.LoadScript(template_path+'json2.js',function() {
	   				Qva.LoadScript(template_path+'d3.v3.min.js', extension_Done());
		});
	}        
    	

    //If more than one script is needed you can nest the calls to get them loaded in the correct order
    //Qva.LoadScript(template_path + "file1.js", function() {
    //Qva.LoadScript(template_path + "file2.js", extension_Done);
    //});

}
	//UNCOMMENT THIS BLOCK OF CODE TO ENABLE SELECT BOXES IN PROPERTIES
	
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
}


//Beginning of function extension_Done. Called once the javascripts are done loading in the document

function extension_Done() {
	Qva.AddExtension('d3Bar', function(){
		Qva.LoadCSS(template_path + "style.css");
		var _this = this;
		
		//get first text box
		//var text1 = _this.Layout.Text0.text;
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
		//ATN: The below 2 lines will show you a demo- writing HTML into the extension box.
		//var html = "test html";
		//$("#" + divName).html(html);


		//Data Elements	
		var dataset = [];
		var textset = [];
		var td = _this.Data;
		for (var f=0; f < td.Rows.length; f++ )		{
				var row = td.Rows[f];

				//Dimension 1 : Defined in the Definition.xml
				var dim1 = row[0].text;
				//Dimension 2 : Defined in the Definition.xml

				var measure1 = row[1].text;
				
		 		textset = textset.concat(dim1);
		 		dataset = dataset.concat(measure1);
		}
		

		 
		var left_width = 100;
		var width = _this.GetWidth()-(left_width*2);
		var bar_height = 15;
		var height = _this.GetHeight() - 5;

		var gap = 2;
		var x, y;
		
		x = d3.scale.linear()
		   .domain([0, d3.max(dataset)])
		   .range([0, width]);

		y = d3.scale.ordinal()
		   .domain(dataset)
		   .rangeBands([0, (bar_height+2 * gap) * dataset.length]);

		

		//Starting the Chart definition

		chart = d3.select("#"+divName)
			.append("svg")
			.attr('width',width)
			.attr('height',height)
			.append("g")
			.attr("transform","translate(10,20)");

		chart.selectAll("rect")
			.data(dataset)
			.enter().append("rect")
			.attr("x",left_width)
			.attr("y", function(d) {return y(d) + gap;})
			.attr("width",x)
			.attr("height",bar_height)
			.attr("fill", function(d) {
					return "rgb(0, 0, " + (y(d) * 10) + ")";
			   });

	  	chart.selectAll("text.name")
		    .data(textset)
		    .enter().append("text")
		    .attr("x", left_width / 2)
		    .attr("y", function(d, i){ return y(d) + y.rangeBand()/2; } )
		    .attr("dy", ".36em")
		    .attr("text-anchor", "middle")
		    .attr('class', 'name')
		    .text(String);
	 
	 	chart.selectAll("text.score")
		    .data(dataset)
		    .enter().append("text")
		    .attr("x", function(d) { return x(d) + left_width; })
		    .attr("y", function(d, i){ return y(d) + y.rangeBand()/2; } )
		    .attr("dx", -5)
		    .attr("dy", ".36em")
		    .attr("text-anchor", "end")
		    .attr('class', 'score')
		    .attr('fill','white')
		    .text(String);


		//The below line is where are problem is- this isn't getting displayed in any way, shape or form and I'm
		//very unsure how to debug.
	//d3.select("#" + divName).append("svg").attr("width", _this.GetWidth()).attr("height", _this.GetHeight()).data(data).enter().append("rect").attr("x",1).attr("y",25);


	    
	});
}
//Initiate extension
	//AJL: Embeds Firebug Lite to the qlikview screen which should be very helpful. Will need to remove once done

 Qva.LoadScript('https://getfirebug.com/firebug-lite.js', function(){


extension_Init();
 	});
