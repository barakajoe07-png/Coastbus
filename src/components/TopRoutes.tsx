import { uniqueDestinations } from '../data/routes';

export default function TopRoutes() {
  // Use the extracted unique destinations from our dataset
  const routes = uniqueDestinations;

  return (
    <div className="px-5 py-8 bg-white border-t border-gray-100 rounded-t-[2.5rem]">
      <h2 className="text-[1.35rem] font-bold text-gray-900 mb-5">Our top routes</h2>
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
            className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-900 text-xs font-bold transition-all shadow-sm hover:border-gray-400"
          >
            {route.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
