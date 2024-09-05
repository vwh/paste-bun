export type Period = "day" | "week" | "month";

export type Paste = {
  id: string;
  content: string;
  highlight: string | null;
  token: string;
  visitors: number;
  expire_at: number;
  created_at: number;
};
