import React, { useEffect, useState } from 'react';
import { Input } from '@/app/components/common/Input';

const initialState = {
  step: 1,
  firstName: 'place',
  bornAt: '',
  funnyAt: '',
  department: '',
};

export const UserForm = () => {
  const [state, setState] = useState<typeof initialState>(initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const nextStep = () => {
    setState({ ...state, step: state.step + 1 });
  };

  const prevStep = () => {
    setState({ ...state, step: state.step - 1 });
  };

  const handleChange = (input: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [input]: e.target.value });
  };

  const renderSwitch = () => {
    switch (state.step) {
      case 1:
        return (
          <div className={'flex flex-col justify-around'}>
            <h1>What is your first name?</h1>
            <Input name="firstName" onChange={handleChange} value={state.firstName} />
          </div>
        );
      case 2:
        return (
          <div className={'flex flex-col justify-around'}>
            <h1>What city were you born in?</h1>
            <Input name="bornAt" onChange={handleChange} value={state.bornAt} />
          </div>
        );
      case 3:
        return (
          <div className={'flex flex-col justify-around'}>
            <h1>What is your favourite thing to do for fun?</h1>
            <Input name="funnyAt" onChange={handleChange} value={state.funnyAt} />
          </div>
        );
      case 4:
        return (
          <div className={'flex flex-col justify-around'}>
            <h1>What department are you joining at OAK’S LAB?</h1>
            <Input name="department" onChange={handleChange} value={state.department} />
          </div>
        );
      case 5:
        return <h1>Final</h1>;
    }
  };

  return (
    <div className={'card'}>
      <h1>{state.step}</h1>
      <div className={'cardContent'}>{renderSwitch()}</div>

      <div className={'cardButtons'}>
        <button className={'button'} onClick={prevStep}>
          Back
        </button>
        <button className={'button'} onClick={nextStep}>
          Continue
        </button>
      </div>
    </div>
  );
};
