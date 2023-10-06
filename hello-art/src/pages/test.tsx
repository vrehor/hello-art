import React, {useEffect, useState} from 'react';

const Test = () => {
  const [res, setRes] = useState('');

  useEffect(() => {
    const fn = async () => {
      const response = await fetch('/api/prompt', {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({
          message:
              'Generate a comical image featuring Tomas, a 39-year-old sports enthusiast who adores basketball, volleyball, cycling, and traveling. The scene should reflect one of his interests, such as playing basketball with an incredibly small hoop, attempting a towering volleyball spike, riding an impossibly tall bicycle, or exploring a miniature version of Kilimanjaro. This close-up perspective should capture the essence of his playful and humorous personality.',
        }),
      });

      setRes(await response.text());
    }

    fn();
  }, []);

  return res || null;
};

export default Test;
