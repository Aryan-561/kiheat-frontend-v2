import axiosInstance from "@/lib/axios-instance"

export const ProgrammesAPI = () => ({
    getAllProgrammes: async () => {
        const { data } = await axiosInstance.get(`/programme/`)
        return data
    },
    getProgrammeBatches: async (prgCode: string) => {
        const { data } = await axiosInstance.get(`/programme/batch/${prgCode}`)
        return data
    },

    getProgrammeSemesters: async (prgCode: string, batch: string) => {
        const { data } = await axiosInstance.get(`/programme/semester/${prgCode}/${batch}`)
        return data
    },

    getProgrammeBatchResult: async (prgCode: string, batch: string) => {
        const { data } = await axiosInstance.get(`/programme/result/${prgCode}/${batch}`)
        return data
    },

    getProgrammeResultBySemester: async (prgCode: string, batch: string, semester: number) => {
        const { data } = await axiosInstance.get(`/programme/result/${prgCode}/${batch}/${semester}`)
        return data
    },

    getBatchEnrollment: async (prgCode: string, batch: string) => {
        const { data } = await axiosInstance.get(`/programme/${prgCode}/${batch}`)
        return data
    }
})