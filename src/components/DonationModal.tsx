import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Check, Copy } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount: number;
  initialMonthly: boolean;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  initialAmount,
  initialMonthly
}) => {
  const [amount, setAmount] = useState<number>(initialAmount || 50);
  const [isMonthly] = useState<boolean>(initialMonthly || false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach' | 'daf'>('card');
  const [receiptGenerated, setReceiptGenerated] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorEmail) return;
    const generatedId = `CN-501C3-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceiptNumber(generatedId);
    setReceiptGenerated(true);
  };

  const handleCopyReceipt = () => {
    const text = `DONATION TAX RECEIPT
Project: F.O.S.S. for the Common Need
Fiscal Sponsor: Social Good Fund (501(c)(3))
Receipt #: ${receiptNumber}
Donor: ${donorName || 'Anonymous Supporter'}
Amount: $${amount}.00 USD (${isMonthly ? 'Monthly Sustainer' : 'One-Time'})
Date: ${new Date().toLocaleDateString()}
Tax Status: Fully tax-deductible under Section 501(c)(3) of the Internal Revenue Code. No goods or services were provided in exchange for this contribution.`;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0D031B]/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF0E6] rounded-2xl border-2 border-[#0D031B] max-w-lg w-full p-7 sm:p-9 relative shadow-[8px_8px_0px_#DAEE01] text-[#0D031B]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[#0D031B]/60 hover:text-[#0D031B] rounded-lg cursor-pointer"
          aria-label="Close donation window"
        >
          <X className="w-5 h-5" />
        </button>

        {!receiptGenerated ? (
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] bg-[#8FB31D] px-2.5 py-1 rounded-md border border-[#0D031B] mb-3">
              <ShieldCheck className="w-4 h-4 text-[#806517]" />
              <span>[ TAX-DEDUCTIBLE 501(c)(3) GIFT ]</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0D031B] font-editorial mb-2 leading-tight">
              Support FOSS For The Common Need
            </h3>
            <p className="text-xs text-[#0D031B]/80 leading-relaxed mb-6 font-medium">
              Processed through our 501(c)(3) fiscal sponsor. Your contribution directly funds open-source
              development and zero-cost grocery/medication logistics.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount & Frequency summary */}
              <div className="bg-[#8FB31D]/20 p-4 rounded-xl border-2 border-[#0D031B] flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[#0D031B] font-bold">Selected Contribution</div>
                  <div className="text-2xl font-bold text-[#0D031B] font-mono">
                    ${amount}.00 USD <span className="text-xs font-medium text-[#0D031B]">{isMonthly ? '/ mo' : '(one-time)'}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[25, 50, 100, 250].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt)}
                      className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md border-2 cursor-pointer ${
                        amount === amt
                          ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517]'
                          : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B]'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Donor Name & Email */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] mb-1">
                    Your Name (for Tax Receipt)
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe or Organization Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF0E6] border-2 border-[#0D031B] rounded-xl text-xs sm:text-sm text-[#0D031B] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] mb-1">
                    Email Address (to receive Official Receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane.doe@domain.org"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF0E6] border-2 border-[#0D031B] rounded-xl text-xs sm:text-sm text-[#0D031B] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-2 text-xs font-mono font-bold rounded-lg border-2 text-center cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517]'
                        : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B]'
                    }`}
                  >
                    Credit / Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ach')}
                    className={`py-2 px-2 text-xs font-mono font-bold rounded-lg border-2 text-center cursor-pointer ${
                      paymentMethod === 'ach'
                        ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517]'
                        : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B]'
                    }`}
                  >
                    Bank ACH
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('daf')}
                    className={`py-2 px-2 text-xs font-mono font-bold rounded-lg border-2 text-center cursor-pointer ${
                      paymentMethod === 'daf'
                        ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517]'
                        : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B]'
                    }`}
                  >
                    DAF / Check
                  </button>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#806517] text-[#FAF0E6] border-2 border-[#0D031B] text-sm font-bold font-mono rounded-xl cursor-pointer shadow-[4px_4px_0px_#DAEE01] hover:bg-[#0D031B] hover:text-[#DAEE01] transition flex items-center justify-center gap-2 mt-4"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>CONFIRM ${amount}.00 CONTRIBUTION</span>
              </button>
            </form>
          </div>
        ) : (
          /* Receipt Screen */
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#8FB31D] text-[#0D031B] border-2 border-[#0D031B] flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-[#0D031B] font-editorial mb-1">
              Thank You for Fueling the Commons!
            </h3>
            <p className="text-xs text-[#0D031B]/80 mb-6">
              A receipt has been issued to <strong>{donorEmail}</strong>.
            </p>

            {/* Simulated Receipt Card */}
            <div className="bg-[#FAF0E6] border-2 border-dashed border-[#0D031B] p-5 rounded-xl text-left text-xs text-[#0D031B] font-mono mb-6 space-y-2">
              <div className="flex justify-between border-b-2 border-[#0D031B] pb-2">
                <span className="font-bold text-[#0D031B]">501(c)(3) TAX RECEIPT</span>
                <span className="text-[#806517] font-bold">{receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Beneficiary Project:</span>
                <span className="font-bold text-[#0D031B]">F.O.S.S. for the Common Need</span>
              </div>
              <div className="flex justify-between">
                <span>Fiscal Sponsor:</span>
                <span className="text-[#0D031B]">Social Good Fund (EIN: 501(c)(3))</span>
              </div>
              <div className="flex justify-between">
                <span>Donor Name:</span>
                <span className="text-[#0D031B]">{donorName || 'Anonymous Supporter'}</span>
              </div>
              <div className="flex justify-between">
                <span>Gift Amount:</span>
                <span className="font-bold text-[#806517] text-sm">${amount}.00 USD</span>
              </div>
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span>{isMonthly ? 'Monthly Recurring Sustainer' : 'One-Time Contribution'}</span>
              </div>
              <div className="pt-2 border-t-2 border-[#0D031B] text-[10px] text-[#0D031B]/80 leading-normal">
                No goods or services were provided in exchange for this gift. 100% of this contribution is tax-deductible under IRS IRC Section 501(c)(3).
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="flex-1 py-2.5 px-4 bg-[#FAF0E6] border-2 border-[#0D031B] text-xs font-bold text-[#0D031B] rounded-xl hover:bg-[#8FB31D] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedReceipt ? <Check className="w-4 h-4 text-[#806517]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedReceipt ? 'Receipt Copied!' : 'Copy Tax Receipt'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-[#806517] text-[#FAF0E6] border-2 border-[#0D031B] text-xs font-bold rounded-xl hover:bg-[#0D031B] hover:text-[#DAEE01] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
