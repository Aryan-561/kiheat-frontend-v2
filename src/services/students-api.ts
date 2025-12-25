import axiosInstance from "@/lib/axios-instance"

export const StudentsAPI = () => ({
    getStudentByName: async ({ name, programme }: { name: string, programme: string }) => {
        if(programme == "all"){
            const { data } = await axiosInstance.get(`/student/search-by-name?name=${name}`)
            return data
        }   
        else {
            const { data } = await axiosInstance.get(`/student/search-by-name?name=${name}&programme=${programme}`)
            return data
        }
    },

    getStudentByEnrollment: async ({ id }: { id: string }) => {
        const { data } = await axiosInstance.get(`/student/${id}`)
        return data
    },

    getTopStudents: async () => {
        const { data } = await axiosInstance.get(`/student/top-students`)
        return data
    },

    getStudentMarksheetBysemester: async ({ id, semester }: { id: string, semester?: number }) => {
        if (semester){
        const { data } = await axiosInstance.get(`/student/marksheet/${id}?semester=${semester}`)
        return data
        } else {
        const { data } = await axiosInstance.get(`/student/marksheet/${id}`)
        return data
        }
    }
})