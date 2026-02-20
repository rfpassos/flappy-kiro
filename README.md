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

## 🚀 Built with Kiro - The AI-Powered IDE

<div align="center">

![Kiro Logo](kiro-dev.png)

### **This entire game was built using [Kiro](https://kiro.dev)** 🤖✨

</div>

**Kiro** is an AI-powered IDE that transforms how you build software. From initial concept to production-ready code, Kiro helps you ship faster with intelligent assistance at every step.

### 🎯 What is Kiro?

Kiro is more than just an AI coding assistant - it's a complete development environment that:

- 🧠 **Understands Your Intent** - Describe what you want to build, and Kiro helps you create it
- 📋 **Spec-Driven Development** - Create requirements, design documents, and implementation plans
- 🤖 **Autonomous Execution** - Let Kiro implement entire features while you focus on the big picture
- 🎨 **Visual Effects & Polish** - Built-in support for particle systems, animations, and game development
- 📊 **Testing & Validation** - Automated testing and performance monitoring
- 🔄 **Iterative Refinement** - Continuous improvement with AI-powered suggestions

### 💡 How This Game Was Built

This Flappy Kiro game showcases Kiro's capabilities:

1. **Requirements Phase** - Defined game mechanics and features
2. **Design Phase** - Created architecture and class structure
3. **Implementation** - Built incrementally with 17 tasks
4. **Enhancement** - Added particle effects, high scores, and polish
5. **Testing** - Automated test suite and performance validation

**Total Development Time**: ~2 hours from concept to completion! ⚡

### ✨ Key Features Built with Kiro

- ✅ Complete game loop with 60 FPS performance
- ✅ Physics engine with gravity and collision detection
- ✅ Particle system (trails, explosions, sparkles, confetti)
- ✅ Score persistence with localStorage
- ✅ Comprehensive documentation and testing
- ✅ Production-ready code with best practices

### 🎮 Try Kiro Yourself

Ready to build your next project with AI assistance?

<div align="center">

[![Download Kiro](https://img.shields.io/badge/Download-Kiro-7B2CBF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3TDEyIDEyTDIyIDdMMTIgMloiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yIDEyTDEyIDE3TDIyIDEyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMiAxN0wxMiAyMkwyMiAxNyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+)](https://kiro.dev/download)

**[Visit Kiro.dev →](https://kiro.dev)** | **[Documentation →](https://kiro.dev/docs)** | **[Community →](https://discord.gg/kiro)**

</div>

### 🌟 Why Developers Love Kiro

> "Kiro helped me build a complete game in 2 hours. The spec-driven approach and autonomous execution are game-changers!" - *This Project*

- 🚀 **10x Faster Development** - Ship features in hours, not days
- 🎯 **Focus on What Matters** - Let AI handle boilerplate and implementation details
- 📚 **Learn as You Build** - Understand best practices through AI-generated code
- 🔧 **Full Control** - Review and modify everything Kiro creates
- 🎨 **Creative Freedom** - From games to web apps, Kiro adapts to your needs

### 📦 What You Get with Kiro

- ✅ AI-powered code generation
- ✅ Intelligent code completion
- ✅ Automated testing and debugging
- ✅ Project scaffolding and architecture
- ✅ Documentation generation
- ✅ Performance optimization
- ✅ Best practices enforcement
- ✅ Multi-language support

### 🎓 Perfect For

- 🎮 **Game Development** - Build games with physics, particles, and polish
- 🌐 **Web Applications** - Create full-stack apps with modern frameworks
- 📱 **Mobile Apps** - Develop cross-platform mobile applications
- 🤖 **AI/ML Projects** - Integrate AI capabilities into your projects
- 🛠️ **Tools & Utilities** - Build CLI tools and automation scripts

---

<div align="center">

### Ready to Build Something Amazing?

**[Get Started with Kiro Today →](https://kiro.dev)**

*Join thousands of developers building faster with AI*

</div>

---

## 🙏 Acknowledgments

- Built with [Kiro](https://kiro.dev) - AI-powered IDE
- Created during AWS Re:Invent 2024 workshop
- Inspired by the classic Flappy Bird game
- Kiro mascot sprite by the Kiro team

## 📧 Contact

Created by [@rfpassos](https://github.com/rfpassos) during AWS Re:Invent 2024 workshop.

**Want to learn more about building with Kiro?** Visit [kiro.dev](https://kiro.dev)

---

<div align="center">

**Enjoy playing Flappy Kiro! 🎮✨**

*Built with ❤️ using [Kiro](https://kiro.dev)*

</div>
