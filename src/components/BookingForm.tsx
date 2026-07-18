import { useState, useMemo, useEffect } from 'react';
import { Bus, MapPin, Calendar, Info, ChevronDown, ArrowLeft, Check, User, Phone, CreditCard, Briefcase, HeartPulse, Armchair, Star, Search, X } from 'lucide-react';
import { routesData, uniqueOrigins } from '../data/routes';
import BookingFormSkeleton from './BookingFormSkeleton';

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
  vehicleType?: string;
}

interface PickupPointItem {
  value: string;
  label: string;
  group?: string;
}

const playSeatSound = (isSelecting: boolean) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (isSelecting) {
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.08);
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
    } else {
      osc.frequency.setValueAtTime(700, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + 0.08);
      gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
    }

    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (error) {
    console.warn('Audio context failed to initialize:', error);
  }
};

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

const getPickupPoints = (origin: string): PickupPointItem[] => {
  if (origin === 'Nairobi') {
    return [
      // Nairobi City & Eastern Suburbs
      { value: 'River Road', label: 'River Road', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Tearoom', label: 'Tearoom', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Eastleigh', label: 'Eastleigh', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'South C', label: 'South C', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Airtel Total', label: 'Airtel Total', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'General Motors', label: 'General Motors', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Imara Daima Total', label: 'Imara Daima Total', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Cabanas', label: 'Cabanas', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'GSU - Allsops', label: 'GSU - Allsops', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Industrial Area Go Down', label: 'Industrial Area Go Down', group: 'Nairobi City & Eastern Suburbs' },
      
      // Nairobi West & Nakuru Highway (Heading West)
      { value: 'Westlands Shell', label: 'Westlands Shell', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Kangemi Stage', label: 'Kangemi Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Kikuyu Stage', label: 'Kikuyu Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Kinoo 87 Stage', label: 'Kinoo 87 Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Zambezi Stage', label: 'Zambezi Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Gitaru Stage', label: 'Gitaru Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Limuru Stage', label: 'Limuru Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Fly Over Stage', label: 'Fly Over Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Kimende Stage', label: 'Kimende Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Naivasha Stage', label: 'Naivasha Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Nakuru Stage', label: 'Nakuru Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Londiani Stage', label: 'Londiani Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Gilgil', label: 'Gilgil', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Ruaka', label: 'Ruaka', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'TRM Thika Road', label: 'TRM Thika Road', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      { value: 'Eldoret Stage', label: 'Eldoret Stage', group: 'Nairobi West & Nakuru Highway (Heading West)' },
      
      // Mombasa Highway Stops (Heading South-East)
      { value: 'Mlolongo - Petmark', label: 'Mlolongo - Petmark', group: 'Mombasa Highway Stops (Heading South-East)' },
      { value: 'Mlolongo (Prestige)', label: 'Mlolongo (Prestige)', group: 'Mombasa Highway Stops (Heading South-East)' },
      { value: 'Arthriver - Devki', label: 'Arthriver - Devki', group: 'Mombasa Highway Stops (Heading South-East)' },
      { value: 'Machakos Junction', label: 'Machakos Junction', group: 'Mombasa Highway Stops (Heading South-East)' },
      { value: 'Salama', label: 'Salama', group: 'Mombasa Highway Stops (Heading South-East)' },
      { value: 'Sultan Hamud', label: 'Sultan Hamud', group: 'Mombasa Highway Stops (Heading South-East)' },
      { value: 'Emali', label: 'Emali', group: 'Mombasa Highway Stops (Heading South-East)' },
      { value: 'Makutano', label: 'Makutano', group: 'Mombasa Highway Stops (Heading South-East)' },
      { value: 'Kibwezi', label: 'Kibwezi', group: 'Mombasa Highway Stops (Heading South-East)' },
      { value: 'Mtito Andei', label: 'Mtito Andei', group: 'Mombasa Highway Stops (Heading South-East)' },
      
      { value: 'Other', label: 'Other / Along the way' }
    ];
  }
  
  if (origin === 'Mombasa') {
    return [
      { value: 'Mwembe Tayari', label: 'Mwembe Tayari' },
      { value: 'Nyali', label: 'Nyali' },
      { value: 'Bamburi', label: 'Bamburi' },
      { value: 'Mtwapa Stage', label: 'Mtwapa Stage' },
      { value: 'Kilifi Stage', label: 'Kilifi Stage' },
      { value: 'Malindi Stage', label: 'Malindi Stage' },
      { value: 'Other', label: 'Other / Along the way' }
    ];
  }
  
  if (origin === 'Eldoret') {
    return [
      { value: 'Eldoret Main Stage', label: 'Eldoret Main Stage' },
      { value: 'Nakuru Stage', label: 'Nakuru Stage' },
      { value: 'Naivasha Stage', label: 'Naivasha Stage' },
      { value: 'Other', label: 'Other / Along the way' }
    ];
  }
  
  return [
    { value: `${origin} Main Stage`, label: `${origin} Main Stage` },
    { value: 'Other', label: 'Other / Along the way' }
  ];
};

const getDropPoints = (destination: string): PickupPointItem[] => {
  if (destination === 'Mombasa') {
    return [
      { value: 'Mwembe Tayari', label: 'Mwembe Tayari' },
      { value: 'Nyali', label: 'Nyali' },
      { value: 'Bamburi', label: 'Bamburi' },
      { value: 'Mtwapa Stage', label: 'Mtwapa Stage' },
      { value: 'Kilifi Stage', label: 'Kilifi Stage' },
      { value: 'Malindi Stage', label: 'Malindi Stage' },
      { value: 'Other', label: 'Other / Along the way' }
    ];
  }
  
  if (destination === 'Nairobi') {
    return [
      { value: 'River Road', label: 'River Road', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Tearoom', label: 'Tearoom', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Eastleigh', label: 'Eastleigh', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'South C', label: 'South C', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Airtel Total', label: 'Airtel Total', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'General Motors', label: 'General Motors', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Imara Daima Total', label: 'Imara Daima Total', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Cabanas', label: 'Cabanas', group: 'Nairobi City & Eastern Suburbs' },
      { value: 'Westlands Shell', label: 'Westlands Shell', group: 'Nairobi West & Nakuru Highway' },
      { value: 'Other', label: 'Other / Along the way' }
    ];
  }

  if (destination === 'Eldoret') {
    return [
      { value: 'Eldoret Main Stage', label: 'Eldoret Main Stage' },
      { value: 'Other', label: 'Other / Along the way' }
    ];
  }

  return [
    { value: `${destination} Main Stage`, label: `${destination} Main Stage` },
    { value: 'Other', label: 'Other / Along the way' }
  ];
};

const formatMoney = (val: string | number) => {
  const numericVal = typeof val === 'string' ? parseInt(val) || 0 : val;
  return new Intl.NumberFormat('en-KE').format(numericVal);
};

const getRouteAbbreviation = (fromCity: string, toCity: string) => {
  const getAbbr = (city: string) => {
    const c = city.toUpperCase();
    if (c === 'NAIROBI') return 'NBI';
    if (c === 'MOMBASA') return 'MSA';
    if (c === 'MTWAPA') return 'MTWP';
    if (c === 'ELDORET') return 'ELD';
    if (c === 'NAKURU') return 'NKR';
    if (c === 'MALINDI') return 'MLD';
    if (c === 'KILIFI') return 'KLF';
    if (c === 'BAMBURI') return 'BMB';
    return c.slice(0, 3);
  };
  return `${getAbbr(fromCity)}-${getAbbr(toCity)}`;
};

const formatTimePadded = (timeStr: string) => {
  const parts = timeStr.split(' ');
  if (parts.length === 2) {
    const timeParts = parts[0].split(':');
    if (timeParts.length === 2) {
      const hours = timeParts[0].padStart(2, '0');
      return `${hours}:${timeParts[1]} ${parts[1]}`;
    }
  }
  return timeStr;
};

const calculateArrivalTime = (departureTimeStr: string, durationStr: string) => {
  try {
    const [time, modifier] = departureTimeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (!minutes) minutes = 0;
    
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    
    let durationHours = 0;
    let durationMinutes = 0;
    
    const hMatch = durationStr.match(/(\d+)\s*h/);
    const mMatch = durationStr.match(/(\d+)\s*m/);
    const hrMatch = durationStr.match(/(\d+)\s*hour/);
    
    if (hMatch) {
      durationHours = parseInt(hMatch[1]);
    } else if (hrMatch) {
      durationHours = parseInt(hrMatch[1]);
    }
    
    if (mMatch) {
      durationMinutes = parseInt(mMatch[1]);
    } else {
      // If no minutes match, check if it's "14-16 hours" and take average or similar
      const rangeMatch = durationStr.match(/(\d+)-(\d+)\s*hours/);
      if (rangeMatch) {
        durationHours = Math.round((parseInt(rangeMatch[1]) + parseInt(rangeMatch[2])) / 2);
      }
    }
    
    let finalHours = (hours + durationHours) % 24;
    let finalMinutes = minutes + durationMinutes;
    if (finalMinutes >= 60) {
      finalHours = (finalHours + Math.floor(finalMinutes / 60)) % 24;
      finalMinutes = finalMinutes % 60;
    }
    
    const ampm = finalHours >= 12 ? 'PM' : 'AM';
    let displayHours = finalHours % 12;
    if (displayHours === 0) displayHours = 12;
    const displayMinutes = finalMinutes.toString().padStart(2, '0');
    
    return `${displayHours.toString().padStart(2, '0')}:${displayMinutes} ${ampm}`;
  } catch (e) {
    return '07:00 AM';
  }
};

const BuscarLogoMini = () => (
  <img 
    src="/buscar_logo.png" 
    alt="Buscar Logo" 
    className="h-8 w-auto max-w-[80px] object-contain border border-dashed border-gray-300 rounded-lg p-0.5 bg-slate-50/50 shrink-0"
    referrerPolicy="no-referrer"
    onError={(e) => {
      e.currentTarget.style.minWidth = '50px';
      e.currentTarget.style.minHeight = '32px';
    }}
  />
);

export default function BookingForm() {
  const [step, setStep] = useState<Step>('search');
  const [isStepLoading, setIsStepLoading] = useState(false);
  const [targetStep, setTargetStep] = useState<Step>('search');

  const goToStep = (newStep: Step) => {
    setIsStepLoading(true);
    setTargetStep(newStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const timer = setTimeout(() => {
      setStep(newStep);
      setIsStepLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
    
    return () => clearTimeout(timer);
  };
  
  // Search State
  const [tripType, setTripType] = useState('one-way');
  const [from, setFrom] = useState('Nairobi');
  const [to, setTo] = useState('Mombasa');
  const [date, setDate] = useState('2026-07-05');

  // Custom Dropdown States
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [pickupSearch, setPickupSearch] = useState('');
  const [dropSearch, setDropSearch] = useState('');

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
  const [dropPoint, setDropPoint] = useState('');
  const [customDrop, setCustomDrop] = useState('');
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
    const times = isLongDistance 
      ? ['09:30 PM', '10:00 PM', '10:15 PM'] 
      : ['08:30 AM', '11:00 AM', '03:00 PM', '06:00 PM', '09:30 PM', '10:15 PM'];
    
    const vehicleTypesList = [
      '45 SEATER',
      '45 SEATER premium class',
      '42 SEATER premium class G7',
      '44 SEATER G8 Cruiser'
    ];

    const ratingList = ['3.2', '1.0', '2.0', '4.9', '4.2', '3.8'];
    
    const buses = times.map((t, i) => {
      const booked = generateRandomBookedSeats();
      const rating = ratingList[i % ratingList.length];
      return {
        id: `bus-${i}`,
        time: t,
        duration: currentRoute.duration,
        normalFare,
        vipFare,
        bookedSeats: booked,
        totalSeats: TOTAL_ROWS * 4,
        rating,
        vehicleType: vehicleTypesList[i % vehicleTypesList.length]
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
      playSeatSound(false);
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      playSeatSound(true);
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
    const totalFare = formatMoney(getTotalPrice());
    const finalPickup = pickupPoint === 'Other' ? (customPickup || 'Other') : (pickupPoint || 'Not specified');
    const finalDrop = dropPoint === 'Other' ? (customDrop || 'Other') : (dropPoint || 'Not specified');

    let text = `*━━━━━━━━━━━━━━━━━━━━━*\n`;
    text += `   *BUSCAR EAST AFRICA*\n`;
    text += `   _Eagle Above The Rest_\n`;
    text += `*━━━━━━━━━━━━━━━━━━━━━*\n\n`;
    text += `*OFFICIAL BOOKING REQUEST*\n`;
    text += `---------------------------------------------\n`;
    text += `*Route:* _${from.toUpperCase()} to ${to.toUpperCase()}_\n`;
    text += `*Trip Type:* _${tripType === 'one-way' ? 'One-Way' : 'Round-Trip'}_\n`;
    text += `*Date of Travel:* _${date}_\n`;
    text += `*Scheduled Departure:* _${selectedBus?.time || 'Pending'}_\n`;
    text += `*Service Class:* _${selectedBus?.vehicleType || 'Standard Class'}_\n\n`;
    
    text += `*PASSENGER INFORMATION:*\n`;
    text += `• *Name:* _${passengerName}_\n`;
    text += `• *ID / Passport:* _${idNumber}_\n`;
    text += `• *Contact Phone:* _${phoneNumber}_\n\n`;
    
    text += `*SEAT RESERVATION:*\n`;
    text += `• *Selected Seat(s):* *${seatsStr}*\n`;
    text += `• *Total Payable Fare:* *KES ${totalFare}*\n\n`;
    
    text += `*TRAVEL STATIONS:*\n`;
    text += `• *Boarding Point:* *${finalPickup}*\n`;
    text += `• *Alighting Point:* *${finalDrop}*\n\n`;
    
    text += `*ADDITIONAL SPECIFICATIONS:*\n`;
    text += `• *Luggage Allowance:* _${luggage}_\n`;
    text += `• *Special Medical Needs:* _${medical || 'None specified'}_\n\n`;
    
    text += `*━━━━━━━━━━━━━━━━━━━━━*\n`;
    text += `_Thank you for choosing Buscar. This request has been pre-validated and formatted via the official online booking engine._`;

    const whatsappUrl = `https://wa.me/254754303484?text=${encodeURIComponent(text)}`;
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

  useEffect(() => {
    setPickupPoint('');
    setCustomPickup('');
  }, [from]);

  useEffect(() => {
    setDropPoint('');
    setCustomDrop('');
  }, [to]);

  const renderCustomDropDropdown = (onSelect: (value: string) => void, selectedValue: string, dropdownId: string) => {
    const points = getDropPoints(to);
    const filteredPoints = points.filter(p => p.label.toLowerCase().includes(dropSearch.toLowerCase()));

    // Group filteredPoints by their group field
    const groups: { [key: string]: PickupPointItem[] } = {};
    const nonGrouped: PickupPointItem[] = [];

    filteredPoints.forEach(p => {
      if (p.group) {
        if (!groups[p.group]) {
          groups[p.group] = [];
        }
        groups[p.group].push(p);
      } else {
        nonGrouped.push(p);
      }
    });

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search dropping point..."
            value={dropSearch}
            onChange={(e) => setDropSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full text-sm font-bold bg-transparent outline-none text-gray-800"
          />
          {dropSearch && (
            <button onClick={(e) => { e.stopPropagation(); setDropSearch(''); }}>
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        <div className="max-h-64 overflow-y-auto py-1">
          {Object.keys(groups).map(groupName => (
            <div key={groupName}>
              <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                {groupName}
              </div>
              {groups[groupName].map(item => (
                <button
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item.value);
                    setOpenDropdown(null);
                    setDropSearch('');
                  }}
                  className={`w-full text-left px-6 py-2.5 text-sm font-bold flex items-center justify-between transition-colors ${selectedValue === item.value ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>{item.label}</span>
                  {selectedValue === item.value && <Check className="w-4 h-4 text-red-600" />}
                </button>
              ))}
            </div>
          ))}
          {nonGrouped.length > 0 && (
            <div>
              {Object.keys(groups).length > 0 && (
                <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 border-t border-gray-100">
                  Stations
                </div>
              )}
              {nonGrouped.map(item => (
                <button
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item.value);
                    setOpenDropdown(null);
                    setDropSearch('');
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between transition-colors ${selectedValue === item.value ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>{item.label}</span>
                  {selectedValue === item.value && <Check className="w-4 h-4 text-red-600" />}
                </button>
              ))}
            </div>
          )}
          {filteredPoints.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-gray-400 font-medium">
              No dropping points found
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCustomPickupDropdown = (onSelect: (value: string) => void, selectedValue: string, dropdownId: string) => {
    const points = getPickupPoints(from);
    const filteredPoints = points.filter(p => p.label.toLowerCase().includes(pickupSearch.toLowerCase()));

    // Group filteredPoints by their group field
    const groups: { [key: string]: PickupPointItem[] } = {};
    const nonGrouped: PickupPointItem[] = [];

    filteredPoints.forEach(p => {
      if (p.group) {
        if (!groups[p.group]) {
          groups[p.group] = [];
        }
        groups[p.group].push(p);
      } else {
        nonGrouped.push(p);
      }
    });

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search boarding point..."
            value={pickupSearch}
            onChange={(e) => setPickupSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full text-sm font-bold bg-transparent outline-none text-gray-800"
          />
          {pickupSearch && (
            <button onClick={(e) => { e.stopPropagation(); setPickupSearch(''); }}>
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        <div className="max-h-64 overflow-y-auto py-1">
          {Object.keys(groups).map(groupName => (
            <div key={groupName}>
              <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                {groupName}
              </div>
              {groups[groupName].map(item => (
                <button
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item.value);
                    setOpenDropdown(null);
                    setPickupSearch('');
                  }}
                  className={`w-full text-left px-6 py-2.5 text-sm font-bold flex items-center justify-between transition-colors ${selectedValue === item.value ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>{item.label}</span>
                  {selectedValue === item.value && <Check className="w-4 h-4 text-red-600" />}
                </button>
              ))}
            </div>
          ))}
          {nonGrouped.length > 0 && (
            <div>
              {Object.keys(groups).length > 0 && (
                <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 border-t border-gray-100">
                  Stations
                </div>
              )}
              {nonGrouped.map(item => (
                <button
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item.value);
                    setOpenDropdown(null);
                    setPickupSearch('');
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between transition-colors ${selectedValue === item.value ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>{item.label}</span>
                  {selectedValue === item.value && <Check className="w-4 h-4 text-red-600" />}
                </button>
              ))}
            </div>
          )}
          {filteredPoints.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-gray-400 font-medium">
              No boarding points found
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSearchStep = () => (
    <>
      <div className="flex items-center gap-6 mb-6 px-1">
        <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-900 cursor-pointer select-none">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${tripType === 'one-way' ? 'border-[#1b36d1] bg-blue-50/50' : 'border-gray-300'}`}>
             {tripType === 'one-way' && <div className="w-2.5 h-2.5 rounded-full bg-[#1b36d1]" />}
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
        <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer select-none">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${tripType === 'round-trip' ? 'border-[#1b36d1] bg-blue-50/50' : 'border-gray-300'}`}>
             {tripType === 'round-trip' && <div className="w-2.5 h-2.5 rounded-full bg-[#1b36d1]" />}
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

      <div className="space-y-3.5">
        <div className={`relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all ${openDropdown === 'from' ? 'z-40' : 'z-10'}`}>
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">From</label>
          <div 
            onClick={() => setOpenDropdown(openDropdown === 'from' ? null : 'from')}
            className="flex items-center justify-between gap-3 cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <Bus className="w-5 h-5 text-gray-400 shrink-0" />
              <span className="font-extrabold text-gray-900 text-base md:text-lg tracking-tight uppercase">{from}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openDropdown === 'from' ? 'rotate-180' : ''}`} />
          </div>

          {openDropdown === 'from' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2.5 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search origin..."
                  value={fromSearch}
                  onChange={(e) => setFromSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full text-sm font-semibold bg-transparent outline-none text-gray-800"
                />
                {fromSearch && (
                  <button onClick={(e) => { e.stopPropagation(); setFromSearch(''); }}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {uniqueOrigins
                  .filter(o => o.toLowerCase().includes(fromSearch.toLowerCase()))
                  .map(origin => (
                    <button
                      key={origin}
                      onClick={() => {
                        setFrom(origin);
                        setOpenDropdown(null);
                        setFromSearch('');
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold flex items-center justify-between transition-colors ${from === origin ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{origin}</span>
                      </div>
                      {from === origin && <Check className="w-4 h-4 text-red-600" />}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className={`relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all ${openDropdown === 'to' ? 'z-40' : 'z-10'}`}>
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">To</label>
          <div 
            onClick={() => setOpenDropdown(openDropdown === 'to' ? null : 'to')}
            className="flex items-center justify-between gap-3 cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <span className="font-extrabold text-gray-900 text-base md:text-lg tracking-tight uppercase">{to}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openDropdown === 'to' ? 'rotate-180' : ''}`} />
          </div>

          {openDropdown === 'to' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2.5 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search destination..."
                  value={toSearch}
                  onChange={(e) => setToSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full text-sm font-semibold bg-transparent outline-none text-gray-800"
                />
                {toSearch && (
                  <button onClick={(e) => { e.stopPropagation(); setToSearch(''); }}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {(availableDestinations.length > 0 ? availableDestinations : [to])
                  .filter(d => d.toLowerCase().includes(toSearch.toLowerCase()))
                  .map(dest => (
                    <button
                      key={dest}
                      onClick={() => {
                        setTo(dest);
                        setOpenDropdown(null);
                        setToSearch('');
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold flex items-center justify-between transition-colors ${to === dest ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{dest}</span>
                      </div>
                      {to === dest && <Check className="w-4 h-4 text-red-600" />}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all z-10">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Travel Date</label>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base cursor-pointer"
            />
          </div>
        </div>

        <div className={`relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all ${openDropdown === 'pickup-search' ? 'z-40' : 'z-10'}`}>
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Pick-up / Boarding Point</label>
          <div 
            onClick={() => setOpenDropdown(openDropdown === 'pickup-search' ? null : 'pickup-search')}
            className="flex items-center justify-between gap-3 cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <span className={`text-base font-semibold tracking-tight ${pickupPoint ? 'text-gray-900' : 'text-gray-400 font-medium'}`}>
                {pickupPoint || 'Select boarding point...'}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openDropdown === 'pickup-search' ? 'rotate-180' : ''}`} />
          </div>

          {openDropdown === 'pickup-search' && renderCustomPickupDropdown((val) => setPickupPoint(val), pickupPoint, 'pickup-search')}
        </div>

        {pickupPoint === 'Other' && (
          <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all animate-in fade-in slide-in-from-top-2 duration-200 z-10">
            <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Specify Pick-up Point</label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                value={customPickup}
                onChange={(e) => setCustomPickup(e.target.value)}
                placeholder="e.g. Voi Total Station"
                className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base placeholder:text-gray-400"
              />
            </div>
          </div>
        )}

        <div className={`relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all ${openDropdown === 'drop-search' ? 'z-40' : 'z-10'}`}>
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Drop-off / Alighting Point</label>
          <div 
            onClick={() => setOpenDropdown(openDropdown === 'drop-search' ? null : 'drop-search')}
            className="flex items-center justify-between gap-3 cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <span className={`text-base font-semibold tracking-tight ${dropPoint ? 'text-gray-900' : 'text-gray-400 font-medium'}`}>
                {dropPoint || 'Select dropping point...'}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openDropdown === 'drop-search' ? 'rotate-180' : ''}`} />
          </div>

          {openDropdown === 'drop-search' && renderCustomDropDropdown((val) => setDropPoint(val), dropPoint, 'drop-search')}
        </div>

        {dropPoint === 'Other' && (
          <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all animate-in fade-in slide-in-from-top-2 duration-200 z-10">
            <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Specify Dropping Point</label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                value={customDrop}
                onChange={(e) => setCustomDrop(e.target.value)}
                placeholder="e.g. Nyali Cinema"
                className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base placeholder:text-gray-400"
              />
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleSearch}
        className="w-full mt-6 bg-[#151515] hover:bg-black active:scale-98 text-white font-bold py-4 rounded-full transition-all text-base tracking-wider uppercase shadow-md hover:shadow-lg"
      >
        Search Bus
      </button>
    </>
  );

  const renderResultsStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Premium Dark Header Bar */}
      <div className="bg-[#151515] text-white -mx-4 -mt-4 p-4 rounded-t-2xl flex items-center gap-3.5 mb-4 border-b border-neutral-800 shadow-md">
        <button 
          onClick={() => goToStep('search')} 
          className="p-1.5 hover:bg-neutral-800 active:scale-90 rounded-full transition-all text-white shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="bg-neutral-800/80 p-2 rounded-xl border border-neutral-700/50 shrink-0">
          <Bus className="w-5 h-5 text-red-500 fill-red-500" />
        </div>
        <div>
          <h3 className="font-extrabold text-[15px] uppercase tracking-wider leading-tight">{from} - {to}</h3>
          <p className="text-xs text-neutral-400 font-bold mt-0.5">{date}</p>
        </div>
      </div>

      {/* Filter Chips Row (Inspiration Row) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 -mx-2 px-2 scrollbar-none select-none">
        <button 
          onClick={() => goToStep('search')} 
          className="bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-black px-4 py-2 rounded-full shrink-0 shadow-sm transition-all active:scale-95"
        >
          Modify Trip
        </button>
        <button 
          onClick={() => setOpenDropdown(openDropdown === 'pickup-results' ? null : 'pickup-results')}
          className={`text-[11px] font-black px-4 py-2 rounded-full shrink-0 flex items-center gap-1.5 shadow-sm transition-all border relative
            ${pickupPoint ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'}`}
        >
          <span>Boarding: {pickupPoint ? (pickupPoint === 'Other' ? customPickup || 'Other' : pickupPoint) : 'Select'}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>
        <button 
          onClick={() => setOpenDropdown(openDropdown === 'drop-results' ? null : 'drop-results')}
          className={`text-[11px] font-black px-4 py-2 rounded-full shrink-0 flex items-center gap-1.5 shadow-sm transition-all border relative
            ${dropPoint ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'}`}
        >
          <span>Dropping: {dropPoint ? (dropPoint === 'Other' ? customDrop || 'Other' : dropPoint) : 'Select'}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>
        <button 
          className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-[11px] font-black px-4 py-2 rounded-full shrink-0 flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <span>Departure</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
        <button 
          className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 p-2 rounded-full shrink-0 flex items-center justify-center shadow-sm transition-colors"
        >
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
        </button>
      </div>

      {/* Boarding point selection inside results if they click the chip */}
      {(openDropdown === 'pickup-results' || openDropdown === 'pickup-results-sub') && (
        <div className="mb-4 relative z-40">
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80 shadow-inner">
            <label className="block text-xs font-bold text-gray-500 mb-1.5">Selected Boarding Point</label>
            <div className="relative">
              <div 
                onClick={() => setOpenDropdown(openDropdown === 'pickup-results-sub' ? 'pickup-results' : 'pickup-results-sub')}
                className="flex items-center justify-between gap-3 bg-white border border-gray-300 rounded-xl p-2.5 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="font-extrabold text-gray-800 text-sm">
                    {pickupPoint || 'Select boarding point...'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              {openDropdown === 'pickup-results-sub' && renderCustomPickupDropdown((val) => setPickupPoint(val), pickupPoint, 'pickup-results-sub')}
            </div>

            {pickupPoint === 'Other' && (
              <div className="mt-3 relative border border-gray-300 bg-white rounded-xl p-2.5 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
                <label className="block text-xs font-medium text-gray-500 mb-1">Specify Pickup Point</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <input 
                    type="text" 
                    value={customPickup}
                    onChange={(e) => setCustomPickup(e.target.value)}
                    placeholder="e.g. Voi Total Station"
                    className="w-full font-bold text-gray-900 outline-none bg-transparent text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dropping point selection inside results if they click the chip */}
      {(openDropdown === 'drop-results' || openDropdown === 'drop-results-sub') && (
        <div className="mb-4 relative z-40">
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80 shadow-inner">
            <label className="block text-xs font-bold text-gray-500 mb-1.5">Selected Dropping Point</label>
            <div className="relative">
              <div 
                onClick={() => setOpenDropdown(openDropdown === 'drop-results-sub' ? 'drop-results' : 'drop-results-sub')}
                className="flex items-center justify-between gap-3 bg-white border border-gray-300 rounded-xl p-2.5 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="font-extrabold text-gray-800 text-sm">
                    {dropPoint || 'Select dropping point...'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              {openDropdown === 'drop-results-sub' && renderCustomDropDropdown((val) => setDropPoint(val), dropPoint, 'drop-results-sub')}
            </div>

            {dropPoint === 'Other' && (
              <div className="mt-3 relative border border-gray-300 bg-white rounded-xl p-2.5 focus-within:border-[#1b36d1] focus-within:ring-1 focus-within:ring-[#1b36d1] transition-all">
                <label className="block text-xs font-medium text-gray-500 mb-1">Specify Dropping Point</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <input 
                    type="text" 
                    value={customDrop}
                    onChange={(e) => setCustomDrop(e.target.value)}
                    placeholder="e.g. Nyali Cinema"
                    className="w-full font-bold text-gray-900 outline-none bg-transparent text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Header Status */}
      <div className="flex justify-between items-center text-xs font-bold text-gray-500 mb-3.5 px-1">
        <span className="uppercase tracking-wider">Search Result</span>
        <span>{availableBuses.length} Found</span>
      </div>

      {/* Bus Cards List */}
      <div className="space-y-5">
        {availableBuses.map((bus) => {
          const availableSeatsCount = bus.totalSeats - bus.bookedSeats.size;
          const routeAbbreviation = getRouteAbbreviation(from, to);
          const arrivalTime = calculateArrivalTime(bus.time, bus.duration);
          
          return (
            <div 
              key={bus.id} 
              className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm flex flex-col gap-3 relative hover:shadow-md transition-shadow"
            >
              {/* Floating Route Abbreviation Pill */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-200 text-[9px] font-black text-gray-500 px-3 py-0.5 rounded-full tracking-widest uppercase shadow-sm">
                {routeAbbreviation}
              </div>

              {/* Timeline Row (Origin -> Connecting Line -> Destination) */}
              <div className="flex items-center justify-between pt-1">
                {/* Origin */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{from}</span>
                  <span className="text-base font-black text-neutral-900 leading-tight">
                    {formatTimePadded(bus.time)}
                  </span>
                </div>

                {/* Connecting Line Component */}
                <div className="flex-1 px-3 flex flex-col items-center justify-center min-w-0 relative">
                  <span className="text-[10px] font-bold text-gray-400 mb-0.5 whitespace-nowrap">
                    {bus.duration}
                  </span>
                  
                  {/* Decorative line with small dots */}
                  <div className="w-full flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-300 rounded-full shrink-0" />
                    <div className="flex-1 border-t border-dashed border-gray-300" />
                    <span className="w-1 h-1 bg-gray-300 rounded-full shrink-0" />
                  </div>
                  
                  {/* Vehicle Type Row with Buscar Logo */}
                  <div className="flex items-center gap-1.5 mt-1 shrink-0">
                    <BuscarLogoMini />
                    <span className="text-[9px] font-black text-gray-500 tracking-wider uppercase whitespace-nowrap">
                      {bus.vehicleType}
                    </span>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{to}</span>
                  <span className="text-base font-black text-neutral-900 leading-tight">
                    {arrivalTime}
                  </span>
                </div>

                {/* Star Rating Badge */}
                <div className="ml-3 self-center shrink-0">
                  <span className="inline-flex items-center gap-0.5 bg-green-50 border border-green-100 text-[10px] text-green-700 font-extrabold px-1.5 py-0.5 rounded-md shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-green-600 text-green-600" />
                    {bus.rating}
                  </span>
                </div>
              </div>
              
              {/* Solid divider line */}
              <div className="border-t border-gray-100 my-1" />

              {/* Footer Section */}
              <div className="flex justify-between items-end pt-1">
                {/* Prices Left Side */}
                <div className="flex flex-col gap-1.5 text-[11px] font-extrabold">
                  <div className="flex items-center">
                    <span className="text-gray-400 font-bold w-12 text-[10px] uppercase tracking-wider">Vip:</span>
                    <span className="text-red-600 font-black text-[13px]">KES {formatMoney(bus.vipFare)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 font-bold w-12 text-[10px] uppercase tracking-wider">Bclass:</span>
                    <span className="text-red-600 font-black text-[13px]">KES {formatMoney(Math.round((parseInt(bus.vipFare) + parseInt(bus.normalFare)) / 2))}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 font-bold w-12 text-[10px] uppercase tracking-wider">Normal:</span>
                    <span className="text-red-600 font-black text-[13px]">KES {formatMoney(bus.normalFare)}</span>
                  </div>
                </div>

                {/* Seats Left & Button Right Side */}
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-xs font-black text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md shadow-sm border border-gray-200/50">
                    {availableSeatsCount} left
                  </span>
                  
                  <button 
                    onClick={() => handleViewSeats(bus)}
                    className="bg-neutral-950 hover:bg-neutral-800 text-white font-black py-2.5 px-5 rounded-full text-xs transition-all active:scale-95 shadow-md flex items-center gap-1 hover:shadow-lg"
                  >
                    View Seats
                  </button>
                </div>
              </div>
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
        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Full Name</label>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400 shrink-0" />
            <input 
              type="text" 
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base"
            />
          </div>
        </div>

        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Phone Number</label>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400 shrink-0" />
            <input 
              type="tel" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="07..."
              className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base"
            />
          </div>
        </div>

        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">ID Number / Passport</label>
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400 shrink-0" />
            <input 
              type="text" 
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="National ID"
              className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base"
            />
          </div>
        </div>

        <div className={`relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all ${openDropdown === 'pickup-details' ? 'z-40' : 'z-10'}`}>
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Pick-up Point</label>
          <div 
            onClick={() => setOpenDropdown(openDropdown === 'pickup-details' ? null : 'pickup-details')}
            className="flex items-center justify-between gap-3 cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <span className={`text-base font-semibold tracking-tight ${pickupPoint ? 'text-gray-900' : 'text-gray-400 font-medium'}`}>
                {pickupPoint || 'Select boarding point...'}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openDropdown === 'pickup-details' ? 'rotate-180' : ''}`} />
          </div>

          {openDropdown === 'pickup-details' && renderCustomPickupDropdown((val) => setPickupPoint(val), pickupPoint, 'pickup-details')}
        </div>

        {pickupPoint === 'Other' && (
          <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all z-10">
            <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Specify Pickup Point</label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                value={customPickup}
                onChange={(e) => setCustomPickup(e.target.value)}
                placeholder="e.g. Voi Total Station"
                className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base"
              />
            </div>
          </div>
        )}

        <div className={`relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all ${openDropdown === 'drop-details' ? 'z-40' : 'z-10'}`}>
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Drop-off Point</label>
          <div 
            onClick={() => setOpenDropdown(openDropdown === 'drop-details' ? null : 'drop-details')}
            className="flex items-center justify-between gap-3 cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <span className={`text-base font-semibold tracking-tight ${dropPoint ? 'text-gray-900' : 'text-gray-400 font-medium'}`}>
                {dropPoint || 'Select dropping point...'}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openDropdown === 'drop-details' ? 'rotate-180' : ''}`} />
          </div>

          {openDropdown === 'drop-details' && renderCustomDropDropdown((val) => setDropPoint(val), dropPoint, 'drop-details')}
        </div>

        {dropPoint === 'Other' && (
          <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all z-10">
            <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Specify Dropping Point</label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                value={customDrop}
                onChange={(e) => setCustomDrop(e.target.value)}
                placeholder="e.g. Nyali Cinema"
                className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base"
              />
            </div>
          </div>
        )}

        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Luggage?</label>
          <div className="flex items-center gap-3 relative">
            <Briefcase className="w-5 h-5 text-gray-400 shrink-0" />
            <select 
              value={luggage}
              onChange={(e) => setLuggage(e.target.value)}
              className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base appearance-none cursor-pointer pr-8"
            >
              <option value="No heavy luggage">No heavy luggage</option>
              <option value="Yes, heavy luggage">Yes, heavy luggage</option>
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-0 pointer-events-none" />
          </div>
        </div>

        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Medical Conditions (Optional)</label>
          <div className="flex items-start gap-3">
            <HeartPulse className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <textarea 
              value={medical}
              onChange={(e) => setMedical(e.target.value)}
              placeholder="Any conditions we should know about?"
              rows={2}
              className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base resize-none"
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleFinalBook}
        disabled={!passengerName || !phoneNumber || !idNumber || (pickupPoint === 'Other' && !customPickup) || (dropPoint === 'Other' && !customDrop)}
        className={`w-full mt-6 font-bold py-4 rounded-full transition-colors text-lg shadow-md flex items-center justify-center gap-2
          ${(!passengerName || !phoneNumber || !idNumber || (pickupPoint === 'Other' && !customPickup) || (dropPoint === 'Other' && !customDrop)) 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-[#00a859] hover:bg-green-700 text-white'}
        `}
      >
        <span className="w-5 h-5 rounded flex items-center justify-center border-2 border-current mr-1">
          <div className="w-3 h-3 bg-current rounded-sm opacity-20" />
        </span>
        Book Now
      </button>
      <p className="text-center text-xs text-gray-400 font-bold tracking-widest uppercase mt-4">
        Authorized by Buscar
      </p>
    </div>
  );

  return (
    <div className="p-5 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/50 mx-2 my-5 border border-white/80 overflow-visible relative z-10">
      {/* Click-away overlay for custom dropdown lists */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-20 bg-transparent" 
          onClick={() => {
            setOpenDropdown(null);
            setFromSearch('');
            setToSearch('');
            setPickupSearch('');
            setDropSearch('');
          }} 
        />
      )}

      {isStepLoading ? (
        <BookingFormSkeleton targetStep={targetStep} from={from} to={to} date={date} />
      ) : (
        <>
          {step === 'search' && (
            <div className="text-center mb-6 text-sm font-medium text-gray-600 flex flex-col items-center justify-center gap-1">
              <div className="flex items-center justify-center gap-1.5">
                Book your next ticket using 
                <span className="font-black text-xl text-[#36498c] tracking-tight flex items-center">
                  <span className="text-red-600 text-2xl leading-none mr-0.5 relative">
                    T
                    <div className="absolute -bottom-1 w-full flex justify-between px-0.5">
                       <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                       <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                    </div>
                  </span>
                  ravler
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-extrabold tracking-widest uppercase mt-0.5">
                Official Buscar Online Booking
              </span>
            </div>
          )}
          
          {step === 'search' && renderSearchStep()}
          {step === 'results' && renderResultsStep()}
          {step === 'seats' && renderSeatsStep()}
          {step === 'details' && renderDetailsStep()}
        </>
      )}
    </div>
  );
}
