'use client';
import { changePasswordValidationSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import z from "zod";

type TInputs = z.infer<typeof changePasswordValidationSchema>;

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
        resolver: zodResolver(changePasswordValidationSchema)
    });
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState<boolean>(false);

    const onSubmit: SubmitHandler<TInputs> = (data) => {
        console.log(data)
    }
    return (
        <div>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>Old Password</label>
                    <div className='relative'>
                        <input {...register("oldPassword")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header' placeholder='Enter your old password' />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute top-3 text-xl right-3 text-title">
                            {
                                showPassword ? <LuEye size={16} /> : <LuEyeOff size={16} />
                            }
                        </div>
                    </div>
                    {errors.oldPassword && <p className="text-red-400 text-sm mt-1">{errors.oldPassword.message}</p>}
                </div>

                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>New Password</label>
                    <div className='relative'>
                        <input {...register("newPassword")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header' placeholder='Enter your new password' />
                        <div onClick={() => setShowNewPassword(!showNewPassword)} className="absolute top-3 text-xl right-3 text-title">
                            {
                                showNewPassword ? <LuEye size={16} /> : <LuEyeOff size={16} />
                            }
                        </div>
                    </div>
                    {errors.newPassword && <p className="text-red-400 text-sm mt-1">{errors.newPassword.message}</p>}
                </div>

                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>Confirm New Password</label>
                    <div className='relative'>
                        <input {...register("confirmNewPassword")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header' placeholder='Confirm your password' />
                        <div onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="absolute top-3 text-xl right-3 text-title">
                            {
                                showConfirmNewPassword ? <LuEye size={16} /> : <LuEyeOff size={16} />
                            }
                        </div>
                    </div>
                    {errors.confirmNewPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmNewPassword.message}</p>}
                </div>
                <button type='submit' className='bg-common text-main py-2 rounded-lg w-full'>Save Changes</button>
            </form>
        </div>
    )
}

export default ChangePassword
