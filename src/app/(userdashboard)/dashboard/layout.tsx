import Header from "../_components/Header";
import { Sidebar } from "../_components/Sideber";


function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      <Sidebar />
      <Header />
      <main className="min-h-screen pt-[83px] md:ml-[260px]">{children}</main>
    </div>
  );
}

export default layout;
