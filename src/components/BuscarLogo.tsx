interface BuscarLogoProps {
  light?: boolean;
}

export default function BuscarLogo({ light = false }: BuscarLogoProps) {
  return (
    <div className="flex items-center justify-center">
      <img 
        src="/buscar_logo.png" 
        alt="Buscar Logo" 
        className={`h-12 w-auto max-w-[200px] object-contain border border-dashed border-gray-300/80 rounded-xl p-1 bg-slate-50/50 min-w-[140px] min-h-[44px] ${light ? 'border-neutral-700 bg-neutral-900/60' : ''}`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // If the custom image is not found, keep showing a clean, stylish placeholder frame
          e.currentTarget.style.minWidth = '140px';
          e.currentTarget.style.minHeight = '44px';
        }}
      />
    </div>
  );
}

