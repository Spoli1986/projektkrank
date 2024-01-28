import React from "react";
import Image from "next/image";
import Stefu from "../../../public/band/stefu.jpg";
import Peter from "../../../public/band/peter.jpg";
import Hene from "../../../public/band/hene.jpg";
import Dave from "../../../public/band/dave.jpg";

type Props = {};

function Band({}: Props) {
	return (
		<div className="text-white">
			<div className=" mt-32 align-middle justify-between items-center md:justify-evenly grid grid-rows-2 xl:grid-rows-1 grid-flow-col gap-4 xl:gap-0 w-full">
				<div className="flex flex-col items-center gap-4 justify-center sm:w-max">
					<Image src={Stefu} alt="Stefu" width={300} />

					{/* <p className="text-sm">Stefu, Gitarre/Vox/Samples</p> */}
				</div>
				<div className="flex flex-col items-center gap-4 justify-center sm:w-max">
					<Image src={Peter} alt="Peter" width={300} />

					{/* <p className="text-sm">Peter, Drums</p> */}
				</div>
				<div className="flex flex-col items-center gap-4 justify-center sm:w-max">
					<Image src={Hene} alt="Hene" width={300} />

					{/* <p className="text-sm">Hene, Gitarre/Vox</p> */}
				</div>
				<div className="flex flex-col items-center gap-4 justify-center sm:w-max">
					<Image src={Dave} alt="Dave" width={300} />

					{/* <p className="text-sm">Dave, Bass/Vox</p> */}
				</div>
			</div>
			<div className="flex flex-col mt-20 items-center justify-center gap-4">
				<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase">
					Geschichte
				</h1>
				<p className="w-[90%] md:w-[80%] lg:w-[50%]">
					Projekt Krank wurde durch Stefan im Jahre 2015 ins Leben gerufen. Zusammen
					mit Heinz, der sich gleich zu beginn dem Projekt angeschlossen hat, wurde 
					die erste Zeit vorerst nur  zu zweit reichlich Songmaterial aufgenommen und
					einstudiert. Zusammen mit Shadow, dem damaligen Bassist, wurden neun Songs
					auf einen ersten Longplayer aufgenommen. Zwischen 2016 - 2019 wurden auch
					eine handvoll Gigs gespielt und unermüdlich an neuem Songmaterial
					gearbeitet. 2019 kam der Ausstieg von Shadow. Mit Davill wurde der neue
					Mann am Bass gefunden und auch kurz darauf fand man mit Peter das erste mal
					ein Schlagzeuger der die herausforderung bei PK annahm. Mit Einflüssen aus
					dem Industrial, Black und Doom Metal, sowie dem üblichen Shit der unser
					Alltag prägt, entsteht bei PK ein Mix aus brachialen, sphärischen,
					langsamen und schnellen Songs welche alle in Deutsch oder Mundart gespielt
					werden. Um auch was für das Auge zu bieten werden die Konzerte mit eigener
					Lichtshow unterstützt.. Nicht nur das machen was es schon gibt und alle
					anderen tun, sondern eigene Wege gehen ist das Ziel. Unterzubringen wird
					die Musik welche PK kreiert irgendwo im bereich vom Darkwave und
					Industrialmetal bis hin zum Black und Darkmetal sein.
				</p>
			</div>
		</div>
	);
}

export default Band;
