import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center" id="hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Soft gradient overlay to improve text readability without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Crie imagens profissionais para os seus produtos — sem complicações.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Transformamos fotos simples em imagens dignas de catálogo, prontas para anúncios, redes sociais e campanhas.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-500">
            <p>As suas imagens serão entregues entre 24 e 48 horas. Em épocas de alta procura, o prazo pode ser ligeiramente superior.</p>
            <p>Como não pedimos medidas exatas, a proporção do produto pode não estar 100% real, mas garantimos resultados visualmente perfeitos.</p>
          </div>
          <div className="mt-10 flex gap-4">
            <a href="#planos" className="inline-flex items-center rounded-2xl bg-blue-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-blue-700 transition-colors">Ver Planos</a>
            <a href="#contacto" className="inline-flex items-center rounded-2xl border border-slate-300 px-5 py-3 text-slate-700 font-medium bg-white hover:bg-slate-50 transition-colors">Fale Connosco</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
