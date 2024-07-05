import React from 'react';

const Modal = ({ id, title, children, wide }) => {
    const modalBoxClass = wide ? 'modal-box w-11/12 max-w-5xl' : 'modal-box';
    const modalClass = wide ? 'modal' : 'modal modal-bottom sm:modal-middle';

    return (
        <dialog id={id} className={modalClass}>
            <div className={modalBoxClass}>
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">{title}</h3>
                {children}
            </div>
        </dialog>
    );
};

export default Modal;
