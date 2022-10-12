import { Link } from 'react-router-dom'
import {
  HomeIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'

export default function Sidenav() {
  return (
    <nav className="p-8 border-r flex-1 flex flex-col gap-4">
      <Link className="flex items-center gap-2" to="/">
        <HomeIcon className="w-5 h-5" />
        Home
      </Link>
      <Link className="flex items-center gap-2" to="/profile">
        <UserIcon className="w-5 h-5" />
        Profile
      </Link>
      <Link className="flex items-center gap-2" to="/upload">
        <VideoCameraIcon className="w-5 h-5" />
        Upload
      </Link>
    </nav>
  )
}
