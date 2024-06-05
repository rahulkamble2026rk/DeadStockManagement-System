

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Deadstock', href: '/dashboard', current: false },
  { name: 'Histroy Card', href: '/history_card', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-16 w-auto"
                    src="https://pict.edu/images/pic.jpg"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAjVBMVEX///8AAAAICh+Ojo5WVlZxcXH6+vrx8fH09PRSUlLn5+caGhqhoaHNzc1GRkaCgoJnZ2dLS0vc3Nw/Pz+6urrExMQfHx/U1NQwMDCYmJgODg4qKiqxsbF5eXkAABhhYWEAABJJSlUbHCoVFSM/P0kzMzd+foR1dXs4OENUVVpXWGIiIi1DREltbXNgYGaYsMrTAAADiElEQVR4nO2ai3LaMBBFUfw2GOMnGIwfbUpCW/L/n1drJdOUIAK2ZKUzeybJgIXhslpdr9aZzRAEQRAEQRAEQRAEQRAEQfQRZ4Y5J2RuGlmsWwsnsDbkzMYKdOvpiJfkgqX2aBXbS02EbAutkpwV15HUVhhadcKfrhyNojyuIfXZcz/lKj1tkmyL5dD6/cE1yzHL1iRqAR9vuP8edQ04vNCjyWeaPg4wVf70ijogfcJrIyEk2tR6KEHn4SS/mjp23g3NdbgohCO7PpYJg6gWiIbpXh90TWEUlbKmwShFoyUdXYtGlQF+IDRuR48rwNoTD+tZfxH1cvHwUsu1JrodChrIaDo1HCqqFg/XWkTRAmEjHt5omb7954m+n04NB5xIWPjGN11MGb6gRGAYeuoEm5a+S8Hn+tQREg11Hli6YItQ6Crz4p1wimBqd1p2WhCO5IoqP7kRRMW4tHgh0YfMsamvklxQ1agmgI3o7qLCDGBat9p27yXbEBvvKhjHYFvm6T3qzKLfEQe+0+EH/Y5Z0waLkZ4bCEvP+9vqSHVq6qpij3zAm74OvmSR/Csp0Th1dtkbkZNG817RPEr7rC/KyS8zWZdA4dmKnGxRhGGxyM7r0O22hUvBrlAR7p6I7JzBTJ3sJ3TQNGeTFQkdMovYK/LJ1mHvTsWNfp1TTupYds0N85MqwA3Z6+oJ8t1l7bt7riM8WJbyxHJZBtd3lbo+C2qiWJXLLm77O6fEZqt0pVYV+5AH6reCfQl1ivp191BNWaheg9n2YU1c1VaZuTtwY8h69DRYrhtV9yDAeMyH392hvUZVHVDorg7Z9rKGu5IJtFeDMxbWx0qFs0Oght1yYTdxVIQKKvCBG6eAnnujGTkUCNTg1ipMvfwyBpbe4B3BWskC9PPBGUWBrMplN6zKO8sVVedfhRrgboQrO7TDYMrTQ7FHpTkFUl2uVQWjV086wlEEwKV+1DXVGVBgfMJ+dFULdbTUYs+tx78j/V61zLqYtaCtUdxqcQ+CdYLHI7VjHOdyROUyRa3laJJ7Wzn2TCl42v+1CkEQBEEQBEEQBEEQBEEQBEH+f4wvyEzWDQ6ZzJ6+ICCqgh/+56lqmoo/qp74o+lFNe2378+kakjb/Tbkx+GlbQlpGvJ6JD9bDaqoqKo9/no5/D6eXk5vh/ZUHKJT+ZYe39KTUTy/KhBVXT7tDjT0YMUm5g8xqi12lEzKuwAAAABJRU5ErkJggg=="
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
