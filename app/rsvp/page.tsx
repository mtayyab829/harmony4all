"use client"

import { useEffect, useState } from "react"
import RSVPForm from "@/components/rsvp-form"
import { RSVPLoading, RSVPMessage } from "@/components/rsvp-states"
import { rsvpAPI, type RsvpEvent } from "@/lib/api"

// Shows the RSVP form for whichever event is active in the admin (only one can be active at a time)
export default function RSVPPage() {
  const [event, setEvent] = useState<RsvpEvent | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "none" | "error">("loading")

  useEffect(() => {
    rsvpAPI
      .getCurrentEvent()
      .then((current) => {
        setEvent(current)
        setStatus(current ? "ready" : "none")
      })
      .catch(() => setStatus("error"))
  }, [])

  if (status === "loading") return <RSVPLoading />
  if (status === "error") {
    return <RSVPMessage title="Something went wrong" message="We couldn't load the event. Please refresh the page to try again." />
  }
  if (status === "none" || !event) {
    return (
      <RSVPMessage
        title="No event open right now"
        message="We're not taking RSVPs at the moment. Follow us on social media to hear about our next event."
      />
    )
  }

  return <RSVPForm event={event} />
}
