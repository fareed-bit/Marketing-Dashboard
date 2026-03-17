export type BudgetCategory = "gifting" | "creator_payment" | "campaign" | "activation" | "tools" | "other";

export interface BudgetItem {
  id: string;
  category: BudgetCategory;
  description: string;
  amount: number;
  actualAmount: number | null;
  date: string;
  relatedEntityId: string | null;
  relatedEntityType: string | null;
  notes: string;
  createdAt: string;
}
