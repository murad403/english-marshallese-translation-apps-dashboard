"use client"
import { forgotPasswordValidationSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type TInputs = z.infer<typeof forgotPasswordValidationSchema>;

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
        resolver: zodResolver(forgotPasswordValidationSchema)
    });

    const onSubmit: SubmitHandler<TInputs> = (data) => {
        console.log(data);
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

                <button type='submit' className='bg-common text-main py-2 rounded-lg w-full'>Send OTP</button>
            </form>
        </div>
    )
}

export default ForgotPassword
