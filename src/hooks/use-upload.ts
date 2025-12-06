import { UploadResultAPI } from "@/services/result-upload-api"
import { useMutation } from "@tanstack/react-query"

export const  useUpload =(file : any) => {
    return useMutation({
        mutationKey: ['upload-result', file],
        mutationFn: async () => {   
            return UploadResultAPI.uploadResult(file)
        }
    })
}

export const useReappearUpload = (file : any) => {
    return useMutation({
        mutationKey: ['upload-reappear-result', file],
        mutationFn: async () => {   
            return UploadResultAPI.uplaodReappearResult(file)
        }
    })
}