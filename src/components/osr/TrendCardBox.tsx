export default function TrendCardBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#A3CEF1] bg-[#F5FAFF] rounded-md p-2 w-28 h-20 flex items-center justify-center">
      {children}
    </div>
  );
}
