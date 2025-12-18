"use client"
import { SubmitHandler, useForm } from 'react-hook-form';
import profile from "@/assets/admin.png";
import Image from 'next/image';
import { LuImagePlus } from 'react-icons/lu';

type TInputs = {
    name: string;
    image: string;
}

const Settings = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>();

    const onSubmit: SubmitHandler<TInputs> = (data) => {
        console.log(data);
    }
    return (
        <div>
            <form className='w-full space-y-7' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-center '>
                    <div className='relative'>
                        <Image src={profile} alt='admin profile' width={140} height={140} className='rounded-full border-2 border-[#203463] shadow-lg shadow-blue-300' />
                        <label htmlFor="profile" className='absolute top-24 left-28'>
                            <LuImagePlus size={30} />
                        </label>
                        <input type="file" {...register("image")} id='profile' name='profile' className='hidden'/>
                    </div>
                </div>
                <div>
                    <label className='block font-medium text-subheading mb-2 text-header'>Name</label>
                    <input {...register("name")} type='text' className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header' placeholder='Enter your email' />
                </div>
                <button type='submit' className='bg-common text-main py-2 rounded-lg w-full'>Save Change</button>
            </form>
        </div>
    )
}

export default Settings
