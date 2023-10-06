'use client';

import React, { FormEvent, useRef, useState } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';
import { UserForm } from '@/app/components/UserForm';

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setImage(null);
    setLoading(true);

    try {
      const token = await reCaptchaRef.current?.executeAsync();

      const response = await fetch('/api/generate', {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({
          message,
          token,
        }),
      });

      // Handle response if necessary
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
      // ...
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      reCaptchaRef.current?.reset();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      {isLoading ? (
        <p>something is loading</p>
      ) : (
        <UserForm />
        // <form onSubmit={onSubmit} className="flex flex-col gap-2">
        //   <button type="submit">Submit</button>
        // </form>
      )}

      {image && <img alt="Generated image" src={image} className="h-1/3 w-1/3" />}

      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || ''}
        size="invisible"
        ref={reCaptchaRef}
      />
    </main>
  );
};

export default Home;
