import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Search,
} from "lucide-react";
import { useProgrammeName } from "@/hooks/use-programme-name";
import { LoadingSkeleton } from "./loading";

export const StudentResultCard = ({
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


  if (isLoading) {
    return (
      <LoadingSkeleton />
    );
  }


  if (!results || results.length === 0) {
    if (!hasSearched) {
            return 
    }
    return (
      <div className="w-full border rounded-lg overflow-hidden bg-muted/30 col-span-full">
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

  // Map all results
  return (
    <>
      {results.map((student, index) => (
        <motion.div
          key={student._id || index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.08 }}
          className="w-full"
        >
          <Card
            onClick={() => router.push(`/dashboard/${student.enrollment}`)}
            className="p-0 group border transition-all hover:shadow-md cursor-pointer outline-2 hover:outline-primary shadow-2xs"
          >
            <div className="flex items-center gap-3 p-4">
              <div className="size-12 rounded-lg bg-muted border flex items-center justify-center text-sm font-semibold text-muted-foreground">
                {student.name?.[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium tracking-tight line-clamp-1">
                    {student.name}
                  </h3>
                </div>
                <div className="flex gap-x-2">
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {getShortForm(student.programme)}
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-muted text-muted-foreground"
                  >
                    {student.batch}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">CGPA</p>
                <p className="text-lg tracking-wide text-pretty font-bold">
                  {student.cgpa ? student.cgpa.toFixed(2) : "N/A"}
                </p>
              </div>
            </div>

            <CardContent className="py-6">
              <div className="flex justify-between px-3.5">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Enrollment ID
                  </p>
                  <p className="font-mono text-sm font-medium">
                    {student.enrollment}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Programe Code
                  </p>
                  <p className="font-mono text-sm font-medium">
                    {student.prgCode || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>

            <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-muted-foreground">
              <span>View result</span>
              <span className="group-hover:opacity-60 group-hover:scale-105">
                <ChevronRight />
              </span>
            </div>
          </Card>
        </motion.div>
      ))}
    </>
  );
};
