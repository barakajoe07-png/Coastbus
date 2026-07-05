/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import Amenities from './components/Amenities';
import Benefits from './components/Benefits';
import Carousel from './components/Carousel';
import TopRoutes from './components/TopRoutes';
import AppPromo from './components/AppPromo';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PrintTicket from './components/PrintTicket';
import Help from './components/Help';
import Account from './components/Account';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 font-sans">
      <Header />
      <main className="max-w-md mx-auto bg-white shadow-sm overflow-hidden relative min-h-[80vh]">
        {activeTab === 'home' && (
          <>
            <BookingForm />
            <Amenities />
            <Benefits />
            <Carousel />
            <TopRoutes />
            <AppPromo />
          </>
        )}
        {activeTab === 'print' && <PrintTicket />}
        {activeTab === 'help' && <Help />}
        {activeTab === 'account' && <Account setActiveTab={setActiveTab} />}
      </main>
      {activeTab === 'home' && <Footer />}
      <FloatingWhatsApp />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
