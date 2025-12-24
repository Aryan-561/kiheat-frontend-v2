import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
export type StudentResult = {
    _id: string;
    enrollment: string;
    name: string;
    sid: string;
    schemeID: string;
    instCode: number;
    batch: string;
    prgCode: string;
    programme: string;
    semestersCount?: number;
    totalMarks: number;
    maxMarks: number;
    totalCredits: number;
    maxCredits: number;
    cgpa?: number;
    sgpa?: number;
    sem?: number;
    percentage: number;
    rank: number;
}

export type Subject={
        paperId: string;
        paperCode: string;
        paperName: string;
        type: string;
        credits: number;
        internal: number;
        external: number;
        total: number;
        reappear: boolean;
        backlog: boolean;
        grade: string;
}

export type SemsterResult = {
    semester: number;
    totalMarks: number;
    maxMarks: number;
    percentage: number;
    sgpa: number;
}

export const columns : ColumnDef<StudentResult>[] = [

   

    {
        accessorKey: 'enrollment',
        header: ({column})=>{
            return(
                <div className="flex justify-center">
                    <Button variant="ghost"
                     size="sm"
                     onClick={()=> column.toggleSorting(column.getIsSorted() === "asc")}
                     >
                        Enrollment No.
                        <ArrowUpDown className="size-4 text-gray-500"/>
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue("enrollment")}</div>
        },
        
    },

    {
        accessorKey: 'name',
       header: ({column})=>{
            return(
                <div className="flex justify-start">
                    <Button variant="ghost"
                     size="sm"
                     onClick={()=> column.toggleSorting(column.getIsSorted() === "asc")}
                     >
                        Name
                        <ArrowUpDown className="size-4 text-gray-500"/>
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="">{row.getValue("name")}</div>
        },
        
    },

    {
        id: 'marks',
        header: () => <div className="text-center">Marks</div>,
        cell: ({ row }) => {
            const totalMarks = row.original.totalMarks;
            const maxMarks = row.original.maxMarks;
            return <div className="text-center">{`${totalMarks} / ${maxMarks}`}</div>;
        }
    },

    {
        accessorKey: 'percentage',
        header: ({column})=>{
            return(
                <div className="flex justify-center">
                    <Button variant="ghost"
                     size="sm"
                     onClick={()=> column.toggleSorting(column.getIsSorted() === "asc")}
                     >
                        Percentage (%)
                        <ArrowUpDown className=" size-4 text-gray-500"/>
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue("percentage")}</div>
        },
    },

    {
        id: 'gpa',
        header: ({ table }) => {
            const firstRow = table.getRowModel().rows[0]?.original;
            const label = firstRow?.cgpa ? 'CGPA' : firstRow?.sgpa ? 'SGPA' : 'GPA';
            return <div className="text-center">{label}</div>;
        },
        cell: ({ row }) => {
            const cgpa = row.original.cgpa;
            const sgpa = row.original.sgpa;
            const value = cgpa ? cgpa.toFixed(2) : sgpa ? sgpa.toFixed(2) : '-';
            return <div className="text-center">{value}</div>;
        }
    },

     {
        accessorKey: 'rank',
        header: ({column})=>{
            return(
                <div className="flex justify-center">
                    <Button variant="ghost"
                     size="sm"
                     onClick={()=> column.toggleSorting(column.getIsSorted() === "asc")}
                     >
                        Rank
                        <ArrowUpDown className="size-4 text-gray-500"/>
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue("rank")}</div>
        },
        
    },


]

export  const marksheetSubjectColumns : ColumnDef<Subject>[] = [

    {
        accessorKey: 'paperCode',
        header: 'Paper Code',
    },
    {
        accessorKey: 'paperName',
        header: 'Paper Name', 
        cell: ({ row }) => {
            const paperName = row.original.paperName;
            const credits = row.original.credits;
            return <div className="text-center">{`${paperName} (${credits})`}</div>;
        }  
    },

    {
        accessorKey: 'total',
        header: 'marks',
        cell: ({ row }) => {
            const total = row.original.total;
            const grade = row.original.grade;
            return <div className="text-center">{`${total}(${grade})`}</div>;
        }  
    },

    {
        id:'internalExternal',
        header:'Int|Ext',
        cell: ({ row }) => {
            const internal = row.original.internal;
            const external = row.original.external;
            return <div className="text-center">{`${internal}|${external}`}</div>;
        }  
    }


]


export const marksheetSemesterColumns : ColumnDef<SemsterResult>[] = [
    {
        accessorKey: 'semester',
        header: 'Semester',
    },

    

    {
        id: 'marks',
        header: () => <div className="text-center">Marks</div>,
        cell: ({ row }) => {
            const totalMarks = row.original.totalMarks;
            const maxMarks = row.original.maxMarks;
            return <div className="text-center">{`${totalMarks} / ${maxMarks}`}</div>;
        }
    },

    {
        accessorKey: 'percentage',
        header: 'Percentage (%)',
    },

    {
        accessorKey: 'sgpa',
        header: 'SGPA',
    }

]