import { useState } from 'react';
import { Phone, MessageCircle, Mail, Instagram, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    inquiryType: 'custom_order',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        contact: '',
        inquiryType: 'custom_order',
        message: '',
      });
    }, 4000);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent("Hi HomeBite Snacks team! I'd like to ask a question about your homemade snacks menu.");
    window.open(`https://wa.me/919845012345?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact & Kitchen Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3D18]">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#292524]">
                We’d Love to Hear From You
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Have questions about allergens, want to customize a festival hamper, or request a bulk family batch? Reach out directly to our artisan kitchen team.
              </p>
            </div>

            {/* Contact details cards */}
            <div className="space-y-3 pt-2">
              
              {/* WhatsApp direct */}
              <div
                onClick={handleOpenWhatsApp}
                className="p-4 bg-white rounded-xl border border-[#E5E0D8] hover:border-[#86EFAC] transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs text-[#78716C]">Instant WhatsApp Support</div>
                    <div className="text-sm font-bold text-[#292524] group-hover:text-[#166534] transition-colors">
                      +91 98450 12345
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#166534] font-semibold bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#BBF7D0]">
                  Chat Now
                </span>
              </div>

              {/* Phone call */}
              <a
                href="tel:+919845012345"
                className="p-4 bg-white rounded-xl border border-[#E5E0D8] hover:border-[#D6CEBE] transition-all flex items-center gap-3 shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] text-[#8C3D18] flex items-center justify-center border border-[#EBE6DC]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#78716C]">Kitchen Helpline</div>
                  <div className="text-sm font-bold text-[#292524] group-hover:text-[#C25E2E] transition-colors">
                    +91 (080) 4123-5678 / +91 98450 12345
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@homebitesnacks.com"
                className="p-4 bg-white rounded-xl border border-[#E5E0D8] hover:border-[#D6CEBE] transition-all flex items-center gap-3 shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] text-[#0369A1] flex items-center justify-center border border-[#EBE6DC]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#78716C]">Email Address</div>
                  <div className="text-sm font-bold text-[#292524] group-hover:text-[#0369A1] transition-colors">
                    hello@homebitesnacks.com
                  </div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-white rounded-xl border border-[#E5E0D8] hover:border-[#D6CEBE] transition-all flex items-center gap-3 shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] text-[#BE185D] flex items-center justify-center border border-[#EBE6DC]">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#78716C]">Instagram Community</div>
                  <div className="text-sm font-bold text-[#292524] group-hover:text-[#BE185D] transition-colors">
                    @homebitesnacks
                  </div>
                </div>
              </a>

              {/* Business Location */}
              <div className="p-4 bg-white rounded-xl border border-[#E5E0D8] flex items-start gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] text-[#15803D] flex items-center justify-center border border-[#EBE6DC] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#78716C]">Artisanal Kitchen & Dispatch Studio</div>
                  <div className="text-sm font-bold text-[#292524]">
                    HomeBite Kitchens, 44/2 100ft Road, Indiranagar, Bengaluru, Karnataka 560038
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#78716C] mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Kitchen Baking Hours: 8:00 AM – 7:30 PM (Mon – Sat)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-serif text-[#292524]">
                  Send a Message to Our Kitchen
                </h3>
                <p className="text-xs text-[#78716C]">
                  We typically respond within 30 minutes during baking hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-in fade-in duration-300">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">Message Received!</h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you, {formData.name || 'Friend'}! Our kitchen team has received your inquiry and will contact you promptly on {formData.contact}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shalini"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Phone or Email *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 9845012345 or you@email.com"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:bg-white cursor-pointer"
                    >
                      <option value="custom_order">Custom Family / Festive Order</option>
                      <option value="corporate_hamper">Corporate / Wedding Gift Hampers</option>
                      <option value="dietary_question">Dietary / Allergen / Ingredient Query</option>
                      <option value="delivery_status">Order Delivery Status Inquiry</option>
                      <option value="other">General Feedback / Compliment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what you are looking for, required quantities, or preferred delivery dates..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D6CEBE] rounded-xl text-xs text-[#292524] outline-none focus:border-[#C25E2E] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#292524] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Kitchen</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
