'use client';
import React from 'react';

type Props = {};

function Media({}: Props) {
  return (
    <div className="mt-32 text-white flex flex-col md:items-center p-2 md:p-0 gap-2">
      <div className="aspect-video md:w-[853px]">
        <iframe
          className="h-full w-full"
          src="https://youtu.be/kdPTc8gFr7Y
          "
          title="Projekt Krank - Alter Mann"
          width="100%"
        ></iframe>
      </div>
      <div className="aspect-video md:w-[853px]">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/5JPghLhYohw"
          title="Projekt Krank - Sorg"
          width="100%"
        ></iframe>
      </div>
    </div>
  );
}

export default Media;
