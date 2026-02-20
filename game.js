// Flappy Kiro Game
// Main game file

// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load kiro-logo.png sprite
const kiroSprite = new Image();
kiroSprite.src = 'kiro-logo.png';

kiroSprite.onerror = () => {
    console.error('Failed to load kiro-logo.png');
};

// Particle class - represents a single trail particle
class Particle {
    constructor(x, y, vx, vy, lifetime, color, size = null, shape = 'circle', rotation = 0, width = null, height = null) {
        this.x = x;
        this.y = y;
        this.vx = vx; // Velocity X
        this.vy = vy; // Velocity Y
        this.lifetime = lifetime; // Starts at 1.0, decreases each frame
        this.maxLifetime = lifetime; // Store initial lifetime for alpha calculation
        this.color = color;
        this.size = size !== null ? size : (3 + Math.random() * 2); // Custom size or random 3-5px
        this.shape = shape; // 'circle' or 'rectangle'
        this.rotation = rotation; // Rotation angle in radians
        this.rotationSpeed = (Math.random() - 0.5) * 0.2; // Random rotation speed
        this.width = width !== null ? width : this.size; // Width for rectangles
        this.height = height !== null ? height : this.size; // Height for rectangles
        this.canvasHeight = null; // Set by ParticleSystem for bounce behavior
        this.bounceEnabled = false; // Enable bounce behavior for confetti
    }
    
    // Updates particle position and decreases lifetime
    update() {
        // Apply gravity if enabled (for confetti)
        if (this.gravity) {
            this.vy += this.gravity;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime -= 0.02; // Decrease lifetime each frame
        
        // Apply rotation
        this.rotation += this.rotationSpeed;
        
        // Bounce behavior for confetti
        if (this.bounceEnabled && this.canvasHeight !== null) {
            if (this.y >= this.canvasHeight - this.height / 2) {
                this.y = this.canvasHeight - this.height / 2;
                this.vy = -Math.abs(this.vy) * 0.5; // Bounce with 50% energy loss
            }
        }
    }
    
    // Returns true if particle should be removed
    isDead() {
        return this.lifetime <= 0;
    }
    
    // Returns alpha value based on remaining lifetime (fades from 1.0 to 0.0)
    getAlpha() {
        return this.lifetime / this.maxLifetime;
    }
}

// ParticleSystem class - manages trail particles behind Kiro
class ParticleSystem {
    constructor() {
        this.particles = [];
    }
    
    // Creates a new trail particle at the specified position
    spawnTrailParticle(x, y) {
        // Small random velocity for spread effect
        const vx = (Math.random() - 0.5) * 1.5; // Random between -0.75 and 0.75
        const vy = (Math.random() - 0.5) * 1.5; // Random between -0.75 and 0.75
        const lifetime = 1.0;
        const color = '#790ECB'; // Kiro purple
        
        const particle = new Particle(x, y, vx, vy, lifetime, color);
        this.particles.push(particle);
    }

    // Creates an explosion effect with particles radiating outward
    spawnExplosion(x, y, count = 20) {
        const colors = ['#ff4444', '#ff8844', '#ffaa44']; // Red, orange, yellow

        for (let i = 0; i < count; i++) {
            // Calculate angle for circular burst pattern (360 degrees)
            const angle = (Math.PI * 2 * i) / count;

            // Random velocity magnitude between 3-6 px/frame
            const speed = 3 + Math.random() * 3;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            // Random lifetime between 1.5-2.0 seconds (90-120 frames at 60fps)
            const lifetime = 1.5 + Math.random() * 0.5;

            // Random color from explosion palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Larger size for explosion particles (4-8px)
            const size = 4 + Math.random() * 4;

            const particle = new Particle(x, y, vx, vy, lifetime, color, size);
            this.particles.push(particle);
        }
    }

