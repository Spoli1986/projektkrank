"use client";
import React, { useState } from "react";

type Props = {};

function Contact({}: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: any) => {};
  return (
    <div className="mt-40 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="text-pk-green mt-20 flex flex-col w-[90%] md:w-[450px] lg:w-[650px] justify-center gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-black"
          />
        </div>

        <button type="submit" className="active:text-gray-300">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
