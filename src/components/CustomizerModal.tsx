import React, { useState } from 'react';
import { UserProfileData, ThumbnailProject, ThumbnailCategory } from '../types/portfolio';
import { X, Upload, RotateCcw, Plus, Image as ImageIcon, Check } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfileData;
  onUpdateProfile: (updated: Partial<UserProfileData>) => void;
  thumbnails: ThumbnailProject[];
  onAddThumbnail: (newThumb: ThumbnailProject) => void;
  onResetDefaults: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  thumbnails,
  onAddThumbnail,
  onResetDefaults,
}) => {
  const [avatarInputUrl, setAvatarInputUrl] = useState(profile.avatarUrl);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ThumbnailCategory>('gta5');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCtr, setNewCtr] = useState('14.5%');
  const [newClient, setNewClient] = useState('Canal Parceiro');
  const [saveSuccess, setSaveSuccess] = useState(false);

  React.useEffect(() => {
    setAvatarInputUrl(profile.avatarUrl);
  }, [profile.avatarUrl]);

  if (!isOpen) return null;

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64 = event.target.result as string;
          setAvatarInputUrl(base64);
          onUpdateProfile({ avatarUrl: base64 });
          triggerSaveIndicator();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyAvatarUrl = () => {
    if (avatarInputUrl.trim()) {
      onUpdateProfile({ avatarUrl: avatarInputUrl });
      triggerSaveIndicator();
    }
  };

  const handleThumbFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewThumb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim() || !newTitle.trim()) return;

    const categoryLabels: Record<ThumbnailCategory, string> = {
      todos: 'Todos os Games',
      gta5: 'GTA 5',
      gta6: 'GTA 6',
      csgo: 'CS:GO / CS2',
      roblox: 'Roblox',
    };

    const project: ThumbnailProject = {
      id: `thumb-custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      categoryLabel: categoryLabels[newCategory],
      imageUrl: newImageUrl,
      ctr: newCtr,
      views: '1.2M views',
      client: newClient,
      description: 'Thumbnail adicionada pelo criador para demonstração em tempo real.',
      software: ['Photoshop', 'Lightroom'],
      colorPalette: ['#ef4444', '#06b6d4', '#0f172a'],
      keyTactics: ['Contraste extremo', 'Enquadramento facial'],
      isFeatured: true,
    };

    onAddThumbnail(project);
    setNewTitle('');
    setNewImageUrl('');
    triggerSaveIndicator();
  };

  const triggerSaveIndicator = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Personalização rápida do portfólio"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Personalizar Foto & Thumbnails
              </h3>
              <p className="text-[11px] text-slate-400">
                Você pode testar sua própria foto e thumbnails diretamente no navegador
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Notification Toast */}
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Atualizado com sucesso no seu portfólio!</span>
            </div>
          )}

          {/* Section 1: Sua Foto no Topo (Avatar) */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              1. Sua Foto de Perfil (Topo / Capa)
            </h4>
            <p className="text-xs text-slate-300">
              Coloque sua foto para ver como fica na moldura carmim com iluminação de recorte:
            </p>

            <div className="flex items-center gap-4">
              <img
                src={avatarInputUrl}
                alt="Avatar atual"
                className="w-16 h-16 rounded-full object-cover border-2 border-rose-500 shadow-md shrink-0"
              />

              <div className="flex-1 space-y-2">
                <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer border border-slate-700 transition-colors">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Escolher arquivo de foto do computador</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ou cole o link direto da sua imagem (URL)..."
                    value={avatarInputUrl}
                    onChange={(e) => setAvatarInputUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    onClick={handleApplyAvatarUrl}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Adicionar uma Thumbnail Real */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              2. Adicionar Thumbnail ao Portfólio
            </h4>
            <p className="text-xs text-slate-300">
              Adicione thumbnails feitas por você para visualizar instantaneamente na galeria e no simulador de feed:
            </p>

            <form onSubmit={handleAddNewThumb} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Título do Vídeo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Sobrevivi 100 Dias no Hardcore..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Categoria
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ThumbnailCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="gta5">GTA 5</option>
                    <option value="gta6">GTA 6</option>
                    <option value="csgo">CS:GO / CS2</option>
                    <option value="roblox">Roblox</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    CTR Alcançado
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 15.2%"
                    value={newCtr}
                    onChange={(e) => setNewCtr(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Imagem da Thumbnail (Upload ou Link)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer border border-slate-700 transition-colors">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span>Upload da imagem (JPG / PNG)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbFileUpload}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Ou cole a URL direta da imagem..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {newImageUrl && (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-700 mt-2">
                  <img
                    src={newImageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-emerald-400 font-bold">
                    Prévia da Imagem
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={!newTitle || !newImageUrl}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar ao Portfólio</span>
              </button>
            </form>
          </div>

          {/* Reset button */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                onResetDefaults();
                triggerSaveIndicator();
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar dados de modelo padrão</span>
            </button>
            <span className="text-[11px] text-slate-500 font-mono">
              Total de miniaturas: {thumbnails.length}
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
