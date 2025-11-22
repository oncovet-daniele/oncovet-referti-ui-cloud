interface RefertoCardProps {
    id: string;
    examType: string;
    patient: string;
    owner: string;
    mylav: {
        name: string;
        value: number;
        state: "nel_range" | "sopra_range" | "sotto_range" | "fuori_range";
    };
    ai: {
        risk: "basso" | "medio" | "alto";
        bullets: string[];
    };
    trend: number[];
}
export default function RefertoCard({ id, examType, patient, owner, mylav, ai, trend, }: RefertoCardProps): import("react/jsx-runtime").JSX.Element;
export {};
