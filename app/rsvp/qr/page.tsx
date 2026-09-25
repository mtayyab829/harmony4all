import RSVPForm from "@/components/rsvp-form"

// Target of the event QR code — submissions and scans are tracked separately in the admin
export default function RSVPQrPage() {
  return <RSVPForm source="qr" />
}
