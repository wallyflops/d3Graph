//AJL: will need to make sure this is updated whenever the final extension is packaged.  I.E. the folder name will need to be whatever the final product name will be
var template_path = Qva.Remote + "?public=only&name=Extensions/parrallelCoordinates/";


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
	Qva.AddExtension('parrallelCoordinates', function(){ 
	
 var _this = this;
 
		//Collect data from QV______________________
		var dataset = [];
		var textset = [];
		var textset1 = [];
		var td = _this.Data;
		for (var f=0; f < td.Rows.length; f++ )		{
				var row = td.Rows[f];

				//JW - Starting with 3 dimensions, not sure if QV requires a measure so I've left that in for now.
				var dim1 = row[0].text;
				var dim2 = row[1].text;
				var measure1 = row[2].text;
				
		 		textset = textset.concat(dim1);
				textset1 = textset1.concat(dim2);
		 		dataset = dataset.concat(measure1);
		}
		//Collect data from QV END___________________
	
	//Drawing PC graph BEGIN____________	
	var m = [30, 10, 10, 10],
    w = 960 - m[1] - m[3],
    h = 500 - m[0] - m[2];	

var x = d3.scale.ordinal().rangePoints([0, w], 1),
    y = {};

var line = d3.svg.line(),
    axis = d3.svg.axis().orient("left"),
    background,
    foreground;

			
var svg = d3.select("#"+divName)
    .append("svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("g") //Group element
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
			
background = svg.append("g")
      .attr("class", "background")
    .selectAll("path")
      .data(dataset)
    .enter().append("path")
      .attr("d", path);


  // Add blue foreground lines for focus.
  foreground = svg.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(dataset)
    .enter().append("path")
      .attr("d", path);

  // Add a group element for each dimension.
  var g = svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

  // Add an axis and title.
  g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(_this).call(axis.scale(y[d])); })
    .append("svg:text")
      .attr("text-anchor", "middle")
      .attr("y", -9)
      .text(String);

  // Add and store a brush for each axis.
  g.append("g")
      .attr("class", "brush")
      .each(function(d) { d3.select(_this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

	 

})};
	    
extension_Init();


//Initiate extension
	//AJL: Embeds Firebug Lite to the qlikview screen which should be very helpful. Will need to remove once done.
 Qva.LoadScript('https://getfirebug.com/firebug-lite.js', function(){
extension_Init();
 	});
