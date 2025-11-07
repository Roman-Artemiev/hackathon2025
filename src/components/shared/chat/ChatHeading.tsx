import React from 'react'

interface ChatHeadingProp{
    headningText : string;
}


export default function ChatHeading({headningText} : ChatHeadingProp) {
  return (
    <div>{headningText}</div>
  )
}
