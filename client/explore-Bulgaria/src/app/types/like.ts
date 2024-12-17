export interface Like {
  _id: string;
  _ownerId: string;
  itemId: string;
  itemType: 'place' | 'museum';
  createdAt: string;
  updatedAt: string;
}