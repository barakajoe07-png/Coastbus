import { useState, useMemo, useEffect } from 'react';
import { Bus, MapPin, Calendar, Info, ChevronDown, ArrowLeft, Check, User, Phone, CreditCard, Briefcase, HeartPulse, Armchair, Star } from 'lucide-react';
import { routesData, uniqueOrigins } from '../data/routes';

type Step = 'search' | 'results' | 'seats' | 'details';

interface BusTrip {
  id: string;
  time: string;
  duration: string;
  normalFare: string;
  vipFare: string;
  bookedSeats: Set<string>;
  totalSeats: number;
  rating: string;
}

const VIP_ROWS = 2;
const TOTAL_ROWS = 11;

const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

function generateRandomBookedSeats(): Set<string> {
  const booked = new Set<string>();
  const allSeats: string[] = [];
  
  for (let r = 0; r < rowLetters.length; r++) {
    const row = rowLetters[r];
    allSeats.push(`${row}1`, `${row}2`, `${row}3`, `${row}4`);
  }
  
  // Guarantee at least 2 adjacent empty seats
  const emptyPairRow = rowLetters[Math.floor(Math.random() * rowLetters.length)];
  const emptyPairSide = Math.random() > 0.5 ? ['1', '2'] : ['3', '4'];
  const reservedEmpty = [`${emptyPairRow}${emptyPairSide[0]}`, `${emptyPairRow}${emptyPairSide[1]}`];

  allSeats.forEach(seat => {
    if (reservedEmpty.includes(seat)) return;
    // 40-70% chance a seat is booked to make it look realistic
    if (Math.random() > 0.5) {
      booked.add(seat);
    }
  });

  return booked;
}

