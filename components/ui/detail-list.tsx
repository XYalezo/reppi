type DetailItem = {
  /** Anchor id so other pages can link to this item. */
  id?: string;
  title: string;
  /** One sentence saying what the item covers. */
  body?: string;
};

type DetailListProps = {
  items: ReadonlyArray<DetailItem>;
};

export function DetailList({ items }: DetailListProps) {
  return (
    <ul className="border-t border-ink-900 on-dark:border-white">
      {items.map((item) => (
        <li key={item.title} id={item.id} className="scroll-mt-8 border-b border-ink-200 py-5 on-dark:border-ink-700">
          <p className="text-lead font-semibold">{item.title}</p>
          {item.body && <p className="mt-1 max-w-measure text-body text-ink-700 on-dark:text-ink-300">{item.body}</p>}
        </li>
      ))}
    </ul>
  );
}
