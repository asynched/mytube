import { useQuery } from '@tanstack/react-query'
import { getVideos } from 'src/services/http/videos'
import { getAvatarImage } from 'src/services/dicebear/images'

export default function VideoSection() {
  const videos = useQuery(['VIDEOS'], getVideos)

  if (videos.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8 grid grid-cols-4 gap-4">
      {videos.data!.map((video) => (
        <div key={video.videoId}>
          <img
            src={'http://localhost:3000' + video.thumbnailPath}
            alt={video.title}
            className="mb-4"
          />
          <div className="flex gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={getAvatarImage(video.user.userId)}
              alt={video.user.name}
            />
            <div className="col-span-5 leading-tight">
              <p className="font-bold">{video.title}</p>
              <p className="text-sm">{video.user.name}</p>
              <p className="text-sm">
                {video.views} visualizações • Postado em{' '}
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(video.createdAt)
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
