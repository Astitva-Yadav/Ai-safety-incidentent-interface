import { useState } from "react"
import { IncidentList } from "./incident-list"
import { IncidentForm } from "./incident-form"
import { FilterControls } from "./filter-controls"
import { SortControls } from "./sort-controls"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the Incident type
export type Incident = {
  id: number
  title: string
  description: string
  severity: "Low" | "Medium" | "High"
  reported_at: string
}

// Initial mock data
const initialIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description:
      "Algorithm consistently favored certain demographics in job recommendations, leading to unequal opportunity distribution across different user groups. The issue was identified through an internal audit of recommendation patterns.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description:
      "LLM provided incorrect safety procedure information when queried about emergency protocols in a healthcare setting. This could have led to dangerous situations if the information had been acted upon without verification.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description:
      "Chatbot inadvertently exposed non-sensitive user metadata during conversations. While no personally identifiable information was leaked, the incident highlights potential vulnerabilities in the data handling pipeline.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
  {
    id: 4,
    title: "Autonomous Vehicle Navigation Error",
    description:
      "AI navigation system misinterpreted road markings during heavy rain, causing the vehicle to briefly cross into the opposite lane. Safety systems caught and corrected the error, but the incident highlights weather-related perception issues.",
    severity: "High",
    reported_at: "2025-03-25T16:45:00Z",
  },
  {
    id: 5,
    title: "Content Moderation False Positive",
    description:
      "AI content moderation system incorrectly flagged educational content about historical conflicts as violating community guidelines. This resulted in temporary removal of legitimate educational material from the platform.",
    severity: "Medium",
    reported_at: "2025-04-05T11:20:00Z",
  },
]

export type SeverityFilter = "All" | "Low" | "Medium" | "High"
export type SortOrder = "newest" | "oldest"

export function AISafetyDashboard() {
  // State for incidents
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)

  // State for filtering and sorting
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("All")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")

  // State for expanded incident details
  const [expandedIncidentIds, setExpandedIncidentIds] = useState<Set<number>>(new Set())

  // Toggle incident details
  const toggleIncidentDetails = (id: number) => {
    const newExpandedIds = new Set(expandedIncidentIds)
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id)
    } else {
      newExpandedIds.add(id)
    }
    setExpandedIncidentIds(newExpandedIds)
  }

  // Add new incident
  const addIncident = (incident: Omit<Incident, "id" | "reported_at">) => {
    const newIncident: Incident = {
      ...incident,
      id: Math.max(0, ...incidents.map((inc) => inc.id)) + 1,
      reported_at: new Date().toISOString(),
    }

    setIncidents([newIncident, ...incidents])
  }

  // Filter incidents by severity
  const filteredIncidents = incidents.filter(
    (incident) => severityFilter === "All" || incident.severity === severityFilter,
  )

  // Sort incidents by date
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime()
    const dateB = new Date(b.reported_at).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <FilterControls severityFilter={severityFilter} onFilterChange={setSeverityFilter} />
        <SortControls sortOrder={sortOrder} onSortChange={setSortOrder} />
      </div>

      <Tabs defaultValue="incidents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incidents">View Incidents</TabsTrigger>
          <TabsTrigger value="report">Report New Incident</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents">
          <Card>
            <CardContent className="pt-6">
              <IncidentList
                incidents={sortedIncidents}
                expandedIncidentIds={expandedIncidentIds}
                onToggleDetails={toggleIncidentDetails}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report">
          <Card>
            <CardContent className="pt-6">
              <IncidentForm onSubmit={addIncident} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
