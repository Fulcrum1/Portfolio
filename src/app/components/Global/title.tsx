export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
      <span className="font-mono">{"<"}</span>
      {children}
      <span className="font-mono">{"/>"}</span>
    </h2>
  );
}
