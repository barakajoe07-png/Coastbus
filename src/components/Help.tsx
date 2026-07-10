import { HelpCircle, Phone, Mail, MessageSquare } from 'lucide-react';

export default function Help() {
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">How can we help?</h2>
        <p className="text-gray-500 text-sm">Reach out to our customer support team.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-2xl shadow-sm bg-gray-50">
          <Phone className="w-6 h-6 text-black mt-1 shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900">Call Us</h3>
            <p className="text-sm text-gray-500 mb-2">Available 24/7 for urgent inquiries.</p>
            <a href="tel:+254754303484" className="text-black font-bold">+254 754 303 484</a>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-2xl shadow-sm bg-gray-50">
          <MessageSquare className="w-6 h-6 text-[#00a859] mt-1 shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900">WhatsApp</h3>
            <p className="text-sm text-gray-500 mb-2">Fastest way to reach our booking agents.</p>
            <a href="https://wa.me/254754303484" target="_blank" rel="noreferrer" className="text-[#00a859] font-bold">Chat with us</a>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-2xl shadow-sm bg-gray-50">
          <Mail className="w-6 h-6 text-red-500 mt-1 shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900">Email</h3>
            <p className="text-sm text-gray-500 mb-2">For general queries and feedback.</p>
            <a href="mailto:info@buscar.co.ke" className="text-red-500 font-bold">info@buscar.co.ke</a>
          </div>
        </div>
      </div>
    </div>
  );
}
