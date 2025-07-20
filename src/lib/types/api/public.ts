export type MonthlyPlant = {
  id: number;
  title: string;
  name: string;
  description: string;
  imageUrls: string[];
  iconUrl: string;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
  updatedById: string;
};

export type UpdateNote = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export type NewItem = {
  id: number;
  name: string;
  category: "background" | "pot" | "decoration";
  mode: string | null;
  imageUrl: string;
  iconUrl: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  updatedById: string;
};

export type CurrentUpdate = {
  month: number;
  year: number;
  updateNote: UpdateNote;
  newItems: NewItem[];
};
