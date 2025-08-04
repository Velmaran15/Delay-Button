import React from 'react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

const Messageform = () => {

    const [meg,setmeg]=useState<string>("");
    const [delay,setdelay]=useState<number>(5);
    const [issend,setissend]=useState<boolean>(false);
    const [time,settime]=useState<NodeJS.Timeout | null>(null);
    const [sent,setsent]=useState<string>("")

    const handlesend = () => {
        setissend(true);

        const id = setTimeout(() => {
            setsent(meg);
            setmeg("");
            setissend(false);
        }, delay * 1000);

        settime(id); 
    }

    const handlcancel = () => {
        if (time) {
            clearTimeout(time);
            // setmeg("");
            setissend(false);
            // setsent("Message cancelled");
        }
    }

  return (
    <div className='max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg bg-white space-y-4 display-flex items-center'>
      <h2 className='text-2xl font-bold text-gray-800 ps-5'> Delay Button</h2>
      <Textarea
      placeholder='Type here...'
      value={meg}
      onChange={(e) => setmeg(e.target.value)}/>

      <Input
      type='number'
      placeholder='Delay in seconds'
      value={delay}
      onChange={(e) => setdelay(Number(e.target.value))}
      disabled={issend} 
      />

      {!issend ? (
        <Button className='w-full' onClick={handlesend}>
            Send Message
        </Button>
      ) : (
        <Button className='w-full' variant="destructive" onClick={handlcancel}>
            Cancel Message
        </Button>
      )}
       
       {sent && (
        <div className='bg-green-100 rounded p-3 text-green-800'>
            <p className='font-semibold'>Message Sent:</p>
            <p>{sent}</p>
        </div>  
       )} 
    </div>
  )
}

export default Messageform