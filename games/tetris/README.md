# Tetris

The world famous Tetris game with pure JS, HTML &amp; CSS.

🕹️ https://larprad.github.io/tetris/

## Context

I created this game alone during the end of 2020 summer to challenge myself by using only vanilla javascript for a project involving a lot of DOM manipulations.
This project is functionnal and on hold before further updates (next major update: persitent scoreboard).

## Presentation

The game is playable on smartphones and desktop. 3 game modes are available:

* Enduro: No time limit, it's about getting the best score as the speed increases every 10 rows. Suitable for beginners. 

* Rush: 60 seconds to achieve maximum points. The starting speed is quite high and increases every 5 lines. For experienced player. 

* Sprint: Against the clock where you have to do 20 lines as quickly as possible. The starting speed is quite high and increases every 5 lines. For experienced player.

![tetris1](https://user-images.githubusercontent.com/59915248/95334832-e38e0800-08ae-11eb-8db9-b33ff71e2c79.png)
![tetris2](https://user-images.githubusercontent.com/59915248/95334837-e5f06200-08ae-11eb-844c-ac323d8c0773.png)

## Architecture

The game code is organized through different objects which will bring together the methods and variables necessary for the proper functioning of the whole. Main objects:

* Playground: For everything related to the generation of the game grid and its evolutions when the tetrominos (Tetris blocks) are generated and moved.

* Tetrominoes: Generation of the different tetrominoes, movement and rotations. It is also in this object that we will find everything related to the detection of borders and other tetrominoes.

* Game: Start of game, pause, end, reset, victory condition ... Everything that relates to the life of a game will be found in this item.

* Config: This is where the size of the grid, the precision of the timer, the evolution of the speed of a game, and many other parameters are defined which are mostly inaccessible to the user.

* Inputs: The different means of interacting with the game are gathered in this object, whether via keyboard or touch screen.

### Grid

Each grid block corresponds to a div element generated via Javascript, then inserted into an array. It is then possible to act on each element of the grid by looking for its coordinate in the table created from the moment when the width of the grid is fixed.

```javascript
this.blocks = Array.from(document.querySelectorAll('.grid div'));
```

**Example**: We want to reach the block of coordinate x = 3, y = 2, we will therefore have to select the box (y * number of columns + x) of the table, i.e. for a grid of width 6, box number 2 * 6 + 3 = 15

![Grid design](https://user-images.githubusercontent.com/59915248/95305967-04dafe00-0887-11eb-830a-3899f0256107.png)

Invisible div elements are placed above and below the grid in order to be able to set up a detection of the edges of the grid.

### Drawing a tetromino

The tetrominoes are made similar to the grid and then stored in an array. Each box of the table will contain another table gathering all the possible rotations of this tetromino.

**Example**: To draw the tetromino “L”, we take its first cell with coordinate x = 2,
then the second lower x = 2 * Number of columns = 7 and so on. Which ultimately gives us L = [2, 7, 13, 14]. To which it will be necessary to add its different rotations in order to obtain L = [[2, 7, 13, 14], [6, 7, 8, 14], [1, 7, 12, 13], [6, 12, 13 , 14]].

![L tetromino](https://user-images.githubusercontent.com/59915248/95307167-9860fe80-0888-11eb-9a44-5685400aac0f.png)

Therefore, with a single parameter, the width of the grid, we can draw the latter and the tetrominoes in their different positions.

The values of each tetromino will then be used to identify which element of the grid is crossed by a part, and subsequently apply a style to it (via a class in CSS) so that the part becomes visible on the grid.

### moving a tetromino

Once a tetromino has been drawn, to move it on the grid all you have to do is act on the value of its array. Adding the value of the number of columns to each value in the tetromino table will move it down one box. On the other hand, adding, or subtracting 1, will make it shift respectively to the right or to the left.
 
 ```javascript
 moveLeft() {
    if (!isAtLeftEdge) {
      this.undraw();
      this.position--;
      this.draw();
    } else {
      console.log('left boudary prevents tetromino movement');
    }
  },
```

To perform a rotation, to the left or to the right, it suffices to browse the table of the corresponding tetromino, by decrementing or incrementing its index.
 
  ```javascript
 direction === 'right' ? tempRotationIndex++ : tempRotationIndex--;
 ```
