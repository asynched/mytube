import Navbar from 'src/components/Navbar'
import Sidenav from 'src/components/Sidenav'

type Props = {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="grid grid-cols-8 flex-1">
        <Sidenav />
        <div className="col-span-7 overflow-auto">{children}</div>
      </main>
    </div>
  )
}
