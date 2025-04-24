/** TASK C -- BUSH
 * 1/ Create a  file to hold a  Bush Class (i.e. Bush.js)
 * 2/ Create the Bush Class : a constructor which takes a position, size and color as parameters
 * 3/ Create a renderBush() method -> which essentially creates a HTML element(s) - could be
 * an image element :) or an svg .... representing a Bush... (see Sun or Flower for inspiration)
 * 4/ add an mouse click event listener to the grass in the garden - such that wherever the mouse is clicked a bush will be added at that position 
 * 5/ In garden.js add initially one new bush (in an array) - 
 * 6/ Ensure that new bushes can be added to the garden
 * 
*/
class Bush {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
  
      // Main container for the bush
      this.bushContainer = document.createElement("div");
      this.bushContainer.style.position = "absolute";
      this.bushContainer.style.left = x + "px";
      this.bushContainer.style.top = y + "px";
      this.bushContainer.style.width = size + "px";
      this.bushContainer.style.height = size * 0.6 + "px";
  
      // Create multiple overlapping circles (leaf clumps)
      for (let i = 0; i < 5; i++) {
        let blob = document.createElement("div");
        blob.style.position = "absolute";
        blob.style.width = size * 0.5 + "px";
        blob.style.height = size * 0.5 + "px";
        blob.style.borderRadius = "50%";
        blob.style.background = `rgb(${color.r}, ${color.g}, ${color.b})`;
  
        // Random position around the center
        let offsetX = (Math.random() - 0.5) * size * 0.6;
        let offsetY = (Math.random() - 0.5) * size * 0.4;
  
        blob.style.left = size * 0.25 + offsetX + "px";
        blob.style.top = size * 0.15 + offsetY + "px";
  
        this.bushContainer.appendChild(blob);
      }
    }
  
    renderBush() {
      document.querySelector(".grass").appendChild(this.bushContainer);
    }
  }