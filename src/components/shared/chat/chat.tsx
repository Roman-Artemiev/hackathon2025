import { useState } from "react";
import InputChatBlock from "./InputChatBlock";
import ChatGrid from "./ChatGrid";
import ChatHeading from "./ChatHeading";
import ChatSubHeading from "./ChatSubHeading";
import AuthorType from "@/structures/AuthorType";
import PromptBar from "../prompt/prompt-bar";





export default function Chat() {

  const gridItems = [
    {
      text: "Bot",
      author: 0,
    },
    {
      text: "Author",
      author: 1,
    },
    {
      text: "Bot",
      author: 0,
    }
  ];


  const [userPrompt, setUserPrompt] = useState<string>();

  return (
    <>
      <div className="w-full h-fit bg-amber-400">

        <ChatHeading headningText="Zdravim" />

        <ChatSubHeading text="Podtext " />

        <ChatGrid gridItems={gridItems ?? []} />

        {/* <ChatQuickResponses  /> */}

        <InputChatBlock text={userPrompt} color="" textSetter={setUserPrompt} />

        <div className='rounded-2xl mx-auto max-w-4xl'>
          <PromptBar />
        </div>
      </div>

    </>

  )
}
