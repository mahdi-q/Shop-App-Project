import Link from "next/link";

function Header() {
  return (
    <header className="mb-10 shadow-md">
      <nav>
        <ul className="container flex items-center justify-between py-2 font-medium text-secondary-800 xl:max-w-screen-xl">
          <div className="flex items-center justify-center gap-x-2">
            <li>
              <Link className="block p-2 hover:text-primary-900" href="/">
                خانه
              </Link>
            </li>

            <li>
              <Link
                className="block p-2 hover:text-primary-900"
                href="/products"
              >
                محصولات
              </Link>
            </li>
          </div>

          <li>
            <Link className="block p-2 hover:text-primary-900" href="/auth">
              ورود
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
