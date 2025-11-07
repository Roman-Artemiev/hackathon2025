import { Button } from '@/components/ui';
import Logo from '/images/logo.png';

export default function Hero() {
  return (
    <div className='mb-16 mt-10 flex flex-col justify-center items-center'>
      <img className='mb-6 w-32' src={Logo} alt="Logo" />
      <p className='text-gray-900 mb-4 text-4xl text-center font-bold leading-snug'>Pomůžeme vám identifikovat možné problémy <br />a upozorníme na nečekané nebezpečí</p>
      <p className='text-gray-900 mb-6 text-lg max-w-3xl text-center'>Náš nástroj vám pomůže s možnými riziky, které by mohly znemožnit vaši práci. Speciálně upravený AI model s vámi projde veškerá možná úskalí a nečekaná rizika shrne do přehledného dokumentu v řádech minut.</p>

      {/* <Button size='lg'>Začněte hned!</Button> */}
    </div>
  )
}
