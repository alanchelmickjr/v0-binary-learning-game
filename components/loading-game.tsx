import { Loader2 } from "lucide-react"

export default function LoadingGame() {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] w-full">
      <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
      <p className="mt-4 text-gray-600 dark:text-gray-300">Loading the Binary Challenge...</p>
    </div>
  )
}
