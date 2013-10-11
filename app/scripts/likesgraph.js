$(document).ready(function() {
    var sigRoot = document.getElementById('sig');
    var sigInst = sigma.init(sigRoot).drawingProperties({
        defaultLabelColor: '#fff',
        defaultLabelSize: 14,
        defaultLabelBGColor: '#fff',
        defaultLabelHoverColor: '#000',
        labelThreshold: 6,
        defaultEdgeType: 'curve'
    }).graphProperties({
            minNodeSize: 0.5,
            maxNodeSize: 5,
            minEdgeSize: 1,
            maxEdgeSize: 1,
            sideMargin: 50
        }).mouseProperties({
            maxRatio: 32
        });
          /*
    sigInst.addNode('hello',{
        label: 'Hello',
        color: '#ff0000',
        x: 1
    }).addNode('world',{
            label: 'World !',
            color: '#00ff00',
            x: 2
        }).addEdge('hello_world','hello','world').draw();
        */
    sigInst.parseGexf('misc/likes.gexf');
    sigInst.draw();
});