import { Heart } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="w-full py-6 mt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span>by</span>
          <a
            href="https://miraai.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium hover:text-purple-600 transition-colors"
          >
            <Image
              src="https://sjc.microlink.io/5yr7-G6fXJ3ZZOS-M_n19Rf7MzqeDS3ckBM7fa3u7uv9Oh_25jyb-aVkIbBuYrPAIR2eeuASZWiaaqRvh07gcA.jpeg"
              alt="MiraAI.ai"
              width={20}
              height={20}
              className="rounded-sm"
            />
            MiraAI.ai
          </a>
          <span>&</span>
          <a
            href="https://v0.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium hover:text-purple-600 transition-colors"
          >
            <Image
              src="https://sjc.microlink.io/DALgH5-uN2OXcUZH93wwM17XGGKo0Td8oHHDHnHsAlTSoXRGhboRsubVu9q-8f1tWKwm2Y7kI9vvNDRgjFuLDw.jpeg"
              alt="v0.dev"
              width={20}
              height={20}
              className="rounded-sm"
            />
            v0.dev
          </a>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} Binary Decoder Challenge. Open source under MIT license.
        </p>
      </div>
    </footer>
  )
}
