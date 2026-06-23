import React from 'react'

type ButtonProps = {
  text: string;
  theme?: string;
}


const IntoAccountBtn = ({text} :ButtonProps )=> {
  return (
    <button className='w-full py-3.5 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg tracking-tight transition-all hover:bg-neutral-800 active:scale-[0.99] disabled:bg-neutral-300 disabled:cursor-not-allowed'>{text}</button>
  )
}

export default IntoAccountBtn