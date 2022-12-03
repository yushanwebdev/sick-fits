export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>This the Page</h1>
      {children}
    </div>
  );
}
