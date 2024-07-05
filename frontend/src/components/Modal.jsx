import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function Modal({ title = "Title", children, onClose }) {
    return (
        <div className="bg-black/30 absolute bottom-0 left-0 z-10 w-screen h-dvh flex items-end justify-center p-3 backdrop-blur-sm">
            <div className="bg-base-100 p-6 w-full rounded-xl shadow-lg">
                <div className="border-b flex items-center justify-between pb-2 mb-2">
                    <p className="text-lg font-bold">{title}</p>
                    {onClose && <RxCross2 className="text-4xl cursor-pointer bg-base-200 rounded-full p-2" onClick={onClose} />}
                </div>
                {children}
            </div>
        </div>
    )
}
