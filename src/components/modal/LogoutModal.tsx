import React from 'react';
import { FiLogOut } from 'react-icons/fi';

const LogoutModal = () => {
    const handleLogout = () => {
        console.log("User logged out");
        (document.getElementById('my_modal_2') as HTMLDialogElement)?.close();
    };
    return (
        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-main shadow-xl rounded-xl p-5">
                {/* আইকন */}
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-red-100 rounded-full">
                        <FiLogOut size={40} className="text-red-600" />
                    </div>
                </div>

                {/* টেক্সট */}
                <h3 className="text-title text-xl font-semibold text-center mb-3">
                    Logout Confirmation
                </h3>
                <p className="text-title/80 text-center text-normal mb-8">
                    Are you sure you want to log out of your account?
                </p>

                {/* বাটনগুলো */}
                <div className="modal-action flex justify-center gap-10">
                    {/* Cancel বাটন – মোডাল বন্ধ করে */}
                    <form method="dialog">
                        <button className="border py-2 px-6 border-title rounded-lg text-title hover:bg-gray-100 transition">
                            Cancel
                        </button>
                    </form>

                    {/* Logout বাটন */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 rounded-lg py-2 px-6 text-white font-medium transition"
                    >
                        Yes, Logout
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default LogoutModal
