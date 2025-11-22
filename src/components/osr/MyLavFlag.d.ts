interface MyLavFlagProps {
    name: string;
    value: number;
    state: "nel_range" | "sopra_range" | "sotto_range" | "fuori_range";
}
export default function MyLavFlag({ name, value, state }: MyLavFlagProps): import("react/jsx-runtime").JSX.Element;
export {};
