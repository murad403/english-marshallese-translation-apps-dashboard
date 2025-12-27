/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Loading from '@/components/shared/Loading';
import { useSignInUserMutation } from '@/redux/features/auth/auth.api';
import { saveToken } from '@/utils/auth';
import { signInValidationSchema } from '@/validation/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { toast } from 'react-toastify';
import z from 'zod';

type TInputs = z.infer<typeof signInValidationSchema>;

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
        resolver: zodResolver(signInValidationSchema)
    });
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [siginInUser, { isLoading }] = useSignInUserMutation();
    const router = useRouter();

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        try {
            const result = await siginInUser(data).unwrap();
            await saveToken(result?.access_token, result?.refresh_token);
            router.push("/");
            toast.success("Login successfully");
            // console.log(result);
        } catch (error: any) {
            console.log(error?.data?.details?.credentials?.[0]);
            toast.error(error?.data?.details?.credentials?.[0]);
        }
    }
    return (
        <div className='w-full md:w-[50%] bg-main md:p-20 p-5 rounded-lg'>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-header text-heading text-center'>Log in</h2>
                <div>
                    <label className='block font-medium text-subheading mb-2 text-header'>Email</label>
                    <input {...register("email")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header placeholder:select-none' placeholder='Enter your email' />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label className='block font-medium text-subheading mb-2 text-header'>Password</label>
                    <div className='relative'>
                        <input {...register("password")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header placeholder:select-none' placeholder='Enter your password' />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute top-3 text-xl right-3 text-title">
                            {
                                showPassword ? <LuEye size={16} /> : <LuEyeOff size={16} />
                            }
                        </div>
                    </div>
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <input {...register("rememberMe")} type="checkbox" className="checkbox border border-common text-header checkbox-sm" />
                        <label className=' text-small mb-2 text-header'>Remember me</label>
                    </div>
                    <div>
                        <Link className='text-normal text-header hover:underline underline-offset-2' href={'/auth/forgot-password'}>Forgot password?</Link>
                    </div>
                </div>
                <button type='submit' className='bg-common text-main py-2 rounded-lg w-full'>
                    {
                        isLoading ? <Loading/> : 'Log In'
                    }
                </button>
            </form>
        </div>
    )
}

export default SignIn
