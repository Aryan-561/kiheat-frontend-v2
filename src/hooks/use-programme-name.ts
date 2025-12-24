// Hook to convert between full form and short form of programme names
const PROGRAMME_MAP = {
    BCA: "Bachelor of Computer Applications",
    BCOM: "Bachelor of Commerce (Honours)",
    BBA: "Bachelor of Business Administration",
} as const;

const REVERSE_PROGRAMME_MAP = Object.entries(PROGRAMME_MAP).reduce(
    (acc, [short, full]) => {
        acc[full.toLowerCase()] = short;
        return acc;
    },
    {} as Record<string, string>
);

export function useProgrammeName() {
    /**
     * Convert short form to full form
     * BCA -> Bachelor of Computer Applications
     */
    const getFullForm = (shortForm: string): string => {
        return PROGRAMME_MAP[shortForm as keyof typeof PROGRAMME_MAP] || shortForm;
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

    return {
        getFullForm,
        getShortForm,
        getShortForms,
        getFullForms,
        PROGRAMME_MAP,
    };
}
