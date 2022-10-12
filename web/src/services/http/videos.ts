import { Video } from 'src/domain/entities'
import { httpClient } from 'src/shared/http'

export const getVideos = async () => {
  const { data } = await httpClient.get<Video[]>('/videos')
  return data
}

export const getVideo = async (id: string) => {
  const { data } = await httpClient.get<Video>(`/videos/${id}`)
  return data
}
