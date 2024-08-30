'use client';

import { cn } from '@/lib/utils/cn';
import { useEffect, useState } from 'react';

const TypewriterStream = ({ url, onEnd }: { url: string; onEnd: () => void; }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const eventSource = new EventSource(`/api${url}`);

    eventSource.onopen = () => {
      setIsLoading(false);
    };

    eventSource.onmessage = (event) => {
      setText((prevText) => prevText + event.data);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    eventSource.addEventListener('end', () => {
      onEnd();
    });

    return () => {
      eventSource.close();
    };
  }, [url, onEnd]);

  return <span className={cn({
    'animate-typing-dots': isLoading
  })}>
    {!isLoading && text}
  </span>;
};

export default TypewriterStream;
