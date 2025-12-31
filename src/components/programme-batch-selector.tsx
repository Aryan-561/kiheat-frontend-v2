import { SelectBatch } from "@/components/select-batch";
import { useProgrammeBatches } from "@/hooks/use-programmes";
import { useProgrammeName } from "@/hooks/use-programme-name";

interface ProgrammeBatchSelectorProps {
    programCode: string;
}

export function ProgrammeBatchSelector({ 
    programCode
}: ProgrammeBatchSelectorProps) {
    const { getFullForm } = useProgrammeName();
    const { data, isLoading, isError } = useProgrammeBatches(programCode);

    if (isLoading) {
        return <div className="p-8">Loading...</div>;
    }

    if (isError) {
        return <div className="p-8">Error loading data.</div>;
    }

    return (
        <div className="p-4 md:p-8   my-4 flex flex-col  items-center mx-2 sm:mx-auto rounded-lg  border border-natural-50  sm:w-[80%]">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
                {getFullForm(programCode)}
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6">
                Programme Code: {programCode}
            </p>
            <div>

            <SelectBatch 
                options={data?.data.map((batch: string) => ({ 
                    value: batch, 
                    label: batch 
                })) || []} 
                />
                </div>
        </div>
    );
}