    // Creates sparkle particles that rise upward
    spawnSparkles(x, y, count = 8) {
        const colors = ['#ffffff', '#ffff00', '#790ECB']; // White, yellow, Kiro purple

        for (let i = 0; i < count; i++) {
            // Small random X velocity for spread (-1 to 1 px/frame)
            const vx = (Math.random() - 0.5) * 2;

            // Negative Y velocity for upward movement (-2 to -4 px/frame)
            const vy = -2 - Math.random() * 2;

            // Medium lifetime between 1.0-1.5 seconds (60-90 frames at 60fps)
            const lifetime = 1.0 + Math.random() * 0.5;

            // Random color from sparkle palette
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Medium size for sparkle particles (3-6px)
            const size = 3 + Math.random() * 3;

            const particle = new Particle(x, y, vx, vy, lifetime, color, size);
            this.particles.push(particle);
        }
    }

    // Creates confetti particles that fall across the screen
    spawnConfetti(count = 50) {
        const colors = ['#790ECB', '#ffffff', '#cccccc']; // Kiro purple, white, gray
        const canvasWidth = 800; // Game canvas width
        const canvasHeight = 600; // Game canvas height

        for (let i = 0; i < count; i++) {
            // Random X position across the top of the screen
            const x = Math.random() * canvasWidth;
            const y = 0; // Start at top

            // Small random X velocity for drift (-1 to 1 px/frame)
            const vx = (Math.random() - 0.5) * 2;

            // Positive Y velocity for downward movement (2 to 4 px/frame)
            const vy = 2 + Math.random() * 2;

            // Long lifetime between 3.0-4.0 seconds (180-240 frames at 60fps)
            const lifetime = 3.0 + Math.random() * 1.0;

            // Random color from confetti palette
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Medium-large rectangular size (6-10px width, 10-15px height)
            const width = 6 + Math.random() * 4;
            const height = 10 + Math.random() * 5;

            // Random initial rotation
            const rotation = Math.random() * Math.PI * 2;

            const particle = new Particle(x, y, vx, vy, lifetime, color, null, 'rectangle', rotation, width, height);
            particle.canvasHeight = canvasHeight;
            particle.bounceEnabled = true;
            
            // Apply gravity to confetti
            particle.gravity = 0.15; // Gravity acceleration
            
            this.particles.push(particle);
        }
    }


    
    // Updates all particles and removes dead ones
    update() {
        // Update each particle
        for (let particle of this.particles) {
            particle.update();
        }
        
        // Remove dead particles
        this.particles = this.particles.filter(particle => !particle.isDead());
    }
    
    // Returns array of active particles
    getParticles() {
        return this.particles;
    }
    
    // Removes all particles (for game reset)
    clear() {
        this.particles = [];
    }
}

// ScoreManager class - handles score persistence using localStorage
class ScoreManager {
    constructor() {
        this.storageKey = 'flappyKiroHighScore';
        this.highScore = this.getHighScore();
    }
    
    // Save current score to localStorage (for game history)
    saveScore(score) {
        // Optional: Could be extended to save game history
        // For now, we'll use this to update high score if needed
        if (this.isNewHighScore(score)) {
            this.updateHighScore(score);
        }
    }
    
    // Retrieve high score from localStorage
    getHighScore() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? parseInt(stored, 10) : 0;
    }
    
    // Check if current score beats high score
    isNewHighScore(score) {
        return score > this.highScore;
    }
    
    // Save new high score to localStorage
    updateHighScore(score) {
        this.highScore = score;
        localStorage.setItem(this.storageKey, score.toString());
        console.log('New high score saved:', score);
    }
}

// Character class - represents the player-controlled Kiro character
class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.velocity = 0;
        this.rotation = 0;
        
        // Set sprite dimensions (kiro-logo.png is approximately square)
        // We'll scale it to a reasonable game size
        this.width = 40;
        this.height = 40;
    }
    
    // Returns bounding box for collision detection
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    // Calculates rotation angle based on velocity
    // Tilts up when jumping (negative velocity), down when falling (positive velocity)
    getRotation() {
        // Convert velocity to rotation angle
        // Multiplier of 0.05 provides smooth rotation feel
        let rotation = this.velocity * 0.05;
        
        // Clamp rotation to reasonable limits
        // -30 degrees (upward tilt) to 90 degrees (downward tilt)
        const minRotation = -30 * Math.PI / 180; // Convert to radians
        const maxRotation = 90 * Math.PI / 180;
        
        if (rotation < minRotation) {
            rotation = minRotation;
        } else if (rotation > maxRotation) {
            rotation = maxRotation;
        }
        
        return rotation;
    }

}

