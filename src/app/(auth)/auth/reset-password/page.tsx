"use client"
import { resetPasswordValidationSchema } from '@/validation/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import z from 'zod';

type TInputs = z.infer<typeof resetPasswordValidationSchema>;

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
        resolver: zodResolver(resetPasswordValidationSchema)
    });
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

    const onSubmit: SubmitHandler<TInputs> = (data) => {
        console.log(data)
    }
    return (
        <div className='w-full md:w-[50%] bg-main md:p-20 p-5 rounded-lg'>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-header text-heading text-center'>Reset Password</h2>
                <div>
                    <label className='block font-medium text-subheading mb-2 text-header'>Password</label>
                    <div className='relative'>
                        <input {...register("password")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header' placeholder='Enter new password' />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute top-3 text-xl right-3 text-title">
                            {
                                showPassword ? <LuEye size={16} /> : <LuEyeOff size={16} />
                            }
                        </div>
                    </div>
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <label className='block font-medium text-subheading mb-2 text-header'>Confirm password</label>
                    <div className='relative'>
                        <input {...register("confirmPassword")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header' placeholder='Confirm password' />
                        <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-3 text-xl right-3 text-title">
                            {
                                showConfirmPassword ? <LuEye size={16} /> : <LuEyeOff size={16} />
                            }
                        </div>
                        {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>
                </div>
                <button type='submit' className='bg-common text-main py-2 rounded-lg w-full'>Confirm</button>
            </form>
        </div>
    )
}

export default ResetPassword
