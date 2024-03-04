type Props = { src: string; title: string };

function Youtube({ src, title }: Props) {
  return (
    <div className="aspect-video md:w-[853px]">
      <iframe width="100%" className="h-full w-full" src={src} title={title}></iframe>
    </div>
  );
}

export default Youtube;
