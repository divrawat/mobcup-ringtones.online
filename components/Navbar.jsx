import Link from "next/link";
import React, { useRef } from 'react';
import { APP_NAME, DOMAIN, NavbarName, navLinks } from "@/config";
import { Rubik } from '@next/font/google';
import { APP_LOGO } from "@/config";
const roboto = Rubik({ subsets: ['latin'], weight: '800' });

export default function Navbar() {

    const menuRef = useRef(null);

    const toggle = (ref) => {
        if (ref.current.style.display === 'block') { ref.current.style.display = 'none'; }
        else { ref.current.style.display = 'block'; }
    };

    return (

        <nav className="md:pb-1 md:pt-1 bg-[#0f030f] text-pink-200 border-b border-[#544953]">
            <div className="container mx-auto md:flex items-center justify-center md:justify-between max-w-[1250px]">
                <div className="flex items-center md:space-x-4 justify-between">
                    <div className="flex items-center py-1">
                        <div className="px-4"> <img src={APP_LOGO} alt={`${APP_NAME} logo`} height={35} width={35} className="rounded-full" /></div>
                        <span className="uppercase text-lg tracking-wider text-[15px] font-extrabold md:text-[15px]"><a className={`${roboto.className}`} href={`${DOMAIN}`}>{NavbarName}</a></span>
                    </div>
                    <div className="flex gap-5 items-center">
                        <span onClick={() => toggle(menuRef)} className="md:hidden text-[22px] cursor-pointer font-extrabold mr-4">☰</span>
                    </div>
                </div>

                <div className="md:pb-0  md:mt-0 md:pr-4  md:bg-transparent ">
                    <ul id="menu" ref={menuRef} className="md:flex flex-wrap md:space-x-5 md:pb-0 items-center font-bold text-center hidden">
                        {navLinks.map((link, index) => (
                            <li key={index} className="md:pb-0 pb-3">
                                <Link prefetch={false} href={link.href} className={`${roboto.className} hover:text-blue-300 tracking-wider text-[14px] pl-2 font-bold hover:underline`}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>


    );
}
