import axiosInstance from "@/lib/axios-instance"

export const HealhthcheckAPI = () => ({
    checkHealth: async () => {
        const { data } = await axiosInstance.get(`/healthcheck/`)
        return data
    }
})