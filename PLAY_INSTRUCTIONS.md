# 🎮 Flappy Kiro - How to Play

## Quick Start

### 1. Start the Game Server
The server is already running! If you need to restart it:
```bash
python -m http.server 8000
```

### 2. Open the Game
Open your browser and navigate to:
- **Main Game**: http://localhost:8000/index.html
- **Test Suite**: http://localhost:8000/final-game-test.html

### 3. Play!
- **Start**: Press SPACE or click anywhere to begin
- **Jump**: Press SPACE or click to make Kiro jump
- **Avoid**: Navigate through the purple pipe obstacles
- **Score**: Earn points by passing through gaps
- **Game Over**: Hit a pipe or boundary to end
- **Restart**: Press SPACE or click to play again

---

## Controls

| Action | Keyboard | Mouse |
|--------|----------|-------|
| Start Game | SPACE | Click |
| Jump | SPACE | Click |
| Restart | SPACE | Click |

---

## Game Features

✅ **Start Screen** - Clear instructions and Kiro branding
✅ **Physics-Based Movement** - Realistic gravity and jumping
✅ **Obstacle System** - Randomly positioned pipes
✅ **Collision Detection** - Accurate hit detection
✅ **Score Tracking** - Points for each obstacle passed
✅ **Game Over Screen** - Shows final score
✅ **Instant Restart** - Quick reset to play again
✅ **60 FPS Performance** - Smooth gameplay
✅ **Kiro Branding** - Purple theme throughout

---

## Tips for Success

1. **Timing is Key** - Don't spam the jump button
2. **Stay Centered** - Aim for the middle of gaps
3. **Watch Ahead** - Look at upcoming obstacles
4. **Practice** - The physics take a moment to master
5. **Have Fun!** - It's challenging but rewarding

---

## Testing the Game

Run the automated test suite:
1. Open http://localhost:8000/final-game-test.html
2. Click "Run All Tests" button
3. Watch the automated tests verify all features
4. Check the game statistics panel for real-time data

---

## Game Specifications

- **Canvas Size**: 400x600 pixels
- **Target FPS**: 60
- **Gravity**: 0.3 px/frame²
- **Jump Power**: -6 px/frame
- **Obstacle Speed**: 1.5 px/frame
- **Gap Size**: 150 pixels
- **Spawn Interval**: 3 seconds (180 frames)

---

## Enjoy Your Game! 🚀

The Flappy Kiro game is complete and ready for the AWS Re:Invent workshop. All features are working perfectly!
