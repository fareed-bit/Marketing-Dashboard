export type OpsCategory = "inventory" | "shipping" | "customer_service" | "tiktok_shop" | "product" | "general";
export type OpsSeverity = "critical" | "warning" | "info";

export interface OpsUpdate {
  id: string;
  category: OpsCategory;
  severity: OpsSeverity;
  source: string;
  title: string;
  body: string;
  affectsPublicComms: boolean;
  suggestedResponse: string | null;
  createdAt: string;
  expiresAt: string | null;
  isRead: boolean;
  isResolved: boolean;
}
