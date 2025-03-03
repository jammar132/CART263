class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; // Full rotation
    this.context = context;
  }

  display() {
    this.context.fillStyle = this.fill_color; // Change the color we are using
    this.context.strokeStyle = this.stroke_color; // Change the color we are using
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true
    );
    this.context.fill(); // Set the fill
    this.context.lineWidth = 2; // Change stroke
    this.context.closePath();
    this.context.stroke();
  }

  update(mouseX, mouseY) {
    // Move towards the mouse cursor by a step of 1 pixel
    this.x += (mouseX - this.x) * 0.05;
    this.y += (mouseY - this.y) * 0.05;
  }
}

