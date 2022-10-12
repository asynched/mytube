import { Link } from 'react-router-dom'
import { useBox } from 'blackbox.js'
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

import { authBox, clearAuthState } from 'src/shared/stores/auth'
import { getAvatarImage } from 'src/services/dicebear/images'

import { PlayCircleIcon } from '@heroicons/react/24/solid'

export default function Navbar() {
  const auth = useBox(authBox)

  return (
    <header className="px-8 py-2 border-b">
      <div className="mx-auto flex items-center justify-between">
        <h1 className="flex items-center gap-1 text-2xl font-bold tracking-tighter">
          MyTube
          <PlayCircleIcon className="w-6 h-6 text-red-600" />
        </h1>
        <form className="border flex items-center">
          <input
            type="text"
            placeholder="Pesquise..."
            className="py-2 px-4 outline-none w-[32rem]"
          />
          <button type="submit" className="bg-gray-50 py-2 px-6 border-l">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
          </button>
        </form>
        <div>
          {auth.user ? (
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <img
                  src={getAvatarImage(auth.user.userId)}
                  alt={auth.user.name}
                  className="w-8 h-8 rounded-full"
                />
              </Link>
              <button onClick={clearAuthState}>
                <ArrowRightOnRectangleIcon className="w-8 h-8" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="py-2 px-4 flex items-center gap-2 border border-blue-600 text-blue-600"
            >
              <UserCircleIcon className="h-6 w-6 text-blue-600" />
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
