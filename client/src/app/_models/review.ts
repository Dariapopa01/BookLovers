export class Review {
  id: number;
  senderId: number;
  senderUsername: string;
  senderPhotoUrl: string;
  bookId: number;
  bookTitle: string;
  bookPhotoUrl: string;
  content: string;
  dateSent: Date;
  rate: number;
  reviewSent: string;
}
