export type Period = "hour" | "day" | "week" | "month";

export type Paste = {
  id: string;
  content: string;
  highlight: string | null;
  owner: string;
  visitors: number;
  expire_at: number;
  created_at: number;
};
