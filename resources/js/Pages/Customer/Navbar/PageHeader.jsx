import { Link, usePage } from "@inertiajs/react";

export default function PageHeader() {
  const { url } = usePage(); // contoh: "/dashboard?page=1"

  // Pisahkan path dan query string
  const [path, query] = url.split("?"); 
  const segments = path.split("/").filter(Boolean); // ["dashboard"]

  // Ambil page number dari query string (kalau ada)
  let pageNum = null;
  if (query) {
    const params = new URLSearchParams(query);
    if (params.has("page")) {
      pageNum = params.get("page");
    }
  }

  const formatTitle = (str) =>
    str
      ? str
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

  return (
    <h2 className="text-l font-semibold leading-tight text-gray-800 flex items-center gap-2">
      {/* Home link */}
      <Link href={route("dashboard")} className="text-blue-500 hover:underline">
        Dashboard
      </Link>

      {segments.map((seg, idx) => {
        const path = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;

        if (seg.toLowerCase() === "dashboard") return null; // skip dashboard duplikat

        return (
          <span key={seg} className="flex items-center gap-2">
            <span className="text-gray-400">{">"}</span>
            {isLast ? (
              <span className="text-gray-800">{formatTitle(seg)}</span>
            ) : (
              <Link href={path} className="text-blue-500 hover:underline">
                {formatTitle(seg)}
              </Link>
            )}
          </span>
        );
      })}

      {/* Tambahkan Page X kalau ada pagination */}
      {pageNum && (
        <span className="flex items-center gap-2">
          <span className="text-gray-400">{">"}</span>
          <span className="text-gray-800">Page {pageNum}</span>
        </span>
      )}
    </h2>
  );
}
