export type MonthlyPlant = {
  id: number;
  title: string;
  name: string;
  description: string;
  imageUrls: string[];
  iconUrl: string;
  cropImageUrl: string;
  mainImageUrl: string;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
  ko?: {
    title?: string;
    name?: string;
    description?: string;
  };
};

export type UpdateNote = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ko?: {
    title?: string;
    description?: string;
  };
};

export type NewItem = {
  id: number;
  name: string;
  category: "background" | "pot";
  mode: string | null;
  imageUrl: string;
  iconUrl: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  ko?: {
    name?: string;
  };
};

export type ShopItem = {
  id: number;
  name: string;
  category: "background" | "pot";
  mode: string | null;
  imageUrl: string;
  iconUrl: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  ko?: {
    name?: string;
  };
};

export type CurrentUpdate = {
  updateNote: UpdateNote | null;
  newItems: NewItem[];
};
