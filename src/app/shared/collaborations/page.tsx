"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Handshake, Plus, DollarSign, Calendar, ExternalLink
} from "lucide-react";

interface Collaboration {
  id: string;
  partnerName: string;
  type: "brand_partner" | "venue" | "retailer" | "media" | "creator_collab" | "agency";
  status: "active" | "negotiating" | "proposed" | "completed" | "paused";
  description: string;
  budget: number | null;
  linkedActivation: string | null;
  startDate: string;
  contact: string;
}

const collaborations: Collaboration[] = [
  {
    id: "COL-001", partnerName: "SoHo House NYC",
    type: "venue", status: "active",
    description: "Exclusive spring pop-up partnership. Barsys 360 demo station at their Meatpacking location. Monthly cocktail events through Q2 2026.",
    budget: 5000, linkedActivation: "Barsys x SoHo House Spring Pop-Up",
    startDate: "Mar 1, 2026", contact: "Maria Santos, Events Director",
  },
  {
    id: "COL-002", partnerName: "Williams-Sonoma",
    type: "retailer", status: "negotiating",
    description: "In-store demo program across 10 locations. Co-branded content creation. Potential holiday bundle deal.",
    budget: 12000, linkedActivation: "Barsys x Williams-Sonoma In-Store Demo",
    startDate: "Apr 5, 2026", contact: "Tom Harris, Partnerships",
  },
  {
    id: "COL-003", partnerName: "Casamigos Tequila",
    type: "brand_partner", status: "proposed",
    description: "Co-branded Cinco de Mayo campaign. Casamigos provides product; Barsys provides cocktail automation. Joint social content series.",
    budget: 8000, linkedActivation: "Cinco de Mayo Rooftop Party",
    startDate: "May 1, 2026", contact: "Jessica Lee, Brand Marketing",
  },
  {
    id: "COL-004", partnerName: "Food & Wine Magazine",
    type: "media", status: "active",
    description: "Feature article on home cocktail automation. Product review and recipe roundup. Social media cross-promotion on their channels.",
    budget: 3500, linkedActivation: null,
    startDate: "Mar 15, 2026", contact: "Alex Rivera, Editor",
  },
  {
    id: "COL-005", partnerName: "Bon Appetit YouTube",
    type: "media", status: "negotiating",
    description: "Sponsored segment in their 'Home Bartender' video series. Full product integration and recipe feature. Expected reach: 2M+ views.",
    budget: 15000, linkedActivation: null,
    startDate: "Apr 2026", contact: "Ryan Chen, Partnerships",
  },
  {
    id: "COL-006", partnerName: "Cocktail Courier",
    type: "brand_partner", status: "completed",
    description: "Valentine's Day bundle collaboration. Cocktail ingredient kits paired with Barsys 360. Joint email marketing campaign.",
    budget: 4000, linkedActivation: null,
    startDate: "Feb 1, 2026", contact: "Danielle Park, Co-Founder",
  },
];

const typeBadgeVariant: Record<string, "default" | "secondary" | "success" | "warning" | "outline"> = {
  brand_partner: "default",
  venue: "secondary",
  retailer: "success",
  media: "warning",
  creator_collab: "outline",
  agency: "secondary",
};

const typeLabels: Record<string, string> = {
  brand_partner: "Brand Partner",
  venue: "Venue",
  retailer: "Retailer",
  media: "Media",
  creator_collab: "Creator Collab",
  agency: "Agency",
};

const statusBadgeVariant: Record<string, "success" | "warning" | "secondary" | "outline" | "default"> = {
  active: "success",
  negotiating: "warning",
  proposed: "secondary",
  completed: "outline",
  paused: "default",
};

export default function CollaborationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Handshake className="h-6 w-6 text-[var(--accent)]" />
            Collaboration Pipeline
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Manage brand partnerships and collaborations</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Collaboration
        </Button>
      </div>

      {/* Collaboration Cards */}
      <div className="space-y-4">
        {collaborations.map((collab) => (
          <Card key={collab.id} className="hover:border-[var(--accent)]/30 transition-colors">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start gap-3 flex-wrap">
                    <h3 className="text-base font-semibold">{collab.partnerName}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={typeBadgeVariant[collab.type]} className="text-[10px]">
                        {typeLabels[collab.type]}
                      </Badge>
                      <Badge variant={statusBadgeVariant[collab.status]} className="text-[10px] capitalize">
                        {collab.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{collab.description}</p>

                  {/* Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{collab.startDate}</span>
                    </div>
                    {collab.budget && (
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5" />
                        <span>${collab.budget.toLocaleString()}</span>
                      </div>
                    )}
                    <span className="text-xs">Contact: {collab.contact}</span>
                  </div>

                  {/* Linked Activation */}
                  {collab.linkedActivation && (
                    <div className="flex items-center gap-1.5">
                      <ExternalLink className="h-3 w-3 text-[var(--accent)]" />
                      <span className="text-xs text-[var(--accent)]">{collab.linkedActivation}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                  <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
