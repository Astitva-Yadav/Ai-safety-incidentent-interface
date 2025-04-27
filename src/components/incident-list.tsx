import type { Incident } from "./ai-safety-dashboard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"

interface IncidentListProps {
  incidents: Incident[]
  expandedIncidentIds: Set<number>
  onToggleDetails: (id: number) => void
}

export function IncidentList({ incidents, expandedIncidentIds, onToggleDetails }: IncidentListProps) {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="space-y-4">
      {incidents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No incidents match your current filters.</div>
      ) : (
        <ul className="space-y-4">
          {incidents.map((incident) => {
            const isExpanded = expandedIncidentIds.has(incident.id)

            return (
              <li key={incident.id} className="border rounded-lg p-4 transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{incident.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge className={getSeverityColor(incident.severity)}>{incident.severity} Severity</Badge>
                      <span className="text-sm text-gray-500">Reported: {formatDate(incident.reported_at)}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleDetails(incident.id)}
                    className="mt-2 sm:mt-0"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        View Details
                      </>
                    )}
                  </Button>
                </div>

                {isExpanded && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">Description:</h4>
                    <p className="text-gray-700">{incident.description}</p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
