import Sidebar from "./_components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 h-screen">
      <div className="hidden md:w-64 md:block fixed">
        <Sidebar />
      </div>
      <div className="md:ml-64 h-fit pb-5 bg-gray-50">{children}</div>
    </div>
  );
}
