export interface Rating {
  id: number
  senderId: number
  senderUsername: string
  senderPhotoUrl: string
  bookId: number
  bookTitle: string
  bookPhotoUrl: string
  rate: number
  rateSent: string
}
