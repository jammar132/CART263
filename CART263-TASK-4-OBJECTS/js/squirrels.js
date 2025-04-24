/**TASK B -- SQUIRRELS
 * 1/ Create a  file to hold a  Squirrel Class (i.e. Squirrel.js)
 * 2/ Create the Squirrel Class : a constructor which takes a position, size and color as parameters
 * 3/ Create a renderSquirrel() method -> which essentially creates a HTML element(s) - could be
 * an image element :) or an svg .... representing a Squirrel... (see Sun or Flower for inspiration)
 * 4/ Create an animateSquirrel() method in the Squirrel class - which will make a given Squirrel move around the garden - use the requestAnimationFrame() 
 * 5/ In garden.js add 5 new Squirrels to the garden (in an array) - 
 * all different sizes and colors and in different positions and then call the animateSquirrel() method on all the Squirrels
 * 
*/
class Squirrel {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
  
      this.squirrelDiv = document.createElement("div");
      this.squirrelDiv.style.position = "absolute";
      this.squirrelDiv.style.width = size + "px";
      this.squirrelDiv.style.height = size * 0.8 + "px";
      this.squirrelDiv.style.background = `rgb(${color.r}, ${color.g}, ${color.b})`;
      this.squirrelDiv.style.borderRadius = "50%";
      this.squirrelDiv.style.left = x + "px";
      this.squirrelDiv.style.top = y + "px";
  
      // tail
      const tail = document.createElement("div");
      tail.style.position = "absolute";
      tail.style.width = size * 0.5 + "px";
      tail.style.height = size * 0.6 + "px";
      tail.style.left = -size * 0.3 + "px";
      tail.style.top = size * 0.1 + "px";
      tail.style.borderRadius = "50%";
      tail.style.background = `rgb(${color.r - 30}, ${color.g - 30}, ${color.b - 30})`;
      this.squirrelDiv.appendChild(tail);
  
      // ears
      const ears = document.createElement("div");
      ears.style.position = "absolute";
      ears.style.top = "-8px";
      ears.style.left = "4px";
      ears.style.fontSize = "12px";
      ears.innerText = "ᑕᑕ";
      this.squirrelDiv.appendChild(ears);
    }
  
    renderSquirrel() {
      document.querySelector(".grass").appendChild(this.squirrelDiv);
    }
  
    animateSquirrel() {
      const move = () => {
        this.x += this.vx;
        this.y += this.vy;
  
        if (this.x <= 0 || this.x + this.size >= window.innerWidth) this.vx *= -1;
        if (this.y < 280 || this.y + this.size * 0.8 >= window.innerHeight) this.vy *= -1;
  
        this.squirrelDiv.style.left = this.x + "px";
        this.squirrelDiv.style.top = this.y + "px";
  
        requestAnimationFrame(move);
      };
      move();
    }
  }