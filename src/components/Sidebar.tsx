'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  activeTab?: string;
}

export default function Sidebar({ activeTab }: SidebarProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (activeTab) {
      return activeTab === path;
    }
    return pathname === path;
  };

  const navItems = [
    {
      href: '/jobs',
      id: 'jobs',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 0 1-2.25 2.25h-12a2.25 2.25 0 0 1-2.25-2.25v-12a2.25 2.25 0 0 1 2.25-2.25h4.073M20.25 14.15c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125h-9.75c-.621 0-1.125.504-1.125 1.125V7.5M20.25 14.15M13.5 6.375h3.375M13.5 10.125h3.375M6.375 6.375h1.125m-1.125 3.75h1.125m-1.125 3.75h1.125M6.375 13.875h1.125M6.375 17.625h1.125m-1.125 3.75h1.125" />
        </svg>
      ),
      label: '求人'
    },
    {
      href: '/rules',
      id: 'rules',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      label: 'オファー作成ルール'
    },
    {
      href: '/offers',
      id: 'offers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
      label: 'オファー文面'
    },
    {
      href: '/settings',
      id: 'settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-1.226.554-.225 1.151-.225 1.705 0 .55.223 1.02.684 1.11 1.226M9.594 3.94C8.433 4.803 7.5 6.094 7.5 7.5v1.597M9.594 3.94c.934.097 1.872.328 2.748.719M14.406 3.94c.09.542.56 1.003 1.11 1.226.554-.225 1.151-.225 1.705 0 .55.223 1.02.684 1.11 1.226M14.406 3.94c1.161.856 2.094 2.148 2.094 3.56v1.597M14.406 3.94c-.934.097-1.872.328-2.748.719M12 10.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Zm0 0H12m0 0c.292 0 .578.025.856.073M12 10.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 0H12M6.343 16.061c-.378-.378-.567-.88-.567-1.386v-1.597c0-1.549.835-2.949 2.094-3.56M17.657 16.061c.378-.378.567-.88.567-1.386v-1.597c0-1.549-.835-2.949-2.094-3.56m0 0a3.001 3.001 0 0 0-3.532-1.49A3.001 3.001 0 0 0 9.75 7.5v1.597M4.5 15.75A2.25 2.25 0 0 1 6.75 18h10.5a2.25 2.25 0 0 1 2.25-2.25V13.5A2.25 2.25 0 0 1 17.25 11.25H6.75A2.25 2.25 0 0 1 4.5 13.5v2.25Z" />
        </svg>
      ),
      label: '設定'
    }
  ];

  return (
    <aside className="w-60 bg-red-700 text-white flex flex-col fixed top-16 bottom-12 left-0 z-20 overflow-y-auto">
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`group flex items-center space-x-3 py-2.5 px-3 rounded-md transition-colors border-b border-white/50 ${
              isActive(item.href) ? 'bg-red-800' : 'hover:bg-red-800'
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}