"use client";

import { useProgrammeResult,  useProgrammeSemesters } from "@/hooks/use-programmes";
import { columns } from "../../../../components/column";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Marksheet } from "@/components/marksheet";
import { useParams } from "next/navigation";


export default  function Page(){

    const params = useParams();
    const prgCode = params.prgCode as string;
    const batch = params.batch as string;

    const [selectedSemester, setSelectedSemester] =  useState<number | undefined>(undefined);
    const [studentData, setStudentData] = useState<Record<string, any> | null>(null);
    
    const {data, isLoading, error} = useProgrammeResult(prgCode, batch, selectedSemester)
    const [dialogOpen, setDialogOpen] = useState(!!studentData)

    const {data:semesters} = useProgrammeSemesters(prgCode, batch)
    
    if (isLoading) {
        return <div className="p-8">Loading...</div>
    }

    if (error) {
        return <div className="p-8">Error loading data: {error.message}</div>
    }
    
  ;
    return(
        <div className="p-8 w-[75vw] mx-auto">
             
            <div className="flex gap-2 mb-6 flex-wrap">
                <Button
                    variant={selectedSemester === undefined ? 'default' : 'outline'}
                    onClick={() => setSelectedSemester(undefined)}
                    className="rounded-full"
                >
                    Overall
                </Button>
                
                {semesters?.data?.map((sem: number) => (
                    <Button
                        key={sem}
                        variant={selectedSemester === sem ? 'default' : 'outline'}
                        onClick={() => setSelectedSemester(sem)}
                        className="rounded-full"
                    >
                        Semester {sem}
                    </Button>
                ))}
            </div>
            <DataTable columns={columns} data={data?.data} isFiltering={true} filteringOption="name" handleRowClick={(studentData)=>{ setStudentData(studentData); setDialogOpen(true);} } />
            <Marksheet 
                studentData={studentData} 
                selectedSemester={selectedSemester} 
                dialogOpen={dialogOpen} 
                setDialogOpen  ={ setDialogOpen}
               
            />
        </div>
    )
}