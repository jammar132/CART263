/** TEAM F -- Birds
 * 1/ Create a  file to hold a  Bird Class (i.e. Bird.js)
 * 2/ Create the Bird Class : a constructor which takes a position, size and color as parameters
 * 3/ Create a Bird() method -> which essentially creates a HTML element(s) - could be
 * an image element :) or an svg .... representing a Weeds... (see Sun or Flower for inspiration)
 * 4/ Add a key event listener (in garden.js) such that when the the return Key is pressed - a new bird will be added to the garden.
 * 5/ Create an animateBird() method in the Bird class - which will make a given Bird move around the sky - use the requestAnimationFrame() 
 * 6/ In garden.js add an empty array for the birds
 * 
 * 
*/
class Bird {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 1.5;
  
      this.birdDiv = document.createElement("div");
      this.birdDiv.style.position = "absolute";
      this.birdDiv.style.width = size + "px";
      this.birdDiv.style.height = size * 0.7 + "px";
      this.birdDiv.style.borderRadius = "50%";
      this.birdDiv.style.background = `rgb(${color.r}, ${color.g}, ${color.b})`;
      this.birdDiv.style.left = this.x + "px";
      this.birdDiv.style.top = this.y + "px";
  
      // Wings
      for (let i = 0; i < 2; i++) {
        const wing = document.createElement("div");
        wing.style.position = "absolute";
        wing.style.width = size * 0.4 + "px";
        wing.style.height = size * 0.4 + "px";
        wing.style.background = `rgb(${color.r}, ${color.g}, ${color.b})`;
        wing.style.borderRadius = "50%";
        wing.style.top = size * 0.1 + "px";
        wing.style.left = i === 0 ? -size * 0.3 + "px" : size * 0.9 + "px";
        this.birdDiv.appendChild(wing);
      }
    }
  
    renderBird() {
      document.querySelector(".sky").appendChild(this.birdDiv);
    }
  
    animateBird() {
      const move = () => {
        this.x += this.vx;
        this.y += this.vy;
  
        if (this.x <= 0 || this.x + this.size >= window.innerWidth) this.vx *= -1;
        if (this.y <= 0 || this.y + this.size * 0.7 >= 280) this.vy *= -1;
  
        this.birdDiv.style.left = this.x + "px";
        this.birdDiv.style.top = this.y + "px";
  
        requestAnimationFrame(move);
      };
      move();
    }
  }
  