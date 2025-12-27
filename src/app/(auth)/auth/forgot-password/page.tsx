/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Loading from "@/components/shared/Loading";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";
import { setUser } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hooks";
import { forgotPasswordValidationSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

type TInputs = z.infer<typeof forgotPasswordValidationSchema>;

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
        resolver: zodResolver(forgotPasswordValidationSchema)
    });
    const [forgotPassword, {isLoading}] = useForgotPasswordMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit: SubmitHandler<TInputs> = async(data) => {
        try {
            const result = await forgotPassword(data).unwrap();
            await dispatch(setUser({user: data.email, otp: null}));
            toast.success(result?.message);
            router.push("/auth/verify-otp");
        } catch (error: any) {
            toast.error(error?.data?.errors?.email?.[0]);
        }
    }
    return (
        <div className='w-full md:w-[50%] bg-main md:p-20 p-5 rounded-lg'>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-header text-heading text-center'>Forgot Password</h2>
                <div>
                    <label className='block font-medium text-subheading mb-2 text-header'>Email</label>
                    <input type="text" {...register("email")} className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header' placeholder='Enter your email' />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <button type='submit' className='bg-common text-main py-2 rounded-lg w-full'>
                    {
                        isLoading ? <Loading/> : "Send OTP"
                    }
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword
