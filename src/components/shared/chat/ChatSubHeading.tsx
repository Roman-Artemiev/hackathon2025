import React from 'react'

interface ChatSubHeadingProp {
  text: string;
}

export default function ChatSubHeading({ text }: ChatSubHeadingProp) {
  return (
    <div className='max-w-[75%] py-2 px-3 rounded-xl text-sm leading-relaxed col-span-2 justify-self-start bg-gray-100 text-gray-800 rounded-bl-none'>{text}</div>
  )
}
