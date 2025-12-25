import { useQuery } from "@tanstack/react-query";
import { StudentsAPI } from "../services/students-api";


export const useStudentByName = (name: string, programme: string) => { 
    return useQuery({
        queryKey: ['student-by-name', name, programme],
        queryFn: () => StudentsAPI().getStudentByName({ name, programme }),
        enabled: !!name && !!programme,
        
        
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
export const useStudentMarksheetBySemester = (id: string, semester: number | null = null) => {
    return useQuery({
        queryKey: ['student-marksheet-by-semester', id, semester],
        queryFn: () => StudentsAPI().getStudentMarksheetBysemester({ id, semester: semester ?? undefined }),
        enabled: !!id,
    });
}
