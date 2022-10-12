export type Video = {
  videoId: string
  title: string
  description: string
  videoPath: string
  thumbnailPath: string
  views: number
  createdAt: string
  updatedAt: string
  user: Pick<User, 'userId' | 'name'>
}

export type User = {
  userId: string
  name: string
  createdAt: string
  updatedAt: string
}

export type AuthToken = {
  token: string
}
