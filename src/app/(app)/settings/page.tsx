/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { SubmitHandler, useForm } from 'react-hook-form';
import profile from "@/assets/admin.png";
import Image from 'next/image';
import { LuImagePlus } from 'react-icons/lu';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/features/setting/setting.api';
import { toast } from 'react-toastify';
import Loading from '@/components/shared/Loading';

type TInputs = {
    full_name: string;
    profile_picture: FileList;
}

const Settings = () => {
    const { data } = useGetProfileQuery(undefined);
    // console.log(data?.data?.user_profile?.profile_picture);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const { register, handleSubmit, watch } = useForm<TInputs>();


    const onSubmit: SubmitHandler<TInputs> = async () => {
        const name = watch("full_name");
        const profile_picture = watch("profile_picture")?.[0];

        const formData = new FormData();
        formData.append("full_name", name);
        if (profile_picture) {
            formData.append("profile_picture", profile_picture);
        }

        try {
            const result = await updateProfile(formData).unwrap();
            toast.success(result?.message);
        } catch (error) {
            toast.error("Failed to upload profile")
            // console.log(error);
        }
    }

    return (
        <div>
            <form className='w-full space-y-7' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-center'>
                    <div className='relative'>
                        <Image 
                            src={data?.data?.user_profile?.profile_picture || profile} 
                            alt='admin profile' 
                            width={500} 
                            height={500} 
                            className='rounded-full border-2 border-[#203463] shadow-lg shadow-blue-300 object-cover size-40' 
                        />
                        <label htmlFor="profile" className='absolute top-24 left-28 cursor-pointer bg-white rounded-full p-1 shadow-md hover:scale-110 transition-transform'>
                            <LuImagePlus size={30} className='text-common' />
                        </label>
                        <input 
                            type="file" 
                            {...register("profile_picture")} 
                            id='profile' 
                            accept="image/*"
                            className='hidden'
                        />
                    </div>
                </div>
                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>Name</label>
                    <input 
                        {...register("full_name")} 
                        type='text' 
                        defaultValue={data?.data?.user_profile?.full_name}
                        className='border border-border-color rounded-lg py-2 px-4 appearance-none outline-none w-full text-header' 
                        placeholder='Enter your name' 
                    />
                </div>
                <button 
                    type='submit' 
                    disabled={isLoading}
                    className='bg-common text-main py-2 rounded-lg w-full hover:bg-opacity-90 transition-colors disabled:opacity-50'
                >
                    {isLoading ? <Loading /> : "Save Change"}
                </button>
            </form>
        </div>
    )
}

export default Settings