//AJL: will need to make sure this is updated whenever the final extension is packaged.  I.E. the folder name will need to be whatever the final product name will be

var extensionName = "d3Bar";

var extensionPath = Qva.Remote + "?public=only&name=Extensions/" + extensionName +"/";


var loadPath =  Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only' + '&name=';



function Chart_Init(){
	
    Qva.AddExtension('d3Bar', function () {
    

	var jsFiles = [];
    var _this = this;
    _this.ExtSettings = {};

    console.log(_this);
    Qva.LoadCSS(loadPath + 'Extensions/d3Bar/css/style.css');

    if(typeof jQuery == 'undefined'){
    	jsFiles.push('Extensions/d3Bar/js/jquery.js');
    }

    if (!Modernizr.svg) {
        jsFiles.push('Extensions/d3Bar/js/r2d3.min.js');
    } else {
        jsFiles.push('Extensions/d3Bar/js/d3.min.js');
    }

    function InitSettings() {
        _this.ExtSettings.UniqueID = _this.Layout.ObjectId.replace('\\', '_');
        
           }

    function Init(){
        $(_this.Element).empty();
        chartcontainer = document.createElement("div");
        $(chartcontainer).attr('id','Chart_'+_this.ExtSettings.UniqueID)
        	.attr('class','chart')
        	.attr('width','100%')
        	.attr('height','100%')
        $(_this.Element).append(chartcontainer);
    }
    function InitChart() {
        var row, dataDimension, dataMeasure = 0;
        var k, q;
        var dataJson =[];
        var data = _this.Data.Rows;
        

        for (q = 0, k = _this.Data.Rows.length; q < k; q++) {
            row = _this.Data.Rows[q];
            dataDimension = row[0].text;
            dataMeasure = parseFloat(row[1].text);

            dataJson.push({
            	'id':dataDimension,
            	'data':dataMeasure
        });
        }

        var width = $(chartcontainer).width();
        var offset = 60;
        var bar_height = 20;



        var x = d3.scale.linear()
        		.domain([0, d3.max(dataJson, function(d){return d.data;})])
        		.range([0,width-offset]);

  			var chart = d3.select('#Chart_'+_this.ExtSettings.UniqueID)
  				.append('svg')
  				.attr('width',width)
  				.attr("height", bar_height * dataJson.length);


	var bar = chart.selectAll("g")
      .data(dataJson)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + (i* bar_height) + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(+d.data); })
      .attr("height", bar_height - 1);

  bar.append("text")
      .attr("x", function(d) { return x(+d.data) - 3; })
      .attr("y", bar_height / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.id; });

				

		       
        
    }

    Qv.LoadExtensionScripts(jsFiles, function () {
        InitSettings();
        Init();
        InitChart();

   	 });
    });
}

console.log(extensionPath);

//Gotta load up the Modernizr library to see if the QV Desktop or browser can handle SVGs
//@todo AJL - Rework loading up the scripts
Qva.LoadScript(extensionPath + 'js/modernizr.svg.min.js', Chart_Init());

