import { Button } from '@/components/ui';
import Logo from '/images/logo.png';

export default function Hero() {
  return (
    <div className='mb-16 mt-10 flex flex-col justify-center items-center'>
      <img className='mb-6 w-32' src={Logo} alt="Logo" />
      <p className='text-gray-900 mb-4 text-4xl text-center font-bold leading-snug'>Identifikuje možná rizika a <br /> upozorní na potenciální problémy</p>
      <p className='text-gray-900 mb-6 text-lg max-w-3xl text-center'>Vytvářejte právní dokumenty a hodnoťte obchodní rizika rychle a bez chyb. AI vám pomůže shromáždit všechny údaje, vyplnit formuláře a připravit hotový dokument během minut.</p>

      <Button size='lg'>Začněte hned!</Button>
    </div>
  )
}
