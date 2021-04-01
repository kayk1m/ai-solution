import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Transition } from '@headlessui/react';

// contexts
import { useUI } from '@components/ui/context';

// components
import { Avatar, Link } from '@components/ui';

// libraries
import signout from '@lib/signout';

const NavBar: React.FC = () => {
  const router = useRouter();

  const [profileOpen, setProfileOpen] = React.useState<boolean>(false);

  const { user, mutateUser } = useUI();

  const menuItems = React.useMemo(() => {
    if (user === null) return ['pricing', 'contact', 'signin'];

    return ['data', 'models', 'projects', 'marketplace'];
  }, [user]);

  React.useEffect(() => {
    const handler = () => {
      if (profileOpen) setProfileOpen(false);
    };

    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [profileOpen]);

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto px-10 2xl:px-12">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              className="text-3xl font-extrabold rounded-md font-serif"
              href={user ? '/dashboard' : '/'}
            >
              AISolution
            </Link>
          </div>
          <div className="flex">
            <div className="ml-6 flex space-x-4">
              {menuItems.map((item, idx) => (
                <Link
                  key={`desktop-menu-item-${idx}`}
                  href={`/${item.split(' ').join('-')}`}
                  className={cn(
                    'inline-flex items-center px-2 pt-1 border-b-4 text-md font-medium capitalize',
                    {
                      'border-lightBlue-500 text-gray-900':
                        router.asPath === `/${item.split(' ').join('-')}`,
                      'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                        router.asPath !== `/${item.split(' ').join('-')}`,
                    },
                  )}
                >
                  {item}
                </Link>
              ))}
            </div>
            {user !== null && (
              <div className="relative ml-2">
                <div className="h-full flex flex-col justify-center">
                  <button
                    type="button"
                    className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setProfileOpen((prev) => !prev)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <Avatar size="sm" src={user.profile} />
                  </button>
                </div>

                {/* <!-- Dropdown menu --> */}
                <Transition
                  show={profileOpen}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={async () => {
                      await signout();
                      mutateUser();
                      router.replace('/');
                    }}
                  >
                    Sign Out
                  </button>
                </Transition>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
