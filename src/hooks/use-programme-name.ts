// Hook to convert between full form, short form, and programme codes
const PROGRAMME_MAP = {
    BCA: "Bachelor of Computer Applications",
    BCOM: "Bachelor of Commerce (Honours)",
    BBA: "Bachelor of Business Administration",
} as const;

// Map programme codes to short forms
const CODE_TO_SHORT_MAP: Record<string, keyof typeof PROGRAMME_MAP> = {
    "020": "BCA",
    "017": "BCOM",
    "888": "BBA",
};

// Map short forms to programme codes
const SHORT_TO_CODE_MAP = Object.entries(CODE_TO_SHORT_MAP).reduce(
    (acc, [code, short]) => {
        acc[short] = code;
        return acc;
    },
    {} as Record<string, string>
);

const REVERSE_PROGRAMME_MAP = Object.entries(PROGRAMME_MAP).reduce(
    (acc, [short, full]) => {
        acc[full.toLowerCase()] = short;
        return acc;
    },
    {} as Record<string, string>
);

export function useProgrammeName() {
    /**
     * Convert short form or programme code to full form
     * BCA -> Bachelor of Computer Applications
     * 020 -> Bachelor of Computer Applications
     */
    const getFullForm = (input: string): string => {
        // Check if input is a programme code
        const shortForm = CODE_TO_SHORT_MAP[input];
        if (shortForm) {
            return PROGRAMME_MAP[shortForm];
        }
        
        // Check if input is already a short form
        const fullForm = PROGRAMME_MAP[input.toUpperCase() as keyof typeof PROGRAMME_MAP];
        if (fullForm) {
            return fullForm;
        }
        
        // Return input as-is if not found
        return input;
    };

    /**
     * Convert full form to short form
     * Bachelor of Computer Applications -> BCA
     */
    const getShortForm = (fullForm: string): string => {
        return REVERSE_PROGRAMME_MAP[fullForm.toLowerCase()] || fullForm;
    };

    /**
     * Get all short forms
     */
    const getShortForms = (): (keyof typeof PROGRAMME_MAP)[] => {
        return Object.keys(PROGRAMME_MAP) as (keyof typeof PROGRAMME_MAP)[];
    };

    /**
     * Get all full forms
     */
    const getFullForms = (): string[] => {
        return Object.values(PROGRAMME_MAP);
    };

    /**
     * Convert programme code to short form
     * 020 -> BCA
     */
    const getShortFormFromCode = (code: string): string => {
        return CODE_TO_SHORT_MAP[code] || code;
    };

    /**
     * Convert short form to programme code
     * BCA -> 020
     */
    const getCodeFromShortForm = (shortForm: string): string => {
        return SHORT_TO_CODE_MAP[shortForm.toUpperCase()] || shortForm;
    };

    /**
     * Get all programme codes
     */
    const getProgrammeCodes = (): string[] => {
        return Object.keys(CODE_TO_SHORT_MAP);
    };

    return {
        getFullForm,
        getShortForm,
        getShortForms,
        getFullForms,
        getShortFormFromCode,
        getCodeFromShortForm,
        getProgrammeCodes,
        PROGRAMME_MAP,
        CODE_TO_SHORT_MAP,
        SHORT_TO_CODE_MAP,
    };
}
