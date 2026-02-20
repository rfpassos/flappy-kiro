# Requirements Document

## Introduction

Flappy Kiro is a browser-based game where players control the Kiro character (using kiro-logo.png sprite) through a series of obstacles by making it jump. The game features physics-based movement, collision detection, scoring, and game state management. Built with vanilla JavaScript and HTML5 Canvas, the game provides responsive controls and clear visual feedback.

## Glossary

- **Game**: The Flappy Kiro game application
- **Canvas**: The HTML5 canvas element used for rendering
- **Kiro_Character**: The player-controlled sprite using kiro-logo.png
- **Obstacle**: A vertical pipe or barrier that moves from right to left
- **Game_State**: The current state of the game (start, playing, gameOver)
- **Score**: The player's current score based on obstacles passed
- **Physics_Engine**: The component handling gravity and jump mechanics
- **Collision_Detector**: The component checking for collisions between Kiro and obstacles
- **Renderer**: The component responsible for drawing game elements on canvas

## Requirements

### Requirement 1: Game Initialization and Canvas Setup

**User Story:** As a player, I want the game to load in my browser with a proper canvas, so that I can see and interact with the game.

#### Acceptance Criteria

1. THE Game SHALL create an HTML5 canvas element for rendering
2. THE Canvas SHALL fill the browser viewport or have dimensions of at least 400x600 pixels
3. THE Game SHALL load the kiro-logo.png image as the Kiro_Character sprite
4. WHEN the page loads, THE Game SHALL initialize in the 'start' Game_State
5. THE Renderer SHALL display a start screen with the text "Press SPACE or click to start!"

### Requirement 2: Character Physics and Movement

**User Story:** As a player, I want the Kiro character to respond to gravity and my jump commands with balanced physics, so that the game feels responsive and fair.

#### Acceptance Criteria

1. WHILE in 'playing' Game_State, THE Physics_Engine SHALL apply gravity of 0.3 pixels per frame squared to Kiro_Character
2. WHEN the player presses SPACE or clicks, THE Physics_Engine SHALL apply a jump power of -6 pixels per frame to Kiro_Character velocity
3. THE Physics_Engine SHALL update Kiro_Character position based on velocity every frame
4. THE Kiro_Character SHALL rotate based on velocity (tilting up when jumping, down when falling)
5. THE Kiro_Character SHALL have a maximum falling velocity to prevent excessive speed

### Requirement 3: Obstacle Generation and Movement

**User Story:** As a player, I want obstacles to appear and move at a reasonable pace, so that I have time to react and navigate through them.

#### Acceptance Criteria

1. WHILE in 'playing' Game_State, THE Game SHALL spawn a new Obstacle every 180 frames
2. THE Obstacle SHALL consist of a top and bottom section with a gap for the Kiro_Character to pass through
3. WHILE in 'playing' Game_State, THE Obstacle SHALL move left at 1.5 pixels per frame
4. WHEN an Obstacle moves completely off the left edge of the Canvas, THE Game SHALL remove it from memory
5. THE Obstacle gap SHALL be positioned at a random vertical location within safe bounds

### Requirement 4: Collision Detection

**User Story:** As a player, I want the game to detect when I hit an obstacle or boundary, so that the game ends fairly when I make a mistake.

#### Acceptance Criteria

1. WHILE in 'playing' Game_State, THE Collision_Detector SHALL check for collisions between Kiro_Character and Obstacles every frame
2. WHEN Kiro_Character intersects with an Obstacle, THE Game SHALL transition to 'gameOver' Game_State
3. WHEN Kiro_Character position exceeds the top boundary of the Canvas, THE Game SHALL transition to 'gameOver' Game_State
4. WHEN Kiro_Character position exceeds the bottom boundary of the Canvas, THE Game SHALL transition to 'gameOver' Game_State
5. THE Collision_Detector SHALL use bounding box collision detection for accuracy

### Requirement 5: Scoring System

