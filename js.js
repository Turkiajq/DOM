

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
var r = document.querySelector("html");
let maxWidth = 0;

let isMoving = false;



//class node 
class HtmlNode 
{
        constructor(name, width, height, parent, element)
        {
                this.parent = parent;
                this.name = name;
                this.width = width;
                this.height = height;
                this.element = element;
                this.children = [];
                this.visiabilty = true;
                this.attrbutesShown = false;
        }

        addChild(child)
        {
                this.children.push(child);
        }

        setLocaton(x, y)
        {
                this.x = x;
                this.y = y;
                this.headX = x;
                this.headY = y - this.height;
                this.tailX = x;
                this.tailY = y + this.height;
        }

        drawNode()
        {
                //root or visiable
                if(this.parent == null || this.parent.visiabilty)
                {
                        //text type is drawn in rectangle
                        if(this.element.nodeType == 3 && this.element.nodeValue.trim() != "")
                        {
                                this.name = this.element.nodeValue;
                                context.beginPath();
                                context.rect(this.x - 30, this.y -30, this.width * 2, this.height * 2);
                                context.stroke();
                                context.beginPath();
                                context.fillText(this.name, this.x - (this.width / 2), this.y, this.width);
                                context.stroke();
                        
                                //console.log(this.element.nodeValue);
                        }
                        else //other types are drawn in circles
                        {
                               
                                

                                // draw (+ and -) buttons if the node has children
                                if(this.element.childNodes.length > 0)
                                {
                                        context.beginPath();
                                        context.fillStyle = "#008000";
                                        context.fillRect(this.x - 45, this.y+15, 10, 10);
                                        context.fillStyle = "#000000";
                                        context.fillText("+", this.x - 43, this.y+23, 50);
                                        context.stroke();  

                                        context.beginPath();
                                        context.fillStyle = "#FF6666";
                                        context.fillRect(this.x - 45, this.y+3, 10, 10);
                                        context.fillStyle = "#000000";
                                        context.fillText("-", this.x - 42, this.y+12, 50);
                                        context.stroke();  
                                }
                                if(this.element.nodeType != 3)
                                {
                                        context.beginPath();
                                        context.arc(this.x, this.y, this.width, 0, 360, false);
                                        context.stroke();
                                        context.beginPath();
                                        context.fillText(this.name, this.x - (this.width / 2), this.y, this.width);
                                        context.stroke();
                                        //draw attr button if node has attrs
                                        context.beginPath();
                                        if(this.element.hasAttributes())
                                        {
                                                var attrX = this.x - 50;
                                                var attrY = this.y-20; 
                                                
                                                context.arc(attrX +5, attrY+5, 1, 0, 360, false);
                                                context.arc(attrX +10, attrY+5, 1, 0, 360, false);
                                                context.arc(attrX +15, attrY+5, 1, 0, 360, false);
                                                context.fillStyle = 'black';
                                                context.fill();
                                                context.rect(attrX, attrY, 20, 10);
                                               

                                        }
                                        if(this.attrbutesShown)
                                        {
                                                //context.globalAlpha = 0.9;
                                                //context.fill();

                                                // context.fillStyle = 'green';
                                                // context.fillRect(attrX-100, attrY-100, 100, 100);
                                                
                                        }
                                        context.stroke();
                                }
                        }
                        //downloads button
                        context.beginPath();
                        context.rect(20, 20, 100, 20);
                        context.font = "15px Arial";
                        context.fillText("DOWNLOAD", 25, 35);
                        context.stroke();
                }
                
        }

        

        //make the node and its children appear on (+) click
        showNode(node)
        {
                //show node
                this.visiabilty = true;
                //show its children
                for (const n of node.children) {
                       n.visiabilty = true; 
                       if(n.children.length > 0)
                       {
                               this.showNode(n);
                       }
                }
        }

