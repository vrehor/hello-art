import React, { useState } from 'react';

type Props = {
  name: string;
  onChange: (name: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
};

export const Input = ({ name, onChange, value }: Props) => {
  return (
    <textarea
      className={'input'}
      name={name}
      required={true}
      rows={4}
      cols={40}
      maxLength={1000}
      value={value}
      // onChange={(e) => setMessage(e.target.value)}
      onChange={onChange(name)}
    />
  );
};
