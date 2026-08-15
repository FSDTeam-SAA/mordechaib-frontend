import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

const websiteLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "FAQ's", href: "/#faq" },
];

const supportLinks = [
  { label: "Booking", href: "/request-demo" },
  { label: "Explore", href: "/#services" },
  { label: "Contact", href: "mailto:nathan.roberts@example.com" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: <span className="text-xs font-bold">f</span> },
  { label: "X", href: "#", icon: <span className="text-[10px] font-semibold">X</span> },
  { label: "Instagram", href: "#", icon: <Instagram size={13} /> },
  { label: "LinkedIn", href: "#", icon: <span className="text-[9px] font-bold">in</span> },
  { label: "YouTube", href: "#", icon: <Youtube size={13} /> },
];

function Footer() {
  return (
    <footer className="border-t-4 border-[#e5efff] bg-[#29246d] text-indigo-100">
      <div className="mx-auto w-full container px-5 pb-6 pt-14 sm:px-8 sm:pt-16 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_.8fr_.8fr_1.35fr] lg:gap-14">
          <div className="max-w-xs">
            <Link
              href="/"
              aria-label="Booking Is Yours home"
              className="inline-flex flex-col text-center text-sm font-semibold uppercase leading-[13px] tracking-[0.02em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Booking Is</span>
              <span>Yours</span>
            </Link>
            <p className="mt-4 max-w-[240px] text-sm leading-5 text-indigo-100/80">
              Smart property management, effortless bookings, and exceptional guest experiences—all in one place.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-8 place-items-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#29246d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Website</h2>
            <ul className="mt-4 space-y-2.5">
              {websiteLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-indigo-100/75 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Support</h2>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-indigo-100/75 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Contact</h2>
            <address className="mt-4 space-y-3 not-italic">
              <a href="mailto:nathan.roberts@example.com" className="flex items-start gap-3 text-sm text-indigo-100/80 transition-colors hover:text-white">
                <Mail aria-hidden="true" className="mt-0.5 shrink-0 text-white" size={15} />
                <span className="break-all">nathan.roberts@example.com</span>
              </a>
              <p className="flex items-start gap-3 text-sm leading-5 text-indigo-100/80">
                <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-white" size={15} />
                <span>2118 Thornridge Cir.<br />Syracuse, Connecticut 35624</span>
              </p>
              <a href="tel:+13085550121" className="flex items-center gap-3 text-sm text-indigo-100/80 transition-colors hover:text-white">
                <Phone aria-hidden="true" className="shrink-0 text-white" size={15} />
                <span>(308) 555-0121</span>
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-[10px] text-indigo-100/60 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Booking Is Yours. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Link href="/p&p" className="transition-colors hover:text-white">Privacy Policy</Link>
            <span aria-hidden="true">•</span>
            <Link href="/t&c" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
