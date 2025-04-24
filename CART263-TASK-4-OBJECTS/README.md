** CART 263 SECTION A TASK 4 **
  *The purpose of this task is to practise designing and implementing objects (properties and methods) by building upon the example (Bees and Trees) presented in class.

Work done by: Jana Ammar 
  * TASK A -- BEES
    - Technical: Created a Bee class using requestAnimationFrame() to animate position updates; movement is constrained to the .sky container using X and Y velocity with edge detection.
    - Design: Each bee is a yellow circle with black stripes, antennas, and a triangular stinger. They bounce off walls in a playful, DVD-logo-like pattern.
  * TASK B -- SQUIRRELS
    - Technical: Built a Squirrel class with randomized velocities and confined motion to the .grass area; squirrels are animated using continuous frame updates.
    - Design: Squirrels have a rounded body, attached tail, and ears, giving them a cartoonish woodland-animal appearance.
  * TASK C -- BUSHES
    - Technical: The Bush class constructs bushes using 5 overlapping green circles for a layered look. Bushes are added dynamically with a mouse click event tied to the .grass element.
    - Design: All circles in a single bush share the same shade of green for cohesion. The click-to-grow mechanic encourages interaction and personalized garden design.
  * TASK D -- WEEDS
    - Technical: Implemented a Weed class using 8 thin, rotated rectangles to simulate spiky weed shapes. New weeds spawn with the spacebar, and their Y-position is restricted to the visible .grass area.
    - Design: Each weed visually contrasts flowers and bushes, reinforcing their “unwanted” look. They appear randomly across the lawn and add visual chaos when spammed.
  * TASK E -- OTHER FLOWERS
    - Technical: Flower_E class builds flowers from 4 petal circles + a yellow center using DOM positioning. Clicking a flower updates the color of all petals dynamically.
    - Design: This flower variant has a hand-crafted, playful style. Its interactive color-changing mechanic gives users control over its aesthetic in the garden.
  * TASK F -- BIRDS
    - Technical: The Bird class generates birds with randomized grayscale color, velocity, and position. Birds animate in the .sky area and are added by pressing Enter.
    - Design: Each bird is made with a main circle and two “wing” circles on either side. The color palette (white to black) keeps them subtle and sky-appropriate.
