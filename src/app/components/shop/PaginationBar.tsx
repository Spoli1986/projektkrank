import Link from 'next/link';

export default function PaginationBar({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((page) => Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages);
  return <nav aria-label="Shop-Seiten" className="flex flex-wrap items-center justify-center gap-2">{pages.map((page, index) => <span key={page} className="contents">{index > 0 && page - pages[index - 1] > 1 ? <span className="px-1 text-zinc-600">…</span> : null}<Link href={`?page=${page}`} aria-current={currentPage === page ? 'page' : undefined} className={`flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-sm font-bold transition ${currentPage === page ? 'border-pk-green bg-pk-green text-black' : 'border-white/10 bg-white/5 text-zinc-300 hover:border-pk-green/50 hover:text-white'}`}>{page}</Link></span>)}</nav>;
}
