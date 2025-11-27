import { Heart } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Heart className="h-8 w-8 text-white animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Harmony 4 All</h2>
        <p className="text-gray-600">Please wait while we prepare your experience...</p>
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
} 