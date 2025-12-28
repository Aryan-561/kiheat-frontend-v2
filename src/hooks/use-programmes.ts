import { ProgrammesAPI } from "@/services/programmes-api"
import { useQuery } from "@tanstack/react-query"

export const useProgrammes = () => {
    return useQuery({
        queryKey: ['programmes'],
        queryFn: () => ProgrammesAPI().getAllProgrammes()
    })
}

export const useProgrammeBatches = (prgCode: string) => {
    return useQuery({
        queryKey: ['programme-batches', prgCode],
        queryFn: () => ProgrammesAPI().getProgrammeBatches(prgCode),
        enabled: !!prgCode
    })
}

export const useProgrammeSemesters = (prgCode: string, batch: string) => {
    return useQuery({
        queryKey: ['programme-semesters', prgCode, batch],
        queryFn: () => ProgrammesAPI().getProgrammeSemesters(prgCode, batch),
        enabled: !!prgCode && !!batch
    })
}

export const useProgrammeResult = (
    prgCode: string, 
    batch: string, 
    semester?: number // Add this parameter
) => {
    const isOverall = semester === undefined || semester === null;
    
    return useQuery({
        queryKey: isOverall 
            ? ['programme-result', prgCode, batch] 
            : ['programme-result-by-semester', prgCode, batch, semester],
        queryFn: async () => {
            if (isOverall) {
                return ProgrammesAPI().getProgrammeBatchResult(prgCode, batch);
            }
            return ProgrammesAPI().getProgrammeResultBySemester(prgCode, batch, semester);
        },
        enabled: !!prgCode && !!batch && (isOverall || semester > 0)
    });
};


export const useBatchEnrollment = (prgCode: string, batch: string) => {
    return useQuery({
        queryKey: ['batch-enrollment', prgCode, batch],
        queryFn: () => ProgrammesAPI().getBatchEnrollment(prgCode, batch),
        enabled: !!prgCode && !!batch
    })
}
