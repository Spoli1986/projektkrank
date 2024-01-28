"use client";
import React from "react";

type Props = {};

function Videos({}: Props) {
	return (
		<div className="mt-32 text-white flex flex-col md:items-center p-2 md:p-0">
			<div className="aspect-video md:w-[853px]">
				<iframe
					className="h-full w-full"
					src="https://www.youtube.com/embed/5JPghLhYohw"
					title="Projekt Krank - Sorg"
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

export default Videos;
