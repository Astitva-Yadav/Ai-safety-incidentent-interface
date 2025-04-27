import { AISafetyDashboard } from "@/components/ai-safety-dashboard"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Safety Incident Dashboard</h1>
      <AISafetyDashboard />
    </main>
  )
}
