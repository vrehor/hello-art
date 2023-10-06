import React, { useEffect, useState } from 'react';
import { Input } from '@/app/components/common/Input';
import { useForm } from 'react-hook-form';

enum StepType {
  init,
  bio,
  picture1,
  picture2,
}

const initialState = {
  step: 0,
  firstName: 'Gandalf',
  bornAt: '',
  funnyAt: '',
  department: '',
};

export const UserForm = () => {
  const { register, handleSubmit } = useForm();
  const [state, setState] = useState<typeof initialState>(initialState);
    const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    console.log(state);
  }, [state]);

    // @ts-ignore
    const nextStep = (data) => {
    if (state.step === 6) {
        const fn = async () => {
            const formData = new FormData();
            formData.append("personImage", data.personImage[0]);
            formData.append("midjourneyImage", data.midjourneyImage[0]);

            try {
                const response = await fetch('/api/magic', {
                    method: 'POST',
                    cache: "no-cache",
                    body: formData,
                })

                // Handle response if necessary
                setImage(await response.text())
                setState({ ...state, step: state.step + 1 });
                // ...
            } catch (e) {
                console.error(e)
            }
        }

        fn();
    } else {
      setState({ ...state, step: state.step + 1 });
    }
  };

  const prevStep = () => {
    setState({ ...state, step: state.step - 1 });
  };

  const handleChange = (input: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [input]: e.target.value });
  };

  const renderSwitch = () => {
    switch (state.step) {
      case 0:
        return (
          <div className="flex flex-col justify-between text-center">
            <img src={'LOGO.png'} style={{ height: 20 }} />
            <h1>
              Tell us about yourself <br /> & we will make some AI magic happen.{' '}
            </h1>
            <h1>Ready to start?</h1>
            <button className={'buttonStart'} onClick={nextStep}>
              Start
            </button>
          </div>
        );
      case 1:
        return (
          <div className={'flex flex-col gap-10'}>
            <h1>Write us your bio</h1>
            <Input name="bio" onChange={handleChange} value={state.firstName} />
          </div>
        );
      case 2:
        return (
          <div className={'flex flex-col gap-10'}>
            <h1>What city were you born in?</h1>
            <Input name="bornAt" onChange={handleChange} value={state.bornAt} />
          </div>
        );
      case 3:
        return (
          <div className={'flex flex-col  gap-10'}>
            <h1>What is your favourite thing to do for fun?</h1>
            <Input name="funnyAt" onChange={handleChange} value={state.funnyAt} />
          </div>
        );
      case 4:
        return (
          <div className={'flex flex-col  gap-10'}>
            <h1>What department are you joining at OAK’S LAB?</h1>
            <Input name="department" onChange={handleChange} value={state.department} />
          </div>
        );
      case 5:
        return (
          <div className={'flex flex-col  gap-10'}>
            <h1>Upload your headshot</h1>
            <div className={'upload'}>
              <h2>Click or drag a file to upload</h2>
              <h2>SVG, PNG, JPG or GIF (max. 800x400px)</h2>
            </div>
          </div>
        );
      case 6:
        return (
          <div className={'flex flex-col  gap-10'}>
            <h1>Generate picture in midjourney that represents you</h1>
            <input type="file" {...register('personImage')} />
            <input type="file" {...register('midjourneyImage')} />
          </div>
        );
      case 7:
        return <div className={'flex flex-col  gap-10'}>
            {image && <img alt="Generated image" src={image} style={{width: '200px', height: '200px'}}/>}
        </div>;
    }
  };

  return (
    <form onSubmit={handleSubmit(nextStep)}>
      <div className={'card'}>
        <h1>{state.step > 0 ? `${state.step} of 7` : ''}</h1>

        <div className={'cardContent'}>{renderSwitch()}</div>

        {state.step > 0 && (
          <div className={'cardButtons'}>
            <button className={'buttonBack'} onClick={prevStep} disabled={state.step < 1}>
              Back
            </button>
            <button className={'button'} type={'submit'}>
              Continue
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
