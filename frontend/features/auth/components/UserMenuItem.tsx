import Link from "next/link";

interface UserMenuItemProps {
  href: string;
  children: React.ReactNode;
}

export function UserMenuItem({
  href,
  children,
}: UserMenuItemProps) {
  return (
    <Link
      href={href}
      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
    >
      {children}
    </Link>
  );
}