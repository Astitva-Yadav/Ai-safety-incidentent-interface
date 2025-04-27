import type { SeverityFilter } from "./ai-safety-dashboard"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

interface FilterControlsProps {
  severityFilter: SeverityFilter
  onFilterChange: (filter: SeverityFilter) => void
}

export function FilterControls({ severityFilter, onFilterChange }: FilterControlsProps) {
  const filters: SeverityFilter[] = ["All", "Low", "Medium", "High"]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Filter className="h-4 w-4" />
        <span>Filter by Severity:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={severityFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter)}
            className={severityFilter === filter ? "" : "hover:bg-gray-100 hover:text-gray-900"}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  )
}
