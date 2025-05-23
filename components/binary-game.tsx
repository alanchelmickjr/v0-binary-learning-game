"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { HelpCircle, Award, BookOpen, Sparkles, RefreshCw, Loader2, Eye } from "lucide-react"
import BinaryReferenceChart from "./binary-reference-chart"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { getAIHint } from "@/lib/ai-hints"
import { playSound, SOUNDS, toggleSound, isSoundEnabled } from "@/lib/sound-utils"
import { Volume2, VolumeX } from "lucide-react"

// Game levels with increasing difficulty
const GAME_LEVELS = [
  {
    level: 1,
    description: "Single letters",
    challenges: [
      { binary: "01000001", text: "A" },
      { binary: "01000010", text: "B" },
      { binary: "01000011", text: "C" },
      { binary: "01001000", text: "H" },
      { binary: "01011010", text: "Z" },
    ],
  },
  {
    level: 2,
    description: "Simple words",
    challenges: [
      { binary: "01001000 01101001", text: "Hi" },
      { binary: "01001111 01001011", text: "OK" },
      { binary: "01011001 01100101 01110011", text: "Yes" },
      { binary: "01001110 01101111", text: "No" },
      { binary: "01000110 01110101 01101110", text: "Fun" },
    ],
  },
  {
    level: 3,
    description: "Longer words",
    challenges: [
      { binary: "01000011 01101111 01100100 01100101", text: "Code" },
      { binary: "01000010 01111001 01110100 01100101 01110011", text: "Bytes" },
      { binary: "01001000 01100101 01101100 01101100 01101111", text: "Hello" },
      { binary: "01010111 01101111 01110010 01101100 01100100", text: "World" },
      { binary: "01000010 01101001 01101110 01100001 01110010 01111001", text: "Binary" },
    ],
  },
  {
    level: 4,
    description: "Short phrases",
    challenges: [
      { binary: "01001000 01101001 00100000 01110100 01101000 01100101 01110010 01100101", text: "Hi there" },
      { binary: "01010111 01100101 01101100 01101100 00100000 01100100 01101111 01101110 01100101", text: "Well done" },
      { binary: "01000111 01101111 01101111 01100100 00100000 01101010 01101111 01100010", text: "Good job" },
      { binary: "01010100 01110010 01111001 00100000 01100001 01100111 01100001 01101001 01101110", text: "Try again" },
      { binary: "01001100 01100101 01110110 01100101 01101100 00100000 01110101 01110000", text: "Level up" },
    ],
  },
  {
    level: 5,
    description: "Binary concepts",
    challenges: [
      { binary: "01000010 01101001 01110100 01110011", text: "Bits" },
      { binary: "01000010 01111001 01110100 01100101 01110011", text: "Bytes" },
      { binary: "01000001 01010011 01000011 01001001 01001001", text: "ASCII" },
      { binary: "01000011 01101111 01101101 01110000 01110101 01110100 01100101 01110010", text: "Computer" },
      { binary: "01010000 01110010 01101111 01100111 01110010 01100001 01101101", text: "Program" },
    ],
  },
]

