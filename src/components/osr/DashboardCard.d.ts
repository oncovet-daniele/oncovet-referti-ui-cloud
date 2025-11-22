interface DashboardCardProps {
    id: string;
    patient: string;
    owner: string;
    examType: string;
    mylav: {
        name: string;
        value: number;
        state: "nel_range" | "sopra_range" | "sotto_range" | "fuori_range";
    };
    trend: number[];
}
export default function DashboardCard({ id, patient, owner, examType, mylav, trend, }: DashboardCardProps): import("react/jsx-runtime").JSX.Element;
export {};
