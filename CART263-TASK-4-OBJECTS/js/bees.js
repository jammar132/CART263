/**TASK A -- BEES
 * 1/ Create a  file to hold a  Bee Class (i.e. Bee.js)
 * 2/ Create the Bee Class : a constructor which takes a position, size and color as parameters
 * 3/ Create a renderBee() method -> which essentially creates a HTML element(s) - could be
 * an image element :) or an svg .... representing a Bee... (see Sun or Flower for inspiration)
 * 4/ Create an animateBee()method in the Bee class - which will make a given Bee move around the garden - use the requestAnimationFrame() 
 * 5/ In garden.js add 5 new Bees to the garden (in an array) - 
 * all different sizes and colors and in different positions and then call the animateBee() method on all the Bees
 * 
*/
class Bee {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
  
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
  
      this.beeDiv = document.createElement("div");
      this.beeDiv.style.position = "absolute";
      this.beeDiv.style.width = size + "px";
      this.beeDiv.style.height = size * 0.6 + "px";
      this.beeDiv.style.borderRadius = "50%";
      this.beeDiv.style.background = "yellow";
      this.beeDiv.style.left = this.x + "px";
      this.beeDiv.style.top = this.y + "px";
      this.beeDiv.style.border = "2px solid black";
      this.beeDiv.style.display = "flex";
      this.beeDiv.style.alignItems = "center";
      this.beeDiv.style.justifyContent = "space-between";
      this.beeDiv.style.boxSizing = "border-box";
      this.beeDiv.style.padding = "2px";
  
      // Add black stripes
      for (let i = 0; i < 2; i++) {
        let stripe = document.createElement("div");
        stripe.style.width = "4px";
        stripe.style.height = "100%";
        stripe.style.background = "black";
        this.beeDiv.appendChild(stripe);
      }
  
      // Add antennas
      this.antennas = document.createElement("div");
      this.antennas.style.position = "absolute";
      this.antennas.style.top = "-10px";
      this.antennas.style.left = "50%";
      this.antennas.style.transform = "translateX(-50%)";
      this.antennas.innerHTML = "⋂"; // simple visual antennas
      this.beeDiv.appendChild(this.antennas);
  
      // Add stinger
      this.stinger = document.createElement("div");
      this.stinger.style.position = "absolute";
      this.stinger.style.right = "-6px";
      this.stinger.style.top = "50%";
      this.stinger.style.transform = "translateY(-50%)";
      this.stinger.style.width = "0";
      this.stinger.style.height = "0";
      this.stinger.style.borderLeft = "6px solid black";
      this.stinger.style.borderTop = "4px solid transparent";
      this.stinger.style.borderBottom = "4px solid transparent";
      this.beeDiv.appendChild(this.stinger);
    }
  
    renderBee() {
      document.querySelector(".sky").appendChild(this.beeDiv);
    }
  
    animateBee() {
      const move = () => {
        this.x += this.vx;
        this.y += this.vy;
  
        // Bounce inside the sky area (top 280px)
        if (this.x <= 0 || this.x + this.size >= window.innerWidth) this.vx *= -1;
        if (this.y <= 0 || this.y + this.size * 0.6 >= 280) this.vy *= -1;
  
        this.beeDiv.style.left = this.x + "px";
        this.beeDiv.style.top = this.y + "px";
  
        requestAnimationFrame(move);
      };
  
      move();
    }
  }
  