export default function BookingForm() {
  const [step, setStep] = useState<Step>('search');

  const goToStep = (newStep: Step) => {
    setStep(newStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Search State
  const [tripType, setTripType] = useState('one-way');
  const [from, setFrom] = useState('Nairobi');
  const [to, setTo] = useState('Mombasa');
  const [date, setDate] = useState('2026-07-05');

  // Results State
  const [availableBuses, setAvailableBuses] = useState<BusTrip[]>([]);
  const [selectedBus, setSelectedBus] = useState<BusTrip | null>(null);
  
  // Seats State
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Details State
  const [passengerName, setPassengerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');
  const [customPickup, setCustomPickup] = useState('');
  const [luggage, setLuggage] = useState('No heavy luggage');
  const [medical, setMedical] = useState('');

  const availableDestinations = useMemo(() => {
    const dests = routesData.filter(r => r.origin === from).map(r => r.destination);
    return Array.from(new Set(dests)).sort();
  }, [from]);

  useEffect(() => {
    if (availableDestinations.length > 0 && !availableDestinations.includes(to)) {
      setTo(availableDestinations[0]);
    }
  }, [from, availableDestinations, to]);

  const currentRoute = routesData.find(r => r.origin === from && r.destination === to);

  const { normalFare, vipFare } = useMemo(() => {
    if (!currentRoute) return { normalFare: '', vipFare: '' };
    const matches = [...currentRoute.fare.matchAll(/(\d+)/g)].map(m => m[1]);
    if (matches.length > 1) {
      return { normalFare: matches[0], vipFare: matches[matches.length - 1] };
    }
    return { normalFare: matches[0] || currentRoute.fare, vipFare: matches[0] || currentRoute.fare };
  }, [currentRoute]);

  const isLongDistance = useMemo(() => {
    if (!currentRoute) return false;
    const match = currentRoute.duration.match(/(\d+)/);
    return match ? parseInt(match[1]) >= 10 : false;
  }, [currentRoute]);

  const handleSearch = () => {
    if (!currentRoute) return;
    const times = isLongDistance ? ['6:00 PM', '8:00 PM'] : ['3:00 PM', '6:00 PM', '8:00 PM', '10:00 PM'];
    
    const buses = times.map((t, i) => {
      const booked = generateRandomBookedSeats();
      const rating = (4.6 + Math.random() * 0.4).toFixed(1); // Random rating between 4.6 and 5.0
      return {
        id: `bus-${i}`,
        time: t,
        duration: currentRoute.duration,
        normalFare,
        vipFare,
        bookedSeats: booked,
        totalSeats: TOTAL_ROWS * 4,
        rating
      };
    });
    
    setAvailableBuses(buses);
    goToStep('results');
  };

  const handleViewSeats = (bus: BusTrip) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
    goToStep('seats');
  };

  const toggleSeat = (seatId: string) => {
    if (selectedBus?.bookedSeats.has(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getTotalPrice = () => {
    if (!selectedBus) return 0;
    return selectedSeats.reduce((acc, seat) => {
      const row = parseInt(seat);
      const price = row <= VIP_ROWS ? parseInt(selectedBus.vipFare) : parseInt(selectedBus.normalFare);
      return acc + price;
    }, 0);
  };

  const handleFinalBook = () => {
    const seatsStr = selectedSeats.join(', ');
    const totalFare = getTotalPrice();

    let text = `*New Booking Request*\n\n`;
    text += `*Trip:* ${tripType === 'one-way' ? 'One Way' : 'Round Trip'}\n`;
    text += `*Route:* ${from} to ${to}\n`;
    text += `*Date:* ${date}\n`;
    text += `*Time:* ${selectedBus?.time}\n`;
    text += `*Seats:* ${seatsStr} (Total: KES ${totalFare})\n\n`;
    text += `*Passenger Details:*\n`;
    text += `Name: ${passengerName}\n`;
    text += `ID: ${idNumber}\n`;
    text += `Phone: ${phoneNumber}\n`;
    const finalPickup = pickupPoint === 'Other' ? customPickup : pickupPoint;
    if (finalPickup) text += `Pickup: ${finalPickup}\n`;
    text += `Luggage: ${luggage}\n`;
    if (medical) text += `Medical: ${medical}\n`;

    const whatsappUrl = `https://wa.me/254710492539?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleSelectRoute = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { from, to } = customEvent.detail;
        if (from) setFrom(from);
        if (to) setTo(to);
        goToStep('search');
      }
    };
    window.addEventListener('select-route', handleSelectRoute);
    return () => window.removeEventListener('select-route', handleSelectRoute);
  }, []);

  const renderSearchStep = () => (
    <>
      <div className="flex items-center gap-6 mb-6 px-1">
        <label className="flex items-center gap-2 text-sm font-medium text-black cursor-pointer">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tripType === 'one-way' ? 'border-black' : 'border-gray-300'}`}>
             {tripType === 'one-way' && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
          </div>
          <input 
            type="radio" 
            name="tripType" 
            checked={tripType === 'one-way'}
            onChange={() => setTripType('one-way')}
            className="hidden"
          />
          One Way
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-500 cursor-pointer">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tripType === 'round-trip' ? 'border-black' : 'border-gray-300'}`}>
             {tripType === 'round-trip' && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
          </div>
          <input 
            type="radio" 
            name="tripType" 
            checked={tripType === 'round-trip'}
            onChange={() => setTripType('round-trip')}
            className="hidden"
          />
          Round Trip
        </label>
      </div>

      <div className="space-y-3">
        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
          <div className="flex items-center gap-3 relative">
            <Bus className="w-5 h-5 text-gray-400 shrink-0" />
            <select 
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full font-bold text-gray-900 outline-none uppercase bg-transparent text-lg appearance-none cursor-pointer pr-8"
            >
              {uniqueOrigins.map(origin => (
                <option key={origin} value={origin}>{origin}</option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-0 pointer-events-none" />
          </div>
        </div>

        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
          <div className="flex items-center gap-3 relative">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
            <select 
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full font-bold text-gray-900 outline-none uppercase bg-transparent text-lg appearance-none cursor-pointer pr-8"
            >
              {availableDestinations.length > 0 ? (
                availableDestinations.map(dest => (
                  <option key={dest} value={dest}>{dest}</option>
                ))
              ) : (
                <option value={to}>{to}</option>
              )}
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-0 pointer-events-none" />
          </div>
        </div>

        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">Travel Date</label>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full font-bold text-gray-900 outline-none bg-transparent text-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleSearch}
        className="w-full mt-6 bg-red-700 hover:bg-red-800 text-white font-bold py-4 rounded-full transition-colors text-lg shadow-md"
      >
        SEARCH BUS
      </button>
    </>
  );

  const renderResultsStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => goToStep('search')} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h3 className="font-bold text-gray-900 text-lg uppercase">{from} - {to}</h3>
          <p className="text-sm text-gray-500">{date} • {availableBuses.length} buses found</p>
        </div>
      </div>

      <div className="space-y-4">
        {availableBuses.map((bus) => {
          const availableSeatsCount = bus.totalSeats - bus.bookedSeats.size;
          return (
            <div key={bus.id} className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-black text-gray-900">{bus.time}</h4>
                  <p className="text-sm text-gray-500">Duration: {bus.duration}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md text-green-700 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-green-700" />
                    {bus.rating}
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-gray-100 text-black text-xs font-bold rounded-md">
                    {availableSeatsCount} seats left
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-500">Normal</span><br/>
                  <span className="font-bold text-gray-900">KES {bus.normalFare}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[#ffb000] font-bold">VIP</span><br/>
                  <span className="font-bold text-gray-900">KES {bus.vipFare}</span>
                </div>
              </div>

              <button 
                onClick={() => handleViewSeats(bus)}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors shadow-sm"
              >
                View Seats
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSeat = (rowLabel: string, col: string, isVip: boolean) => {
    const seatId = `${rowLabel}${col}`;
    const isBooked = selectedBus?.bookedSeats.has(seatId);
    const isSelected = selectedSeats.includes(seatId);

    let colorClass = "text-black";

    if (isBooked) {
      colorClass = "text-gray-300";
    } else if (isSelected) {
      colorClass = "text-green-500";
    } else if (isVip) {
      colorClass = "text-[#ffb000]";
    }

    return (
      <button
        key={seatId}
        disabled={isBooked}
        onClick={() => toggleSeat(seatId)}
        className={`w-10 h-11 p-1 bg-white rounded-md shadow-md border border-gray-100 relative flex items-center justify-center transition-all group
          ${!isBooked && !isSelected ? 'hover:-translate-y-0.5 hover:shadow-lg' : ''}
          ${isBooked ? 'cursor-not-allowed opacity-60 bg-gray-50' : 'cursor-pointer'}
          ${isSelected ? 'border-green-400 bg-green-50 ring-1 ring-green-400 shadow-md' : ''}
        `}
      >
        <Armchair className={`w-full h-full ${colorClass} drop-shadow-md`} strokeWidth={1.5} />
        <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold mt-2
          ${isBooked ? 'text-gray-400' : 'text-gray-800'}
        `}>
          {seatId}
        </span>
      </button>
    );
  };

  const renderSeatsStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => goToStep('results')} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h3 className="font-bold text-gray-900 text-lg">Select Seats</h3>
        </div>
      </div>

      <div className="flex justify-center gap-4 text-xs font-medium text-gray-600 mb-6 flex-wrap">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#ffb000]"></div> VIP ({selectedBus?.vipFare})</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-black"></div> Normal ({selectedBus?.normalFare})</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-500"></div> Selected</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gray-300"></div> Booked</div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 max-w-[320px] mx-auto relative overflow-hidden shadow-inner">
        {/* Front of bus indicator */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-gray-300 pb-3">
          <div className="text-gray-400 font-medium text-[10px] tracking-widest uppercase">Door</div>
          <div className="w-8 h-8 rounded-full border-[3px] border-gray-400 flex items-center justify-center relative">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full -mt-2"></div>
            <div className="w-6 h-0.5 bg-gray-400 absolute bottom-2 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {rowLetters.map((rowLabel, rIndex) => {
            const isVip = rIndex < VIP_ROWS;
            return (
              <div key={rowLabel} className="flex justify-between items-center px-1">
                <div className="flex gap-2">
                  {renderSeat(rowLabel, '1', isVip)}
                  {renderSeat(rowLabel, '2', isVip)}
                </div>
                <div className="flex gap-2">
                  {renderSeat(rowLabel, '3', isVip)}
                  {renderSeat(rowLabel, '4', isVip)}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Back of bus indicator */}
        <div className="mt-8 border-t-2 border-solid border-gray-200 pt-4 flex justify-center gap-2 px-1">
           <div className="w-12 h-4 bg-gray-200 rounded-t-lg"></div>
           <div className="w-12 h-4 bg-gray-200 rounded-t-lg"></div>
           <div className="w-12 h-4 bg-gray-200 rounded-t-lg"></div>
           <div className="w-12 h-4 bg-gray-200 rounded-t-lg"></div>
        </div>
      </div>

      <div className="mt-6">
        <button 
          disabled={selectedSeats.length === 0}
          onClick={() => goToStep('details')}
          className={`w-full font-bold py-4 rounded-full transition-colors text-lg shadow-md flex items-center justify-center gap-2
            ${selectedSeats.length > 0 ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
          `}
        >
          {selectedSeats.length > 0 ? `Continue (${selectedSeats.length} Selected)` : 'Select at least one seat'}
        </button>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => goToStep('seats')} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h3 className="font-bold text-gray-900 text-lg">Finalise Booking</h3>
      </div>

      <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 mb-6 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-600 font-semibold mb-0.5 uppercase tracking-wider">Currently Selected</p>
          <p className="font-black text-black text-lg">{selectedSeats.length} Seat(s): {selectedSeats.join(', ')}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600 font-semibold mb-0.5 uppercase tracking-wider">Total</p>
          <p className="font-black text-black text-xl">KES {getTotalPrice()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400 shrink-0" />
            <input 
              type="text" 
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full font-bold text-gray-900 outline-none bg-transparent text-base"
            />
          </div>
        </div>

        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400 shrink-0" />
            <input 
              type="tel" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="07..."
              className="w-full font-bold text-gray-900 outline-none bg-transparent text-base"
            />
          </div>
        </div>

        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">ID Number</label>
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400 shrink-0" />
            <input 
              type="text" 
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="National ID"
              className="w-full font-bold text-gray-900 outline-none bg-transparent text-base"
            />
          </div>
        </div>

        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">Pick-up Point</label>
          <div className="flex items-center gap-3 relative">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
            <select 
              value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
              className="w-full font-bold text-gray-900 outline-none bg-transparent text-base appearance-none cursor-pointer pr-8"
            >
              <option value="">Select boarding point...</option>
              {from === 'Nairobi' && (
                <>
                  <option value="River Road">River Road</option>
                  <option value="Afya Centre">Afya Centre</option>
                  <option value="Mombasa Road">Mombasa Road</option>
                </>
              )}
              {from === 'Mombasa' && (
                <>
                  <option value="Mwembe Tayari">Mwembe Tayari</option>
                  <option value="Nyali">Nyali</option>
                  <option value="Bamburi">Bamburi</option>
                </>
              )}
              {from !== 'Nairobi' && from !== 'Mombasa' && (
                <option value={`${from} Main Stage`}>{from} Main Stage</option>
              )}
              <option value="Other">Other / Along the way</option>
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-0 pointer-events-none" />
          </div>
        </div>

        {pickupPoint === 'Other' && (
          <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
            <label className="block text-xs font-medium text-gray-500 mb-1">Specify Pickup Point</label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                value={customPickup}
                onChange={(e) => setCustomPickup(e.target.value)}
                placeholder="e.g. Voi Total Station"
                className="w-full font-bold text-gray-900 outline-none bg-transparent text-base"
              />
            </div>
          </div>
        )}

        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">Luggage?</label>
          <div className="flex items-center gap-3 relative">
            <Briefcase className="w-5 h-5 text-gray-400 shrink-0" />
            <select 
              value={luggage}
              onChange={(e) => setLuggage(e.target.value)}
              className="w-full font-bold text-gray-900 outline-none bg-transparent text-base appearance-none cursor-pointer pr-8"
            >
              <option value="No heavy luggage">No heavy luggage</option>
              <option value="Yes, heavy luggage">Yes, heavy luggage</option>
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-0 pointer-events-none" />
          </div>
        </div>

        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">Medical Conditions (Optional)</label>
          <div className="flex items-start gap-3">
            <HeartPulse className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <textarea 
              value={medical}
              onChange={(e) => setMedical(e.target.value)}
              placeholder="Any conditions we should know about?"
              rows={2}
              className="w-full font-bold text-gray-900 outline-none bg-transparent text-base resize-none"
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleFinalBook}
        disabled={!passengerName || !phoneNumber || !idNumber || (pickupPoint === 'Other' && !customPickup)}
        className={`w-full mt-6 font-bold py-4 rounded-full transition-colors text-lg shadow-md flex items-center justify-center gap-2
          ${(!passengerName || !phoneNumber || !idNumber || (pickupPoint === 'Other' && !customPickup)) 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-[#00a859] hover:bg-green-700 text-white'}
        `}
      >
        <span className="w-5 h-5 rounded flex items-center justify-center border-2 border-current mr-1">
          <div className="w-3 h-3 bg-current rounded-sm opacity-20" />
        </span>
        Book via WhatsApp
      </button>
      <p className="text-center text-xs text-gray-400 font-bold tracking-widest uppercase mt-4">
        Authorized by Coast Bus
      </p>
    </div>
  );

  return (
    <div className="p-5 bg-white rounded-3xl shadow-sm m-4 border border-gray-100 overflow-hidden relative">
      {step === 'search' && (
        <div className="text-center mb-6 text-sm font-medium text-gray-600 flex items-center justify-center gap-1.5">
          Book your next ticket using 
          <span className="font-black text-xl text-[#36498c] tracking-tight flex items-center">
            <span className="text-red-500 bg-red-100 px-1 py-0.5 rounded leading-none text-sm mr-0.5">T</span>
            ravler
          </span>
        </div>
      )}
      
      {step === 'search' && renderSearchStep()}
      {step === 'results' && renderResultsStep()}
      {step === 'seats' && renderSeatsStep()}
      {step === 'details' && renderDetailsStep()}
    </div>
  );
}
