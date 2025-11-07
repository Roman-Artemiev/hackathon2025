import { Button, FormInput } from '@/components/ui'
import type GridItem from '@/structures/GridItem';
import { FormProvider, useForm } from 'react-hook-form';

interface PromptBarProps{
  setGridItems : (gridItems : GridItem[]) => (void)
}


export default function PromptBar() {
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });

  const {
    handleSubmit,
  } = formMethods;

  const onSubmit = async () => {

  }

  return (
    <FormProvider {...formMethods}>
      <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="text"
          placeholder="Zadejte sem svou zprávu..."
          required
          className='w-full'
          classNameInput='w-full bg-white'
        />
        <Button className='w-20'>
          Poslat
        </Button>
      </form>
    </FormProvider>
  )
}
