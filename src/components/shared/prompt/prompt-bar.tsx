import { Button, FormInput } from '@/components/ui'
import type GridItem from '@/structures/GridItem';
import { FormProvider, useForm } from 'react-hook-form';

interface PromptBarProps{
  setGridItems : (gridItems : GridItem[]) => (void)
  gridItems : GridItem[]
  onSend?: (text: string) => Promise<void> | void
}


export default function PromptBar({setGridItems, gridItems, onSend} : PromptBarProps) {
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });

  const {
    handleSubmit, setValue
  } = formMethods;

  const onSubmit = async (data: { text: string }) => {
    const text = data.text;
    if (onSend) {
      await onSend(text);
    } else {
      // fallback behavior: directly append message
      const newItem: GridItem = {
        author : 1,
        text,
      };
      setGridItems([...gridItems, newItem]);
    }
    setValue("text", "");
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
