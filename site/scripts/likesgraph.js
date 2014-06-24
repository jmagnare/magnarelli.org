// Returns a list of all nodes under the root.
function flatten(root) {
    var nodes = [], i = 0;

    function recurse(node) {
        if (node.children) {node.children.forEach(recurse)};
        if (!node.id) node.id = ++i;
        nodes.push(node);
    }

    recurse(root);
    return nodes;
}

// Toggle children on click.
function click(d) {
    if (d3.event.defaultPrevented) return; // ignore drag
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update();
}

function update() {
    var nodes = flatten(root);
    var links = d3.layout.tree().links(nodes);
    force
        .nodes(nodes)
        .links(links)
        .start();
    link = link.data(links, function(d) {return d.target.id});
    link.exit().remove();
    link
        .enter().insert('line')
        .attr('class', 'link')
        .attr('stroke-width', function(d) {return Math.sqrt(d.value);});
/*
    var node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('g')
        .attr('class', 'node')
        .on('click', click)
        .call(force.drag);


    node.append('circle')
        .attr('class', 'node')
        .attr('r', 5)
        .style('fill', function(d) { return color(d.group)});

    node.append('text')
        .attr('dx', 12)
        .attr('dy', '.35em')
        .text(function(d) { return d.name });
  */
    // Update nodes.
    node = node.data(nodes, function(d) { return d.id; });

    node.exit().remove();

    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .on("click", click)
        .call(force.drag);

    nodeEnter.append("circle")
        .attr('class', 'node')
        .attr('r', 5)
        .style('fill', function(d) { return color(d.group)});

    nodeEnter.append("text")
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });

    // Draw the "you can click me!" circles
    node.select("circle")
        .style("stroke", "#000000")
        .style("stroke-width", getStrokeWidth);

}

function getStrokeWidth(d) {
    if (d._children) {
        return 2;
    }
    else
    {
        return 0;
    }
}
function tick() {
    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

    node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });

}
  /*
function build_links(node) {
    var links = [];

    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            var n = node.children[i];
            links.push({'source':node, 'target': n});
            links.push.apply(build_links(n));
        }
    }
    return links;
}
*/
var width = 960,
    height = 500

var svg = d3.select('#d3').append('svg')
    .attr('width', width)
    .attr('height', height);
var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");



var force = d3.layout.force()
    .gravity(.005)
    .distance(100)
    .charge(-100)
    .on("tick",tick)
    .size([width, height]);
var color = d3.scale.category20();

d3.json('misc/likes.json', function(json, error) {
    root = json;
    update();
});