type TestimonialProps = {
  /** A real, attributed quote. Renders nothing when omitted. */
  item?: { quote: string; name: string; role: string; organisation: string };
};

export function Testimonial({ item }: TestimonialProps) {
  if (!item) return null;
  return (
    <figure className="max-w-measure border-l border-ink-900 pl-6">
      <blockquote className="text-lead text-ink-900">{item.quote}</blockquote>
      <figcaption className="mt-4 font-mono text-label uppercase text-ink-600">
        {item.name}, {item.role}, {item.organisation}
      </figcaption>
    </figure>
  );
}
