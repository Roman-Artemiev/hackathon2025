import React from 'react'

interface ChatHeadingProp{
    headningText : string;
}


export default function ChatHeading({headningText} : ChatHeadingProp) {
  return (
    <h2 className='text-2xl font-semibold mb-2 text-gray-900'>{headningText}</h2>
  )
}
