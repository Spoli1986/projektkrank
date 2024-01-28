import Elch from "../../../public/Flyer_ElchCl_Hochformat.png";
import Sedel from "../../../public/flyer_sedel_hochhochformat.png";
import Oxyl from "../../../public/flyer.jpg";
import Image from "next/image";

type Props = {};

function Events({}: Props) {
	return (
		<div className="flex flex-col gap-3 w-screen justify-center items-center bg-grey-black mt-20">
			Latest
			<Image src={Elch} alt="flyer" width={300} />
			<Image src={Sedel} alt="flyer" width={300} />
			<Image src={Oxyl} alt="flyer" width={300} />
		</div>
	);
}

export default Events;
