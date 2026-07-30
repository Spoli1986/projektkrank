type Props = { src: string; width: string; height: string };

function Spotify({ src, width, height }: Props) {
  return (
    <div className="surface w-full overflow-hidden p-2">
      <iframe
        className="block w-full rounded-xl"
        src={src}
        width={width}
        height={height}
        title="Projekt Krank auf Spotify"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

export default Spotify;
