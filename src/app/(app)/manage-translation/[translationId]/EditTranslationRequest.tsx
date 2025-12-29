/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useParams, useRouter } from "next/navigation"
import { useGetCategoriesQuery } from "@/redux/features/dataset/dataset.api"
import { TCategory } from "@/types/alltypes"
import { useGetSubmissionDetailsQuery, useUpdateSubmissionMutation } from "@/redux/features/translation/translation.api"
import Loading from "@/components/shared/Loading"
import { toast } from "react-toastify"

type TranslationFormData = {
    category: string
    source_text: string
    known_translation: string
    notes: string
}

const EditTranslationRequest = () => {
    const { data: categoriesData } = useGetCategoriesQuery(undefined);
    const categories = categoriesData?.data?.categories;
    const { translationId } = useParams();
    const { data } = useGetSubmissionDetailsQuery(translationId);
    const [updateSubmission, { isLoading }] = useUpdateSubmissionMutation();
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TranslationFormData>();

    // Set all default values when data loads
    useEffect(() => {
        if (data?.data) {
            setValue("category", String(data.data.category));
            setValue("source_text", data.data.source_text || "");
            setValue("known_translation", data.data.known_translation || "");
            setValue("notes", data.data.notes || "");
        }
    }, [data, setValue]);

    const onSubmit = async(formData: TranslationFormData) => {
        // console.log(formData);
        try {
            const result = await updateSubmission({
                id: translationId,
                data: {
                    ...formData,
                    category: Number(formData.category)
                }
            }).unwrap();
            toast.success(result?.message);
            router.push("/manage-translation");
        } catch (error: any) {
            toast.error(error?.data?.message || "Please try again");
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
                        <label className="text-header font-medium text-subheading">Source Text</label>
                        <input
                            {...register("source_text", { 
                                required: "Source text is required" 
                            })}
                            defaultValue={data?.data?.source_text}
                            className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                        />
                        {errors.source_text && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.source_text.message}
                            </p>
                        )}
                    </div>

                    {/* Known Translation */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">Known Translation (If any)</label>
                        <input
                            {...register("known_translation")}
                            defaultValue={data?.data?.known_translation}
                            className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                        />
                    </div>
                </div>

                {/* Add context or notes */}
                <div className="bg-[#E9EFFA] p-5 rounded-xl">
                    <label className="text-header font-medium text-subheading">Add context or notes</label>
                    <textarea
                        {...register("notes")}
                        defaultValue={data?.data?.notes}
                        rows={6}
                        className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="text-main text-normal font-medium bg-common px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? <Loading /> : "Update Now"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTranslationRequest