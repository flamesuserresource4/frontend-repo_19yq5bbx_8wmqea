import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Plans from './components/Plans';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-800">
      <Header />
      <main>
        <Hero />
        <section id="sobre" className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Profissional, confiável e acolhedor</h2>
            <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
              O nosso serviço combina tecnologia de ponta com sensibilidade estética para criar imagens de produto com aspeto de estúdio. Processos simples, resultados consistentes e um toque de luxo discreto.
            </p>
          </div>
        </section>
        <Plans />
      </main>
      <Footer />
    </div>
  );
}

export default App;
