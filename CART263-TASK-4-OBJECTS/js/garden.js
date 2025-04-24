window.onload = function (){
// Our garden
let garden = {
    // An array to store the individual flowers
    flowers: [],
    // How many flowers in the garden
    numFlowers: 20,
    /*grass object */
    grass: {
      // The color of the grass (background)
      grassColor: {
        r: 120,
        g: 180,
        b: 120,
      },
      //the grass element
      grassDiv: document.createElement("div"),
    },
 
    /*sky object */
    sky: {
      // The color of the sky (background)
      skyColor: {
        r: 83,
        g: 154,
        b: 240,
      },
      //the sky element
      skyDiv: document.createElement("div"),
    },
  };
  // new  sun instancce
  let sun =  new Sun(10,10,{r: 240, g: 206,b: 83})

  function createAndRenderTheGarden() {
    /* note how we use dot notation....*/
    //sky
    garden.sky.skyDiv.classList.add("sky");
    garden.sky.skyDiv.style.background = `rgb(${garden.sky.skyColor.r},${garden.sky.skyColor.g},${garden.sky.skyColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.sky.skyDiv);
    //sun
    sun.renderSun();

    //grass
    garden.grass.grassDiv.classList.add("grass");
    garden.grass.grassDiv.style.background = `rgb(${garden.grass.grassColor.r},${garden.grass.grassColor.g},${garden.grass.grassColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.grass.grassDiv);

    //TASK A: Add 5 animated bees
    garden.bees = [];
    for (let i = 0; i < 5; i++) {
      let x = Math.random() * (window.innerWidth - 50);
      let y = Math.random() * 200; // keeps it in sky range
      let size = Math.random() * 30 + 20;
      let bee = new Bee(x, y, size);
      bee.renderBee();
      bee.animateBee();
      garden.bees.push(bee);
    }

    //TASK B: Add squirrels
    garden.squirrels = [];
    for (let i = 0; i < 5; i++) {
      let x = Math.random() * (window.innerWidth - 50);
      let y = 280 + Math.random() * (window.innerHeight - 320);
      let size = Math.random() * 30 + 30;
      let color = {
        r: 140 + Math.floor(Math.random() * 40),
        g: 70 + Math.floor(Math.random() * 40),
        b: 20 + Math.floor(Math.random() * 30),
      };
      let s = new Squirrel(x, y, size, color);
      s.renderSquirrel();
      s.animateSquirrel();
      garden.squirrels.push(s);
    }

    //TASK C: Add initial bush
    garden.bushes = [];
    let startBush = new Bush(100, 350, 60, { r: 34, g: 139, b: 34 });
    startBush.renderBush();
    garden.bushes.push(startBush);

    //Click to add bushes
    garden.grass.grassDiv.addEventListener("click", function (e) {
      const grassRect = garden.grass.grassDiv.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY - grassRect.top; // subtract grass top to get relative Y
    
      const size = Math.random() * 60 + 90;
      const color = {
        r: 30 + Math.floor(Math.random() * 30),
        g: 120 + Math.floor(Math.random() * 80),
        b: 30 + Math.floor(Math.random() * 30),
      };
    
      const bush = new Bush(x, y, size, color);
      bush.renderBush();
      garden.bushes.push(bush);
    });    
  
    //TASK D: Start with 2 weeds
    garden.weeds = [];

    function addWeed(x, y) {
      let size = Math.random() * 40 + 50;
      let color = {
        r: 60 + Math.floor(Math.random() * 40),
        g: 100 + Math.floor(Math.random() * 50),
        b: 60 + Math.floor(Math.random() * 30),
      };
      let weed = new Weed(x, y, size, color);
      weed.renderWeed();
      garden.weeds.push(weed);
    }

    // Initial weeds
    addWeed(200, 300);
    addWeed(500, 400);

    // Add new weed with SPACE key
    window.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        const grassRect = garden.grass.grassDiv.getBoundingClientRect();
        let x = Math.random() * (window.innerWidth - 60);
        let y = Math.min(
          Math.random() * (grassRect.height - 100),
          grassRect.height - 100
        );          
        addWeed(x, y);
      }
    });

    // TASK E: Add 25 simple flowers
    garden.flowersE = [];

    for (let i = 0; i < 25; i++) {
      let x = Math.random() * (window.innerWidth - 60);
      let y = 280 + Math.random() * (window.innerHeight - 340);
      let size = Math.random() * 20 + 20;
      let color = {
        r: Math.floor(Math.random() * 155) + 100,
        g: Math.floor(Math.random() * 155) + 100,
        b: Math.floor(Math.random() * 155) + 100
      };
      let flowerE = new Flower_E(x, y, size, color);
      flowerE.renderFlower_E();
      garden.flowersE.push(flowerE);
    }


    // TASK F: Birds array
    garden.birds = [];

    //create some flowers
    for (let i = 0; i < garden.numFlowers; i++) {
        // Create variables for our arguments for clarity
        let x = Math.random() * (window.innerWidth);
        let y = Math.random() * 120;
        let size = Math.random() * 30 + 10;
        let stemLength = Math.random() * 50 + 20;
        let petalColor = {
          r: parseInt(Math.random() * 155) + 100,
          g: parseInt(Math.random() * 155) + 100,
          b: parseInt(Math.random() * 155) + 100,
        };
  
        // Create a new flower using the arguments
        let flower = new Flower(x, y, size, stemLength, petalColor);
        // Add the flower to the array of flowers
        garden.flowers.push(flower);
      }

      for (let i = 0; i < garden.numFlowers; i++) {
        // Add the flower to the array of flowers
        garden.flowers[i].renderFlower();
      }
  }
  createAndRenderTheGarden();
  window.addEventListener("keydown", function handleKeyDown(event) {
  //call the handleKeyDown method of class
  sun.handleKeyDownInSUn(event);
});

}

//TEAM F:
window.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * 200; // sky zone only
    let size = Math.random() * 30 + 30;

    // bird colors from black to white (grayscale)
    let shade = Math.floor(Math.random() * 156) + 100;
    let color = {
      r: shade,
      g: shade,
      b: shade
    };

    let bird = new Bird(x, y, size, color);
    bird.renderBird();
    bird.animateBird();
    garden.birds.push(bird);
  }
});