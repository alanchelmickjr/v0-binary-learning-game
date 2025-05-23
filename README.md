# 🎯 Binary Decoder Challenge

A fun and educational binary learning game that teaches users how to decode binary code into text. Built with Next.js, powered by AI hints, and designed to make learning binary encoding enjoyable and interactive.

![Binary Decoder Challenge](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&q=80)

## ✨ Features

- **🎮 Progressive Learning**: 5 difficulty levels from single letters to complex phrases
- **🤖 AI-Powered Hints**: Get contextual hints powered by Cohere's Command AI model
- **📚 Interactive Reference Chart**: Compact, scrollable ASCII reference chart
- **🎉 Gamification**: Points, streaks, and celebratory animations
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🌙 Dark Mode Support**: Beautiful dark/light theme switching
- **♿ Accessibility**: Built with accessibility best practices
- **🚀 Fast & Modern**: Built with Next.js 15 and React 19

## 🎯 Game Levels

1. **Level 1**: Single letters (A, B, C, H, Z)
2. **Level 2**: Simple words (Hi, OK, Yes, No, Fun)
3. **Level 3**: Longer words (Code, Bytes, Hello, World, Binary)
4. **Level 4**: Short phrases (Hi there, Well done, Good job)
5. **Level 5**: Binary concepts (Bits, Bytes, ASCII, Computer, Program)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone or download this template**
   \`\`\`bash
   # If you have the code locally
   cd binary-decoder-game
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to start playing!

## 🌐 Deploy to Vercel

The easiest way to deploy your Binary Decoder Challenge is to use Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

1. **Push your code to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy!

3. **Set up environment variables (optional)**
   If you want to use your own Cohere API key:
   - Go to your Vercel project settings
   - Add environment variable: \`COHERE_API_KEY=your_api_key_here\`

## 🛠️ Customization

### Adding New Levels

Edit \`components/binary-game.tsx\` and add new levels to the \`GAME_LEVELS\` array:

\`\`\`typescript
{
  level: 6,
  description: "Your custom level",
  challenges: [
    { binary: "01011001 01101111 01110101 01110010 00100000 01110100 01100101 01111000 01110100", text: "Your text" },
    // Add more challenges...
  ],
}
\`\`\`

### Customizing AI Hints

Modify \`lib/ai-hints.ts\` to:
- Use a different AI provider
- Customize the hint generation prompt
- Add fallback hints

### Styling

The game uses Tailwind CSS and shadcn/ui components. Customize:
- Colors in \`tailwind.config.ts\`
- Components in \`components/ui/\`
- Global styles in \`app/globals.css\`

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **AI Integration**: Cohere API
- **Language**: TypeScript
- **Deployment**: Vercel

## 🤝 Contributing

We welcome contributions! Here are some ideas:

- 🎵 Add sound effects
- 🏆 Implement user accounts and leaderboards  
- 🎯 Create binary arithmetic challenges
- 🌍 Add internationalization
- 📊 Add progress tracking and analytics

### Development Setup

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Make your changes
4. Test thoroughly
5. Commit: \`git commit -m 'Add amazing feature'\`
6. Push: \`git push origin feature/amazing-feature\`
7. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

**Created by:**
- **v0** - Vercel's AI-powered development assistant
- **Alan@MiraAi.ai** - Game concept and requirements

**Built with:**
- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Cohere](https://cohere.ai/) - AI-powered hints
- [Vercel](https://vercel.com/) - Deployment platform

## 🎮 How to Play

1. **Start the Game**: Look at the binary code displayed
2. **Decode**: Convert the binary to text using your knowledge or the reference chart
3. **Get Help**: Use the "Get a Hint" button for AI-powered assistance
4. **Reveal Answer**: After at least one attempt, use "Just Tell Me" if you're stuck
5. **Progress**: Complete all challenges in a level to advance
6. **Master Binary**: Work through all 5 levels to become a binary expert!

## 🔧 Troubleshooting

### Common Issues

**Game won't start:**
- Make sure you're using Node.js 18+
- Clear your browser cache
- Check the browser console for errors

**AI hints not working:**
- The game includes fallback hints if the AI service is unavailable
- Check your internet connection
- Verify the Cohere API key if you're using your own

**Styling issues:**
- Make sure Tailwind CSS is properly installed
- Check that all dependencies are installed correctly

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact Alan@MiraAi.ai for game-specific questions

---

**Ready to decode the binary world? Start playing and become a binary master! 🚀**

*Made with ❤️ by v0 and Alan@MiraAi.ai*
