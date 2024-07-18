import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <nav className="sticky inset-x-0 top-0 z-50 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex h-14 items-center">
          <Link
            href="/"
            className="mr-auto flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <span>SD Download List</span>
          </Link>
          <nav className="ml-auto items-center space-x-4 ">
            <Link
              href="/"
              className="align-middle font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/download_list"
              className="align-middle font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
              prefetch={false}
            >
              Download List
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
