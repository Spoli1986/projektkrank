export function Youtube({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      src={src}
      title={title}
      className="aspect-video w-full rounded-lg"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
