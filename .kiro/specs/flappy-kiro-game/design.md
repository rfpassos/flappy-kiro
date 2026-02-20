# Design Document: Flappy Kiro Game

## Overview

Flappy Kiro is a browser-based arcade game built with vanilla JavaScript and HTML5 Canvas. The game implements a physics-based flying mechanic where players control the Kiro character (rendered using kiro-logo.png) through a series of moving obstacles by timing jumps. The design emphasizes responsive controls, smooth 60 FPS gameplay, and clear visual feedback using the Kiro brand color scheme.

The architecture follows a component-based approach with clear separation of concerns:
- **Physics Engine**: Handles gravity, velocity, and jump mechanics
- **Collision Detector**: Manages bounding box collision detection
- **Renderer**: Draws all visual elements to the canvas
- **Game State Manager**: Controls game flow and state transitions
- **Input Handler**: Processes keyboard and mouse events

The game loop uses `requestAnimationFrame` for smooth, browser-optimized rendering at 60 FPS, with all game logic updates occurring before each render pass.

## Architecture

### High-Level Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                        Game Loop                             │
│                  (requestAnimationFrame)                     │
└────────────┬────────────────────────────────────────────────┘
             │
             ├──> Input Handler ──> Game State Manager
             │
             ├──> Physics Engine ──> Character State
             │
             ├──> Collision Detector ──> Game State Manager
             │
             ├──> Obstacle Manager ──> Obstacle Array
             │
             └──> Renderer ──> Canvas Context
