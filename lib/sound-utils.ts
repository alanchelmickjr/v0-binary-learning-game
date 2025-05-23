// Sound utility functions

// Cache audio objects to prevent recreating them
const audioCache: Record<string, HTMLAudioElement> = {}

// Sound paths
export const SOUNDS = {
  SUCCESS: "/sounds/success.mp3",
  ERROR: "/sounds/error.mp3",
  LEVEL_COMPLETE: "/sounds/level-complete.mp3",
  GAME_COMPLETE: "/sounds/game-complete.mp3",
}

/**
 * Play a sound effect
 * @param soundPath Path to the sound file
 * @param volume Volume level (0-1)
 * @returns Promise that resolves when the sound starts playing
 */
export const playSound = async (soundPath: string, volume = 0.5): Promise<void> => {
  // Check if sound is enabled in localStorage
  const soundEnabled = localStorage.getItem("soundEnabled") !== "false"

  if (!soundEnabled) {
    return
  }

  try {
    // Use cached audio object or create a new one
    if (!audioCache[soundPath]) {
      audioCache[soundPath] = new Audio(soundPath)
    }

    const audio = audioCache[soundPath]

    // Reset audio to beginning if it's already playing
    audio.currentTime = 0
    audio.volume = volume

    // Play the sound
    await audio.play()
  } catch (error) {
    console.error("Error playing sound:", error)
  }
}

/**
 * Toggle sound on/off
 * @param enabled Whether sound should be enabled
 * @returns The new sound state
 */
export const toggleSound = (enabled?: boolean): boolean => {
  const currentState = localStorage.getItem("soundEnabled") !== "false"
  const newState = enabled !== undefined ? enabled : !currentState

  localStorage.setItem("soundEnabled", newState.toString())
  return newState
}

/**
 * Get current sound state
 * @returns Whether sound is currently enabled
 */
export const isSoundEnabled = (): boolean => {
  // Default to true if not set
  return localStorage.getItem("soundEnabled") !== "false"
}
