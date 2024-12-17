export interface Comment {
    _id: string;
    text: string;
    itemId: string;
    username: string;
    _ownerId: string;
    _createdOn: number;
    _updatedOn?: number;
}