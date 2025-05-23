import { Suspense } from "react"
import BinaryGame from "@/components/binary-game"
import LoadingGame from "@/components/loading-game"
import { Footer } from "@/components/footer"
import { HeaderActions } from "@/components/header-actions"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
        <HeaderActions />
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Binary Decoder Challenge
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Decode binary into text and learn how computers speak! Get AI-powered hints when you need help.
          </p>

          <Suspense fallback={<LoadingGame />}>
            <BinaryGame />
          </Suspense>
        </div>
        <Footer />
      </div>
    </main>
  )
}
