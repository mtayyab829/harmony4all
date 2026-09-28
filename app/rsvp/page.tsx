"use client"

import { useEffect, useState } from "react"
import RSVPForm from "@/components/rsvp-form"
import { RSVPLoading, RSVPMessage } from "@/components/rsvp-states"
import { rsvpAPI, type RsvpEvent } from "@/lib/api"

// Shows the RSVP form for whichever event is active in the admin (only one can be active at a time).
// With no active event the form still shows, and submissions are saved as general RSVP contacts.
export default function RSVPPage() {
  const [event, setEvent] = useState<RsvpEvent | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    rsvpAPI
      .getCurrentEvent()
      .then((current) => {
        setEvent(current)
        setStatus("ready")
      })
      .catch(() => setStatus("error"))
  }, [])

  if (status === "loading") return <RSVPLoading />
  if (status === "error") {
    return <RSVPMessage title="Something went wrong" message="We couldn't load the event. Please refresh the page to try again." />
  }

  return <RSVPForm event={event} />
}
