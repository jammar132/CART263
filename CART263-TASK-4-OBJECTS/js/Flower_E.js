/** TEAM E -- ADD A DIFFERENT FLOWER CLASS
 * 1/ Create a  file to hold a  new Flower Class (i.e. Flower_E.js)
 * 2/ Create the Flower_E Class : a constructor which takes a position, size and color as parameters
 * 3/ Create a renderFlower_E() method -> which essentially creates a HTML element(s) - could be
 * an image element :) or an svg .... representing a new style of Flower... (see Sun or Flower for inspiration)
 * 4/ Add a mouse click event listener to each FlowerE  - such that when you click on it  - it switches color ... (everytime you click it should change color)
 * 5 / In garden.js add 25 new FlowerE objects to the garden (in an array) - different colors (make them quite small) -
 * 
*/
class Flower_E {
    constructor(x, y, size, petalColor) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.petalColor = petalColor;
  
      // Container div
      this.flowerDiv = document.createElement("div");
      this.flowerDiv.style.position = "absolute";
      this.flowerDiv.style.left = x + "px";
      this.flowerDiv.style.top = y + "px";
      this.flowerDiv.style.width = size + "px";
      this.flowerDiv.style.height = size + "px";
  
      // Create 4 petals
      const positions = [
        { top: -size * 0.3, left: size * 0.25 },  // top
        { top: size * 0.6, left: size * 0.25 },   // bottom
        { top: size * 0.15, left: -size * 0.3 },  // left
        { top: size * 0.15, left: size * 0.6 },   // right
      ];
  
      positions.forEach(pos => {
        const petal = document.createElement("div");
        petal.style.position = "absolute";
        petal.style.width = size * 0.5 + "px";
        petal.style.height = size * 0.5 + "px";
        petal.style.borderRadius = "50%";
        petal.style.background = `rgb(${petalColor.r}, ${petalColor.g}, ${petalColor.b})`;
        petal.style.top = pos.top + "px";
        petal.style.left = pos.left + "px";
        this.flowerDiv.appendChild(petal);
      });
  
      // Center circle
      const center = document.createElement("div");
      center.style.position = "absolute";
      center.style.width = size * 0.4 + "px";
      center.style.height = size * 0.4 + "px";
      center.style.borderRadius = "50%";
      center.style.background = "yellow";
      center.style.top = size * 0.3 + "px";
      center.style.left = size * 0.3 + "px";
      this.flowerDiv.appendChild(center);
  
      // Click to change color
      this.flowerDiv.addEventListener("click", () => {
        const newColor = {
          r: Math.floor(Math.random() * 156) + 100,
          g: Math.floor(Math.random() * 156) + 100,
          b: Math.floor(Math.random() * 156) + 100,
        };
        this.updatePetals(newColor);
      });
  
      this.petalElements = this.flowerDiv.querySelectorAll("div:not(:last-child)");
    }
  
    updatePetals(newColor) {
      this.petalColor = newColor;
      this.petalElements.forEach(petal => {
        petal.style.background = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
      });
    }
  
    renderFlower_E() {
      document.querySelector(".grass").appendChild(this.flowerDiv);
    }
  }
  