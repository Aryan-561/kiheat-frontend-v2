"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useProgrammeName } from "@/hooks/use-programme-name";
import  { LoadingTable } from "./loading";

export const StudentResultsTable = ({
    results,
    isLoading,
    hasSearched,
}: {
    results: any[];
    isLoading: boolean;
    hasSearched?: boolean;
}) => {
    const router = useRouter();
    const { getShortForm } = useProgrammeName();

    const handleRowClick = (enrollment: string) => {
        router.push(`/dashboard/${enrollment}`);
    };

    if (isLoading) {
        return <LoadingTable />;
    }

    if (!results || results.length === 0) {
        if (!hasSearched) {
            return <div>Start Searching with name or enrollment</div>
        }
        return (
            <div className="w-full border rounded-lg overflow-hidden bg-muted/30">
                <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                    <div className="rounded-full bg-muted/60 p-4">
                        <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                            No students found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Try searching with different criteria
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full border rounded-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="hover:bg-muted/50">
                        <TableHead className="text-sm font-semibold px-12">Name</TableHead>
                        <TableHead className="text-sm font-semibold">Enrollment ID</TableHead>
                        <TableHead className="text-sm font-semibold">Programme</TableHead>
                        <TableHead className="text-sm font-semibold">Batch</TableHead>
                        <TableHead className="text-sm font-semibold text-right">CGPA</TableHead>
                        <TableHead className="text-right text-sm font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="min-h-screen">

                    {
                        results.map((student, index) => (
                            <motion.tr
                                key={student._id || index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                onClick={() => handleRowClick(student.enrollment)}
                                className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                            >
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center font-semibold text-sm text-primary">
                                            {student.name?.[0]?.toUpperCase()}
                                        </div>
                                        <span className="font-medium text-foreground truncate">
                                            {student.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors group/copy w-fit"
                                       
                                    >
                                        <span>{student.enrollment}</span>
                                      
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className="text-sm text-muted-foreground">
                                        {getShortForm(student.programme)}
                                    </span>
                                </TableCell>

                                <TableCell className="py-4">
                                    <Badge variant="secondary" className="text-xs">
                                        {student.batch}
                                    </Badge>
                                </TableCell>

                                <TableCell className="py-4 text-right">
                                    <span className=" text-lg text-primary">
                                        {student.cgpa ? student.cgpa.toFixed(2) : "N/A"}
                                    </span>
                                </TableCell>

                                <TableCell className="py-4 text-right">
                                    <Button
                                        size="sm"
                                        variant="link"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRowClick(student.enrollment);
                                        }}
                                        className="text-xs"
                                    >
                                        <span className="p-1 animate-pulse bg-primary  rounded-full">

                                        </span>
                                        View
                                    </Button>
                                </TableCell>
                            </motion.tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};
