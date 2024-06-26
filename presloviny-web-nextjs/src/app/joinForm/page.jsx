"use client"
import { TbPointFilled } from "react-icons/tb";
import { useState, useEffect } from "react";
import { getManagerEmail } from "@/lib/api";

export default function JoinForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const [managerEmail, setManagerEmail] = useState("");

    useEffect(() => {
        async function fetchManagerEmail() {
            const managerEmail = await getManagerEmail();
            setManagerEmail(managerEmail);
        }
        fetchManagerEmail();
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const message = document.getElementById('message').value;

        if (!firstName || !lastName || !message) {
            setErrorMessage("Všechny pole musí být vyplněny.");
            return;
        }

        setErrorMessage("");
        const gmailLink = managerEmail ? `https://mail.google.com/mail/?view=cm&fs=1&to=${managerEmail.Email}&su=Přidej se k Presloviny&body=Jméno: ${firstName}%0APříjmení: ${lastName}%0AZpráva: ${message}` : "";
        window.open(gmailLink, '_blank');
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    }

    return (
        <div className="w-full flex lg:items-center justify-center gap-10 h-[95vh] bg-slate-950">
            <div className="w-[700px] p-5 rounded-2xl">
                <div className="flex items-center w-full border-b-[5px] border-presloviny-gold lg:py-5 py-3">
                    <TbPointFilled className="text-presloviny-gold text-3xl" />
                    <h2 className="text-lg font-bold text-white">přihlašovací formulář</h2>
                </div>
                <div className="w-full flex flex-col items-start gap-5 text-black lg:rounded-2xl lg:p-20 p-10">
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
                        <input type="text" placeholder="Jméno" className="lg:w-1/2 w-full h-10 px-4 rounded-md" id="firstName" />
                        <input type="text" placeholder="Příjmení" className="lg:w-1/2 w-full h-10 px-4 rounded-md" id="lastName" />
                        <p className="text-white">Proč by ses chtěl připojit?</p>
                        <textarea className="w-full h-[150px] rounded-lg" id="message"></textarea>
                        <button type="submit" className="lg:w-52 py-3 font-bold text-center transition-all bg-white text-gray-800 rounded-md shadow-xl hover:bg-presloviny-gold hover:shadow-2xl hover:-translate-y-px">Přihlásit se</button>
                    </form>
                </div>
            </div>
        </div>
    );
}