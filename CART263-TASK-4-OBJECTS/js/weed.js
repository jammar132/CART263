/** TEAM D -- WEEDS
 * 1/ Create a  file to hold a  Weed Class (i.e. Weed.js)
 * 2/ Create the Weed Class : a constructor which takes a position, size and color as parameters
 * 3/ Create a renderWeed() method -> which essentially creates a HTML element(s) - could be
 * an image element :) or an svg .... representing a Weeds... (see Sun or Flower for inspiration)
 * 4/ Add a key event listener (in garden.js) such that when the SPACE bar is pressed - a new weed will be added to the garden.
 * 5/ In garden.js add initially  a couple of weeds (in an array) - 
 * 6/ Ensure that new weeds can be added to the garden.
 * 
*/
class Weed {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
  
      // Main container
      this.weedDiv = document.createElement("div");
      this.weedDiv.style.position = "absolute";
      this.weedDiv.style.left = this.x + "px";
      this.weedDiv.style.top = this.y + "px";
      this.weedDiv.style.width = size + "px";
      this.weedDiv.style.height = size + "px";
      this.weedDiv.style.pointerEvents = "none"; // doesn't block clicks
  
      // Create 8 spiky leaves (thin rectangles rotated around center)
      for (let i = 0; i < 8; i++) {
        let blade = document.createElement("div");
        blade.style.position = "absolute";
        blade.style.width = size * 0.1 + "px";
        blade.style.height = size + "px";
        blade.style.background = `rgb(${color.r}, ${color.g}, ${color.b})`;
        blade.style.left = size / 2 - size * 0.05 + "px";
        blade.style.top = "0px";
        blade.style.transform = `rotate(${i * 45}deg)`;
        this.weedDiv.appendChild(blade);
      }
    }
  
    renderWeed() {
      document.querySelector(".grass").appendChild(this.weedDiv);
    }
  }
  
  