import React from 'react';
import { Mail, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-[#0F172A] text-slate-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="text-xl font-semibold">StudioScene</div>
            <p className="mt-2 text-slate-400">Imagens de produto com IA — profissionais, confiáveis e prontas para destacar a sua marca.</p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-wide text-slate-400">Contacto</div>
            <a href="mailto:pedrofmsilva.pt@gmail.com" className="mt-2 inline-flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
              <Mail size={18} /> pedrofmsilva.pt@gmail.com
            </a>
          </div>
          <div>
            <div className="text-sm uppercase tracking-wide text-slate-400">Siga-nos</div>
            <div className="mt-2 flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-sm text-slate-400">
          © {new Date().getFullYear()} StudioScene. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
