"use client"
import { termsServiceValidationSchema } from '@/validation/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

type TInputs = z.infer<typeof termsServiceValidationSchema>

const TermsAndService = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
        defaultValues: {
            termsAndService: `Our app is designed to bridge the communication gap between English and Marshallese speakers. With a focus on both medical and everyday language, it provides fast, accurate, and user-friendly translations that help users understand and express themselves clearly. By combining a verified translation database with advanced AI suggestions, the platform ensures reliability and continuous improvement. Whether for healthcare professionals, students, or daily conversations, our goal is to make bilingual communication effortless and accessible to everyone while preserving the richness of the Marshallese language.`
        },
        resolver: zodResolver(termsServiceValidationSchema)
    });

    const onSubmit: SubmitHandler<TInputs> = (data) => {
        console.log("Updated Terms & Service:", data.termsAndService);
    }

    return (
        <div>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>
                        Terms and Service
                    </label>
                    
                    <textarea
                        {...register("termsAndService")}
                        rows={12}
                        className='w-full border border-border-color rounded-lg py-3 px-4 appearance-none outline-none text-title resize-y'
                        placeholder='Write terms and service here...'
                    />
                    
                    {errors.termsAndService && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.termsAndService.message}
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

export default TermsAndService