import React from 'react'
import { CiWarning } from 'react-icons/ci';

const DeleteModal = ({ id }: { id: string }) => {
    const handleDelete = () => {

        console.log("deleted user", id);
        (document.getElementById('my_modal_1') as HTMLDialogElement)?.close();
    }
    return (
        <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-main shadow-xl rounded-xl p-5">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-red-100 rounded-full">
                        <CiWarning size={40} className="text-red-600" />
                    </div>
                </div>

                <p className="text-title my-6 text-center text-normal">
                    Are you sure you want to delete this item?
                </p>

                <div className="modal-action flex justify-center gap-10">
                    <form method="dialog">
                        <button
                            className="border py-2 px-6 border-title rounded-lg text-title hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                    </form>

                    <button
                        className="bg-red-500 hover:bg-red-600 rounded-lg py-2 px-6 text-main font-medium transition"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteModal
