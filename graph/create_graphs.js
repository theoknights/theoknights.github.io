function init() {
    const $ = go.GraphObject.make;  // for conciseness in defining templates
  
    myDiagram = new go.Diagram("myDiagramDiv", {
      initialAutoScale: go.Diagram.UniformToFill,
      layout: $(go.LayeredDigraphLayout, { alignOption: go.LayeredDigraphLayout.AlignAll })
      // other Layout properties are set by the layout function, defined below
    });
  
    // define the Node template
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.TextBlock,
          {
            margin: 2,  // Adjust the margin as needed
            font: "12px sans-serif"  // Adjust the font as needed
          },
          new go.Binding("text", "text"))
      );
  
    // define the Link template to be minimal
    myDiagram.linkTemplate =
      $(go.Link,
        { selectable: false },
        $(go.Shape,
          { strokeWidth: 3, stroke: "#333" }));
  
    // Load the data from the JSON file
    loadDataFromJSON('output_data.json', rebuildGraph);
  }
  
  function loadDataFromJSON(json_file_path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        myDiagram.model = go.GraphObject.make(go.GraphLinksModel, {
          nodeDataArray: data.nodeDataArray,
          linkDataArray: data.linkDataArray
        });
        if (typeof callback === 'function') {
          callback();
        }
      }
    };
    xhr.open('GET', json_file_path, true);
    xhr.send();
  }
  
  function rebuildGraph() {
    myDiagram.startTransaction("generateDigraph");
    layout();
    myDiagram.commitTransaction("generateDigraph");
  }

  function generateDigraph(minNodes, maxNodes) {
    myDiagram.startTransaction("generateDigraph");
    // replace the diagram's model's nodeDataArray
    generateNodes(minNodes, maxNodes);
    // replace the diagram's model's linkDataArray
    generateLinks();
    // force a diagram layout
    layout();
    myDiagram.commitTransaction("generateDigraph");
  }

  // Creates a random number of randomly colored nodes.
  function generateNodes(minNodes, maxNodes) {
    var nodeArray = [];
    // get the values from the fields and create a random number of nodes within the range
    var min = parseInt(minNodes, 10);
    var max = parseInt(maxNodes, 10);
    if (isNaN(min)) min = 0;
    if (isNaN(max) || max < min) max = min;
    var numNodes = Math.floor(Math.random() * (max - min + 1)) + min;
    var i;
    for (i = 0; i < numNodes; i++) {
      nodeArray.push({
        key: i,
        text: i.toString(),
        fill: go.Brush.randomColor()
      });
    }

    // randomize the node data
    for (i = 0; i < nodeArray.length; i++) {
      var swap = Math.floor(Math.random() * nodeArray.length);
      var temp = nodeArray[swap];
      nodeArray[swap] = nodeArray[i];
      nodeArray[i] = temp;
    }

    // set the nodeDataArray to this array of objects
    myDiagram.model.nodeDataArray = nodeArray;
  }

  // Create some link data
  function generateLinks() {
    if (myDiagram.nodes.count < 2) return;
    var linkArray = [];
    var nit = myDiagram.nodes;
    var nodes = new go.List(/*go.Node*/);
    nodes.addAll(nit);
    for (var i = 0; i < nodes.count - 1; i++) {
      var from = nodes.get(i);
      var numto = Math.floor(1 + (Math.random() * 3) / 2);
      for (var j = 0; j < numto; j++) {
        var idx = Math.floor(i + 5 + Math.random() * 10);
        if (idx >= nodes.count) idx = i + (Math.random() * (nodes.count - i)) | 0;
        var to = nodes.get(idx);
        linkArray.push({ from: from.data.key, to: to.data.key });
      }
    }
    myDiagram.model.linkDataArray = linkArray;
  }

  function layout() {
    myDiagram.startTransaction("change Layout");
    var lay = myDiagram.layout;

    var direction = getRadioValue("direction");
    direction = parseFloat(direction, 10);
    lay.direction = direction;

    var layerSpacing = document.getElementById("layerSpacing").value;
    layerSpacing = parseFloat(layerSpacing, 10);
    lay.layerSpacing = layerSpacing;

    var columnSpacing = document.getElementById("columnSpacing").value;
    columnSpacing = parseFloat(columnSpacing, 10);
    lay.columnSpacing = columnSpacing;

    var cycleRemove = getRadioValue("cycleRemove");
    if (cycleRemove === "CycleDepthFirst") lay.cycleRemoveOption = go.LayeredDigraphLayout.CycleDepthFirst;
    else if (cycleRemove === "CycleGreedy") lay.cycleRemoveOption = go.LayeredDigraphLayout.CycleGreedy;

    var layering = getRadioValue("layering");
    if (layering === "LayerOptimalLinkLength") lay.layeringOption = go.LayeredDigraphLayout.LayerOptimalLinkLength;
    else if (layering === "LayerLongestPathSource") lay.layeringOption = go.LayeredDigraphLayout.LayerLongestPathSource;
    else if (layering === "LayerLongestPathSink") lay.layeringOption = go.LayeredDigraphLayout.LayerLongestPathSink;

    var initialize = getRadioValue("initialize");
    if (initialize === "InitDepthFirstOut") lay.initializeOption = go.LayeredDigraphLayout.InitDepthFirstOut;
    else if (initialize === "InitDepthFirstIn") lay.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
    else if (initialize === "InitNaive") lay.initializeOption = go.LayeredDigraphLayout.InitNaive;

    var aggressive = getRadioValue("aggressive");
    if (aggressive === "AggressiveLess") lay.aggressiveOption = go.LayeredDigraphLayout.AggressiveLess;
    else if (aggressive === "AggressiveNone") lay.aggressiveOption = go.LayeredDigraphLayout.AggressiveNone;
    else if (aggressive === "AggressiveMore") lay.aggressiveOption = go.LayeredDigraphLayout.AggressiveMore;

    //TODO implement pack option
    var i;
    var pack = document.getElementsByName("pack");
    var packing = 0;
    for (i = 0; i < pack.length; i++) {
      if (pack[i].checked) packing = packing | parseInt(pack[i].value, 10);
    }
    lay.packOption = packing;

    var setsPortSpots = document.getElementById("setsPortSpots");
    lay.setsPortSpots = setsPortSpots.checked;

    var align = document.getElementsByName("align");
    var alignOption = 0;
    for (i = 0; i < align.length; i++) {
      if (align[i].checked) alignOption = alignOption | parseInt(align[i].value, 10);
    }
    for (i = 0; i < pack.length; i++) {
      var cb = pack[i];
      cb.disabled = alignOption !== 0;
    }
    lay.alignOption = alignOption;

    myDiagram.commitTransaction("change Layout");
  }

  function getRadioValue(name) {
    var radio = document.getElementsByName(name);
    for (var i = 0; i < radio.length; i++)
      if (radio[i].checked) return radio[i].value;
  }
  window.addEventListener('DOMContentLoaded', init);