        hideNode(node)
        {
                this.visiabilty = false;
                        for (const n of node.children) {
                               n.visiabilty = false; 
                               if(n.children.length > 0)
                               {
                                       this.hideNode(n);
                               }
                        }
        }

        expandClicked(x, y)
        {
                var leftEdge = this.x -45;
                var rightEdge = (this.x -45) + 10;
                var topEdge = (this.y + 23) - 10;
                var bottomEdge = (this.y + 23) + 5;
                if(x > (leftEdge) && x < rightEdge && y > topEdge && y < bottomEdge)
                {
                        this.showNode(this);
                        context.clearRect(0,0,canvas.width,canvas.height);
                        setDistance();
                        console.log("clicked");

                        //expand if not, and change button to shrink (-)
                        //shrink if expand, and change button to expand (+)
                        
                }
        }
        shrinkClicked(x, y)
        {
                var leftEdge = this.x -45;
                var rightEdge = (this.x -45) + 10;
                var topEdge = (this.y + 12) - 10;
                var bottomEdge = (this.y + 3) + 10;  
                if(x > (leftEdge) && x < rightEdge && y > topEdge && y < bottomEdge)
                {
                        this.hideNode(this);
                        context.clearRect(0,0,canvas.width,canvas.height);
                        setDistance();
                        console.log("clicked");
                        //expand if not, and change button to shrink (-)
                        //shrink if expand, and change button to expand (+)
                        
                }     
        }

        showAttributes()
        {
                
        }

        attributesClicked(x, y)
        {
                var attrX = this.x - 50;
                var attrY = this.y-20; 

                if(x > attrX && x < (attrX +20) && y > attrY && y < (attrY + 10))
                {
                        /////////
                        
                        var s = "";
                        for (const key of this.element.getAttributeNames()) 
                        {
                                s += key + " " + this.element.getAttribute(key) + "\n";
                        }
                        alert(s);
                        /////////
                        if(this.attrbutesShown)
                        {
                                this.attrbutesShown = false;
                        }
                        else
                        {
                                this.attrbutesShown = true;
                               
                        }
                        context.clearRect(0,0,canvas.width,canvas.height);
                        setDistance();
                        console.log(this.element.getAttributeNames());
                        
                }
        }

        mouseHover(x, y)
        {
                if(x > this.x -25 && x < (this.x + 30) && y > this.y -30 && y < (this.y + 30))
                { 
                        if(this.element.innerHTML.length > 0)
                        {
                                alert(this.element.innerHTML);
                        }
                        
                }
        }

        doubleClicked(x, y)
        {
                if(x > this.x -25 && x < (this.x + 30) && y > this.y -30 && y < (this.y + 30))
                { 
                        var input = prompt("Please Enter a Tag Name:", "");
                        if(input.length > 0)
                        {
                                var node = document.createElement(input);
                                let n = new HtmlNode(input, 30, 30, this, node);
                
                                
                                this.element.appendChild(node);
                                this.addChild(node);
                                context.clearRect(0,0,canvas.width,canvas.height);
                                levels = [];
                                levels.push([root]);
                                GenerateLevel();
                                setDistance();
                        }
                }
        }

        mouseDown(x, y)
        {
                if(x > this.x -25 && x < (this.x + 30) && y > this.y -30 && y < (this.y + 30))
                { 
                        isMoving = true;
                        console.log("jgug");

                }

        }
}

var root = new HtmlNode(r.tagName, 30, 30, null, r);


//connect two nodes
function connectNodes(node1, node2)
{
        //this.element.nodeType == 3 && this.element.nodeValue.trim() != ""
        if(node2.element.nodeType == 3)
        {
                if(node2.element.nodeValue.trim() != "")
                {
                        if(node1.visiabilty)
                {
                        context.beginPath();
                        context.moveTo(node1.tailX, node1.tailY);
                        context.lineTo(node2.headX, node2.headY);
                        context.stroke();
                }
                }
        }
        else
        {
                if(node1.visiabilty)
                {
                        context.beginPath();
                        context.moveTo(node1.tailX, node1.tailY);
                        context.lineTo(node2.headX, node2.headY);
                        context.stroke();
                        //console.log(node1.element.hasAttributes());
                }
        }
}

