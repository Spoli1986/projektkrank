'use client';
import React from 'react';
import Youtube from '../components/common/frames/youtube';

type Props = {};

function Media({}: Props) {
  return (
    <div className="mt-32 text-white flex flex-col md:items-center p-2 md:p-0 gap-2">
      <Youtube src="https://www.youtube.com/embed/l_4zcsg_pVg?si=eTEfe-_QE4_BX40e" title="Projekt Krank - Aufbruch" />
      <Youtube src="https://www.youtube.com/embed/kdPTc8gFr7Y?si=bjhf-j4Pc3NmSX3X" title="Projekt Krank - Alter Mann" />
      <Youtube src="https://www.youtube.com/embed/5JPghLhYohw" title="Projekt Krank - Sorg" />
    </div>
  );
}

export default Media;
