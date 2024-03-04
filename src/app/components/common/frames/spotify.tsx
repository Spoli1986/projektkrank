type Props = { src: string; width: string; height: string };

function Spotify({ src, width, height }: Props) {
  return (
    <div className="w-full md:w-[600px]">
      <iframe
        style={{ borderRadius: 12 }}
        src={src}
        width={width}
        height={height}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Spotify;
