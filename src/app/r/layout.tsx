import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RSVP - Kaito & Timmy | Our Wedding',
  description:
    "Reserve your spot at Kaito & Timmy's wedding celebration. September 8, 2025 at The Strand Hotel, Limerick.",
  openGraph: {
    title: 'RSVP - Kaito & Timmy Wedding',
    description: 'Reserve your spot at our special day!',
    type: 'website',
  },
};

export default function RSVPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
