import { marksheetSemesterColumns, marksheetSubjectColumns } from "@/components/column"
import { DataTable } from "@/components/data-table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useStudentMarksheetBySemester } from "@/hooks/use-student"



interface MarksheetProps {
    studentData: any,
    selectedSemester: number | undefined,
    dialogOpen: boolean,
    setDialogOpen: (open: boolean) => void,
    onClose: () => void,
}

export function Marksheet( {studentData, selectedSemester, dialogOpen=false,  setDialogOpen,onClose}: MarksheetProps) {

    const {data, isLoading} = useStudentMarksheetBySemester(studentData?.enrollment, selectedSemester ?? null);
    console.log(dialogOpen)
    return(
        <>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>

                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Student Marksheet</DialogTitle>
                            <DialogDescription>
                                {studentData?.name} ({studentData?.enrollment})
                            </DialogDescription>
                        </DialogHeader>
                        {isLoading ? (
                            <div className="text-center p-4">Loading...</div>
                        ) : selectedSemester ? (
                            <DataTable columns={marksheetSubjectColumns} data={data?.data.subjects} />
                                
                        ) : (
                            <DataTable columns={marksheetSemesterColumns} data={data?.data} />
                        )}
                </DialogContent>
         
            </Dialog>
        </>
    )
}