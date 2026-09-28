import Link from "next/link"
import { Loader2, CalendarX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RSVPLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  )
}

export function RSVPMessage({ title, message }: { title: string; message: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center space-y-4">
        <CalendarX className="h-12 w-12 text-gray-400 mx-auto" />
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="text-gray-600">{message}</p>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
