'use client';

import { ProgrammeBatchSelector } from "@/components/programme-batch-selector";
import { useParams } from "next/navigation";


export default function Page(){
    
    const params = useParams();
    const prgCode = params.prgCode;

    return(
        <ProgrammeBatchSelector 
            programCode={prgCode as string}
        />
    )
}