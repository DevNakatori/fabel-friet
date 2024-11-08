import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import useWeb3Forms from '@web3forms/react';
import '../styles/contactform.css';


const Contactform = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const accessKey = '3f211a36-f599-45bb-8fab-a96207550dd6';

  const {submit: onSubmit} = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: 'Fabel Friet',
      subject: 'New Contact Message from your Website',
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setResult(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setResult(msg);
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='leftvideoboxinnerinnerform'>
        <div className='halfinput'>
          <input
            className='inputboxgroup'
            id="name"
            type="text"
            placeholder='Name*'
            {...register('name', {required: 'Name is required'})}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className='halfinput'>
          
          <input
            className='inputboxgroup'
            id="email"
            type="email"
            placeholder='Email*'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className='fullinput'>
          <input
            className='inputboxgroup'
            id="subject"
            type="text"
            placeholder='Subject*'
            {...register('subject', {required: 'Subject is required'})}
          />
          {errors.subject && <span>{errors.subject.message}</span>}
        </div>

        <div className='fullinput lastchildtextbox'>
          <textarea
            className='inputboxgroup'
            id="message"
            placeholder='Bericht*'
            {...register('message', {required: 'Message is required'})}
          />
          {errors.message && <span>{errors.message.message}</span>}
        </div>

        {result && (
        <div>
          {isSuccess ? (
            <p className='successfulmsg'>Message sent successfully!</p>
          ) : (
            <p className='errormsg'>Error: {result}</p>
          )}
        </div>
      )}


        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contactform;
