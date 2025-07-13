export type MonthlyPlant = {
  id: number;
  title: string;
  name: string;
  description: string;
  imageUrls: string[];
  iconUrl: string;
  month: number;
  year: number;
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
  description: string;
  imageUrl: string;
  type: "background" | "pot" | "decoration";
  price?: number;
};

export type CurrentUpdate = {
  month: number;
  year: number;
  plant: MonthlyPlant;
  updateNote: UpdateNote;
  newItems: NewItem[];
};
