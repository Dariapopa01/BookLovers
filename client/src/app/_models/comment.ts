export interface Comment {
  id: number
  senderId: number
  senderUsername: string
  senderPhotoUrl: string
  reviewId: number
  reviewTitle: string
  content: string
  dateSent: Date
  commentSent: string
}
