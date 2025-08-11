import { Link, usePage } from '@inertiajs/react';

export default function PageHeader() {
  const { url } = usePage(); // contoh: "/rent-car"
  const currentPath = url.split('/').filter(Boolean).pop(); // ambil bagian terakhir

  // Kapitalisasi kata
  const formatTitle = (str) =>
    str
      ? str
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : '';

  return (
    <h2 className="text-l font-semibold leading-tight text-gray-800 flex items-center gap-2">
      <Link href="/" className="text-blue-500 hover:underline">
        Home
      </Link>
      <span className="text-gray-400">{'>'}</span>
      <span className="text-gray-800">{formatTitle(currentPath)}</span>
    </h2>
  );
}