**User Story:** As a player, I want to see my score increase as I successfully pass obstacles, so that I can track my progress and challenge myself.

#### Acceptance Criteria

1. WHEN the game transitions to 'playing' Game_State, THE Game SHALL initialize Score to 0
2. WHEN Kiro_Character successfully passes an Obstacle, THE Game SHALL increment Score by 1
3. WHILE in 'playing' Game_State, THE Renderer SHALL display the current Score on the Canvas
4. WHEN the game transitions to 'gameOver' Game_State, THE Renderer SHALL display the final Score
5. THE Game SHALL track each Obstacle to ensure Score increments only once per Obstacle

### Requirement 6: Game State Management

**User Story:** As a player, I want clear game states with proper transitions, so that I know when to start playing and when the game has ended.

#### Acceptance Criteria

1. THE Game SHALL support three Game_States: 'start', 'playing', and 'gameOver'
2. WHEN the page loads, THE Game SHALL set Game_State to 'start'
3. WHEN Game_State is 'start' AND the player presses SPACE, THE Game SHALL transition to 'playing' Game_State
4. WHILE in 'start' or 'gameOver' Game_State, THE Physics_Engine SHALL NOT update game logic
5. WHILE in 'playing' Game_State, THE Game SHALL update all game logic every frame

### Requirement 7: Game Over and Restart

**User Story:** As a player, I want to see a game over screen and be able to restart the game, so that I can play multiple rounds without refreshing the page.

#### Acceptance Criteria

1. WHEN Game_State transitions to 'gameOver', THE Renderer SHALL display "Game Over" text
2. WHEN Game_State is 'gameOver', THE Renderer SHALL display the final Score
3. WHEN Game_State is 'gameOver', THE Renderer SHALL display "Press SPACE or click to restart" text
4. WHEN Game_State is 'gameOver' AND the player presses SPACE or clicks, THE Game SHALL reset all game variables and transition to 'playing' Game_State
5. WHEN restarting, THE Game SHALL clear all existing Obstacles and reset Kiro_Character position

### Requirement 8: Visual Rendering and Styling

**User Story:** As a player, I want the game to have a polished visual appearance with the Kiro brand colors, so that it looks professional and engaging.

#### Acceptance Criteria

1. THE Renderer SHALL use the Kiro brand color purple (#790ECB) for primary UI elements
2. THE Renderer SHALL use dark backgrounds (black-900 or prey-900) for the Canvas
3. THE Renderer SHALL render the Kiro_Character sprite with rotation applied
4. THE Renderer SHALL render Obstacles with clear visual distinction from the background
5. THE Renderer SHALL render all text with high contrast for readability

### Requirement 9: Input Handling

**User Story:** As a player, I want responsive controls via keyboard or mouse, so that I can play the game with my preferred input method.

#### Acceptance Criteria

1. WHEN the player presses the SPACE key, THE Game SHALL process the input based on current Game_State
2. WHEN the player clicks on the Canvas, THE Game SHALL process the input based on current Game_State
3. WHEN Game_State is 'start' AND input is received, THE Game SHALL transition to 'playing' Game_State
4. WHEN Game_State is 'playing' AND input is received, THE Physics_Engine SHALL apply jump power to Kiro_Character
5. WHEN Game_State is 'gameOver' AND input is received, THE Game SHALL restart the game

### Requirement 10: Game Loop and Timing

**User Story:** As a player, I want smooth gameplay with consistent frame timing, so that the game feels responsive and runs at a steady pace.

#### Acceptance Criteria

1. THE Game SHALL implement a game loop using requestAnimationFrame
2. THE Game SHALL target 60 frames per second for smooth gameplay
3. THE Game SHALL update game logic before rendering each frame
4. THE Game SHALL maintain consistent obstacle spawning timing regardless of frame rate variations
5. THE Game SHALL render all game elements in the correct order (background, obstacles, character, UI)
