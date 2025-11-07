import { useEffect, useRef, useState } from "react";
import ChatGrid, { ThinkingChatGrid } from "./ChatGrid";
import ChatHeading from "./ChatHeading";
import ChatSubHeading from "./ChatSubHeading";
import PromptBar from "../prompt/prompt-bar";
import type GridItem from "@/structures/GridItem";

export default function Chat() {
  const [gridItems, setGridItems] = useState<GridItem[]>([
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
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [gridItems]); // run effect when messages array changes

  chatContainerRef?.current?.scrollTo({
    top: chatContainerRef.current.scrollHeight,
    behavior: "smooth",
  });

  return (
    <div className="mb-20 w-full h-fit mx-auto max-w-4xl min-h-96">
      <ChatHeading headningText="Zdravim" />

      <div
        className="space-y-1 p-4 rounded-2xl bg-white mb-6 max-h-96 h-96 overflow-auto scrollbar"
        ref={chatContainerRef}
      >
        <ChatSubHeading text="Podtext " />

        <ChatGrid gridItems={gridItems ?? []} />

        <ThinkingChatGrid />
      </div>

      <div className="rounded-2xl ">
        <PromptBar setGridItems={setGridItems} gridItems={gridItems} />
      </div>
    </div>
  );
}
