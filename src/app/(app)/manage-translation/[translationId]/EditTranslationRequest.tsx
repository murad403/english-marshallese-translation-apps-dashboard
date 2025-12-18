"use client"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TranslationFormData = {
  category: string
  sourceText: string
  knownTranslation: string
  context: string
}

const EditTranslationRequest = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TranslationFormData>({
        defaultValues: {
            category: "",
            sourceText: "",
            knownTranslation: "",
            context: "",
        },
    })

    const onSubmit = (data: TranslationFormData) => {
        console.log("Form submitted:", data)
        // Handle form submission logic here
    }
    return (
        <div className='bg-main rounded-xl p-5'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Type / Category */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">Type / Category</label>
                        <Select onValueChange={(value) => setValue("category", value)}>
                            <SelectTrigger className="bg-[#BCCCEE] mt-3 w-full text-title text-normal">
                                <SelectValue placeholder="Select One" />
                            </SelectTrigger>
                            <SelectContent className='text-normal'>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="medical">Medical</SelectItem>
                                <SelectItem value="legal">Legal</SelectItem>
                                <SelectItem value="general">General</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Source Text */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">Source Text</label>
                        <input
                            {...register("sourceText", { required: true })}
                            placeholder="Type or Paste source text here"
                            className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                        />
                    </div>

                    {/* Known Translation */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">Known Translation (If any)</label>
                        <input
                            {...register("knownTranslation")}
                            placeholder="Enter your suggested translation"
                            className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                        />
                    </div>
                </div>

                {/* Add context or notes */}
                <div className="bg-[#E9EFFA] p-5 rounded-xl">
                    <label className="text-header font-medium text-subheading">Add context or notes</label>
                    <textarea
                        {...register("context")}
                        placeholder="The human body is a complex and fascinating system made up of billions of cells working together to sustain life. It consists of several major systems, including the skeletal, muscular, circulatory, respiratory, digestive, nervous, and reproductive systems - each performing specific functions essential for survival."
                        rows={6}
                        className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="text-main text-normal font-medium bg-common px-4 py-2 rounded-lg"
                    >
                        Update Now
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTranslationRequest
