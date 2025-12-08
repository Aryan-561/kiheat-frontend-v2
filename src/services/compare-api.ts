import axiosInstance from "@/lib/axios-instance"

export const CompareAPI = () => ({
    compareResults: async ({ studentone, studenttwo }: { studentone: string, studenttwo: string }) => {
        const { data } = await axiosInstance.get(`/compare/${studentone}/${studenttwo}`)
        return data
    },
    getEnrollmentOfBatch: async (prgCode: string, batch: string) => {
        const { data } = await axiosInstance.get(`/compare/enrollments/${prgCode}/${batch}`)
        return data
    }

})