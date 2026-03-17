import {
  Home, LayoutDashboard, Users, Calendar, BarChart3,
  MessageSquare, FileText, PartyPopper, TrendingUp, Radio,
  GitBranch, Database, Target, Mail, Activity, Key, Heart, ClipboardList,
  Image, Handshake, MessageCircle, DollarSign, PieChart, ArrowLeftRight, FileBarChart, Calculator,
} from "lucide-react";
import type { ComponentType } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavSection {
  label: string;
  description?: string;
  role?: "brand" | "creator" | "shared";
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    label: "Overview",
    description: "Your dashboard home with KPIs and alerts",
    items: [
      { label: "Home", href: "/", icon: Home },
    ],
  },
  {
    label: "Brand & Social Hub",
    description: "Content planning, social performance, community management, and campaign activations",
    role: "brand",
    items: [
      { label: "Overview", href: "/brand", icon: LayoutDashboard },
      { label: "Content Calendar", href: "/brand/calendar", icon: Calendar },
      { label: "Performance", href: "/brand/performance", icon: BarChart3 },
      { label: "Community", href: "/brand/community", icon: MessageSquare },
      { label: "Briefs", href: "/brand/briefs", icon: FileText },
      { label: "Activations", href: "/brand/activations", icon: PartyPopper },
      { label: "Trends", href: "/brand/trends", icon: TrendingUp },
      { label: "Ops Feed", href: "/brand/ops-feed", icon: Radio },
    ],
  },
  {
    label: "Creator & Affiliate Hub",
    description: "Creator pipeline, outreach, campaign tracking, and affiliate management",
    role: "creator",
    items: [
      { label: "Overview", href: "/creators", icon: Users },
      { label: "Pipeline", href: "/creators/pipeline", icon: GitBranch },
      { label: "Database", href: "/creators/database", icon: Database },
      { label: "Campaigns", href: "/creators/campaigns", icon: Target },
      { label: "Outreach", href: "/creators/outreach", icon: Mail },
      { label: "Performance", href: "/creators/performance", icon: Activity },
      { label: "Codes & Links", href: "/creators/codes", icon: Key },
      { label: "Roster Health", href: "/creators/roster", icon: Heart },
      { label: "Reports", href: "/creators/reports", icon: ClipboardList },
    ],
  },
  {
    label: "Shared Tools",
    description: "Asset library, collaboration workspace, communications, and budget tracking",
    role: "shared",
    items: [
      { label: "Asset Library", href: "/shared/assets", icon: Image },
      { label: "Collaborations", href: "/shared/collaborations", icon: Handshake },
      { label: "Comms Hub", href: "/shared/comms", icon: MessageCircle },
      { label: "Budget", href: "/shared/budget", icon: DollarSign },
    ],
  },
  {
    label: "Analytics",
    description: "Cross-channel analytics, custom reports, and ROI tracking",
    items: [
      { label: "Overview", href: "/analytics", icon: PieChart },
      { label: "Channels", href: "/analytics/channels", icon: ArrowLeftRight },
      { label: "Reports", href: "/analytics/reports", icon: FileBarChart },
      { label: "ROI", href: "/analytics/roi", icon: Calculator },
    ],
  },
];
