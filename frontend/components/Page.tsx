import Header from './Header';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <h1>This the Page</h1>
      {children}
    </div>
  );
}
