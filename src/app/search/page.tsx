"use client";
import { useState, useEffect } from "react";
import {  AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Grid3x2,
  Send,
  TableProperties,
} from "lucide-react";
import { useStudentByEnrollment, useStudentByName } from "@/hooks/use-student";
import { useProgrammes } from "@/hooks/use-programmes";
import { useProgrammeName } from "@/hooks/use-programme-name";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import Loading from "@/components/loading";
import { StudentResultCard } from "@/components/search-student-card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { StudentResultsTable } from "@/components/search-student-table";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function SearchPage() {
  const { getShortForm } = useProgrammeName();
  const router = useRouter();
  const isMobile = useIsMobile()

  const [programme, setProgramme] = useState<string>("");
  const [queryName, setQueryName] = useState<string>("");
  const [queryNumber, setQueryNumber] = useState<string>("");
  const [enrollmentError, setEnrollmentError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const Namevalue = useDebounce(queryName, 500);
  const numberValue = useDebounce(queryNumber, 300);

  const { data: programmes, isLoading: loadingProgrammes } = useProgrammes();
  const { data: studentByName, isLoading: loadingName } = useStudentByName(Namevalue, programme);
  const { data: studentByEnrollment, isLoading: loadingEnrollment ,isSuccess} = useStudentByEnrollment(numberValue.length === 11 ? numberValue : "");

  const programmeData = programmes?.data || [];
  const results =
    queryNumber.length > 0
      ? studentByEnrollment
        ? [studentByEnrollment.data]
        : []
      : studentByName?.data ?? [];


  const isLoading = loadingName || loadingEnrollment;

  const [view, setView] = useState<'card' | 'table'>('card');

  useEffect(() => {
  
    if (isMobile) {
      setView('card');
    } else {
      const storedView = localStorage.getItem('view');
      setView(storedView === 'table' ? 'table' : 'card');
    }
  }, [isMobile]);

  // Auto navigate when enrollment search succeeds
  // useEffect(() => {
  //   if (isSuccess && studentByEnrollment?.data) {
  //     router.push(`/dashboard/${studentByEnrollment.data.enrollment}`);
  //   }
  // }, [isSuccess, studentByEnrollment, router]);



  return (
    <section className="container  mx-auto p-4 bg-background min-h-screen flex flex-col items-center pt-24">

      {/* Header Text */}
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Student Search</h1>
        <p className="text-muted-foreground">Find academic records by name or enrollment.</p>
      </div>

      {/* Input Group */}
      <div className="flex w-full max-w-xl shadow-sm">
        <div className="sm:w-[180px]  w-fit h-fit shrink-0">
          <Select disabled={queryNumber.length > 0} name="programme" onValueChange={(value) => setProgramme(value)}>
            <SelectTrigger className="w-full rounded-r-none border-r-0 focus:ring-0">
              <SelectValue placeholder="Programme" />
            </SelectTrigger>
            <SelectContent>
              {loadingProgrammes ? (
                <div className="p-2"><Loading /></div>
              ) : (
                programmeData.map((prog: any, key: number) => (
                  <SelectItem key={key} value={getShortForm(prog.name)}>
                    {getShortForm(prog.name)}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <Input
          type="text"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setQueryName("");
              setQueryNumber("");
              setEnrollmentError("");
              setHasSearched(false);
            } else if (isNaN(Number(value))) {
              setQueryName(value);
              setQueryNumber("");
              setEnrollmentError("");
              setHasSearched(true);
            } else {
              if (value.length > 11) return;
              setQueryNumber(value);
              setQueryName("");
              if (value.length < 11) {
                setEnrollmentError(`Must be 11 digits (${value.length}/11)`);
              } else {
                setEnrollmentError("");
              }
              setHasSearched(true);
            }
          }}
          placeholder="Enter name or enrollment..."
          className="rounded-none focus-visible:ring-0 border-l border-r-0"
        />

        <Button
          type="submit"
          className="rounded-l-none px-6"
          disabled={isLoading || (queryNumber.length > 0 && queryNumber.length !== 11)}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Error State */}
      <div className="h-6 mt-2">
        {enrollmentError && (
          <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
            {enrollmentError}
          </p>
        )}
      </div>

      <Separator className="my-3 w-full" />
      {results.length > 0 && <div className="flex justify-between items-center w-full mb-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {results.length} result{results.length !== 1 ? 's' : ''} found in {programme || "All"} Programme
          </p>
        </div>
        <Tabs value={view} onValueChange={(value) => {
          setView(value as 'card' | 'table');
          localStorage.setItem('view', value);
        }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="w-full" value="card"><Grid3x2 /></TabsTrigger>
            <TabsTrigger disabled={isMobile} className="w-full" value="table"><TableProperties /></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      }

      {
        view === 'card' && <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 pb-20">
          <AnimatePresence mode="popLayout">
            <StudentResultCard
              results={results}
              isLoading={isLoading}
              hasSearched={hasSearched}
            />
          </AnimatePresence>
        </div>
      }
      {
        !isMobile && view === 'table' && (
          <StudentResultsTable results={results} isLoading={isLoading} hasSearched={hasSearched} />
        )
      }
    </section>
  );
}