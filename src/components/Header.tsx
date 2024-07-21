import Link from "next/link";
import { ModeToggle } from "./toggleTheme";

export default function Header() {
  return (
    <nav className="sticky inset-x-0 top-0 z-50 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex h-14 items-center">
          <Link
            href="/"
            className="dark:text-white mr-auto flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <span>SD Download List</span>
          </Link>
          <nav className="ml-auto items-center space-x-4 ">
            <Link
              href="/"
              className="dark:text-white align-middle font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800 hidden sm:inline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/download_list"
              className="dark:text-white align-middle font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800 hidden sm:inline"
              prefetch={false}
            >
              Download List
            </Link>
            <Link
              href="https://vjump-sd-download-list-docs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-white align-middle font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
              prefetch={false}
            >
              Docs
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </nav>
  );
}
