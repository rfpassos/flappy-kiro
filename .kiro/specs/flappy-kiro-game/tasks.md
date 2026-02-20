# Implementation Plan: Flappy Kiro Game

## Overview

This implementation follows the "Start Small, Build Smart" philosophy. We'll begin with the simplest working version - a character that can jump on a canvas - then progressively add physics, obstacles, collision detection, scoring, and polish. After each major task, you should be able to run and test the game to see incremental progress.

The game is built with vanilla JavaScript and HTML5 Canvas, using the kiro-logo.png sprite and Kiro brand colors for styling.

## Tasks

- [x] 1. Set up basic HTML structure and canvas
  - Create index.html with canvas element (400x600px)
  - Link to game.js script file
  - Add basic styling with dark background (#000000)
  - Load kiro-logo.png image asset
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Implement basic character rendering and jump mechanic
  - [x] 2.1 Create Character class with position and sprite
    - Initialize character at starting position (100, 300)
    - Store sprite dimensions
    - Implement getBounds() method for future collision detection
    - _Requirements: 1.3, 2.3_
  
  - [x] 2.2 Create Renderer class and draw character on canvas
    - Implement clear() and drawBackground() methods
    - Implement drawCharacter() to render sprite at character position
    - Set up basic game loop with requestAnimationFrame
    - _Requirements: 8.2, 8.3, 10.1_
  
  - [x] 2.3 Add basic jump input handling
    - Listen for SPACE key and mouse click events
    - Move character up by fixed amount when input received
    - _Requirements: 9.1, 9.2_

- [x] 3. Checkpoint - Test basic character and input
  - Run the game in browser
  - Verify character sprite displays correctly
  - Verify character moves up when SPACE or click is pressed
  - Ask user for feedback on character size and jump feel

- [x] 4. Implement physics system
  - [x] 4.1 Create PhysicsEngine class with gravity and velocity
    - Implement gravity constant (0.3 px/frame²)
    - Implement jump power (-6 px/frame)
    - Add maximum falling velocity limit
    - _Requirements: 2.1, 2.2, 2.5_
  
  - [x] 4.2 Apply physics to character movement
    - Update Character class to use velocity-based movement
    - Apply gravity each frame to increase velocity
    - Update position based on velocity
    - Make jump set velocity instead of directly changing position
    - _Requirements: 2.2, 2.3_
  
  - [x] 4.3 Add character rotation based on velocity
    - Calculate rotation angle from velocity
    - Apply rotation when rendering character
    - _Requirements: 2.4, 8.3_

- [x] 5. Checkpoint - Test physics and feel
  - Run the game and test gravity and jumping
  - Verify character falls naturally and jumps feel responsive
  - Ask user for feedback on gravity strength and jump power

- [x] 6. Implement obstacle system
  - [x] 6.1 Create Obstacle class
    - Define obstacle with top and bottom pipes
    - Implement getBounds() for collision detection
    - Add passed flag for scoring
    - _Requirements: 3.2, 3.5_
  
  - [x] 6.2 Create ObstacleManager class
    - Implement obstacle spawning every 180 frames
    - Randomize gap vertical position within safe bounds
    - Set gap size to 150px
    - _Requirements: 3.1, 3.5_
  
  - [x] 6.3 Implement obstacle movement and cleanup
    - Move obstacles left at 1.5 px/frame
    - Remove obstacles when they move off-screen
    - _Requirements: 3.3, 3.4_
  
  - [x] 6.4 Add obstacle rendering
    - Draw top and bottom pipes with clear visual distinction
    - Use contrasting color from background
    - _Requirements: 8.4_

- [x] 7. Checkpoint - Test obstacle spawning and movement
  - Run the game and observe obstacles spawning and moving
  - Verify gap size feels fair and passable
  - Ask user for feedback on obstacle speed and gap size

- [x] 8. Implement collision detection and game states
  - [x] 8.1 Create CollisionDetector class
    - Implement bounding box intersection algorithm
    - Check character vs obstacles collision
    - Check character vs canvas boundaries (top and bottom)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [x] 8.2 Implement game state management
    - Add state property: 'start', 'playing', 'gameOver'
    - Initialize game in 'start' state
    - Transition to 'playing' on first input
    - Transition to 'gameOver' on collision
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  
  - [x] 8.3 Update game loop to respect states
    - Only update physics and obstacles in 'playing' state
    - Pause game logic in 'start' and 'gameOver' states
    - _Requirements: 6.4, 6.5_

- [x] 9. Implement scoring system
  - [x] 9.1 Add score tracking
    - Initialize score to 0 when entering 'playing' state
    - Increment score when character passes obstacle
    - Ensure each obstacle only increments score once
    - _Requirements: 5.1, 5.2, 5.5_
  
  - [x] 9.2 Display score on screen
    - Render current score during 'playing' state
    - Use high contrast color (white) for readability
    - Position score at top center of canvas
    - _Requirements: 5.3, 8.5_

- [x] 10. Implement game over and restart functionality
  - [x] 10.1 Create game over screen
    - Display "Game Over" text
    - Show final score
    - Display "Press SPACE or click to restart" instruction
    - Use Kiro purple (#790ECB) for primary text
    - _Requirements: 7.1, 7.2, 7.3, 8.1_
  
  - [x] 10.2 Implement restart logic
    - Reset character position and velocity
    - Clear all obstacles
    - Reset score to 0
    - Reset frame count
    - Transition to 'playing' state
    - _Requirements: 7.4, 7.5_
  
  - [x] 10.3 Create start screen
    - Display "Press SPACE or click to start!" text
    - Show game title or instructions
    - Use Kiro brand colors for styling
    - _Requirements: 1.5, 8.1_

- [x] 11. Polish rendering and visual feedback
  - [x] 11.1 Apply Kiro brand color scheme
    - Use purple (#790ECB) for primary UI elements
    - Use dark backgrounds (black-900 #000000)
    - Ensure high contrast for all text
    - _Requirements: 8.1, 8.2, 8.5_
  
  - [x] 11.2 Optimize rendering order
    - Draw background first
    - Draw obstacles second
    - Draw character third
    - Draw UI and score last
    - _Requirements: 10.5_
  
  - [x] 11.3 Add smooth animations and transitions
    - Ensure 60 FPS target is maintained
    - Verify requestAnimationFrame timing
    - Test frame rate consistency
    - _Requirements: 10.2, 10.3_

- [x] 12. Final checkpoint - Complete game testing
  - Run full game from start to game over to restart
  - Test all input methods (keyboard and mouse)
  - Verify scoring accuracy
  - Verify collision detection accuracy
  - Ask user for final feedback and any desired adjustments

## Enhancement Tasks - Visual Effects & Score Persistence

- [x] 13. Implement score persistence with localStorage
  - [x] 13.1 Create ScoreManager class
    - Add methods to save current score to localStorage
    - Add method to retrieve high score from localStorage
    - Initialize high score on game load
    - _Feature: Save game history and scores_
  
  - [x] 13.2 Update UI to display high score
    - Show high score on start screen
    - Show high score on game over screen
    - Highlight when new high score is achieved
    - Use Kiro purple for high score text
    - _Feature: Save game history and scores_

- [x] 14. Add trail particle effects behind Kiro
  - [x] 14.1 Create ParticleSystem class
    - Define particle properties (position, velocity, lifetime, color)
    - Implement particle spawning behind character
    - Update particle positions and fade over time
    - Remove dead particles automatically
    - _Feature: Trail particles behind Kiro_
  
  - [x] 14.2 Integrate trail particles into game loop
    - Spawn particles continuously while in 'playing' state
    - Render particles before character (behind Kiro)
    - Use Kiro purple (#790ECB) with transparency
    - Ensure 60 FPS performance maintained
    - _Feature: Trail particles behind Kiro_

- [x] 15. Add explosion effect on collision
  - [x] 15.1 Create explosion particle effect
    - Spawn burst of particles on collision
    - Particles radiate outward from collision point
    - Use red/orange colors for explosion
    - Particles fade out over 0.5-1 second
    - _Feature: Explosion effects on collision_
  
  - [x] 15.2 Trigger explosion on game over
    - Detect collision point (character center)
    - Spawn explosion particles at collision
    - Play explosion animation before showing game over screen
    - Add small delay (0.5s) for visual impact
    - _Feature: Explosion effects on collision_

- [x] 16. Add sparkle effects when passing obstacles
  - [x] 16.1 Create sparkle particle effect
    - Spawn sparkle particles when score increments
    - Position sparkles at gap center
    - Use bright colors (white, yellow, Kiro purple)
    - Sparkles rise upward and fade
    - _Feature: Sparkles when passing obstacles_
  
  - [x] 16.2 Integrate sparkles with scoring system
    - Trigger sparkles in obstacleManager.checkScore()
    - Spawn 5-10 sparkle particles per obstacle passed
    - Ensure sparkles don't impact performance
    - Render sparkles on top of obstacles but below UI
    - _Feature: Sparkles when passing obstacles_

- [x] 17. Add confetti effect for new high score
  - [x] 17.1 Create confetti particle effect
    - Spawn colorful confetti particles across screen
    - Use Kiro brand colors (purple, white, gray)
    - Confetti falls with gravity and rotation
    - Particles bounce slightly on canvas bottom
    - _Feature: Confetti on new high score_
  
  - [x] 17.2 Trigger confetti on high score achievement
    - Check if current score > high score on game over
    - Spawn confetti particles if new high score
    - Display "NEW HIGH SCORE!" text with animation
    - Confetti continues during game over screen
    - Save new high score to localStorage
    - _Feature: Confetti on new high score_

## Notes

- After each checkpoint task, run the game in your browser and test the new functionality
- The game should be playable and testable after task 8 (collision and states)
- Focus on getting core gameplay working before adding polish
- User feedback at checkpoints helps ensure the game feels good to play
- All tasks reference specific requirements for traceability
- The implementation builds incrementally - each task adds to the previous work
