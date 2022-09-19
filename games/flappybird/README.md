# FLAPPY BIRD
Flappy bird flew into an endless pipe zone (or is it?) and needs help flying through to get out.  

# ABOUT THE GAME
A simple side-scrolling game where the player controls a bird to fly between pipes without hitting them.  Flying between each set of pipes scores 1 point and hitting them or the ground ends the game.  See how long you can last and set records.  

Here's a link to the game:
https://noanonoa.github.io/flappy-bird/

# WIREFRAME  
![wireframe for game screen](/img/001-wireframe.png "Game Screen")  
![wireframe for collision mechanics](/img/002-wireframe.png "Collision Mechanics")

# TECHNOLOGY
 * HTML/CSS on canvas
 * JavaScript for game logic

# ASSETS
### IMAGES
![flappy bird theme](/img/og-theme.png)  
(src: google images)  
![flappy bird theme v2](/img/og-theme-2.png)  
(src: https://www.spriters-resource.com/fullview/59894/)  
### AUDIO
(src: https://www.sounds-resource.com/mobile/flappybird/sound/5309/)
### SCREENSHOT
![flappy bird screenshot](/img/001-screenshot.png)

# MVP
 * start the game with a 'press button'
 * bird falls default to gravity
 * bird flies to 'click' (might be better for mobile capabilities)
 * pipes spawn top and bottom and scroll to the left 
 * track score
 * end game on collision

# STRETCH GOALS
 * animate bird
 * add sounds for scoring, flying, and collision
 * a customized theme
 * game is animated while waiting for player to start game
 * night time / day time
 * add a running time to display
 * make the game web responsive

# GAMEPLAN
---
## HTML
 - [X] container for gaming screen
 - [X] game title
 - [X] game screen `<canvas>`

## CSS
 - [X] *centered* game title
 - [X] *centered* game screen

## JavaScript
### Pieces I need
 - [X] specify canvas size
 - [X] draw bird image
 - [X] top pipe image
 - [X] constant gap between pipes
 - [X] bottom pipe image
 - [X] score tracker
 - [X] ready screen: game state 0
 - [X] game over screen: game state 2
 - [X] background image
 - [X] ground image
 - [X] sounds on flying, collision, scoring, falling, and game over screen
### Functions I need
 - [X] start game: game state 1
    - [X] start on 'click' (mobile compatible)
    - [X] spawn set of pipes with constant gap
      - [X] if statement triggering at x-coordinate
 - [X] bird's movement
    - [X] gravity: bird's y-coordinate increases to fall  
     * velocity's value is incremented by gravity constant
     * bird's position function updates velocity's value
    - [X] flying: bird's y-coordinate decreases to fly on 'click'
        - [X] eventListener 'click' (also enabled 'spacebar')
    - [X] rotate bird upward each time it flies (smells like a challenge)
        - [X] animation object / array of images to flip through
 - [X] a drawing function to animate game
   - [X] place images and loop
    - [X] pipes' x-coordinates decrease to scroll left
        - [X] increment score by 1 upon passing pipe
    - [X] pipes' y-coordinates are generated randomly
    - [X] draw background
    - [X] draw bird
 - [X] Game Over: game state 2
    - [X] collision with pipes
    - [X] collision with floor and canvas ceiling
    - [X] cut screen
    - [X] restart game on 'click' start button
        - [ ] display best score
        - [X] display current score
        - [X] reset score on start game
        - [X] reset pipes

# FINAL THOUGHTS
> Working with generated images of rectangles `fillRect()` was proving to be more work than actually drawing canvas images from a sprite image source.  This meant working with images from the beginning would just make things simpler in the long run.

> Incrementing gravity to increase velocity was crucial to the feel of the game.  It made the bird falling feel natural and is an important concept to learn.  Flapping, or flying, meant setting the velocity to fly key-value which doesn't translate well when reading code.  

> Infinite pipe spawning has been a road block for me.  Animating canvas images seem even more challenging.

> Tracking the score was challenging due to the fact that each place value of the number had to correlate to an image of its value. No texts and fonts were used in the game.

> Overall, I learned a lot of canvas tools and mechanics for JavaScript.  Re-creating this game was a lot of fun and good training for various JavaScript fundamentals such as loops, functions, if-else statements, arrays, objects, and concepts.