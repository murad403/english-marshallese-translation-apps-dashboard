/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Loading from "@/components/shared/Loading";
import { useChangePasswordMutation } from "@/redux/features/setting/setting.api";
import { removeToken } from "@/utils/auth";
import { changePasswordValidationSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";
import z, { any } from "zod";

type TInputs = z.infer<typeof changePasswordValidationSchema>;

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
        resolver: zodResolver(changePasswordValidationSchema)
    });
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState<boolean>(false);
    const [changePassword, {isLoading}] = useChangePasswordMutation();
    const router = useRouter();

    const onSubmit: SubmitHandler<TInputs> = async(data) => {
        try {
            const result = await changePassword(data).unwrap();
            toast.success(result?.message);
            await removeToken();
            router.push("/auth/sign-in");
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message);
        }
    }
    return (
        <div>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>Old Password</label>
                    <div className='relative'>
                        <input {...register("current_password")} type={showPassword ? "text" : "password"} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header placeholder:select-none' placeholder='Enter your old password' />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute top-3 text-xl right-3 text-title">
                            {
                                showPassword ? <LuEye size={16} /> : <LuEyeOff size={16} />
                            }
                        </div>
                    </div>
                    {errors.current_password && <p className="text-red-400 text-sm mt-1">{errors.current_password.message}</p>}
                </div>

                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>New Password</label>
                    <div className='relative'>
                        <input type={showNewPassword ? "text" : "password"} {...register("new_password")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header placeholder:select-none' placeholder='Enter your new password' />
                        <div onClick={() => setShowNewPassword(!showNewPassword)} className="absolute top-3 text-xl right-3 text-title">
                            {
                                showNewPassword ? <LuEye size={16} /> : <LuEyeOff size={16} />
                            }
                        </div>
                    </div>
                    {errors.new_password && <p className="text-red-400 text-sm mt-1">{errors.new_password.message}</p>}
                </div>

                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>Confirm New Password</label>
                    <div className='relative'>
                        <input type={showConfirmNewPassword ? "text" : "password"} {...register("confirm_password")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header placeholder:select-none' placeholder='Confirm your password' />
                        <div onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="absolute top-3 text-xl right-3 text-title">
                            {
                                showConfirmNewPassword ? <LuEye size={16} /> : <LuEyeOff size={16} />
                            }
                        </div>
                    </div>
                    {errors.confirm_password && <p className="text-red-400 text-sm mt-1">{errors.confirm_password.message}</p>}
                </div>
                <button type='submit' className='bg-common text-main py-2 rounded-lg w-full'>
                    {
                        isLoading ? <Loading/> : "Save Changes"
                    }
                </button>
            </form>
        </div>
    )
}

export default ChangePassword
