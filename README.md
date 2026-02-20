# 🎮 Flappy Kiro

A modern Flappy Bird clone featuring the Kiro mascot, built with vanilla JavaScript and HTML5 Canvas. Created during the AWS Re:Invent workshop.

![Flappy Kiro Game](https://img.shields.io/badge/Status-Complete-success)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange)

## ✨ Features

### Core Gameplay
- 🎯 Physics-based movement with gravity and jumping
- 🚧 Procedurally generated obstacles
- 💥 Accurate collision detection
- 🏆 Score tracking and high score persistence
- 🎨 Smooth 60 FPS gameplay

### Visual Effects
- ✨ **Trail Particles** - Purple particle trail behind Kiro
- 💥 **Explosion Effects** - Dramatic explosion on collision
- ⭐ **Sparkles** - Celebratory sparkles when passing obstacles
- 🎊 **Confetti** - Confetti celebration on new high score

### Kiro Branding
- 🎨 Official Kiro brand colors throughout
- 🦊 Kiro logo as the playable character
- 💜 Purple (#790ECB) accent theme

## 🚀 Quick Start

### Play Online
Simply open `index.html` in your web browser!

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/flappy-kiro.git
cd flappy-kiro
```

2. Start a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

3. Open your browser:
```
http://localhost:8000
```

## 🎮 How to Play

| Action | Keyboard | Mouse |
|--------|----------|-------|
| Start Game | `SPACE` | Click |
| Jump | `SPACE` | Click |
| Restart | `SPACE` | Click |

### Objective
Navigate Kiro through the gaps between pipes without hitting them or the boundaries. Each successful pass earns you a point. Try to beat your high score!

## 📁 Project Structure

```
flappy-kiro/
├── index.html              # Main game page
├── game.js                 # Game logic and classes
├── kiro-logo.png          # Kiro character sprite
├── README.md              # This file
├── PLAY_INSTRUCTIONS.md   # Detailed gameplay guide
├── FINAL_TEST_REPORT.md   # Comprehensive test results
├── performance-test.html  # Performance testing tool
├── final-game-test.html   # Automated test suite
└── .kiro/                 # Spec and design documents
    ├── specs/
    │   └── flappy-kiro-game/
    │       ├── requirements.md
    │       ├── design.md
    │       └── tasks.md
    └── steering/
        ├── app-build-rules.md
        └── game-style-guide.md
```

## 🏗️ Architecture

### Core Classes

- **Character** - Player-controlled Kiro with physics
- **PhysicsEngine** - Gravity and velocity calculations
- **Obstacle** - Pipe obstacles with gaps
- **ObstacleManager** - Spawning and movement
- **CollisionDetector** - Bounding box collision detection
- **Renderer** - Canvas drawing operations
- **ParticleSystem** - Visual effects (trails, explosions, sparkles, confetti)
- **ScoreManager** - High score persistence with localStorage

### Game Loop
60 FPS game loop using `requestAnimationFrame` for smooth, browser-optimized rendering.

## 🎨 Visual Effects Details

### Trail Particles
- Continuous purple particles behind Kiro
- Fade from alpha 1.0 to 0.0
- Small random spread for natural look

### Explosion Effect
- 30 particles radiating in circular pattern
- Red/orange/yellow colors
- 0.5 second delay before game over screen

### Sparkle Effect
- 8 particles per obstacle passed
- White, yellow, and purple colors
- Rise upward and fade

### Confetti Effect
- 50 particles on new high score
- Kiro brand colors (purple, white, gray)
- Fall with gravity and rotation
- Bounce on canvas bottom

## 🧪 Testing

### Manual Testing
Open `index.html` and play the game to test all features.

### Automated Testing
Open `final-game-test.html` for the automated test suite with real-time statistics.

### Performance Testing
Open `performance-test.html` to monitor FPS and frame timing.

## 📊 Performance

- **Target FPS**: 60
- **Average FPS**: 58-60
- **Frame Time**: ~16.67ms
- **Status**: ✅ Excellent

All particle effects are optimized to maintain 60 FPS gameplay.

## 🛠️ Technologies

- **HTML5 Canvas** - 2D rendering
- **Vanilla JavaScript** - No frameworks or libraries
- **localStorage** - High score persistence
- **requestAnimationFrame** - Smooth 60 FPS animation

## 🎯 Game Specifications

| Setting | Value |
|---------|-------|
| Canvas Size | 400x600 pixels |
| Gravity | 0.3 px/frame² |
| Jump Power | -6 px/frame |
| Max Velocity | 10 px/frame |
| Obstacle Speed | 1.5 px/frame |
| Gap Size | 150 pixels |
| Spawn Interval | 180 frames (3 seconds) |

## 🤝 Contributing

This project was created as part of the AWS Re:Invent workshop. Feel free to fork and enhance!

### Ideas for Enhancement
- 🔊 Sound effects (jump, score, collision)
- 🎵 Background music
- 📱 Mobile touch support
- 🌙 Day/night themes
- 🏅 Leaderboard system
- 🎭 Multiple character skins

## 📝 License

MIT License - Feel free to use this project for learning and fun!

## 🙏 Acknowledgments

- Built with [Kiro](https://kiro.dev) - AI-powered IDE
- Created during AWS Re:Invent workshop
- Inspired by the classic Flappy Bird game

## 📧 Contact

Created during AWS Re:Invent 2024 workshop.

---

**Enjoy playing Flappy Kiro! 🎮✨**
