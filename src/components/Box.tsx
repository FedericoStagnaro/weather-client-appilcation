import * as React from 'react';


export interface IBoxProps {
    children: React.ReactNode
}

export default function Box (props: IBoxProps) {
  return (
    <div className=' m-16 p-32 rounded-lg shadow-black shadow-2xl bg-slate-300'>
      {props.children}
    </div>
  );
}
