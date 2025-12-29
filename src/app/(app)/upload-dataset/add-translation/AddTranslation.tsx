/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAddTranslationMutation, useGetCategoriesQuery } from "@/redux/features/dataset/dataset.api";
import { TCategory } from "@/types/alltypes";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading";


type TranslationFormData = {
  category: string;
  english_text: string;
  marshallese_text: string;
  context: string;
}

const AddTranslation = () => {
    const {data} = useGetCategoriesQuery(undefined);
    const categories = data?.data?.categories;
    const [addTranslation, {isLoading}] = useAddTranslationMutation();

    const { register, handleSubmit, setValue, reset, formState: { errors }} = useForm<TranslationFormData>();

    const onSubmit = async(data: TranslationFormData) => {
        try {
            const result = await addTranslation({...data, category: Number(data?.category)}).unwrap();
            toast.success(result?.message);
            reset();
        } catch (error: any) {
            // console.log(error);
            toast.error("Please try again")
        }
    }

    return (
        <div className='bg-main rounded-xl p-5'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Type / Category */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">
                            Type / Category
                        </label>
                        <Select 
                            onValueChange={(value) => setValue("category", value, { 
                                shouldValidate: true 
                            })}
                        >
                            <SelectTrigger className="bg-[#BCCCEE] mt-3 w-full text-title text-normal">
                                <SelectValue placeholder="Select One" />
                            </SelectTrigger>
                            <SelectContent className='text-normal'>
                                {
                                    categories?.map((category: TCategory) =>
                                        <SelectItem 
                                            key={category?.id} 
                                            value={String(category?.id)} // number কে string এ convert করুন
                                        >
                                            {category?.name}
                                        </SelectItem>
                                    )
                                }
                            </SelectContent>
                        </Select>
                        {/* Hidden input for validation */}
                        <input
                            type="hidden"
                            {...register("category", { 
                                required: "Category is required" 
                            })}
                        />
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    {/* Source Text */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">
                            English
                        </label>
                        <input
                            {...register("english_text", { 
                                required: "English text is required" 
                            })}
                            placeholder="English text write here"
                            className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                        />
                        {errors.english_text && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.english_text.message}
                            </p>
                        )}
                    </div>

                    {/* Known Translation */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">
                            Marshallese
                        </label>
                        <input
                            {...register("marshallese_text", { 
                                required: "Marshallese text is required" 
                            })}
                            placeholder="Marshallese text write here"
                            className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                        />
                        {errors.marshallese_text && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.marshallese_text.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Add context or notes */}
                <div className="bg-[#E9EFFA] p-5 rounded-xl">
                    <label className="text-header font-medium text-subheading">
                        Add context or notes
                    </label>
                    <textarea
                        {...register("context", { 
                            required: "Description is required" 
                        })}
                        placeholder="Enter your context or notes"
                        rows={6}
                        className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                    />
                    {errors.context && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.context.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="text-main text-normal font-medium bg-common px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                       {
                        isLoading ? <Loading/> : "Add New"
                       }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTranslation