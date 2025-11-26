export interface IItem {
  id: number | string;
  title: string;
  type: 'Movie' | 'Series';
  year: number;
  rating: number;
  coverUrl?: string; 
}

export type IItemForm = Omit<IItem, 'id'>;