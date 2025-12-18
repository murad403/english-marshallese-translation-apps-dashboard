"use client"
import { aboutValidationSchema } from '@/validation/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

type TInputs = z.infer<typeof aboutValidationSchema>

const About = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
        defaultValues: {
            about: `Our app is designed to bridge the communication gap between English and Marshallese speakers. With a focus on both medical and everyday language, it provides fast, accurate, and user-friendly translations that help users understand and express themselves clearly. By combining a verified translation database with advanced AI suggestions, the platform ensures reliability and continuous improvement. Whether for healthcare professionals, students, or daily conversations, our goal is to make bilingual communication effortless and accessible to everyone while preserving the richness of the Marshallese language.`
        },
        resolver: zodResolver(aboutValidationSchema)
    });

    const onSubmit: SubmitHandler<TInputs> = (data) => {
        console.log("Updated Terms & Service:", data.about);
    }

    return (
        <div>
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className='block font-medium text-normal mb-2 text-header'>
                        About
                    </label>
                    
                    <textarea
                        {...register("about")}
                        rows={12}
                        className='w-full border border-border-color rounded-lg py-3 px-4 appearance-none outline-none text-title resize-y'
                        placeholder='Write terms and service here...'
                    />
                    
                    {errors.about && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.about.message}
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

export default About