var levels = [];
levels.push([root]);

function setAttrs()
{
        for (let level of levels) 
        {
                for (let node of level) 
                {
                        if(node.element.hasAttributes())
                        {
                                for (const attr of node.element.getAttributeNames()) {
                                 node.setAttributes(attr);
                                }
                                
                        }
                }  
        }  
}

function GenerateLevel() 
{
        this.levels.push([]);
        let index = this.levels.length - 1;
        let previousLevel = this.levels[index - 1];
        for(let parent of previousLevel) {
            for(let child of parent.element.childNodes) {
                let node = new HtmlNode(child.tagName, 30, 30, parent, child);
                
                parent.addChild(node);
                levels[index].push(node);
            }
        }
        if(levels[levels.length - 1].length == 0) {
            //canvas.width = maxWidth;
            //canvas.height = levels.length * (nodeSize + margin);
            levels.pop();
        } 
        else 
        {
            let levelWidth = levels[levels.length - 1].length * 200; // * (this.nodeSize + this.margin);
            if(maxWidth < levelWidth) 
            {
                maxWidth = levelWidth;
            }
            GenerateLevel();
        }
        //setAttrs();
}

// get all nodes and replace them in relevant level
GenerateLevel();

function setDistance()
{
        let h = 0;
        let p = -1;  
        for (let level of levels) 
        {
                h++;
              let distance = maxWidth / (level.length + 1);
              let p = 0;
              for (let node of level) 
              {
                p++;
                      //root
                      if(node.parent == null)
                      {
                        node.setLocaton(maxWidth / 2, 100 * h);
                        node.drawNode();
                      }
                      else
                      {
                        
                        node.setLocaton(p * distance, 300 * h);
                        node.drawNode();
                        connectNodes(node.parent, node);
                      }
              }  
        }
}





// set the location (x and y) of the root node 
//root.setLocaton(100, 100);

//set the size of the canvas 
canvas.width = maxWidth;
canvas.height = levels.length * 300 + 100;

// set the distance between nodes depending on the max width 
setDistance();


//event listener and handlers 
function getMousePosition(canvas, event) 
{
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
}

canvas.addEventListener('click', function(evt) 
{
        var mousePosision = getMousePosition(canvas, evt);
        for (let level of levels) 
        {
                for (let node of level) 
                {
                      node.expandClicked(mousePosision.x, mousePosision.y);
                      node.shrinkClicked(mousePosision.x, mousePosision.y);
                      node.attributesClicked(mousePosision.x, mousePosision.y);
                }  
        }
        checkSave(mousePosision.x, mousePosision.y);
}, false);

function checkSave(x, y)
{
        if(x > 20 && x < 120 && y > 20 && y < 40)
                {
                var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
                window.location.href=image; 
        }
}

canvas.addEventListener('mousemove', function(event) {
        var mousePosision = getMousePosition(canvas, event);
        for (let level of levels) 
        {
                for (let node of level) 
                {
                      node.mouseHover(mousePosision.x, mousePosision.y);
                }  
        }
      });
      
canvas.addEventListener('dblclick', function (event) {
        var mousePosision = getMousePosition(canvas, event);
        for (let level of levels) 
        {
                for (let node of level) 
                {
                      node.doubleClicked(mousePosision.x, mousePosision.y);
                }  
        }
});

canvas.addEventListener('mousedown', function(event) {
        var mousePosision = getMousePosition(canvas, event);
        for (let level of levels) 
        {
                for (let node of level) 
                {
                      node.mouseDown(mousePosision.x, mousePosision.y);
                      
                }  
        }
      });

      canvas.addEventListener('mouseup', function(event) {
        //var mousePosision = getMousePosition(canvas, event);
        isMoving = false;
      });