```

### Component Responsibilities

**Game Loop**
- Orchestrates all game updates at 60 FPS
- Calls update logic before rendering
- Maintains frame timing consistency

**Input Handler**
- Listens for SPACE key and mouse click events
- Routes input to appropriate handlers based on game state
- Prevents default browser behaviors

**Game State Manager**
- Maintains current state: 'start', 'playing', or 'gameOver'
- Handles state transitions
- Resets game variables on restart

**Physics Engine**
- Applies gravity constant (0.3 px/frame²)
- Processes jump velocity (-6 px/frame)
- Updates character position and rotation
- Enforces maximum falling velocity

**Collision Detector**
- Performs bounding box intersection tests
- Checks character vs obstacles
- Checks character vs canvas boundaries
- Triggers game over on collision

**Obstacle Manager**
- Spawns obstacles every 180 frames
- Moves obstacles left at 1.5 px/frame
- Removes off-screen obstacles
- Randomizes gap positions

**Renderer**
- Clears and redraws canvas each frame
- Renders background, obstacles, character, and UI
- Applies character rotation
- Displays score and state-specific text

## Components and Interfaces

### Game Class

The main game controller that initializes and orchestrates all components.

```javascript
class Game {
  constructor(canvasId)
  init()
  start()
  update()
  render()
  reset()
  handleInput()
  changeState(newState)
}
```

**Methods:**
- `constructor(canvasId)`: Initializes canvas, loads assets, sets up event listeners
- `init()`: Initializes all game components and variables
- `start()`: Begins the game loop
- `update()`: Updates all game logic based on current state
- `render()`: Delegates rendering to the Renderer component
- `reset()`: Resets all game variables for a new game
- `handleInput()`: Processes player input based on current state
- `changeState(newState)`: Transitions between game states

### Character Class

Represents the player-controlled Kiro character.

```javascript
class Character {
  constructor(x, y, sprite)
  update(gravity, maxVelocity)
  jump(jumpPower)
  reset()
  getBounds()
  getRotation()
}
```

**Properties:**
- `x, y`: Position coordinates
- `velocity`: Current vertical velocity
- `sprite`: Image object (kiro-logo.png)
- `width, height`: Sprite dimensions
- `rotation`: Current rotation angle

**Methods:**
- `update(gravity, maxVelocity)`: Applies physics and updates position
- `jump(jumpPower)`: Sets velocity to jump power value
- `reset()`: Returns character to starting position and state
- `getBounds()`: Returns bounding box for collision detection
- `getRotation()`: Calculates rotation based on velocity

### Obstacle Class

Represents a pair of pipes (top and bottom) with a gap.

```javascript
class Obstacle {
  constructor(x, canvasHeight, gapSize, gapY)
  update(speed)
  isOffScreen()
  isPassed(characterX)
  getBounds()
}
```

**Properties:**
- `x`: Horizontal position
- `width`: Obstacle width (constant)
- `gapY`: Vertical position of gap center
- `gapSize`: Height of the gap
- `passed`: Boolean flag for scoring
- `canvasHeight`: Reference to canvas height

**Methods:**
- `update(speed)`: Moves obstacle left by speed
- `isOffScreen()`: Returns true if completely off left edge
- `isPassed(characterX)`: Returns true if character has passed this obstacle
- `getBounds()`: Returns array of bounding boxes [topPipe, bottomPipe]

### PhysicsEngine Class

Handles all physics calculations for the character.

```javascript
class PhysicsEngine {
  constructor(gravity, jumpPower, maxVelocity)
  applyGravity(character)
  applyJump(character)
  updatePosition(character)
}
```

**Properties:**
- `gravity`: Constant gravity value (0.3)
- `jumpPower`: Jump velocity value (-6)
- `maxVelocity`: Maximum falling speed

**Methods:**
- `applyGravity(character)`: Increases character velocity by gravity
- `applyJump(character)`: Sets character velocity to jumpPower
- `updatePosition(character)`: Updates character position based on velocity

### CollisionDetector Class

Performs collision detection between game objects.

```javascript
class CollisionDetector {
  checkCollision(character, obstacles, canvasHeight)
  checkBoundaryCollision(character, canvasHeight)
  checkObstacleCollision(character, obstacles)
  boxIntersect(box1, box2)
}
```

**Methods:**
- `checkCollision(character, obstacles, canvasHeight)`: Main collision check, returns true if any collision
- `checkBoundaryCollision(character, canvasHeight)`: Checks top/bottom boundaries
- `checkObstacleCollision(character, obstacles)`: Checks all obstacles
- `boxIntersect(box1, box2)`: Bounding box intersection algorithm

### ObstacleManager Class

Manages obstacle spawning, movement, and cleanup.

```javascript
class ObstacleManager {
  constructor(canvasWidth, canvasHeight, spawnInterval, speed, gapSize)
  update(frameCount)
  spawn()
  removeOffScreen()
  checkScore(character)
  reset()
  getObstacles()
}
```

**Properties:**
- `obstacles`: Array of Obstacle instances
- `spawnInterval`: Frames between spawns (180)
- `speed`: Obstacle movement speed (1.5)
- `gapSize`: Height of gap between pipes
- `canvasWidth, canvasHeight`: Canvas dimensions

**Methods:**
- `update(frameCount)`: Updates all obstacles and handles spawning
- `spawn()`: Creates new obstacle with random gap position
- `removeOffScreen()`: Removes obstacles that have left the screen
- `checkScore(character)`: Returns number of newly passed obstacles
- `reset()`: Clears all obstacles
- `getObstacles()`: Returns obstacle array

### Renderer Class

Handles all canvas drawing operations.

```javascript
class Renderer {
  constructor(canvas, ctx)
  clear()
  drawBackground()
  drawCharacter(character)
  drawObstacles(obstacles)
  drawScore(score)
  drawStartScreen()
  drawGameOverScreen(score)
  drawText(text, x, y, size, color)
}
```

**Properties:**
- `canvas`: Canvas element reference
- `ctx`: 2D rendering context
- `colors`: Object containing Kiro brand colors

**Methods:**
- `clear()`: Clears the entire canvas
- `drawBackground()`: Draws dark background
- `drawCharacter(character)`: Draws rotated character sprite
- `drawObstacles(obstacles)`: Draws all obstacle pipes
- `drawScore(score)`: Displays current score
- `drawStartScreen()`: Renders start state UI
- `drawGameOverScreen(score)`: Renders game over state UI
- `drawText(text, x, y, size, color)`: Helper for text rendering

## Data Models

### Game State

```javascript
{
  state: 'start' | 'playing' | 'gameOver',
  score: number,
  frameCount: number,
  character: Character,
  obstacles: Obstacle[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
}
```

### Character State

```javascript
{
  x: number,              // Horizontal position (fixed)
  y: number,              // Vertical position
  velocity: number,       // Current vertical velocity
  sprite: HTMLImageElement,
  width: number,          // Sprite width
  height: number,         // Sprite height
  rotation: number        // Current rotation in radians
}
```

### Obstacle State

```javascript
{
  x: number,              // Horizontal position
  width: number,          // Pipe width (constant)
  gapY: number,           // Vertical center of gap
  gapSize: number,        // Height of gap
  passed: boolean,        // Whether character has passed
  canvasHeight: number    // Reference for calculations
}
```

### Bounding Box

```javascript
{
  x: number,              // Left edge
  y: number,              // Top edge
  width: number,          // Box width
  height: number          // Box height
}
```

### Constants

```javascript
const GAME_CONFIG = {
  CANVAS_WIDTH: 400,
  CANVAS_HEIGHT: 600,
  GRAVITY: 0.3,
  JUMP_POWER: -6,
  MAX_VELOCITY: 10,
  OBSTACLE_SPEED: 1.5,
  OBSTACLE_WIDTH: 60,
  OBSTACLE_GAP: 150,
  SPAWN_INTERVAL: 180,
  CHARACTER_START_X: 100,
  CHARACTER_START_Y: 300,
  COLORS: {
    PURPLE_500: '#790ECB',
    BLACK_900: '#000000',
    PREY_900: '#1a1a1a',
    PREY_750: '#2a2a2a',
    WHITE: '#ffffff',
    PREY_300: '#cccccc'
  }
}
```