// Obstacle class - represents pipe obstacles with a gap for the character to fly through
class Obstacle {
    constructor(x, canvasHeight, gapSize, gapY) {
        this.x = x;
        this.width = 60; // Constant width for all obstacles
        this.canvasHeight = canvasHeight;
        this.gapSize = gapSize; // Height of the gap (150px)
        this.gapY = gapY; // Vertical position of gap center
        this.passed = false; // Flag for scoring - true when character passes
    }
    
    // Moves obstacle left by speed amount
    update(speed) {
        this.x -= speed;
    }
    
    // Returns true if obstacle is completely off the left edge of screen
    isOffScreen() {
        return this.x + this.width < 0;
    }
    
    // Returns true if character has passed this obstacle (for scoring)
    isPassed(characterX) {
        // Character has passed if its x position is greater than obstacle's right edge
        return characterX > this.x + this.width;
    }
    
    // Returns array of bounding boxes for collision detection
    // [topPipe, bottomPipe] - each with x, y, width, height
    getBounds() {
        const topPipeHeight = this.gapY - this.gapSize / 2;
        const bottomPipeY = this.gapY + this.gapSize / 2;
        const bottomPipeHeight = this.canvasHeight - bottomPipeY;
        
        return [
            // Top pipe
            {
                x: this.x,
                y: 0,
                width: this.width,
                height: topPipeHeight
            },
            // Bottom pipe
            {
                x: this.x,
                y: bottomPipeY,
                width: this.width,
                height: bottomPipeHeight
            }
        ];
    }
}

// ObstacleManager class - manages spawning, updating, and scoring of obstacles
class ObstacleManager {
    constructor(canvasWidth, canvasHeight, spawnInterval, speed, gapSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spawnInterval = spawnInterval; // Frames between spawns (180)
        this.speed = speed; // Obstacle movement speed (1.5)
        this.gapSize = gapSize; // Height of gap between pipes (150)
        this.obstacles = []; // Array of Obstacle instances
    }
    
    // Updates all obstacles and handles spawning based on frame count
    update(frameCount) {
        // Spawn new obstacle at spawn interval
        if (frameCount % this.spawnInterval === 0) {
            this.spawn();
        }
        
        // Update all obstacles (move them left)
        for (let obstacle of this.obstacles) {
            obstacle.update(this.speed);
        }
        
        // Remove obstacles that have moved off screen
        this.removeOffScreen();
    }
    
    // Creates new obstacle with random gap position within safe bounds
    spawn() {
        // Calculate safe bounds for gap position
        // Gap center must be at least gapSize/2 from top and bottom
        const minGapY = this.gapSize / 2;
        const maxGapY = this.canvasHeight - this.gapSize / 2;
        
        // Randomize gap vertical position within safe bounds
        const gapY = minGapY + Math.random() * (maxGapY - minGapY);
        
        // Create new obstacle at right edge of canvas
        const obstacle = new Obstacle(this.canvasWidth, this.canvasHeight, this.gapSize, gapY);
        this.obstacles.push(obstacle);
    }
    
    // Removes obstacles that have left the screen
    removeOffScreen() {
        this.obstacles = this.obstacles.filter(obstacle => !obstacle.isOffScreen());
    }
    
    // Returns number of newly passed obstacles (for scoring)
    checkScore(character) {
        let newlyPassed = 0;
        
        for (let obstacle of this.obstacles) {
            // Check if character has passed this obstacle and it hasn't been counted yet
            if (!obstacle.passed && obstacle.isPassed(character.x)) {
                obstacle.passed = true;
                newlyPassed++;
            }
        }
        
        return newlyPassed;
    }
    
    // Clears all obstacles (for game reset)
    reset() {
        this.obstacles = [];
    }
    
