import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const Navbar = () => {
  const navItems = ["Features", "Solutions", "Pricing", "About", "Faq", "Contact"];

  return (
    <header className="absolute left-0 right-0 top-0 z-20 px-4 pt-6 sm:px-6 lg:px-8">
      <nav className="mx-auto flex  container items-center justify-between rounded-md bg-[#F5F7FF] px-4 shadow-sm backdrop-blur md:h-[84px] md:px-5">
        <Link href="/" className="flex items-center">
          <span className="relative flex h-[60px] w-[60px] items-center justify-center rounded-sm bg-white shadow-sm">
            <Image
              src="/logo.png"
              alt="Notra.ai"
              width={1000}
              height={1000}
              className="w-full h-full object-contain object-left"
              priority
            />
          </span>
        </Link>

        <div className="hidden items-center gap-7  font-medium text-xl text-[#0E1224] md:flex">
          {navItems.map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#signin"
            className="rounded-md border border-[#5B7FF0] px-8 py-3  text-base font-medium text-[#5B7FF0]"
          >
            Sign In
          </Link>
          <Link
            href="#trial"
            className="rounded-md bg-[#5B7FF0] hover:bg-[#5B7FF0]/90 px-6 py-3 text-base font-semibold text-white shadow-sm"
          >
            Start Free Trial
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#d9e0ff] text-[#10152b] md:hidden"
        >
          <Menu size={20} />
        </button>
      </nav>
    </header>
  );
};

export default Navbar
