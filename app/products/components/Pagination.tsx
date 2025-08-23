"use client";

export default function Pagination({
  page,
  pages,
  onPage,
}: {
  page: number;
  pages: number;
  onPage: (page: number) => void;
}) {
  if (pages <= 1) return null;
  const prev = () => onPage(Math.max(1, page - 1));
  const next = () => onPage(Math.min(pages, page + 1));
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={prev}
        disabled={page === 1}
        className="focus-ring rounded-xl border px-3 py-2 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-sm opacity-80">
        Page <b>{page}</b> of <b>{pages}</b>
      </span>
      <button
        onClick={next}
        disabled={page === pages}
        className="focus-ring rounded-xl border px-3 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