    // Returns obstacle array (for rendering and collision detection)
    getObstacles() {
        return this.obstacles;
    }
}

// PhysicsEngine class - handles gravity, velocity, and jump mechanics
class PhysicsEngine {
    constructor(gravity, jumpPower, maxVelocity) {
        this.gravity = gravity;
        this.jumpPower = jumpPower;
        this.maxVelocity = maxVelocity;
    }
    
    // Applies gravity to character's velocity
    applyGravity(character) {
        character.velocity += this.gravity;
        
        // Enforce maximum falling velocity
        if (character.velocity > this.maxVelocity) {
            character.velocity = this.maxVelocity;
        }
    }
    
    // Applies jump power to character's velocity
    applyJump(character) {
        character.velocity = this.jumpPower;
    }
    
    // Updates character position based on velocity
    updatePosition(character) {
        character.y += character.velocity;
    }
}

// CollisionDetector class - performs collision detection between game objects
class CollisionDetector {
    // Main collision check - returns true if any collision detected
    checkCollision(character, obstacles, canvasHeight) {
        // Check boundary collisions (top and bottom of canvas)
        if (this.checkBoundaryCollision(character, canvasHeight)) {
            return true;
        }
        
        // Check obstacle collisions
        if (this.checkObstacleCollision(character, obstacles)) {
            return true;
        }
        
        return false;
    }
    
    // Checks if character has hit top or bottom boundaries
    checkBoundaryCollision(character, canvasHeight) {
        const bounds = character.getBounds();
        
        // Check top boundary
        if (bounds.y < 0) {
            return true;
        }
        
        // Check bottom boundary
        if (bounds.y + bounds.height > canvasHeight) {
            return true;
        }
        
        return false;
    }
    
    // Checks if character has collided with any obstacle
    checkObstacleCollision(character, obstacles) {
        const characterBounds = character.getBounds();
        
        for (let obstacle of obstacles) {
            const obstacleBounds = obstacle.getBounds(); // Returns [topPipe, bottomPipe]
            
            // Check collision with top pipe
            if (this.boxIntersect(characterBounds, obstacleBounds[0])) {
                return true;
            }
            
            // Check collision with bottom pipe
            if (this.boxIntersect(characterBounds, obstacleBounds[1])) {
                return true;
            }
        }
        
        return false;
    }
    
    // Bounding box intersection algorithm
    // Returns true if two boxes overlap
    boxIntersect(box1, box2) {
        return box1.x < box2.x + box2.width &&
               box1.x + box1.width > box2.x &&
               box1.y < box2.y + box2.height &&
               box1.y + box1.height > box2.y;
    }
}

