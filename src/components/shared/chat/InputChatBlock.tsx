import React from 'react'


interface InputChatBlockProp{
  text? : string;
  color : string;
  textSetter : (text : string) => (void),
}

export default function InputChatBlock({text} : InputChatBlockProp) 
{
  return (
    <>
        <div>
            <textarea>{text}</textarea>
            <button type='submit'></button>
        </div>
    </>
  );
}
