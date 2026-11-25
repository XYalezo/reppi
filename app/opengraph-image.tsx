import { home } from '@/content/home';
import { ogSize, renderOg } from '@/lib/og';

export const alt = 'Phanello Solutions: IT consulting and custom software from Aliwal North';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderOg({ eyebrow: home.hero.eyebrow, title: home.hero.heading, emphasis: home.hero.emphasis });
}
