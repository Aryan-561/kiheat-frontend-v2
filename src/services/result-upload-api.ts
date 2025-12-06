import axiosInstance from "@/lib/axios-instance"

export const UploadResultAPI = {
    uploadResult: async (file: any) => {
        const { data } = await axiosInstance.post('/result/upload', file)
        return data
    },

    uplaodReappearResult: async (file: any) => {
        const { data } = await axiosInstance.post('/result/reappear/upload', file)
        return data
    }
}