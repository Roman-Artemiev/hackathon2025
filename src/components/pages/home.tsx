import Chat from '../shared/chat/chat'
import Hero from '../shared/hero/hero'

export default function Home() {
  return (
    <div className='px-10 w-full'>
      <Hero />
      <Chat />
    </div>
  )
}
