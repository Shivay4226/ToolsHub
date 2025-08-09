import ColorConverter from "@/components/Color/ColorConverter";

export async function generateStaticParams() {
  return [
     { 'color-slug': 'color-picker' },
    { 'color-slug': 'rgb-to-hex' },
    { 'color-slug': 'hex-to-rgb' },
    { 'color-slug': 'rgb-to-hsl' },
    { 'color-slug': 'hsl-to-rgb' },
    { 'color-slug': 'hex-to-hsl' },
    { 'color-slug': 'hsl-to-hex' },
    { 'color-slug': 'rgb-to-cmyk' },
    { 'color-slug': 'cmyk-to-rgb' },
  ];
}

export default function ColorSlugPage({ params }) {
  const { 'color-slug': slug } = params;
  return <ColorConverter />;
}
