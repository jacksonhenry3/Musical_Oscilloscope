var svg = d3.select("#oscilloscope"),
	x_scale,
	y_scale;


var t = 0
var circle = [{x:1,y:0}]



set_scale()

window.onresize = function()
{
	set_scale()
	path.datum(data).attr("d",line);
}

function set_scale()
{
	bbox = svg.node().getBoundingClientRect()
	width = bbox.width
	height = bbox.height

	scale = Math.min(width,height)

	x_scale = d3.scaleLinear()
				// .clamp(true)
    			.domain([-1, 1])
    			.range([(width-scale)/2+scale/10, (width+scale)/2-scale/10]);

    y_scale = d3.scaleLinear()
    			// .clamp(true)
    			.domain([1, -1])
    			.range([(height-scale)/2+scale/10, (height+scale)/2-scale/10]);
}

var line = d3.line()
    .x(function(d) { return x_scale(d.x); })
    .y(function(d) { return y_scale(d.y); });

data = [{x:0,y:0}]

path = svg.append("path")
      	  .datum(data)
      	  .attr('stroke-width',1	)
      	  .attr('stroke',"rgba(0,100,200,1)")
      	  .attr('fill','none')
      	  .attr("d", line);

function anim()
{
	t = t+.01


	left_analyser.getFloatTimeDomainData(left_buffer)
	right_analyser.getFloatTimeDomainData(right_buffer)

	if (circle.length <1000){
	circle.push({x:Math.cos(10*t),y:Math.sin(10*t)})}
	data.push({x:0,y:0})
	

	if (data.length > 1000)
	{
		data = data.slice(1,1001)
	}

	if (circle.length > 1000)
	{
		circle = circle.slice(1,1001)
	}

	for (var i = 0; i < data.length; i++) {
		// console.log(i)
		data[i] = {x:circle[i].x*(.5+right_buffer[right_buffer.length-i-1]),y:circle[i].y*(.5+left_buffer[left_buffer.length-i-1])}
		// data[i] = {x:circle[i].x,y:circle[i].y}
		// data[i].x = right_buffer[right_buffer.length-i-1]
	}

	// to update the line
	path.datum(data).attr("d",line);
	window.requestAnimationFrame(anim)
}

// initialize()