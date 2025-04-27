import type { SortOrder } from "./ai-safety-dashboard"
import { Button } from "@/components/ui/button"
import { ArrowDownAZ } from "lucide-react"

interface SortControlsProps {
  sortOrder: SortOrder
  onSortChange: (order: SortOrder) => void
}

export function SortControls({ sortOrder, onSortChange }: SortControlsProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <ArrowDownAZ className="h-4 w-4" />
        <span>Sort by Date:</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant={sortOrder === "newest" ? "default" : "outline"}
          size="sm"
          onClick={() => onSortChange("newest")}
          className={sortOrder === "newest" ? "" : "hover:bg-gray-100 hover:text-gray-900"}
        >
          Newest First
        </Button>
        <Button
          variant={sortOrder === "oldest" ? "default" : "outline"}
          size="sm"
          onClick={() => onSortChange("oldest")}
          className={sortOrder === "oldest" ? "" : "hover:bg-gray-100 hover:text-gray-900"}
        >
          Oldest First
        </Button>
      </div>
    </div>
  )
}
