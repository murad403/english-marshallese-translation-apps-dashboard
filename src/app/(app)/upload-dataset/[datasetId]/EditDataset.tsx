/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useParams, useRouter } from "next/navigation";
import { useGetCategoriesQuery, useGetTranslationDetailsQuery, useUpdateTranslationMutation } from "@/redux/features/dataset/dataset.api";
import { TCategory } from "@/types/alltypes";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading";

type TranslationFormData = {
    category: string;
    english_text: string;
    marshallese_text: string;
    context: string;
}

const EditDataset = () => {
    const { data: categoriesData } = useGetCategoriesQuery(undefined);
    const categories = categoriesData?.data?.categories;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TranslationFormData>();
    const { datasetId } = useParams();
    const { data } = useGetTranslationDetailsQuery({ id: datasetId }, { skip: !datasetId });
    const [updateTranslation, {isLoading}] = useUpdateTranslationMutation();
    const router = useRouter();

    // Set all default values when data loads
    useEffect(() => {
        if (data?.data) {
            setValue("category", String(data.data.category));
            setValue("english_text", data.data.english_text || "");
            setValue("marshallese_text", data.data.marshallese_text || "");
            setValue("context", data.data.context || "");
        }
    }, [data, setValue]);

    const onSubmit = async(formData: TranslationFormData) => {
        try {
            const result = await updateTranslation({
                id: datasetId,
                data: {
                    ...formData,
                    category: Number(formData.category)
                }
            }).unwrap();
            toast.success(result?.message || "Translation updated successfully");
            router.push("/upload-dataset");
        } catch (error: any) {
             toast.error(error?.data?.message || "Please try again")
        }
    }

    return (
        <div className='bg-main rounded-xl p-5'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Type / Category */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">Type / Category</label>
                        <Select
                            value={data?.data?.category ? String(data.data.category) : undefined}
                            onValueChange={(value) => setValue("category", value, {
                                shouldValidate: true
                            })}
                        >
                            <SelectTrigger className="bg-[#BCCCEE] mt-3 w-full text-title text-normal">
                                <SelectValue placeholder={data?.data?.category_details?.name || "Select One"} />
                            </SelectTrigger>
                            <SelectContent className='text-normal'>
                                {
                                    categories?.map((category: TCategory) =>
                                        <SelectItem
                                            key={category?.id}
                                            value={String(category?.id)}
                                        >
                                            {category?.name}
                                        </SelectItem>
                                    )
                                }
                            </SelectContent>
                        </Select>
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
                        <label className="text-header font-medium text-subheading">English</label>
                        <input
                            {...register("english_text", { 
                                required: "English text is required" 
                            })}
                            defaultValue={data?.data?.english_text}
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
                        <label className="text-header font-medium text-subheading">Marshallese</label>
                        <input
                            {...register("marshallese_text", {
                                required: "Marshallese text is required"
                            })}
                            defaultValue={data?.data?.marshallese_text}
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
                    <label className="text-header font-medium text-subheading">Add context or notes</label>
                    <textarea
                        {...register("context", {
                            required: "Context is required"
                        })}
                        defaultValue={data?.data?.context}
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
                        disabled={isLoading}
                        className="text-main text-normal font-medium bg-common px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? <Loading/> : "Save Now"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditDataset