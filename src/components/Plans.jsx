import React, { useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:8000`;

const Card = ({ children, title, price, description }) => (
  <div className="flex flex-col rounded-2xl bg-white shadow-md ring-1 ring-slate-200 p-6">
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <div className="mt-1 text-slate-500">{description}</div>
    </div>
    <div className="text-3xl font-bold text-slate-900 mb-6">{price}</div>
    {children}
  </div>
);

function UploadBlock({ label, name, maxFiles }) {
  const [files, setFiles] = useState([]);

  const onChange = (e) => {
    const list = Array.from(e.target.files || []).slice(0, maxFiles);
    setFiles(list);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <input
        type="file"
        name={name}
        accept="image/*"
        multiple
        onChange={onChange}
        className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <p className="mt-2 text-xs text-slate-500">Selecionadas: {files.length} de {maxFiles}</p>
    </div>
  );
}

const SuccessNote = ({ children }) => (
  <div className="mt-4 rounded-xl bg-green-50 text-green-800 text-sm p-3 border border-green-200">{children}</div>
);

const ErrorNote = ({ children }) => (
  <div className="mt-4 rounded-xl bg-red-50 text-red-800 text-sm p-3 border border-red-200">{children}</div>
);

function PlanForm({ planKey, maxPhotos, price, extraProductOptions }) {
  const [brand, setBrand] = useState('');
  const [email, setEmail] = useState('');
  const [countProducts, setCountProducts] = useState(extraProductOptions?.[0] || 1);
  const [status, setStatus] = useState({ loading: false, ok: false, error: '' });

  const uploadBlocks = useMemo(() => {
    const blocks = [];
    const numBlocks = extraProductOptions ? Number(countProducts) : 1;
    const perBlock = extraProductOptions ? Math.floor(maxPhotos / numBlocks) : maxPhotos;
    for (let i = 0; i < numBlocks; i++) {
      blocks.push(
        <UploadBlock key={`ub-${i}`} label={`Upload do produto ${i + 1}`} name={`files_${i}`} maxFiles={perBlock} />
      );
    }
    return blocks;
  }, [countProducts, maxPhotos, extraProductOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: false, error: '' });

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      fd.append('plan', planKey);
      fd.append('max_photos', String(maxPhotos));
      fd.append('brand', brand);
      fd.append('email', email);
      if (extraProductOptions) fd.append('products', String(countProducts));

      const res = await fetch(`${API_BASE}/api/submit-plan`, {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error('Falha no envio');
      setStatus({ loading: false, ok: true, error: '' });
      form.reset();
    } catch (err) {
      setStatus({ loading: false, ok: false, error: 'Ocorreu um erro ao enviar. Tente novamente.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      {extraProductOptions && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Quantos produtos quer enviar?</label>
          <select
            className="w-full rounded-2xl border-slate-300 focus:ring-blue-600 focus:border-blue-600"
            value={countProducts}
            onChange={(e) => setCountProducts(e.target.value)}
          >
            {extraProductOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}

      {uploadBlocks}

      <p className="text-xs text-slate-500 mb-4">Envie fotos de vários ângulos (frente, trás, ambos os lados e cima).</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Nome da marca ou empresa</label>
          <input
            type="text"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full rounded-2xl border-slate-300 focus:ring-blue-600 focus:border-blue-600"
            placeholder="Ex: StudioScene"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border-slate-300 focus:ring-blue-600 focus:border-blue-600"
            placeholder="nome@empresa.com"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status.loading}
        className="mt-6 inline-flex items-center rounded-2xl bg-blue-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-60"
      >
        {status.loading ? 'A enviar…' : 'Enviar'}
      </button>

      {status.ok && (
        <SuccessNote>
          As suas fotos foram enviadas com sucesso. Entregas em 24 a 48 horas via email. Em épocas altas pode demorar mais tempo.
        </SuccessNote>
      )}
      {status.error && <ErrorNote>{status.error}</ErrorNote>}
    </form>
  );
}

const CustomService = () => {
  const [desc, setDesc] = useState('');
  const [brand, setBrand] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, ok: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: false, error: '' });
    try {
      const fd = new FormData();
      fd.append('description', desc);
      fd.append('brand', brand);
      fd.append('email', email);
      const fileInput = e.currentTarget.querySelector('input[type="file"]');
      if (fileInput && fileInput.files && fileInput.files[0]) {
        fd.append('reference', fileInput.files[0]);
      }
      const res = await fetch(`${API_BASE}/api/custom-request`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Falha no envio');
      setStatus({ loading: false, ok: true, error: '' });
      setDesc(''); setBrand(''); setEmail('');
      e.currentTarget.reset();
    } catch (err) {
      setStatus({ loading: false, ok: false, error: 'Ocorreu um erro ao enviar. Tente novamente.' });
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-md ring-1 ring-slate-200 p-6">
      <h3 className="text-xl font-semibold text-slate-900">Cenário Personalizado – 30€</h3>
      <p className="mt-2 text-slate-600">
        Crie um cenário totalmente personalizado — com cores, móveis, luzes e composição à medida da sua marca. Um serviço exclusivo para resultados de alto impacto.
      </p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Descrição do pedido</label>
          <textarea
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border-slate-300 focus:ring-blue-600 focus:border-blue-600"
            placeholder="Descreva o cenário que pretende…"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Upload opcional de referência</label>
          <input type="file" accept="image/*" className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nome</label>
            <input
              type="text"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded-2xl border-slate-300 focus:ring-blue-600 focus:border-blue-600"
              placeholder="Nome da marca ou empresa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border-slate-300 focus:ring-blue-600 focus:border-blue-600"
              placeholder="nome@empresa.com"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={status.loading}
          className="mt-6 inline-flex items-center rounded-2xl bg-blue-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {status.loading ? 'A enviar…' : 'Solicitar Personalizado'}
        </button>
        {status.ok && (
          <SuccessNote>
            Pedido enviado com sucesso. Entraremos em contacto por email com os próximos passos.
          </SuccessNote>
        )}
        {status.error && <ErrorNote>{status.error}</ErrorNote>}
      </form>
    </div>
  );
};

const Plans = () => {
  return (
    <section id="planos" className="relative py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Planos</h2>
          <p className="mt-3 text-slate-600">Escolha o pacote ideal para as suas necessidades.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="5 fotos" price="6€" description="Ideal para começar — envie até 5 fotos do seu produto.">
            <PlanForm planKey="p5" maxPhotos={5} price={6} />
          </Card>

          <Card title="10 fotos" price="11€" description="Perfeito para duas variações ou ângulos extra.">
            <PlanForm planKey="p10" maxPhotos={10} price={11} extraProductOptions={[1, 2]} />
          </Card>

          <Card title="20 fotos" price="20€" description="Volume maior para catálogos ou campanhas.">
            <PlanForm planKey="p20" maxPhotos={20} price={20} extraProductOptions={[1, 2, 4]} />
          </Card>
        </div>

        <div className="mt-16">
          <CustomService />
        </div>
      </div>
    </section>
  );
};

export default Plans;
