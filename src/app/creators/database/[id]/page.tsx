"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft, Instagram, ExternalLink, Mail, Edit, Archive,
  MousePointerClick, ShoppingCart, DollarSign, FileText, TrendingUp
} from "lucide-react";

const sampleCreator = {
  name: "Maria Chen",
  handle: "@mixologist_maria",
  platform: "instagram",
  tier: "Micro",
  followerCount: "42K",
  niche: "Cocktail & Mixology",
  secondaryNiche: "Hosting & Entertaining",
  location: "Los Angeles, CA",
  partnershipType: "Ambassador",
  score: 87,
  bio: "Cocktail enthusiast & home bartender. Making mixology accessible for everyone.",
  affiliateCode: "MARIA15",
  codeStatus: "Active",
  stats: {
    clicks: 1234,
    orders: 23,
    revenue: 890,
    cvr: 1.8,
    posts: 8,
    avgER: 5.2,
  },
  timeline: [
    { stage: "Sourced", date: "Jan 5, 2026", color: "#94a3b8" },
    { stage: "Contacted", date: "Jan 6, 2026", color: "#60a5fa" },
    { stage: "Responded", date: "Jan 7, 2026", color: "#38bdf8" },
    { stage: "Approved", date: "Jan 10, 2026", color: "#34d399" },
    { stage: "Onboarded", date: "Jan 12, 2026", color: "#a78bfa" },
    { stage: "Gifted", date: "Jan 15, 2026", color: "#f472b6" },
    { stage: "First Post", date: "Jan 24, 2026", color: "#fb923c" },
    { stage: "First Sale", date: "Jan 28, 2026", color: "#facc15" },
    { stage: "Active", date: "Mar 14, 2026", color: "#22c55e" },
  ],
};

export default function CreatorScorecard() {
  const params = useParams();

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link href="/creators/database" className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Database
      </Link>

      {/* Creator Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-xl font-bold text-[var(--accent-foreground)]">
              MC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{sampleCreator.handle}</h1>
                <Badge variant="success">{sampleCreator.tier}</Badge>
                <Badge variant="default">{sampleCreator.partnershipType}</Badge>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">{sampleCreator.name}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1">
                  <Instagram className="h-3 w-3" /> Instagram &bull; {sampleCreator.followerCount}
                </span>
                <span>{sampleCreator.location}</span>
                <span>{sampleCreator.niche}</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{sampleCreator.bio}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-center mr-4">
              <p className="text-3xl font-bold text-[var(--accent)]">{sampleCreator.score}</p>
              <p className="text-[10px] text-[var(--muted-foreground)] uppercase">Score</p>
            </div>
            <Button variant="outline" size="sm"><Mail className="h-3.5 w-3.5 mr-1" /> Message</Button>
            <Button variant="outline" size="sm"><ExternalLink className="h-3.5 w-3.5 mr-1" /> Profile</Button>
            <Button variant="outline" size="sm"><Edit className="h-3.5 w-3.5 mr-1" /> Edit</Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="outreach">Outreach</TabsTrigger>
          <TabsTrigger value="codes">Codes & Links</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            {/* Pipeline Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleCreator.timeline.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: step.color }} />
                        {i < sampleCreator.timeline.length - 1 && (
                          <div className="w-px h-4 bg-[var(--border)]" />
                        )}
                      </div>
                      <div className="flex items-center justify-between flex-1">
                        <span className="text-sm font-medium">{step.stage}</span>
                        <span className="text-xs text-[var(--muted-foreground)]">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border)]">
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Days to first post: <span className="font-medium text-[var(--foreground)]">9 days</span> &bull;
                    Days to first sale: <span className="font-medium text-[var(--foreground)]">13 days</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Clicks" value={sampleCreator.stats.clicks.toLocaleString()} icon={<MousePointerClick className="h-4 w-4" />} />
                <StatCard label="Orders" value={sampleCreator.stats.orders} icon={<ShoppingCart className="h-4 w-4" />} />
                <StatCard label="Revenue" value={`$${sampleCreator.stats.revenue}`} icon={<DollarSign className="h-4 w-4" />} />
                <StatCard label="CVR" value={`${sampleCreator.stats.cvr}%`} icon={<TrendingUp className="h-4 w-4" />} />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Affiliate Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-mono font-bold text-[var(--accent)]">{sampleCreator.affiliateCode}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">15% discount &bull; Expires Jun 20, 2026</p>
                    </div>
                    <Badge variant="success">{sampleCreator.codeStatus}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="text-center p-2 rounded-lg bg-[var(--muted)]">
                      <p className="text-sm font-bold">{sampleCreator.stats.clicks}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">Clicks</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[var(--muted)]">
                      <p className="text-sm font-bold">{sampleCreator.stats.orders}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">Uses</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[var(--muted)]">
                      <p className="text-sm font-bold">${sampleCreator.stats.revenue}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="mt-4 p-6">
            <p className="text-sm text-[var(--muted-foreground)]">Detailed performance charts and time-series data for this creator. Engagement trends, content performance breakdown, and revenue attribution over time.</p>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="mt-4 p-6">
            <p className="text-sm text-[var(--muted-foreground)]">All content pieces published by this creator. {sampleCreator.stats.posts} posts across Instagram and TikTok with engagement metrics for each.</p>
          </Card>
        </TabsContent>

        <TabsContent value="outreach">
          <Card className="mt-4 p-6">
            <p className="text-sm text-[var(--muted-foreground)]">Outreach history and communication timeline with this creator. All DMs, emails, and follow-ups tracked.</p>
          </Card>
        </TabsContent>

        <TabsContent value="codes">
          <Card className="mt-4 p-6">
            <p className="text-sm text-[var(--muted-foreground)]">All affiliate codes and UTM links assigned to this creator with usage statistics and revenue attribution.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
