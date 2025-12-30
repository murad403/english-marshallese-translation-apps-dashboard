/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useGetPrivacyAndPolicyQuery, useUpdatePrivacyAndPolicyMutation } from '@/redux/features/setting/setting.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Loading from '@/components/shared/Loading';

type TInputs = {
    content: string
}

const PrivacyAndPolicy = () => {
    const { data } = useGetPrivacyAndPolicyQuery(undefined);
    const [updatePrivacyPolicy, { isLoading }] = useUpdatePrivacyAndPolicyMutation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TInputs>();

    // Set default value when data loads
    useEffect(() => {
        if (data?.data?.content) {
            setValue("content", data.data.content);
        }
    }, [data, setValue]);

    const onSubmit: SubmitHandler<TInputs> = async (formData) => {
        try {
            const result = await updatePrivacyPolicy(formData).unwrap();
            toast.success(result?.message || "Privacy Policy updated successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update");
        }
    }

    return (
        <div>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>
                        Privacy and Policy
                    </label>
                    
                    <textarea
                        {...register("content", {
                            required: "Privacy and Policy content is required"
                        })}
                        rows={12}
                        className='w-full border border-border-color rounded-lg py-3 px-4 appearance-none outline-none text-title resize-y'
                        defaultValue={data?.data?.content}
                        placeholder='Write privacy and policy here...'
                    />
                    
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.content.message}
                        </p>
                    )}
                </div>

                <button
                    type='submit'
                    disabled={isLoading}
                    className='bg-common text-main py-2 rounded-lg w-full hover:bg-opacity-90 transition-colors disabled:opacity-50'
                >
                    {isLoading ? <Loading /> : "Save Changes"}
                </button>
            </form>
        </div>
    )
}

export default PrivacyAndPolicy