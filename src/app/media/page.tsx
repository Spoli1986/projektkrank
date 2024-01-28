"use client";
import Link from "next/link";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

type Props = {};

function Media({}: Props) {
  return (
    <div className="mt-32 text-pk-green text-3xl font-semibold items-center flex justify-center gap-4">
      <Link href="/media/videos" title="Videos">
        <span className="shadow-md hover:text-red-400">Videos</span>
      </Link>
      <Link href="/media/photos" title="Fotos">
        <span className="shadow-md hover:text-red-400">Fotos</span>
      </Link>
    </div>
  );
}

export default Media;
