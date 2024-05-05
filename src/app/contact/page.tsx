'use client';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {};

type FormData = {
  name: string;
  email: string;
  message: string;
};

function Contact({}: Props) {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submit = (e: any) => {
    e.preventDefault();

    const formURL = e.target.action;
    fetch(formURL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => {
        // response.json();
      })
      .then((data) => {
        setSubmitted(true);
      });
  };

  return (
    <div className="mt-40 flex items-center justify-center">
      {submitted ? (
        <div role="alert" className="alert alert-success w-[80%] sm:w-[570px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Deine Nachricht wurde weitergeleitet!</span>
          <Link href="/" className="btn btn-success border-pk-green">
            OK
          </Link>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="text-pk-green mt-20 flex flex-col w-[90%] md:w-[450px] lg:w-[650px] justify-center gap-4"
          action="/api/contact"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="">
              Name
            </label>
            <input
              name="name"
              id="name"
              type="text"
              onChange={(e) => handleInput(e)}
              required
              className="text-black h-10 outline-none p-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              onChange={(e) => handleInput(e)}
              required
              className="text-black h-10 outline-none p-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">Nachricht</label>
            <textarea
              name="message"
              id="message"
              onChange={(e) => handleInput(e)}
              className="text-black h-24 outline-none p-1"
            />
          </div>

          <button type="submit" className="btn btn-primary w-24 self-center">
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