export default function BinaryGame() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [hint, setHint] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [showGameComplete, setShowGameComplete] = useState(false)
  const [streak, setStreak] = useState(0)
  const [hintUsed, setHintUsed] = useState(false)
  const [attemptsMade, setAttemptsMade] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const { toast } = useToast()

  const levelData = GAME_LEVELS.find((l) => l.level === currentLevel) || GAME_LEVELS[0]
  const currentChallenge = levelData.challenges[currentChallengeIndex]

  // Initialize sound state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSoundEnabled(isSoundEnabled())
    }
  }, [])

  const handleToggleSound = () => {
    const newState = toggleSound()
    setSoundEnabled(newState)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAttemptsMade(attemptsMade + 1)

    if (userAnswer.trim().toLowerCase() === currentChallenge.text.toLowerCase()) {
      // Correct answer
      const pointsEarned = hintUsed ? 5 : 10
      setScore(score + pointsEarned)
      setStreak(streak + 1)

      // Play success sound
      playSound(SOUNDS.SUCCESS, 0.4)

      toast({
        title: "Correct! 🎉",
        description: `+${pointsEarned} points${streak > 1 ? ` (${streak} streak!)` : ""}`,
        variant: "default",
      })

      // Play success animation with extra celebration for final level
      const confetti = document.getElementById("confetti")
      if (confetti) {
        confetti.classList.add("animate-confetti")

        // Extra celebration for completing the final level
        if (currentLevel === GAME_LEVELS.length && currentChallengeIndex === levelData.challenges.length - 1) {
          // Play game complete sound
          playSound(SOUNDS.GAME_COMPLETE, 0.5)

          // Multiple confetti bursts for final completion
          setTimeout(() => {
            confetti.classList.add("animate-confetti-burst")
          }, 500)
          setTimeout(() => {
            confetti.classList.add("animate-confetti-finale")
          }, 1000)
        }

        setTimeout(() => {
          confetti.classList.remove("animate-confetti", "animate-confetti-burst", "animate-confetti-finale")
        }, 3000)
      }

      // Move to next challenge or level
      if (currentChallengeIndex < levelData.challenges.length - 1) {
        moveToNextChallenge()
      } else if (currentLevel < GAME_LEVELS.length) {
        // Play level complete sound
        playSound(SOUNDS.LEVEL_COMPLETE, 0.5)
        setShowLevelComplete(true)
      } else {
        setShowGameComplete(true)
      }
    } else {
      // Incorrect answer
      // Play error sound
      playSound(SOUNDS.ERROR, 0.3)

      toast({
        title: "Not quite right",
        description: "Try again or use a hint!",
        variant: "destructive",
      })
      setStreak(0)
    }
  }

  const handleGetHint = async () => {
    setIsLoading(true)
    try {
      const aiHint = await getAIHint(currentChallenge.binary, currentChallenge.text)
      setHint(aiHint)
      setShowHint(true)
      setHintUsed(true)
      setStreak(0)

      // Play a subtle sound when getting a hint
      playSound(SOUNDS.SUCCESS, 0.2)
    } catch (error) {
      toast({
        title: "Hint Error",
        description: "Couldn't get a hint right now. Try again later!",
        variant: "destructive",
      })

      // Play error sound
      playSound(SOUNDS.ERROR, 0.2)
    } finally {
      setIsLoading(false)
    }
  }

  const moveToNextChallenge = () => {
    if (currentChallengeIndex < levelData.challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1)
    } else if (currentLevel < GAME_LEVELS.length) {
      setCurrentLevel(currentLevel + 1)
      setCurrentChallengeIndex(0)
    }

    // Reset for next challenge
    setUserAnswer("")
    setHint("")
    setShowHint(false)
    setHintUsed(false)
    setAttemptsMade(0)
    setShowAnswer(false)
  }

  const advanceToNextLevel = () => {
    setCurrentLevel(currentLevel + 1)
    setCurrentChallengeIndex(0)
    setShowLevelComplete(false)
    setAttemptsMade(0)
    setShowAnswer(false)
  }

  const restartGame = () => {
    setCurrentLevel(1)
    setCurrentChallengeIndex(0)
    setScore(0)
    setStreak(0)
    setUserAnswer("")
    setHint("")
    setShowHint(false)
    setShowGameComplete(false)
    setAttemptsMade(0)
    setShowAnswer(false)
  }

  const revealAnswer = () => {
    setShowAnswer(true)
    setHintUsed(true)
    setStreak(0)

    // Play a subtle sound when revealing the answer
    playSound(SOUNDS.SUCCESS, 0.2)
  }

  // Calculate progress percentage for current level
  const levelProgress = (currentChallengeIndex / levelData.challenges.length) * 100

  return (
    <div className="relative">
      <div id="confetti" className="absolute inset-0 pointer-events-none"></div>

      <div className="flex justify-between items-center mb-6">
        <Badge variant="outline" className="text-sm px-3 py-1">
          Level {currentLevel}: {levelData.description}
        </Badge>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleSound}
            title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setShowChart(true)} title="Binary Reference Chart">
            <BookOpen className="h-5 w-5" />
          </Button>

          <Badge variant="secondary" className="flex gap-1 items-center">
            <Award className="h-4 w-4" />
            <span>{score} pts</span>
          </Badge>
        </div>
      </div>

      <Progress value={levelProgress} className="mb-6" />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center">Decode This Binary</CardTitle>
          <CardDescription className="text-center">Convert the binary code to text</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
            <p className="text-lg sm:text-xl break-words">{currentChallenge.binary}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex gap-2">
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="flex-1"
                autoComplete="off"
              />
              <Button type="submit">Check</Button>
            </div>
          </form>

          {showHint && (
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-md">
              <div className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-purple-700 dark:text-purple-300">{hint}</p>
              </div>
            </div>
          )}

          {showAnswer && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-md">
              <div className="flex items-start gap-2">
                <Eye className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  The answer is: <span className="font-bold">{currentChallenge.text}</span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleGetHint}
              disabled={isLoading || showHint}
              className={cn(isLoading && "opacity-70")}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting hint...
                </>
              ) : (
                <>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Get a Hint
                </>
              )}
            </Button>

            {attemptsMade > 0 && !showAnswer && (
              <Button variant="secondary" onClick={revealAnswer}>
                <Eye className="mr-2 h-4 w-4" />
                Just Tell Me
              </Button>
            )}
          </div>

          <Button variant="ghost" onClick={moveToNextChallenge}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Skip
          </Button>
        </CardFooter>
      </Card>

      {/* Binary Reference Chart Dialog */}
      <AlertDialog open={showChart} onOpenChange={setShowChart}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Binary Reference Chart</AlertDialogTitle>
            <AlertDialogDescription>Use this chart to help decode binary to text</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <BinaryReferenceChart />
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Close Chart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Level Complete Dialog */}
      <AlertDialog open={showLevelComplete} onOpenChange={setShowLevelComplete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Level {currentLevel} Complete! 🎉</AlertDialogTitle>
            <AlertDialogDescription>
              Great job! You've completed level {currentLevel} with {score} points. Ready to take on the next challenge?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={advanceToNextLevel}>Continue to Level {currentLevel + 1}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Game Complete Dialog */}
      <AlertDialog open={showGameComplete} onOpenChange={setShowGameComplete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Congratulations! 🏆</AlertDialogTitle>
            <AlertDialogDescription>
              You've mastered binary decoding! Final score: {score} points. You're now fluent in the language of
              computers!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={restartGame}>Play Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster />

      <style jsx global>{`
        @keyframes confetti-animation {
          0% { 
            background-position: 0 0;
            opacity: 1;
          }
          100% { 
            background-position: 0 600px;
            opacity: 0;
          }
        }
        
        .animate-confetti {
          background-image: url('/confetti.png');
          animation: confetti-animation 1s linear forwards;
        }

        @keyframes confetti-burst {
          0% { 
            background-position: 0 0;
            opacity: 1;
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% { 
            background-position: 0 800px;
            opacity: 0;
            transform: scale(1);
          }
        }

        @keyframes confetti-finale {
          0% { 
            background-position: 0 0;
            opacity: 1;
            transform: rotate(0deg);
          }
          100% { 
            background-position: 0 1000px;
            opacity: 0;
            transform: rotate(360deg);
          }
        }

        .animate-confetti-burst {
          background-image: url('/confetti.png');
          animation: confetti-burst 1.5s ease-out forwards;
        }

        .animate-confetti-finale {
          background-image: url('/confetti.png');
          animation: confetti-finale 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
}
