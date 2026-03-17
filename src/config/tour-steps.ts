import {
  Sparkles, Compass, Users, BarChart3, AlertTriangle,
  Instagram, Heart, Wrench, Moon, PartyPopper,
} from "lucide-react";
import type { ComponentType } from "react";

export type TourPlacement = "top" | "bottom" | "left" | "right" | "center";

export interface TourStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string | null;
  placement: TourPlacement;
  icon: ComponentType<{ className?: string }>;
  spotlightPadding?: number;
}

export const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to Barsys Dashboard",
    description:
      "This is your command center for managing brand marketing, creator partnerships, and campaign analytics — all in one place. Let's take a quick tour so you know where everything is.",
    targetSelector: null,
    placement: "center",
    icon: Sparkles,
  },
  {
    id: "sidebar",
    title: "Sidebar Navigation",
    description:
      "This is your main menu. It's organized into hubs: Brand & Social, Creator & Affiliate, Shared Tools, and Analytics. Click any item to jump straight to that section.",
    targetSelector: '[data-tour="sidebar"]',
    placement: "right",
    icon: Compass,
    spotlightPadding: 0,
  },
  {
    id: "role-switcher",
    title: "Role Switcher",
    description:
      "Switch between Gosia (Brand & Community) and Lexi (Creator & Affiliate). Each role tailors the dashboard to show what matters most for that workflow.",
    targetSelector: '[data-tour="role-switcher"]',
    placement: "bottom",
    icon: Users,
  },
  {
    id: "kpi-cards",
    title: "KPI Dashboard",
    description:
      "Your key metrics at a glance — followers, engagement rate, active creators, and revenue. The trend arrows show how you're doing compared to last period.",
    targetSelector: '[data-tour="kpi-cards"]',
    placement: "bottom",
    icon: BarChart3,
  },
  {
    id: "alert-banner",
    title: "Critical Alerts",
    description:
      "Important operational updates show up here — like low inventory, overdue content, or shipping issues. Red means it needs your attention now.",
    targetSelector: '[data-tour="alert-banner"]',
    placement: "bottom",
    icon: AlertTriangle,
  },
  {
    id: "brand-hub",
    title: "Brand & Social Hub",
    description:
      "Gosia's workspace: content calendar, social performance, community engagement (DMs & comments), production briefs, activations, trends, and the ops feed.",
    targetSelector: '[data-tour="brand-hub"]',
    placement: "right",
    icon: Instagram,
  },
  {
    id: "creator-hub",
    title: "Creator & Affiliate Hub",
    description:
      "Lexi's workspace: drag-and-drop creator pipeline, database with scorecards, outreach tracker, affiliate codes, campaign manager, roster health, and reports.",
    targetSelector: '[data-tour="creator-hub"]',
    placement: "right",
    icon: Heart,
  },
  {
    id: "shared-tools",
    title: "Shared Tools & Analytics",
    description:
      "Shared across both roles — asset library, collaboration tracker, comms hub, and budget management. Plus deep analytics on channels, ROI, and monthly reports.",
    targetSelector: '[data-tour="shared-tools"]',
    placement: "right",
    icon: Wrench,
  },
  {
    id: "theme-toggle",
    title: "Theme Toggle",
    description:
      "Prefer light mode? Click the sun/moon icon to switch themes. Your preference is saved automatically so it sticks between sessions.",
    targetSelector: '[data-tour="theme-toggle"]',
    placement: "bottom",
    icon: Moon,
  },
  {
    id: "completion",
    title: "You're All Set!",
    description:
      "You now know your way around the Barsys Dashboard. You can re-take this tour anytime by clicking the help icon in the top bar. Happy marketing!",
    targetSelector: null,
    placement: "center",
    icon: PartyPopper,
  },
];
