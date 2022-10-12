import MainLayout from 'src/layouts/MainLayout'
import { useNavigate } from 'react-router-dom'
import { authBox } from 'src/shared/stores/auth'
import { useDerivedBox } from 'blackbox.js'

export default function Profile() {
  const navigate = useNavigate()
  const user = useDerivedBox(authBox, (state) => state.user)
  const token = useDerivedBox(authBox, (state) => state.token)

  if (!token) {
    navigate('/login')
  }

  return (
    <MainLayout>
      <h1>Profile</h1>
    </MainLayout>
  )
}
