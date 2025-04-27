import type React from "react"

import { useState } from "react"
import type { Incident } from "./ai-safety-dashboard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, "id" | "reported_at">) => void
}

export function IncidentForm({ onSubmit }: IncidentFormProps) {
  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState<"Low" | "Medium" | "High" | "">("")
  const [showSuccess, setShowSuccess] = useState(false)

  // Validation state
  const [errors, setErrors] = useState<{
    title?: string
    description?: string
    severity?: string
  }>({})

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: {
      title?: string
      description?: string
      severity?: string
    } = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!severity) {
      newErrors.severity = "Severity level is required"
    }

    // If there are errors, update state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setShowSuccess(false)
      return
    }

    // Clear errors
    setErrors({})

    // Submit the form
    onSubmit({
      title,
      description,
      severity: severity as "Low" | "Medium" | "High",
    })

    // Show success message
    setShowSuccess(true)

    // Reset form
    setTitle("")
    setDescription("")
    setSeverity("")

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block font-medium">
          Incident Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter incident title"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide detailed information about the incident"
          rows={4}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="severity" className="block font-medium">
          Severity Level
        </label>
        <Select value={severity} onValueChange={(value) => setSeverity(value as "Low" | "Medium" | "High")}>
          <SelectTrigger id="severity" className={errors.severity ? "border-red-500" : ""}>
            <SelectValue placeholder="Select severity level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
        {errors.severity && <p className="text-sm text-red-500">{errors.severity}</p>}
      </div>

      <Alert className="bg-blue-50 text-blue-800 border-blue-200">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          All fields are required. Please provide accurate information to help improve AI safety.
        </AlertDescription>
      </Alert>

      {showSuccess && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Incident reported successfully! Your report has been added to the dashboard.
          </AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full">
        Submit Incident Report
      </Button>
    </form>
  )
}
