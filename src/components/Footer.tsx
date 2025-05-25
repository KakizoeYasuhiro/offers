'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-gray-700 text-white text-center py-3 h-12 fixed bottom-0 left-0 right-0 z-30">
      <p className="text-xs">&copy; {currentYear} 株式会社TORQUE</p>
    </footer>
  );
}