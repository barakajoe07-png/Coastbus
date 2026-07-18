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
import AppPromo from './components/AppPromo';
import SEORoutesContent from './components/SEORoutesContent';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PrintTicket from './components/PrintTicket';
import Help from './components/Help';
import Account from './components/Account';
import SkeletonLoader from './components/SkeletonLoader';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [displayedTab, setDisplayedTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDisplayedTab(activeTab);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25, ease: 'easeIn' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-slate-50 to-blue-50/40 font-sans relative overflow-x-hidden pb-safe">
      {/* Decorative ambient blobs for premium desktop background experience */}
      <div className="hidden md:block absolute top-12 left-1/2 -translate-x-[400px] w-96 h-96 bg-red-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-24 left-1/2 translate-x-[150px] w-96 h-96 bg-[#36498c]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Header />
      <main className="w-full md:max-w-md mx-auto bg-white backdrop-blur-xl md:shadow-2xl md:shadow-slate-200/80 md:border md:border-white/60 overflow-hidden relative min-h-screen md:min-h-[85vh] md:rounded-3xl md:my-6 pb-24">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <SkeletonLoader key={`skeleton-${activeTab}`} tab={activeTab} />
          ) : (
            <motion.div
              key={displayedTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {displayedTab === 'home' && (
                <>
                  <BookingForm />
                  <Amenities />
                  <Benefits />
                  <Carousel />
                  <SEORoutesContent />
                  <AppPromo />
                </>
              )}
              {displayedTab === 'print' && <PrintTicket />}
              {displayedTab === 'help' && <Help />}
              {displayedTab === 'account' && <Account setActiveTab={setActiveTab} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {displayedTab === 'home' && !isLoading && <Footer />}
      <FloatingWhatsApp />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
