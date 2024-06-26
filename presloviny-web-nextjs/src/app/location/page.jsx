import BigTextDot from "@/components/textStyles/BigTextDot";
import { getContactInfo } from "@/lib/api";
import { MdPinDrop, MdOutlineEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

export default async function Location() {
    const contactInfo = await getContactInfo();
    
    const { email, number, address, googleMapsUrl } = contactInfo ? contactInfo.attributes : { email: null, number: null, address: null, googleMapsUrl: null };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-[95vh]">
            <div className="md:w-5/12 flex h-full items-center justify-center">
                <div className="z-10 flex flex-col items-center justify-center rounded-xl p-10 backdrop-blur-lg dark:text-zinc-200">
                    <BigTextDot text="Lokace" />
                    <ul className="w-full flex flex-col items-start justify-center p-10 gap-5 text-xl">
                        <li>
                            <div className="flex gap-2 items-center">
                                <MdPinDrop />
                                <p>Adresa</p>
                            </div>
                            {address || <p>Address not available</p>}
                        </li>
                        <li>
                            <div className="flex gap-2 items-center">
                                <MdOutlineEmail />
                                <p>Email</p>
                            </div>
                            {email || <p>Email not available</p>}
                        </li>
                        <li>
                            <div className="flex gap-2 items-center">
                                <BsFillTelephoneFill />
                                <p>Telefon</p>
                            </div>
                            {number || <p>Phone number not available</p>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full h-full md:h-screen">
                {googleMapsUrl ? (
                    <iframe
                        src={googleMapsUrl}
                        className="w-full h-full"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <p>Google Maps URL not available</p>
                    </div>
                )}
            </div>
        </div>
    );
}