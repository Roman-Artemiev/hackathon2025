import { Button } from '@/components/ui';
import Logo from '/images/logo.png';

export default function Hero() {
  return (
    <div className='mb-16 mt-10 flex flex-col justify-center items-center'>
      <img className='mb-6 w-32' src={Logo} alt="Logo" />
      <p className='mb-4 text-4xl text-center font-bold leading-snug'>Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit. Cras fringilla lorem urn</p>
      <p className='mb-6 text-lg max-w-3xl text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec erat libero. Cras fringilla lorem urna, at sodales tortor vulputate sit amet. Pellentesque quis porttitor nibh.</p>

      <Button size='lg'>Začněte hned!</Button>
    </div>
  )
}
