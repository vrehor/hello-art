"use client"

import React, {FormEvent, useRef, useState} from "react";

import ReCAPTCHA from 'react-google-recaptcha';

const Home = () => {
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const reCaptchaRef = useRef<ReCAPTCHA>(null);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true);

        try {
            const token = await reCaptchaRef.current?.executeAsync();

            const response = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({
                    message,
                    token,
                }),
            })

            // Handle response if necessary
            await response.json()
            // ...
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
            reCaptchaRef.current?.reset()
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-2">
            <h1>This is a test</h1>
            {isLoading ? (
                <p>something is loading</p>
            ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-2">
                    <textarea name="message"
                              required={true}
                              rows={4}
                              cols={40}
                              maxLength={1000}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}/>
                    <button type="submit">Submit</button>
                </form>
            )}
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || ''}
                size="invisible"
                ref={reCaptchaRef}
            />
        </main>
    )
}

export default Home
