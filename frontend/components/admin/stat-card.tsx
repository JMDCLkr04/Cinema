import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border bg-gradient-to-br from-card to-secondary p-6 transition-all hover:shadow-lg hover:shadow-primary/20">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 transition-opacity group-hover:opacity-20" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <p className="text-4xl font-bold text-foreground md:text-5xl">
            {value.toLocaleString()}
          </p>
        </div>

        <div
          className={`rounded-lg bg-gradient-to-br ${color} p-3 text-white shadow-lg`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );
}
