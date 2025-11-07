import React from 'react'

interface ChatSubHeadingProp{
    text : string;
}

export default function ChatSubHeading({text} : ChatSubHeadingProp) {
  return (
    <span>{text}</span>
  )
}
