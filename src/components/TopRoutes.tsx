import { uniqueDestinations } from '../data/routes';

export default function TopRoutes() {
  // Use the extracted unique destinations from our dataset
  const routes = uniqueDestinations;

  return (
    <div className="px-5 py-8 bg-gray-50/50 border-t border-gray-100 rounded-t-[2.5rem]">
      <h2 className="text-[1.35rem] font-bold text-[#1b36d1] mb-5">Our top destinations</h2>
      <div className="flex flex-wrap gap-2.5">
        {routes.map((route, index) => (
          <button
            key={index}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('select-route', { 
                detail: { 
                  to: route,
                  from: route === 'Nairobi' ? 'Mombasa' : 'Nairobi'
                } 
              }));
            }}
            className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all shadow-sm
              ${route === 'Mombasa' || route === 'Nairobi'
                ? 'bg-[#1b36d1] text-white border-[#1b36d1]' 
                : 'bg-white text-[#36498c] border-gray-200 hover:border-[#1b36d1] hover:text-[#1b36d1]'
              }
            `}
          >
            {route.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
