"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PartyPopper, Plus, MapPin, Calendar, Clock, Users,
  Wine, Music, Sparkles
} from "lucide-react";

interface Activation {
  id: string;
  name: string;
  type: "pop_up" | "partnership" | "launch_event" | "tasting" | "collab";
  date: string;
  time: string;
  location: string;
  status: "planned" | "confirmed" | "in_progress" | "completed" | "cancelled";
  description: string;
  expectedAttendees?: number;
  mixlist?: string[];
}

const activations: Activation[] = [
  {
    id: "A-001",
    name: "Barsys x SoHo House Spring Pop-Up",
    type: "pop_up",
    date: "Mar 28, 2026",
    time: "6:00 PM — 10:00 PM",
    location: "SoHo House, New York",
    status: "confirmed",
    description: "Exclusive cocktail pop-up featuring the Barsys 360 live demo. Attendees will experience automated cocktail making with seasonal spring recipes. Press and influencers invited.",
    expectedAttendees: 120,
    mixlist: ["Lavender Collins", "Spring Martini", "Elderflower Spritz", "Cucumber Gimlet"],
  },
  {
    id: "A-002",
    name: "National Margarita Day Campaign",
    type: "launch_event",
    date: "Mar 22, 2026",
    time: "All Day — Digital",
    location: "Online / Social Media",
    status: "planned",
    description: "Full-day social media campaign celebrating National Margarita Day. Live IG story series, TikTok challenge launch, and limited-time discount code. Creator content drops throughout the day.",
    expectedAttendees: undefined,
    mixlist: ["Classic Margarita", "Spicy Mango Margarita", "Smoky Mezcal Margarita"],
  },
  {
    id: "A-003",
    name: "Barsys x Williams-Sonoma In-Store Demo",
    type: "partnership",
    date: "Apr 5, 2026",
    time: "12:00 PM — 4:00 PM",
    location: "Williams-Sonoma, Beverly Hills",
    status: "planned",
    description: "In-store product demonstration with Williams-Sonoma featuring Barsys 360. Staff trained on demo script. Customers can experience hands-on cocktail creation.",
    expectedAttendees: 80,
    mixlist: ["Whiskey Sour", "Negroni", "French 75"],
  },
  {
    id: "A-004",
    name: "Creator Cocktail Masterclass",
    type: "tasting",
    date: "Apr 12, 2026",
    time: "7:00 PM — 9:00 PM",
    location: "Barsys HQ, Miami",
    status: "planned",
    description: "Invite-only masterclass for top 15 Barsys creators. Mixology education, new recipe drops, content creation session, and sneak peek at upcoming product features.",
    expectedAttendees: 15,
    mixlist: ["Espresso Martini", "Penicillin", "Aperol Spritz", "Old Fashioned", "Daiquiri"],
  },
  {
    id: "A-005",
    name: "Cinco de Mayo Rooftop Party",
    type: "collab",
    date: "May 5, 2026",
    time: "5:00 PM — 11:00 PM",
    location: "The Rooftop at 1 Hotel, Brooklyn",
    status: "planned",
    description: "Collaborative rooftop event with tequila brand partner. Barsys 360 demo stations, live DJ, influencer guest list. Content capture team on-site for social coverage.",
    expectedAttendees: 200,
    mixlist: ["Paloma", "Spicy Margarita", "Tequila Sunrise", "Ranch Water"],
  },
];

const typeBadgeColors: Record<string, "default" | "secondary" | "success" | "warning" | "outline"> = {
  pop_up: "default",
  partnership: "success",
  launch_event: "warning",
  tasting: "secondary",
  collab: "outline",
};

const typeLabels: Record<string, string> = {
  pop_up: "Pop-Up",
  partnership: "Partnership",
  launch_event: "Launch Event",
  tasting: "Tasting",
  collab: "Collaboration",
};

const statusBadgeColors: Record<string, "default" | "secondary" | "success" | "warning" | "error" | "outline"> = {
  planned: "secondary",
  confirmed: "success",
  in_progress: "default",
  completed: "success",
  cancelled: "error",
};

const statusLabels: Record<string, string> = {
  planned: "Planned",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function ActivationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activations & Events</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Plan and track brand events, pop-ups, and activations</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Plan Activation
        </Button>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--border)]" />
        <div className="space-y-6">
          {activations.map((activation, index) => (
            <div key={activation.id} className="relative pl-14">
              {/* Timeline Dot */}
              <div className={`absolute left-4 top-6 h-4 w-4 rounded-full border-2 border-[var(--card)] ${
                activation.status === "confirmed" ? "bg-emerald-500" :
                activation.status === "in_progress" ? "bg-[var(--accent)]" :
                activation.status === "completed" ? "bg-emerald-400" :
                "bg-[var(--muted-foreground)]"
              }`} />

              <Card className="hover:border-[var(--accent)]/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start gap-3 flex-wrap">
                        <h3 className="text-base font-semibold">{activation.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={typeBadgeColors[activation.type]} className="text-[10px]">
                            {typeLabels[activation.type]}
                          </Badge>
                          <Badge variant={statusBadgeColors[activation.status]} className="text-[10px]">
                            {statusLabels[activation.status]}
                          </Badge>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{activation.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{activation.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{activation.location}</span>
                        </div>
                        {activation.expectedAttendees && (
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            <span>{activation.expectedAttendees} expected</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{activation.description}</p>

                      {/* Mixlist */}
                      {activation.mixlist && (
                        <div className="pt-2 border-t border-[var(--border)]">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Wine className="h-3.5 w-3.5 text-[var(--accent)]" />
                            <span className="text-xs font-medium">Featured Cocktails</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {activation.mixlist.map((drink) => (
                              <Badge key={drink} variant="outline" className="text-[10px]">
                                <Sparkles className="h-2.5 w-2.5 mr-1" />
                                {drink}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                      <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
