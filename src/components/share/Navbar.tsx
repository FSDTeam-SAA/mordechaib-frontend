import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navItems = ["Features", "Solutions", "Pricing", "About", "Faq", "Contact"];

  return (
    <header className="absolute left-0 right-0 top-0 z-20 px-3 pt-3 sm:px-6 sm:pt-6 lg:px-8">
      <nav className="container mx-auto flex h-14 items-center justify-between rounded-md bg-[#F5F7FF] px-2.5 shadow-sm backdrop-blur sm:h-16 sm:px-4 lg:h-[72px] lg:px-4 xl:h-[84px] xl:px-5">
        <Link href="/" className="flex items-center">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-sm bg-white shadow-sm sm:h-12 sm:w-12 lg:h-[52px] lg:w-[52px] xl:h-[60px] xl:w-[60px]">
            <Image
              src="/logo.png"
              alt="Notra.ai"
              width={1000}
              height={1000}
              className="h-full w-full object-contain object-left"
              priority
            />
          </span>
        </Link>

        <div className="hidden items-center font-medium text-[#0E1224] lg:flex lg:gap-3 lg:text-sm xl:gap-7 xl:text-xl">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition-colors hover:text-[#5B7FF0]"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="hidden items-center lg:flex lg:gap-2 xl:gap-3">
          <Link
            href="#signin"
            className="rounded-md border border-[#5B7FF0] font-medium text-[#5B7FF0] transition-colors hover:bg-[#5B7FF0] hover:text-white lg:px-4 lg:py-2 lg:text-sm xl:px-8 xl:py-3 xl:text-base"
          >
            Sign In
          </Link>
          <Link
            href="#trial"
            className="rounded-md bg-[#5B7FF0] font-semibold text-white shadow-sm transition-colors hover:bg-[#5B7FF0]/90 lg:px-4 lg:py-2 lg:text-sm xl:px-6 xl:py-3 xl:text-base"
          >
            Start Free Trial
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#D9E0FF] bg-white text-[#10152B] shadow-sm transition-colors hover:bg-[#EEF2FF] lg:hidden"
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex w-[88%] max-w-[360px] flex-col border-l border-[#E4E8F7] bg-white p-0"
          >
            <SheetHeader className="border-b border-[#E8EBF5] bg-[#F5F7FF] px-5 py-4 text-left">
              <SheetTitle>
                <Link href="/" className="inline-flex items-center">
                  <Image
                    src="/logo.png"
                    alt="Notra.ai"
                    width={56}
                    height={56}
                    className="h-12 w-12 object-contain"
                  />
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-1 flex-col px-5 py-6">
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <SheetClose asChild key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="flex min-h-12 items-center justify-between border-b border-[#EEF0F7] text-base font-medium text-[#0E1224] transition-colors hover:text-[#5B7FF0]"
                    >
                      {item}
                      <ArrowRight className="h-4 w-4 text-[#9AA4C4]" />
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-auto grid gap-3 pt-8">
                <SheetClose asChild>
                  <Link
                    href="#signin"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-[#5B7FF0] text-sm font-semibold text-[#5B7FF0]"
                  >
                    Sign In
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="#trial"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#5B7FF0] text-sm font-semibold text-white shadow-sm"
                  >
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
