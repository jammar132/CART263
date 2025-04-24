setup_A();
/** THEME: CALM  */
function setup_A() {
  console.log("in a");

  /**************************************************** */
  //get the buttons
  activateButtons_A(`#TEAM_A`, "ani_canvA");

  /**************************************************** */
  /* NO NEED TO MODIFY THIS FUNCTION :) */
  /*** helper function to activate buttons */
  /**************************************************** */
  function activateButtons_A(team, teamCanvas) {
    let teamButtons = document.querySelectorAll(`${team} .team-nav p`);
    //2:
    console.log(teamButtons);
    for (let button of teamButtons) {
      button.addEventListener("click", buttonCallBack);

      function buttonCallBack(e) {
        switch (this.textContent) {
          case "1": {
            console.log("A");
            //reset the canvases
            resetCanvases(`${team} .aniCanvas`);
            //reset buttons
            resetButtons(teamButtons, this);
            //activate canvas A
            document.getElementById(`${teamCanvas}_A`).style.display = "block";
            //run first
            aniA(document.getElementById(`${teamCanvas}_A`));
            break;
          }
          case "2": {
            console.log("B");
            resetCanvases(`${team} .aniCanvas`);
            //reset buttons
            resetButtons(teamButtons, this);
            //activate canvas B
            document.getElementById(`${teamCanvas}_B`).style.display = "block";
            //run second
            aniB(document.getElementById(`${teamCanvas}_B`));
            break;
          }
          case "3": {
            console.log("C");
            //reset the canvases
            resetCanvases(`${team} .aniCanvas`);
            //reset buttons
            resetButtons(teamButtons, this);
            //activate canvas C
            document.getElementById(`${teamCanvas}_C`).style.display = "block";
            //run third
            aniC(document.getElementById(`${teamCanvas}_C`));
            break;
          }
          case "4": {
            console.log("D");
            break;
          }
          case "5": {
            console.log("E");
            break;
          }
          case "6": {
            console.log("F");
            break;
          }
        }
      }
    } //for
  }

  /**************** ANI A ************************************ */
  /**
   * ANIMATION A: DVD-style bouncing ball
   * A ball bounces off the canvas edges, changing color each time it hits a wall.
   */
  function aniA(parentCanvas) {
    console.log("in A");
    let canvas = document.createElement("canvas");
    canvas.width = parentCanvas.clientWidth;
    canvas.height = parentCanvas.clientHeight;
    parentCanvas.appendChild(canvas);
    let ctx = canvas.getContext("2d");

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let dx = 3;
    let dy = 2;
    let radius = 30;
    let color = getRandomColor();

    const button = document.createElement("button");
    button.innerText = "Start/Stop";
    button.className = "TEAM_A_ANI_A_Div";
    button.style.position = "absolute";
    button.style.bottom = "10px";
    button.style.left = "10px";
    parentCanvas.appendChild(button);

    let animating = false;
    let requestID;

    button.addEventListener("click", () => {
      animating = !animating;
      console.log(`Animation toggled: ${animating}`);
      if (animating) animate();
      else cancelAnimationFrame(requestID);
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      x += dx;
      y += dy;

      let hit = false;
      if (x + radius >= canvas.width || x - radius <= 0) {
        dx = -dx;
        hit = true;
      }
      if (y + radius >= canvas.height || y - radius <= 0) {
        dy = -dy;
        hit = true;
      }

      if (hit) {
        color = getRandomColor();
      }

      requestID = requestAnimationFrame(animate);
    }

    function getRandomColor() {
      return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    }
  }

  /**************** ANI B ************************************ */
  /**
  * ANIMATION B: Alternating Rectangles and Circles
  * Shapes update every second with new colors. Clicking toggles shape type.
  */
  function aniB(parentCanvas) {
    console.log("in B");
    let canvas = document.createElement("canvas");
    canvas.width = parentCanvas.clientWidth;
    canvas.height = parentCanvas.clientHeight;
    parentCanvas.appendChild(canvas);
    let ctx = canvas.getContext("2d");

    let colors = Array(6).fill().map(() => getRandomColor());
    let useCircles = false;

    function drawShapes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let spacing = canvas.width / 7;
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = colors[i];
        let centerX = spacing * (i + 1);
        let centerY = canvas.height / 2;
        if (useCircles) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(centerX - 25, centerY - 100, 50, 200);
        }
      }
    }

    drawShapes();
    const interval = setInterval(() => {
      colors = colors.map(() => getRandomColor());
      drawShapes();
    }, 1000);

    canvas.addEventListener("click", () => {
      console.log("Canvas clicked. Toggling shape and randomizing colors.");
      useCircles = !useCircles;
      colors = colors.map(() => getRandomColor());
      drawShapes();
    });

    function getRandomColor() {
      return `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;
    }
  }

  /**************** ANI C ************************************ */
  /**
  * ANIMATION C: Interactive Circle with W A S D controls
  * Uses keyboard events to move a circle around. Text hint drawn on canvas.
  */
  function aniC(parentCanvas) {
    console.log("in C");

    let canvas = document.createElement("canvas");
    canvas.width = parentCanvas.clientWidth;
    canvas.height = parentCanvas.clientHeight;
    parentCanvas.appendChild(canvas);
    let ctx = canvas.getContext("2d");

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    draw();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw hint text
      ctx.fillStyle = "black";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Use W A S D", canvas.width / 2, 30);

      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "green";
      ctx.fill();
    }

    // THIS IS THE CALLBACK FOR KEY DOWN ( DO NOT CHANGE THE NAME..) 
    windowKeyDownRef = function (e) {
      console.log("Key down:", e.code);
      if (e.code === "KeyW") y -= 20;
      if (e.code === "KeyS") y += 20;
      if (e.code === "KeyA") x -= 20;
      if (e.code === "KeyD") x += 20;
      draw();
    };

    // THIS IS THE CALLBACK FOR KEY UP ( DO NOT CHANGE THE NAME..) 
    windowKeyUpRef = function (e) {
      console.log("Key up:", e.code);
    };

    //DO NOT REMOVE
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);
  }
}