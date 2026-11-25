import Image from 'next/image';

type LogoWallProps = {
  /** Real client logos only. Renders nothing when empty or omitted. */
  items?: ReadonlyArray<{ name: string; src: string; width: number; height: number }>;
};

export function LogoWall({ items }: LogoWallProps) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
      {items.map((item) => (
        <li key={item.name}>
          <Image src={item.src} alt={item.name} width={item.width} height={item.height} className="h-10 w-auto" />
        </li>
      ))}
    </ul>
  );
}
