"use client"
import { privacyPolicyValidationSchema } from '@/validation/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

type TInputs = z.infer<typeof privacyPolicyValidationSchema>

const PrivacyAndPolicy = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
        defaultValues: {
            privacyAndPolicy: `Our app is designed to bridge the communication gap between English and Marshallese speakers. With a focus on both medical and everyday language, it provides fast, accurate, and user-friendly translations that help users understand and express themselves clearly. By combining a verified translation database with advanced AI suggestions, the platform ensures reliability and continuous improvement. Whether for healthcare professionals, students, or daily conversations, our goal is to make bilingual communication effortless and accessible to everyone while preserving the richness of the Marshallese language.`
        },
        resolver: zodResolver(privacyPolicyValidationSchema)
    });

    const onSubmit: SubmitHandler<TInputs> = (data) => {
        console.log("Updated privacy policy:", data.privacyAndPolicy);
    }

    return (
        <div>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>
                        Privacy and Policy
                    </label>
                    
                    <textarea
                        {...register("privacyAndPolicy")}
                        rows={12}
                        className='w-full border border-border-color rounded-lg py-3 px-4 appearance-none outline-none text-title resize-y'
                        placeholder='Write terms and service here...'
                    />
                    
                    {errors.privacyAndPolicy && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.privacyAndPolicy.message}
                        </p>
                    )}
                </div>

                <button
                    type='submit'
                    className='bg-common text-main py-2 rounded-lg w-full'
                >
                    Save Changes
                </button>
            </form>
        </div>
    )
}

export default PrivacyAndPolicy