"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function HeaderActions() {
  // GitHub repository URL - replace with your actual repo URL when deployed
  const repoUrl = "https://github.com/alanchelmickjr/v0-binary-learning-game"

  // Function to deploy to Vercel
  const deployToVercel = () => {
    // Create the Vercel deploy URL with repository parameter
    const deployUrl = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(repoUrl)}`
    window.open(deployUrl, "_blank")
  }

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <Button variant="outline" size="sm" className="h-9 gap-1" onClick={() => window.open(repoUrl, "_blank")}>
        <Github className="h-4 w-4" />
        <span className="hidden sm:inline">GitHub</span>
      </Button>

      <Button
        variant="default"
        size="sm"
        className="h-9 bg-black hover:bg-gray-800 text-white"
        onClick={deployToVercel}
      >
        <svg className="h-4 w-4 mr-1" viewBox="0 0 116 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0Z" />
        </svg>
        <span className="hidden sm:inline">Deploy</span>
      </Button>
    </div>
  )
}
