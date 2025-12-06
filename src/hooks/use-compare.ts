import { CompareAPI } from "@/services/compare-api";
import { useQuery } from "@tanstack/react-query";

export const useCompare = (studentone: string, studenttwo: string) => {
    return useQuery({
        queryKey: ['compare-programme-results', studentone, studenttwo],
        queryFn: () => CompareAPI().compareResults({ studentone, studenttwo }),
        enabled: !!studentone && !!studenttwo
    });
}

export const useEnrollmentOfBatch = (prgCode: string, batch: string) => {
    return useQuery({
        queryKey: ['compare-enrollment-of-batch', prgCode, batch],
        queryFn: () => CompareAPI().getEnrollmentOfBatch(prgCode, batch),
        enabled: !!prgCode && !!batch
    });
}