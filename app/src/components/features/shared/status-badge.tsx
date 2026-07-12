import { Badge } from "@/components/ui/badge"

type VisitStatus = "waiting" | "screening" | "with_doctor" | "completed"

const statusConfig: Record<VisitStatus, { label: string; className: string }> = {
  waiting: {
    label: "Waiting",
    className: "bg-amber-100 text-amber-800",
  },
  screening: {
    label: "Screening",
    className: "bg-sky-100 text-sky-800",
  },
  with_doctor: {
    label: "With doctor",
    className: "bg-violet-100 text-violet-800",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800",
  },
}

interface StatusBadgeProps {
  status: VisitStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  if (!config) return null

  return (
    <Badge className={`${config.className} text-xs font-medium`} variant="outline">
      {config.label}
    </Badge>
  )
}
