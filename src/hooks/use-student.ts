import { useQuery } from "@tanstack/react-query";
import { StudentsAPI } from "../services/students-api";


export const useStudentByName = (name: string, course: string) => { 
    return useQuery({
        queryKey: ['student-by-name', name, course],
        queryFn: () => StudentsAPI().getStudentByName({ name, course }),
        enabled: !!name && !!course,
    });
}
export const useStudentByEnrollment = (id: string) => {
    return useQuery({
        queryKey: ['student-by-enrollment', id],
        queryFn: () => StudentsAPI().getStudentByEnrollment({ id }),
        enabled: !!id,
    });
}
export const useTopStudents = () => {
    return useQuery({
        queryKey: ['top-students'],
        queryFn: () => StudentsAPI().getTopStudents(),
    });
}
export const useStudentMarksheetBySemester = (id: string, semester: number) => {
    return useQuery({
        queryKey: ['student-marksheet-by-semester', id, semester],
        queryFn: () => StudentsAPI().getStudentMarksheetBysemester({ id, semester }),
        enabled: !!id && semester > 0,
    });
}
