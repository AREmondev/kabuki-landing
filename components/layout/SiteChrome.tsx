"use client";

import { usePathname } from "next/navigation";

export function SiteChrome({
  navbar,
  footer,
  contactBar,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  contactBar: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      {children}
      {footer}
      {contactBar}
    </>
  );
}
