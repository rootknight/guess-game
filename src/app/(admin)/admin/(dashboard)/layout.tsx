import Nav from "@/components/admin/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav />
      <div className="flex justify-center h-[calc(100dvh-4rem)] p-6 md:overflow-y-auto md:p-12 bg-white">
        <div className="w-full px-6 max-w-[1024px]">{children}</div>
      </div>
    </div>
  );
}
