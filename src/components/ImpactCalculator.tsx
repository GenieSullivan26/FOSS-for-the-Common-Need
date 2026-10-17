import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Users, Clock, ShieldCheck, RefreshCw } from 'lucide-react';

export const ImpactCalculator: React.FC = () => {
  const [families, setFamilies] = useState<number>(250);
  const [deliveriesPerMonth, setDeliveriesPerMonth] = useState<number>(2);
  const [corporateFee, setCorporateFee] = useState<number>(14.5);

  // Calculations
  const totalDeliveriesPerYear = families * deliveriesPerMonth * 12;
  const yearlyFamilySavings = totalDeliveriesPerYear * corporateFee;
  const staffHoursSavedPerYear = Math.round(families * 3.5);
  const volunteerHoursMobilized = Math.round(totalDeliveriesPerYear * 0.75);

  const applyPreset = (fam: number, deliv: number, fee: number) => {
    setFamilies(fam);
    setDeliveriesPerMonth(deliv);
    setCorporateFee(fee);
  };

  return (
    <div className="bg-[#FAF0E6] border-2 border-[#0D031B] rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#A0D6B4] text-[#0D031B] my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#0D031B] mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#8FB31D] text-[#0D031B] text-xs font-mono font-bold border border-[#0D031B] mb-2">
            <Calculator className="w-3.5 h-3.5 text-[#806517]" />
            <span>INTERACTIVE COMMUNITY IMPACT CALCULATOR</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0D031B]">
            Calculate What Free Delivery Saves Your Town
          </h3>
          <p className="text-xs sm:text-sm text-[#0D031B]/80 font-medium mt-1">
            Adjust the controls below to see how much money stays in families' pockets when non-profits use our $0 fee app.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-mono font-bold text-[#0D031B] mr-1">Presets:</span>
          <button
            onClick={() => applyPreset(100, 2, 12)}
            className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg border-2 border-[#0D031B] bg-[#FAF0E6] hover:bg-[#8FB31D] text-[#0D031B] transition cursor-pointer"
          >
            Small Pantry (100)
          </button>
          <button
            onClick={() => applyPreset(350, 2, 15)}
            className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg border-2 border-[#0D031B] bg-[#FAF0E6] hover:bg-[#8FB31D] text-[#0D031B] transition cursor-pointer"
          >
            City Network (350)
          </button>
          <button
            onClick={() => applyPreset(1000, 3, 16)}
            className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg border-2 border-[#0D031B] bg-[#FAF0E6] hover:bg-[#8FB31D] text-[#0D031B] transition cursor-pointer"
          >
            Regional Co-op (1,000)
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Slider 1: Families Served */}
        <div className="bg-[#8FB31D]/20 p-4 rounded-xl border-2 border-[#0D031B]">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
            <span>Families Served / Month</span>
            <span className="bg-[#0D031B] text-[#A0D6B4] px-2 py-0.5 rounded font-bold text-sm">
              {families.toLocaleString()} families
            </span>
          </div>
          <input
            type="range"
            min="25"
            max="1500"
            step="25"
            value={families}
            onChange={(e) => setFamilies(Number(e.target.value))}
            className="w-full accent-[#806517] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#0D031B]/70 mt-1">
            <span>25</span>
            <span>1,500</span>
          </div>
        </div>

        {/* Slider 2: Deliveries per Family per Month */}
        <div className="bg-[#8FB31D]/20 p-4 rounded-xl border-2 border-[#0D031B]">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
            <span>Deliveries / Family / Month</span>
            <span className="bg-[#0D031B] text-[#A0D6B4] px-2 py-0.5 rounded font-bold text-sm">
              {deliveriesPerMonth} deliveries
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={deliveriesPerMonth}
            onChange={(e) => setDeliveriesPerMonth(Number(e.target.value))}
            className="w-full accent-[#806517] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#0D031B]/70 mt-1">
            <span>1/mo</span>
            <span>6/mo</span>
          </div>
        </div>

        {/* Slider 3: Commercial Fee Saved */}
        <div className="bg-[#8FB31D]/20 p-4 rounded-xl border-2 border-[#0D031B]">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
            <span>Corporate Fee / Delivery</span>
            <span className="bg-[#0D031B] text-[#A0D6B4] px-2 py-0.5 rounded font-bold text-sm">
              ${corporateFee.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="0.5"
            value={corporateFee}
            onChange={(e) => setCorporateFee(Number(e.target.value))}
            className="w-full accent-[#806517] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#0D031B]/70 mt-1">
            <span>$5.00</span>
            <span>$30.00</span>
          </div>
        </div>
      </div>

      {/* Calculated Results Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Result 1: Family Money Saved */}
        <div className="bg-[#0D031B] text-[#FAF0E6] p-4 rounded-xl border-2 border-[#0D031B] shadow-[3px_3px_0px_#A0D6B4]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#A0D6B4] uppercase">
            <DollarSign className="w-3.5 h-3.5 text-[#8FB31D]" />
            <span>Family Savings / Year</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#FAF0E6] font-mono mt-1">
            ${yearlyFamilySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <p className="text-[10px] text-[#A0D6B4] font-mono mt-1">
            Kept directly in working families' wallets
          </p>
        </div>

        {/* Result 2: Deliveries Made */}
        <div className="bg-[#8FB31D] text-[#0D031B] p-4 rounded-xl border-2 border-[#0D031B] shadow-[3px_3px_0px_#A0D6B4]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#806517]" />
            <span>$0 Fee Deliveries / Year</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono mt-1">
            {totalDeliveriesPerYear.toLocaleString()}
          </div>
          <p className="text-[10px] font-mono font-bold text-[#0D031B]/80 mt-1">
            100% free food &amp; medicine deliveries
          </p>
        </div>

        {/* Result 3: Staff Hours Saved */}
        <div className="bg-[#FAF0E6] text-[#0D031B] p-4 rounded-xl border-2 border-[#0D031B] shadow-[3px_3px_0px_#A0D6B4]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-[#806517]">
            <Clock className="w-3.5 h-3.5" />
            <span>Staff Busywork Saved</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono mt-1 text-[#0D031B]">
            {staffHoursSavedPerYear.toLocaleString()} hrs
          </div>
          <p className="text-[10px] font-mono text-[#0D031B]/80 mt-1">
            Reclaimed from phone calls &amp; spreadsheets
          </p>
        </div>

        {/* Result 4: Volunteer Hours */}
        <div className="bg-[#FAF0E6] text-[#0D031B] p-4 rounded-xl border-2 border-[#0D031B] shadow-[3px_3px_0px_#A0D6B4]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-[#806517]">
            <Users className="w-3.5 h-3.5" />
            <span>Volunteer Hours</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono mt-1 text-[#0D031B]">
            {volunteerHoursMobilized.toLocaleString()} hrs
          </div>
          <p className="text-[10px] font-mono text-[#0D031B]/80 mt-1">
            Mobilized for neighborly mutual aid
          </p>
        </div>
      </div>
    </div>
  );
};