// Renderer class - handles all canvas drawing operations
class Renderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        
        // Kiro brand colors
        this.colors = {
            PURPLE_500: '#790ECB',
            BLACK_900: '#000000',
            PREY_900: '#1a1a1a',
            PREY_750: '#2a2a2a',
            WHITE: '#ffffff',
            PREY_300: '#cccccc'
        };
    }
    
    // Clears the entire canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Draws dark background
    drawBackground() {
        this.ctx.fillStyle = this.colors.BLACK_900;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Draws the character sprite at its position
    drawCharacter(character) {
        if (!character || !character.sprite.complete) {
            return; // Don't draw if character or sprite isn't ready
        }
        
        this.ctx.save();
        
        // Move to character position
        this.ctx.translate(character.x + character.width / 2, character.y + character.height / 2);
        
        // Apply rotation (will be used later for physics)
        this.ctx.rotate(character.rotation);
        
        // Draw sprite centered on the character position
        this.ctx.drawImage(
            character.sprite,
            -character.width / 2,
            -character.height / 2,
            character.width,
            character.height
        );
        
        this.ctx.restore();
    }

    // Draws all obstacles (top and bottom pipes)
    drawObstacles(obstacles) {
        if (!obstacles || obstacles.length === 0) {
            return;
        }

        // Use contrasting color - Kiro purple for visual distinction
        this.ctx.fillStyle = this.colors.PREY_750;

        for (let obstacle of obstacles) {
            const bounds = obstacle.getBounds();

            // Draw top pipe
            this.ctx.fillRect(bounds[0].x, bounds[0].y, bounds[0].width, bounds[0].height);

            // Draw bottom pipe
            this.ctx.fillRect(bounds[1].x, bounds[1].y, bounds[1].width, bounds[1].height);

            // Add purple accent border for visual distinction
            this.ctx.strokeStyle = this.colors.PURPLE_500;
            this.ctx.lineWidth = 2;

            // Border for top pipe
            this.ctx.strokeRect(bounds[0].x, bounds[0].y, bounds[0].width, bounds[0].height);

            // Border for bottom pipe
            this.ctx.strokeRect(bounds[1].x, bounds[1].y, bounds[1].width, bounds[1].height);
        }
    }

    // Draws the current score at top center of canvas
    drawScore(score) {
        // Use large, readable font size
        const fontSize = 48;
        this.ctx.font = `bold ${fontSize}px Arial`;
        this.ctx.fillStyle = this.colors.WHITE; // High contrast white color
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';

        // Position at top center of canvas
        const x = this.canvas.width / 2;
        const y = 20; // 20px from top

        this.ctx.fillText(score.toString(), x, y);
    }

    // Draws the game over screen with final score and restart instruction
    drawGameOverScreen(score) {
        // Semi-transparent dark overlay for better text readability
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // "Game Over" text in large Kiro purple
        const gameOverFontSize = 60;
        this.ctx.font = `bold ${gameOverFontSize}px Arial`;
        this.ctx.fillStyle = this.colors.PURPLE_500; // Kiro purple
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ctx.fillText('Game Over', centerX, centerY - 100);

        // Check if this is a new high score
        const isNewHighScore = scoreManager && scoreManager.isNewHighScore(score);

        // Display "NEW HIGH SCORE!" if applicable
        if (isNewHighScore) {
            const newHighScoreFontSize = 32;
            this.ctx.font = `bold ${newHighScoreFontSize}px Arial`;
            this.ctx.fillStyle = this.colors.PURPLE_500;
            this.ctx.fillText('NEW HIGH SCORE!', centerX, centerY - 50);
        }

        // Final score text in white
        const scoreFontSize = 36;
        this.ctx.font = `bold ${scoreFontSize}px Arial`;
        this.ctx.fillStyle = this.colors.WHITE;

        this.ctx.fillText(`Score: ${score}`, centerX, centerY + 10);

        // High score display in Kiro purple
        if (scoreManager) {
            const highScoreFontSize = 28;
            this.ctx.font = `bold ${highScoreFontSize}px Arial`;
            this.ctx.fillStyle = this.colors.PURPLE_500;
            this.ctx.fillText(`High Score: ${scoreManager.getHighScore()}`, centerX, centerY + 50);
        }

        // Restart instruction text in lighter gray
        const instructionFontSize = 24;
        this.ctx.font = `${instructionFontSize}px Arial`;
        this.ctx.fillStyle = this.colors.PREY_300;

        this.ctx.fillText('Press SPACE or click to restart', centerX, centerY + 100);
    }

    // Draws the start screen with game title and instructions
    drawStartScreen() {
        // Semi-transparent dark overlay for better text readability
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // "Flappy Kiro" title in large Kiro purple
        const titleFontSize = 60;
        this.ctx.font = `bold ${titleFontSize}px Arial`;
        this.ctx.fillStyle = this.colors.PURPLE_500; // Kiro purple (#790ECB)
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ctx.fillText('Flappy Kiro', centerX, centerY - 60);

        // High score display in Kiro purple
        if (scoreManager && scoreManager.getHighScore() > 0) {
            const highScoreFontSize = 28;
            this.ctx.font = `bold ${highScoreFontSize}px Arial`;
            this.ctx.fillStyle = this.colors.PURPLE_500;
            this.ctx.fillText(`High Score: ${scoreManager.getHighScore()}`, centerX, centerY);
        }

        // Instruction text in white
        const instructionFontSize = 24;
        this.ctx.font = `${instructionFontSize}px Arial`;
        this.ctx.fillStyle = this.colors.WHITE;

        this.ctx.fillText('Press SPACE or click to start!', centerX, centerY + 40);
    }

    // Draws all particles from the particle system
    drawParticles(particles) {
        if (!particles || particles.length === 0) {
            return;
        }
        
        for (let particle of particles) {
            const alpha = particle.getAlpha();
            
            // Convert hex color to rgba with alpha for fade effect
            const color = particle.color;
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            
            if (particle.shape === 'rectangle') {
                // Draw rectangular particle with rotation
                this.ctx.save();
                this.ctx.translate(particle.x, particle.y);
                this.ctx.rotate(particle.rotation);
                this.ctx.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
                this.ctx.restore();
            } else {
                // Draw circular particle
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }

}

// Initialize character at starting position (100, 300)
let character = null;
let renderer = null;
let physics = null;
let obstacleManager = null;
let collisionDetector = null;
let scoreManager = null;
let particleSystem = null;
let frameCount = 0;
let gameState = 'start'; // Game states: 'start', 'playing', 'gameOver'
let score = 0; // Player's current score
let sparkledObstacles = new Set(); // Track obstacles that have already spawned sparkles

// Wait for sprite to load before creating character
kiroSprite.onload = () => {
    console.log('Kiro sprite loaded successfully!');
    character = new Character(100, 300, kiroSprite);
    renderer = new Renderer(canvas, ctx);
    // Create PhysicsEngine with gravity=0.3, jumpPower=-6, maxVelocity=10
    physics = new PhysicsEngine(0.3, -6, 10);
    // Create ObstacleManager with canvasWidth=400, canvasHeight=600, spawnInterval=180, speed=1.5, gapSize=150
    obstacleManager = new ObstacleManager(400, 600, 180, 1.5, 150);
    // Create CollisionDetector instance
    collisionDetector = new CollisionDetector();
    // Create ScoreManager instance
    scoreManager = new ScoreManager();
    // Create ParticleSystem instance
    particleSystem = new ParticleSystem();
    console.log('Character initialized at position:', character.x, character.y);
    console.log('High score loaded:', scoreManager.getHighScore());
    
    // Start the game loop
    gameLoop();
};

// Game loop - runs at 60 FPS using requestAnimationFrame
// requestAnimationFrame automatically syncs with the browser's refresh rate (typically 60 Hz)
// This ensures smooth animations without blocking operations or unnecessary redraws
function gameLoop() {
    // Increment frame count
    frameCount++;
    
    // Only update game logic when in 'playing' state
    if (gameState === 'playing') {
        // Update obstacle manager
        if (obstacleManager) {
            obstacleManager.update(frameCount);
        }
        
        // Apply physics to character
        if (physics && character) {
            physics.applyGravity(character);
            physics.updatePosition(character);
            
            // Update character rotation based on velocity
            character.rotation = character.getRotation();
        }
        
        // Spawn trail particles behind character
        if (particleSystem && character) {
            // Spawn particles every frame for continuous trail
            // Position particles at the center-back of the character
            const particleX = character.x + character.width / 4;
            const particleY = character.y + character.height / 2;
            particleSystem.spawnTrailParticle(particleX, particleY);
        }
        
        // Update particle system
        if (particleSystem) {
            particleSystem.update();
        }
        
        // Check for collisions
        if (collisionDetector && character && obstacleManager) {
            const hasCollision = collisionDetector.checkCollision(
                character,
                obstacleManager.getObstacles(),
                canvas.height
            );
            
            if (hasCollision) {
                // Calculate character center position
                const centerX = character.x + character.width / 2;
                const centerY = character.y + character.height / 2;
                
                // Spawn explosion particles at collision point
                if (particleSystem) {
                    particleSystem.spawnExplosion(centerX, centerY, 30);
                }
                
                // Check if this is a new high score and spawn confetti
                if (scoreManager && scoreManager.isNewHighScore(score)) {
                    if (particleSystem) {
                        particleSystem.spawnConfetti(50);
                        console.log('New high score! Confetti spawned!');
                    }
                }
                
                // Save score when game ends
                if (scoreManager) {
                    scoreManager.saveScore(score);
                }
                
                // Add delay before showing game over screen for visual impact
                setTimeout(() => {
                    gameState = 'gameOver';
                    console.log('Game Over! Collision detected.');
                }, 500); // 0.5 second delay
                
                // Transition to intermediate state to prevent further collisions
                gameState = 'exploding';
            }
        }
        
        // Update score when character passes obstacles
        if (obstacleManager && character) {
            const newlyPassed = obstacleManager.checkScore(character);
            
            // Spawn sparkles for each newly passed obstacle
            if (newlyPassed > 0 && particleSystem) {
                // Find obstacles that were just passed
                const obstacles = obstacleManager.getObstacles();
                for (let obstacle of obstacles) {
                    // Check if this obstacle was just passed and hasn't spawned sparkles yet
                    if (obstacle.passed && !sparkledObstacles.has(obstacle)) {
                        // Calculate gap center position
                        const gapX = obstacle.x + obstacle.width / 2;
                        const gapY = obstacle.gapY;
                        
                        // Spawn 8 sparkle particles at the gap center
                        particleSystem.spawnSparkles(gapX, gapY, 8);
                        
                        // Mark this obstacle as having spawned sparkles
                        sparkledObstacles.add(obstacle);
                    }
                }
            }
            
            score += newlyPassed;
            if (newlyPassed > 0) {
                console.log('Score increased! Current score:', score);
            }
        }
    }
    
    // Continue updating particles during explosion state and game over state
    if (gameState === 'exploding' || gameState === 'gameOver') {
        if (particleSystem) {
            particleSystem.update();
        }
    }
    
    // Clear and redraw (always render regardless of state)
    renderer.clear();
    renderer.drawBackground();
    
    // Draw obstacles after background
    if (obstacleManager) {
        renderer.drawObstacles(obstacleManager.getObstacles());
    }
    
    // Draw particles before character (behind Kiro)
    if (particleSystem) {
        renderer.drawParticles(particleSystem.getParticles());
    }
    
    renderer.drawCharacter(character);
    
    // Draw score when in 'playing' state
    if (gameState === 'playing') {
        renderer.drawScore(score);
    }
    
    // Draw start screen when in 'start' state
    if (gameState === 'start') {
        renderer.drawStartScreen();
    }
    
    // Draw game over screen when in 'gameOver' state
    if (gameState === 'gameOver') {
        renderer.drawGameOverScreen(score);
    }
    
    // Continue the loop
    requestAnimationFrame(gameLoop);
}

// Input handling - SPACE key and mouse click
function handleJump() {
    if (character && physics) {
        // Restart game when in 'gameOver' state
        if (gameState === 'gameOver') {
            // Reset character position and velocity
            character.y = 300;
            character.velocity = 0;
            character.rotation = 0;
            
            // Clear all obstacles
            if (obstacleManager) {
                obstacleManager.reset();
            }
            
            // Clear all particles
            if (particleSystem) {
                particleSystem.clear();
            }
            
            // Clear sparkled obstacles tracking
            sparkledObstacles.clear();
            
            // Reset score to 0
            score = 0;
            
            // Reset frame count
            frameCount = 0;
            
            // Transition to 'playing' state
            gameState = 'playing';
            console.log('Game restarted! State:', gameState);
            return;
        }
        
        // Transition from 'start' to 'playing' on first input
        if (gameState === 'start') {
            gameState = 'playing';
            score = 0; // Reset score to 0 when entering 'playing' state
            console.log('Game started! State:', gameState);
        }
        
        // Apply jump velocity using physics engine (only in playing state)
        if (gameState === 'playing') {
            physics.applyJump(character);
            console.log('Jump! Character velocity:', character.velocity);
        }
    }
}

// Listen for SPACE key press
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scrolling
        handleJump();
    }
});

// Listen for mouse clicks on canvas
canvas.addEventListener('click', () => {
    handleJump();
});

// Initial clear with dark background
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
