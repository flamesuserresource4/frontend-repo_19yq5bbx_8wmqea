import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-slate-900 text-xl font-bold tracking-tight">StudioScene</div>
        <nav className="hidden md:flex items-center gap-8 text-slate-600">
          <a href="#planos" className="hover:text-slate-900 transition-colors">Planos</a>
          <a href="#sobre" className="hover:text-slate-900 transition-colors">Sobre</a>
          <a href="#contacto" className="hover:text-slate-900 transition-colors">Contacto</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
