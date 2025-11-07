import { Button, FormInput } from '@/components/ui'
import type GridItem from '@/structures/GridItem';
import { FormProvider, useForm } from 'react-hook-form';

interface PromptBarProps{
  setGridItems : (gridItems : GridItem[]) => (void)
  gridItems : GridItem[]
}


export default function PromptBar({setGridItems, gridItems} : PromptBarProps) {
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });

  const {
    handleSubmit,
  } = formMethods;

  const onSubmit = async (data: { text: string }) => {
    // Create a new GridItem from the submitted text (adjust as needed)
    const newItem: GridItem = {
      // Fill in the required properties for GridItem here
      author : 1,
      text: data.text,
    };
    setGridItems([...gridItems, newItem]);
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
