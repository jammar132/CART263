window.onload = setup;

/** function setup */
function setup() {
    console.log("we are a go!")
    /*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
    /*** START PART ONE ACCESS */
    /* 1: all paragraph elements */
    /***CODE
     *  console.log(document.getElementsByTagName("p"));
    */
    /***OUTPUT:
     * 
     * 0: p#1
     * 1: p#2.img-descrip
     * 2: p#3.img-descript
     * 3: p#4.img-descript
     * 4: p#5.img-descript
     * 5: p#6.img-descript
     * 6: p#7.img-descript
     * 7: p#8.img-descript
     * 8: p#9.img-descript
     * 9: <value unavailable>
     * length: 9 
     */

    /*************************************** */
    /* 2: only the first paragraph element */
    /***CODE
     * console.log(document.querySelector("p"));
    */
    /***OUTPUT:
     * <p id="1">…</p>
     */


    /*************************************** */
    /* 3: all elements with the class inner-container */
    /***CODE
     * console.log(document.getElementsByClassName("inner-container")); 
    */
    /***OUTPUT:
     * HTMLCollection(8) [div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container]
     0
     : 
     div.inner-container
     1
     : 
     div.inner-container
     2
     : 
     div.inner-container
     3
     : 
     div.inner-container
     4
     : 
     div.inner-container
     5
     : 
     div.inner-container
     6
     : 
     div.inner-container
     7
     : 
     div.inner-container
     length
     : 
     8
     */


    /*************************************** */
    /* 4: the last image element inside the element that has the class img-container */
    /***CODE
     * const allImgContainers = document.querySelectorAll(".img-container");
    const lastImgContainer = allImgContainers[allImgContainers.length - 1];
    console.log(lastImgContainer.lastElementChild); 
    */
    /***OUTPUT:
     * <img class="img-image" src="task-1-images/seventeen.png">
     */


    /*************************************** */
    /* 5A: all h2 elements */
    /* 5B: length of the list in 5A */
    /* 5C: the text content of the first element in the list from 5A */
    /***CODE
     *     const allH2Elements = document.querySelectorAll("h2");
    console.log(allH2Elements);
    const h2Length = allH2Elements.length;
    console.log(h2Length);
    const firstH2Text = allH2Elements[0].textContent;
    console.log(firstH2Text);
    */
    /***OUTPUT:
     * NodeList [h2]0: h2length: 1[[Prototype]]: NodeListentries: ƒ entries()forEach: ƒ forEach()item: ƒ item()keys: ƒ keys()length: (...)values: ƒ values()constructor: ƒ NodeList()Symbol(Symbol.iterator): ƒ values()Symbol(Symbol.toStringTag): "NodeList"get length: ƒ length()[[Prototype]]: Object
     script.js:97 1
     script.js:99  The header of this fancy page
     */

    /*************************************** */
    /* 6: the element with id name parent */
    /***CODE
     *     const parentElement = document.getElementById("parent");
    console.log(parentElement);
    */
    /***OUTPUT:
     * script.js:5 we are a go!
script.js:111 <section id=​"parent">​flex<div class=​"inner-container">​<div class=​"content-container">​flex<div class=​"img-container">​…​</div>​flex<p id=​"2" class=​"img-descript">​…​</p>​</div>​</div>​<div class=​"inner-container">​<div class=​"content-container">​flex<div class=​"img-container">​…​</div>​flex<p id=​"3" class=​"img-descript">​…​</p>​</div>​</div>​<div class=​"inner-container">​<div class=​"content-container">​flex<div class=​"img-container">​…​</div>​flex<p id=​"4" class=​"img-descript">​…​</p>​</div>​</div>​<div class=​"inner-container">​<div class=​"content-container">​flex<div class=​"img-container">​…​</div>​flex<p id=​"5" class=​"img-descript">​…​</p>​</div>​</div>​<div class=​"inner-container">​<div class=​"content-container">​flex<div class=​"img-container">​…​</div>​flex<p id=​"6" class=​"img-descript">​…​</p>​</div>​</div>​<div class=​"inner-container">​<div class=​"content-container">​flex<div class=​"img-container">​…​</div>​flex<p id=​"7" class=​"img-descript">​…​</p>​</div>​</div>​<div class=​"inner-container">​<div class=​"content-container">​flex<div class=​"img-container">​…​</div>​flex<p id=​"8" class=​"img-descript">​…​</p>​</div>​</div>​<div class=​"inner-container">​<div class=​"content-container">​flex<div class=​"img-container">​…​</div>​flex<p id=​"9" class=​"img-descript">​…​</p>​</div>​</div>​</section>​

     * 
     */

    /*************************************** */
    /*** END PART ONE ACCESS */


    /*************************************** */
    /*** START PART TWO MODIFY */
    /*************************************** */
    /* 1: Select the first paragraph and replace the text within the paragraph... */
    /***CODE */
    // let firstParagraph = document.querySelector('p');
    // firstParagraph.textContent = 'New text in paragraph one: text changed by Bianca on January 26th 2025 ';
    // /*************************************** */
    // /* 2: Select all elements in the HTML that have the class name content-container
    //  and change the background color ... of first and second ...*/
    // /***CODE */
    // let containers = document.getElementsByClassName('content-container');
    // containers[0].style.backgroundColor = 'orange';
    // containers[1].style.backgroundColor = 'purple';
    // /*************************************** */
    // /* 3: Change the src element of the first image element on the page to be ...
    // /***CODE */
    // let firstImage = document.querySelector('img');
    // firstImage.src = 'task-1-images/seven.png';
    // /*************************************** */
    // /* 4: Select the third paragraph element on the page and 
    // replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
    // /***CODE */
    // let thirdParagraph = document.getElementsByTagName('p')[2];
    // thirdParagraph.innerHTML = '<h2>TEST 123</h2>';
    // /*************************************** */
    // /* 5: Select the fourth paragraph element on the page and 
    // add to the existing content an h2 element containing the text `TEST 123`
    // /***CODE */
    // let fourthParagraph = document.querySelector('p#4');
    // fourthParagraph.innerHTML += '<h2>TEST 123</h2>';

    // /*************************************** */
    // /* 6: Select the fifth paragraph element on the page and add to the existing content 
    // an img element that holds `one.png`, and add the class newStyle to said paragraph element.
    // /***CODE */
    // let fifthParagraph = document.querySelector('p#5');
    // fifthParagraph.innerHTML += '<img src="./task-1-images/one.png" />';
    // fifthParagraph.classList.add('newStyle');


    // /*************************************** */
    // /* 7: Add the following array variable: let colors = ['red','blue','green','orange'];, 
    // then access all elements with class name inner-container and save to a variable called `innerContainers`. 
    // Next, iterate over the colors array, and for each color: 
    // assign the element from innerContainers variable with the same index 
    // (i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
    // a background using that color.
    // /***CODE */
    // let colors = ['red', 'blue', 'green', 'orange'];
    // let innerContainers = document.querySelectorAll('.inner-container');
    // colors.forEach((color, index) => {
    //     if (innerContainers[index]) {
    //         innerContainers[index].style.backgroundColor = color;
    //     }
    // });
    /*************************************** */
    /*** END PART TWO MODIFY */


    /*************************************** */
    /*** START PART THREE CREATE */
    /*************************************** */
    /* 1: NEW PARAGRAPHS */
    /* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
    /* 1B: Create a function:function customCreateElement(parent){ //body } */
    /* 1C:  In the body of customCreateElement create a new parargraph element*/
    /* 1D:  Set the text of this element to be : `using create Element`*/
    /* 1E:  Set the background of this paragraph element to be green */
    /* 1F:  Set the color of the text in this paragraph element to be white */
    /* 1G: Append this new element to the parent variable within the function. */
    /* 1H: Iterate through the allPTagsThree array and call customCreateElement(), 
    passing the current allPTagsThree element as the parent with each iteration.*/
    /***CODE */
    // 1A: 
    let allPTagsThree = document.querySelectorAll('p');

    // 1B: 
    function customCreateElement(parent) {
        // 1C: 
        let newParagraph = document.createElement('p');

        // 1D: 
        newParagraph.textContent = 'using createElement';

        // 1E: 
        newParagraph.style.backgroundColor = 'green';

        // 1F: 
        newParagraph.style.color = 'white';

        // 1G: 
        parent.appendChild(newParagraph);
    }

    // 1H:
    allPTagsThree.forEach(parent => customCreateElement(parent));

    /***EXPLANATION::
 * 1A: Start by selecting all paragraph elements in the document and storing them in a variable called allPTagsThree. This allows us to have a reference to all paragraph tags on which we want to perform operations.
 * 1B: A function named customCreateElement is defined which takes parent as a parameter. This parent is intended to be the DOM element to which the new paragraph will be appended.
 * 1C-E: Inside this function, a new paragraph element is created and stored in newParagraph. This new paragraph is then given a specific text content ("using createElement") and styled with a green background and white text.
 * 1F: The new paragraph's text color is set to white, ensuring it is readable against the green background.
 * 1G: The newly created and styled paragraph is appended to the provided parent element, which is a paragraph from the allPTagsThree collection.
 * 1H: Finally, the script iterates over each element in allPTagsThree using forEach, and for each element, it calls customCreateElement, passing the current paragraph element as the parent. This adds a new styled paragraph to each existing paragraph on the page.
 */

    /*************************************** */
    /* 2: GRID OF BOXES */
    /* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
    /* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv. 
    /* 2C:Then append this new element to the parent variable within the function. 
    /* 2D:Finally, return</code> this new element */
    /* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
        Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
        Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
    /* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
        Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
        in a variable i.e. returnedDiv. 
        Set the style (left and top) to the of this element to 
        the necessary x and y position (use the counter variables in the for nested for loop to 
        calculate the new positions.
    /* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
        and otherwise let it have a background of purple.</li>
    /* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
        otherwise lat it have the content `ODD`.*/

    /***CODE */
    // 1-4: this creates the function that makes a new div and adds it to a parent element
    function customNewBoxCreate(parent) {
        //new div element
        const newDiv = document.createElement('div');

        // add the class 'testDiv' to it
        newDiv.classList.add('testDiv');

        // adsd it to the parent element that was passed in
        parent.appendChild(newDiv);


        return newDiv;
    }

    // 5,6: this creates the 10x10 grid
    // by first getting  the element with id 'new-grid'
    const gridContainer = document.getElementById('new-grid');

    // this creates nested loops for rows and columns
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            // This creates a new div
            const returnedDiv = customNewBoxCreate(gridContainer);

            // positioning the div w/  row and col 

            returnedDiv.style.left = col * 40 + 'px';
            returnedDiv.style.top = row * 40 + 'px';
        }
    }

    // 7: counts how many elements have class 'testDiv'
    const testDivs = document.getElementsByClassName('testDiv');
    console.log('Number of elements with class testDiv:', testDivs.length);
    // Output:  the number of elements with class testDiv: 100 ,We get 100 elements because it created a 10x10 grid
    // 10 rows × 10 columns = 100 total div elements



    /***EXPLANATION::
     * For the function it works because it takes a parent element 
     *     and creates a new div element using createElement. Which this then adds a class 'testDiv' to help style
     * and identify the element and return it. For the nested loops it works because together they 
     * create the 100 divs, the outer loop with the rows and the inner with the columns. For the positioning
     * having the cols and rows multiplied by 50 creates the space which then creates the grid and the changes in the
     * css file gives more detail on the positioning. Therefore all together it creates the visible grid.
     * 
     */
    /*************************************** */
    /* 3: GRID OF BOXES II */

    /* 3A: Create ANOTHER nested for loop - in order to generate a new grid ... 
        USE the same customNewBoxCreate function..., the only difference is that the parent element 
        for each of these new divs is the element whose id is `new-grid-three`. */
    /* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder), 
        when it is a column where the remainder is 1 or when the remainder is 2 ... 
        HINT:: look up the % operator.. */
    /* 3C: Then for each of the above cases: give the new divs in the first case a background of red, 
            then the second a background of orange and the third yellow. */
    /*  3D: Finally, let each div contain the text content representing the associated remainder 
        when dividing by three. */

    /***CODE */
    function customNewBoxCreate(parent) {
        // Create new div element with class testDiv
        const newDiv = document.createElement('div');
        newDiv.className = 'testDiv';

        // Append to parent
        parent.appendChild(newDiv);

        // Return the new element
        return newDiv;
    }

    // Get the parent element for the new grid
    const gridThreeParent = document.getElementById('new-grid-three');

    // Create nested loops for 10x10 grid
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            // Create new box
            const newBox = customNewBoxCreate(gridThreeParent);

            // Calculate position (40px is the width/height of each box from CSS)
            newBox.style.left = (col * 40) + 'px';
            newBox.style.top = (row * 40) + 'px';

            // Calculate remainder when divided by 3
            const remainder = col % 3;

            // Set background color based on remainder
            if (remainder === 0) {
                newBox.style.background = 'white';
            } else if (remainder === 1) {
                newBox.style.background = 'red';
            } else { // remainder === 2
                newBox.style.background = 'orange';
            }

            // Set text content to show remainder
            newBox.textContent = remainder;
        }
    }

    /***EXPLANATION::
     * The grid system works by using two loops : one for rows and one for columns , to create a pattern of boxes. 
     * Each box is created as a separate element and positioned precisely on the page using X and Y coordinates. 
     * Starting from the top-left corner, boxes are placed 40 pixels apart horizontally to create rows, 
     * and when a row is complete, the next row starts 40 pixels below. 
     * The parent container provides a reference point for all boxes, ensuring they stay in position relative to it. 
     * Once each box is placed, we can customize its appearance with different colors based on its position in the grid, 
     * and add content like numbers. This creates a structured grid where each box's position, color, 
     * and content is determined by its row and column numbers.
     * 
     */

    /*************************************** */
    /*** END PART THREE CREATE */
    /*************************************** */





}