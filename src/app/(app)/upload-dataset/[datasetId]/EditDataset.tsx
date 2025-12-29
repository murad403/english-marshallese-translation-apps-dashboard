"use client"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useParams } from "next/navigation";
import { useGetDatasetQuery } from "@/redux/features/dataset/dataset.api";

type TranslationFormData = {
  category: string;
  english_text: string;
  marshallese_text: string;
  description: string;
}

const EditDataset = () => {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm<TranslationFormData>();
    const {datasetId} = useParams();
    const {data} = useGetDatasetQuery({page: 1});
    console.log(typeof datasetId)
    // const currentDataset = 
    // console.log(datasetId);

    const onSubmit = (data: TranslationFormData) => {
        console.log("Form submitted:", data);
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
                                <SelectItem value="body parts">Body Parts</SelectItem>
                                <SelectItem value="question">Question</SelectItem>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="medication">Medication</SelectItem>
                                <SelectItem value="common">Common</SelectItem>
                                <SelectItem value="symptoms">Symptoms</SelectItem>
                                <SelectItem value="emergency">Emergency</SelectItem>
                                <SelectItem value="medical staff">Medical Staff</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Source Text */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">English</label>
                        <input
                            {...register("english_text", { required: true })}
                            placeholder="I think my arm is broken"
                            className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                        />
                    </div>

                    {/* Known Translation */}
                    <div className="bg-[#E9EFFA] p-5 rounded-xl">
                        <label className="text-header font-medium text-subheading">Marshallese</label>
                        <input
                            {...register("marshallese_text")}
                            placeholder="Write here"
                            className="w-full py-3 rounded-lg outline-none placeholder:text-title px-4 bg-[#BCCCEE] text-title text-normal mt-3"
                        />
                    </div>
                </div>

                {/* Add context or notes */}
                <div className="bg-[#E9EFFA] p-5 rounded-xl">
                    <label className="text-header font-medium text-subheading">Add context or notes</label>
                    <textarea
                        {...register("description")}
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
                        Save Now
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditDataset
