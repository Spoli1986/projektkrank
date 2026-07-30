import Link from 'next/link';

type NavItem = {
  href: string;
  label: string;
};

const allItems: NavItem[] = [
  { href: '/#home', label: 'Start' },
  { href: '/#band', label: 'Band' },
  { href: '/#events', label: 'Live' },
  { href: '/#media', label: 'Videos' },
  { href: '/shop', label: 'Shop' },
  { href: '/#contact', label: 'Kontakt' },
];

export const leftNavItems = allItems.slice(0, 3);
export const rightNavItems = allItems.slice(3);

function NavItems({ items = allItems, className = '' }: { items?: NavItem[]; className?: string }) {
  return (
    <nav aria-label="Hauptnavigation" className={`min-w-0 ${className}`}>
      <ul className="flex w-max items-center gap-5 whitespace-nowrap sm:gap-7 xl:gap-9">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="nav-link group relative block py-3 text-[0.68rem] font-black uppercase tracking-[0.2em] text-zinc-300 transition hover:text-white sm:text-xs"
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-pk-green transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavItems;
