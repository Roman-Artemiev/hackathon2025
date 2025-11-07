import Chat from '../shared/chat/chat'
import Hero from '../shared/hero/hero'
import Prompt from '../shared/prompt/prompt'

export default function Home() {
  return (
    <div className='px-10 w-full'>
      <Hero />
      <Chat />
      <Prompt />
    </div>
  )
}
