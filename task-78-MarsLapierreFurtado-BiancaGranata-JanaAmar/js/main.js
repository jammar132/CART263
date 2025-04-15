let possibleColor = ["#5d3fd3", "#a73fd3", "#d33fb5", "#d35d3f", "#d3a73f"];

window.onload = async function () {
    console.log("task 7-8");

    try {
        // 1 - Load data
        const response = await fetch("data/iris.json");
        const irisData = await response.json();
        console.log("1- Iris data loaded:", irisData);

        // 2 - map()
        const irisesWithColors = irisData.map(iris => {
            const randomIndex = Math.floor(Math.random() * possibleColor.length);
            return { ...iris, color: possibleColor[randomIndex] };
        });
        console.log("2- Irises with Colors:", irisesWithColors);

        // 3 - filter()
        const filteredIrises = irisesWithColors.filter(iris => iris.sepalWidth < 4);
        console.log("3- Filtered Irises (sepalWidth < 4):", filteredIrises);

        // 4 - reduce()
        const totalPetalLength = irisesWithColors.reduce((acc, iris) => acc + iris.petalLength, 0);
        const averagePetalLength = totalPetalLength / irisesWithColors.length;
        console.log("4- Average petalLength:", averagePetalLength);

        // 5 - find()
        const irisWithLargePetalWidth = irisesWithColors.find(iris => iris.petalWidth > 1.0);
        console.log("5- Iris with petalWidth > 1.0:", irisWithLargePetalWidth);

        // 6 - some() > 10
        const hasPetalLengthGreaterThan10 = irisesWithColors.some(iris => iris.petalLength > 10);
        console.log("6- Is there an iris with petalLength > 10?", hasPetalLengthGreaterThan10);

        // 7 - some() == 4.2
        const hasPetalLengthEqual42 = irisesWithColors.some(iris => iris.petalLength === 4.2);
        console.log("7- Is there an iris with petalLength == 4.2?", hasPetalLengthEqual42);

        // 8 - every() petalWidth < 3
        const allPetalWidthsLessThan3 = irisesWithColors.every(iris => iris.petalWidth < 3);
        console.log("8- Do all irises have petalWidth < 3?", allPetalWidthsLessThan3);

        // 9 - every() sepalWidth > 1.2
        const allSepalWidthsGreaterThan12 = irisesWithColors.every(iris => iris.sepalWidth > 1.2);
        console.log("9- Do all irises have sepalWidth > 1.2?", allSepalWidthsGreaterThan12);

        // 10 - toSorted()
        const irisesWithColorsSorted = irisesWithColors.toSorted((a, b) => a.petalWidth - b.petalWidth);
        console.log("10- Irises sorted by petalWidth:", irisesWithColorsSorted);

        // 11 - Visualization

        // Iris class
        class Iris {
            constructor({ sepalLength, petalLength, color, species }) {
                this.x = sepalLength * 80; // scale X
                this.y = petalLength * 80; // scale Y
                this.color = color;
                this.species = species;
                this.radius = 10;
            }

            draw(ctx, mouseX, mouseY) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();

                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                if (Math.sqrt(dx * dx + dy * dy) < this.radius + 5) {
                    ctx.fillStyle = "black";
                    ctx.font = "14px Roboto";
                    ctx.fillText(this.species, this.x + 10, this.y - 10);
                }
            }
        }

        // Create canvas
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.background = "#f9f9f9";
        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d");

        // Dropdown menu
        const select = document.createElement("select");
        select.innerHTML = `<option value="all">All Species</option>`;
        [...new Set(irisesWithColorsSorted.map(i => i.species))].forEach(species => {
            const option = document.createElement("option");
            option.value = species;
            option.innerText = species;
            select.appendChild(option);
        });
        document.body.insertBefore(select, canvas);

        // Create instances of Iris
        let allIrisObjs = irisesWithColorsSorted.map(iris => new Iris(iris));
        let filteredIrisObjs = [...allIrisObjs];

        // Handle interaction
        let mouseX = 0, mouseY = 0;
        canvas.addEventListener("mousemove", e => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        select.addEventListener("change", e => {
            const value = e.target.value;
            filteredIrisObjs = value === "all"
                ? [...allIrisObjs]
                : allIrisObjs.filter(i => i.species === value);
        });

        // Draw loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            filteredIrisObjs.forEach(iris => iris.draw(ctx, mouseX, mouseY));
            requestAnimationFrame(animate);
        }

        animate();

    } catch (error) {
        console.error("Error loading iris data:", error);
    }
};
