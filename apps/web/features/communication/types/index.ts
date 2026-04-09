// Communication feature types
export interface Announcement {
  id: string;
  consortiumId: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}
