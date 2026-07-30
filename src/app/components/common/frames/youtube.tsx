export default function Youtube({ src, title }: { src: string; title: string }) {
  return (
    <article className="surface surface-hover group overflow-hidden p-2">
      <div className="aspect-video min-w-0 w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="h-full w-full"
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <p className="px-3 pb-2 pt-4 text-sm font-bold uppercase tracking-[0.08em] text-zinc-300 transition group-hover:text-white">
        {title}
      </p>
    </article>
  );
}
