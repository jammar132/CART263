class DrawingBoard {
  /* Constructor */
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    // Each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });

    // Adding right-click listener to handle object removal
    this.canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault(); // Prevent the default context menu
      self.rightClickCanvas(e);
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);
    // Differentiate which canvas
    
    if (this.drawingBoardId === "partA") {
      console.log("in A")
      this.objectsOnCanvas.forEach(obj => obj.update(this.mouseOffsetX, this.mouseOffsetY));
      this.animate();
    }
  }

  clickCanvas(e) {
    //console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);
    // Differentiate which canvas
    if (this.drawingBoardId === "partA") {
      console.log("in A");
      const radius = 20; // You may want to use a fixed or random radius
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      this.addObj(new CircularObj(this.mouseOffsetX, this.mouseOffsetY, radius, color, '#000', this.context));
      this.display(); // Re-draw to show new object
    }
  }

  rightClickCanvas(e) {
    // Handle right-click to remove objects
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    const x = parseInt(e.clientX - this.canvasBoundingRegion.x);
    const y = parseInt(e.clientY - this.canvasBoundingRegion.y);
    // Remove objects if right-clicked on them
    this.objectsOnCanvas = this.objectsOnCanvas.filter(obj => 
      Math.sqrt(Math.pow(obj.x - x, 2) + Math.pow(obj.y - y, 2)) > obj.radius
    );
    this.display(); // Re-draw to show the updated set of objects
  }

  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to display objects on canvas */
  display() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objectsOnCanvas.forEach(obj => obj.display());
  }

  /* method to animate objects on canvas */
  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objectsOnCanvas.forEach(obj => {
      obj.display(); // Ensure each object is redrawn
    });
  }

  run(videoElement) {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }
  }
}
