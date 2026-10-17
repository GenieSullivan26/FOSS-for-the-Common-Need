import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  ShoppingBag,
  Truck,
  Building2,
  MapPin,
  ShieldCheck,
  Plus,
  Minus,
  Navigation,
  PackageCheck,
  Check,
  Vote,
  Box,
  Users,
  CheckCircle2,
  Sliders
} from 'lucide-react';

// Strict 5-Color Brand Palette & Assigned Roles:
// #FAF0E6 (Warm Linen Cream): Primary screen background and card surfaces
// #0D031B (Deep Obsidian Violet): Phone bezel, primary typography, active navigation states, and crisp wireframe borders
// #DAEE01 (Soft Sage Mint): Secondary metadata text, dashed borders, and tactile wireframe card shadows
// #8FB31D (Chartreuse Green): App headers, bottom navigation bars, and secondary info boxes
// #806517 (Earthy Olive Bronze): Primary action buttons (+ Add, Mark Done), $0 FREE badges, and active tab highlights

const NON_PROFIT_HUBS = [
  {
    id: 'hub-1',
    name: 'East Oakland Collective Pantry',
    type: 'Fresh Produce & Groceries',
    distance: '1.2 mi away',
    badge: 'No Means-Testing',
    items: [
      { id: 'item-1', name: 'Organic Collard Greens & Kale Bundle', category: 'Produce', dietary: 'Vegan / GF', stock: 'High Stock', limit: 2 },
      { id: 'item-2', name: '25lb Staple Grain Box (Rice, Beans, Oats)', category: 'Pantry', dietary: 'Halal / Kosher', stock: 'Available', limit: 1 }
    ]
  },
  {
    id: 'hub-2',
    name: 'West County Mutual Aid Pharmacy',
    type: 'Health, Hygiene & Infant Care',
    distance: '2.4 mi away',
    badge: 'Immunocompromised Priority',
    items: [
      { id: 'item-4', name: 'N95 Particulate Respirator Masks (20-Pack)', category: 'Health', dietary: 'Medical Grade', stock: 'High Stock', limit: 2 },
      { id: 'item-5', name: 'Infant Formula & Size 3 Diaper Care Kit', category: 'Family', dietary: 'Hypoallergenic', stock: 'Available', limit: 1 }
    ]
  },
  {
    id: 'hub-3',
    name: 'Fruitvale Community Kitchen',
    type: 'Prepared Nutritious Meals',
    distance: '0.8 mi away',
    badge: 'Senior & Disability Priority',
    items: [
      { id: 'item-7', name: 'Roasted Chicken, Plantains & Black Beans (Family Tray)', category: 'Hot Meal', dietary: 'Halal / DF', stock: '18 left', limit: 1 },
      { id: 'item-8', name: 'Low-Sodium Vegetable Lentil Stew (2 Qt)', category: 'Hot Meal', dietary: 'Senior Friendly', stock: 'High Stock', limit: 2 }
    ]
  }
];

const VOLUNTEER_STOPS = [
  {
    step: 1,
    type: 'PICKUP',
    org: 'East Oakland Collective Pantry',
    address: '7800 MacArthur Blvd',
    timeWindow: 'Ready Now',
    itemsCount: '4 crates (Pre-sorted by Member Choice)',
    notes: 'Loading zone at rear ramp. Staff member Maria has manifest #409.'
  },
  {
    step: 2,
    type: 'PICKUP',
    org: 'West County Mutual Aid Care Hub',
    address: '3115 San Pablo Ave',
    timeWindow: 'By 2:30 PM',
    itemsCount: '2 sealed medical/hygiene parcels',
    notes: 'Curbside handoff—tap Arrived and coordinator will bring crates out.'
  },
  {
    step: 3,
    type: 'DROPOFF',
    org: 'Household #A19 (Ms. Evelyn R.)',
    address: '1400 Block of 62nd Ave',
    timeWindow: '2:45 - 3:00 PM',
    itemsCount: '1 Produce Bundle, 1 Lentil Stew, 1 N95 Pack',
    notes: 'Elderly member with mobility aid. Walk up 4 porch steps, knock firmly & wait 60s.'
  },
  {
    step: 4,
    type: 'DROPOFF',
    org: 'Household #B04 (Familia Ramirez)',
    address: '2600 Block of Foothill Blvd',
    timeWindow: '3:05 - 3:20 PM',
    itemsCount: '1 Staple Grain Box, 1 Infant Care Kit, 1 Family Hot Meal',
    notes: 'Contactless dropoff inside gated alcove (Code: #1984).'
  }
];

const INITIAL_CBO_INVENTORY = [
  { id: 'cbo-1', name: 'Organic Collard Greens & Kale Bundle', cratesReady: 24, status: 'Live on Common Need', dietary: 'Vegan / GF' },
  { id: 'cbo-2', name: '25lb Staple Grain Box (Rice, Pinto Beans)', cratesReady: 15, status: 'Live on Common Need', dietary: 'Halal / Kosher' },
  { id: 'cbo-3', name: 'Fresh Whole Wheat Sourdough Loaves', cratesReady: 12, status: 'Low Stock Alert', dietary: 'Vegetarian' }
];

const CBO_OUTGOING_MANIFESTS = [
  {
    batchId: 'BATCH-OAK-409',
    courier: 'Marcus T. (Co-op Cargo E-Bike #04)',
    eta: 'Arriving in 4 mins',
    householdsServed: 4,
    items: '4x Produce Bundles, 2x Staple Grain Boxes',
    ready: true
  },
  {
    batchId: 'BATCH-OAK-412',
    courier: 'Elena R. (Volunteer EV Van)',
    eta: 'Pickup at 3:15 PM',
    householdsServed: 7,
    items: '6x Produce Bundles, 5x Sourdough Loaves, 3x Grain Boxes',
    ready: false
  }
];

export function TheCommonNeedWireframes() {
  const { t } = useAccessibility();

  // 'member' | 'volunteer' | 'nonprofit'
  const [activeApp, setActiveApp] = useState('member');

  // Member PWA State
  const [memberTab, setMemberTab] = useState('browse'); // 'browse' | 'checkout' | 'track'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([
    { id: 'item-1', name: 'Organic Collard Greens & Kale Bundle', org: 'East Oakland Collective Pantry', qty: 1 },
    { id: 'item-4', name: 'N95 Particulate Respirator Masks (20-Pack)', org: 'West County Mutual Aid Pharmacy', qty: 1 }
  ]);
  const [deliveryPrefs, setDeliveryPrefs] = useState({
    porchSteps: true,
    extraWaitTime: true,
    contactless: false
  });

  // Volunteer PWA State
  const [volunteerTab, setVolunteerTab] = useState('route'); // 'route' | 'vote'
  const [completedStops, setCompletedStops] = useState([1]);

  // Non-Profit PWA State
  const [nonProfitTab, setNonProfitTab] = useState('dispatch'); // 'dispatch' | 'inventory' | 'coop'
  const [cboInventory, setCboInventory] = useState(INITIAL_CBO_INVENTORY);
  const [manifests, setManifests] = useState(CBO_OUTGOING_MANIFESTS);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('20');

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleAddToCart = (item: { id: string; name: string; limit: number }, orgName: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: Math.min(i.qty + 1, item.limit) } : i);
      }
      return [...prev, { id: item.id, name: item.name, org: orgName, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const toggleStopCompletion = (stepNumber: number) => {
    setCompletedStops(prev =>
      prev.includes(stepNumber) ? prev.filter(s => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  const toggleManifestReady = (batchId: string) => {
    setManifests(prev =>
      prev.map(m => m.batchId === batchId ? { ...m, ready: !m.ready } : m)
    );
  };

  const handleAddCboInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setCboInventory(prev => [
      {
        id: `cbo-${Date.now()}`,
        name: newItemName,
        cratesReady: Number(newItemQty) || 10,
        status: 'Live on Common Need',
        dietary: 'Community Choice'
      },
      ...prev
    ]);
    setNewItemName('');
  };

  return (
    <div className="w-full bg-[#FAF0E6] py-6 px-2 sm:px-4 flex flex-col items-center justify-center font-sans text-[#0D031B]">
      {/* Compact 3-PWA Persona Switcher */}
      <div className="mb-6 bg-[#8FB31D] p-1.5 rounded-2xl border-2 border-[#0D031B] shadow-[4px_4px_0px_#DAEE01] flex flex-wrap items-center justify-center gap-1.5">
        <button
          onClick={() => setActiveApp('member')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition border-2 cursor-pointer ${
            activeApp === 'member'
              ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517]'
              : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#806517] hover:text-[#FAF0E6]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t('memberPwa')}</span>
        </button>

        <button
          onClick={() => setActiveApp('volunteer')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition border-2 cursor-pointer ${
            activeApp === 'volunteer'
              ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517]'
              : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#806517] hover:text-[#FAF0E6]'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{t('volunteerPwa')}</span>
        </button>

        <button
          onClick={() => setActiveApp('nonprofit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition border-2 cursor-pointer ${
            activeApp === 'nonprofit'
              ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517]'
              : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#806517] hover:text-[#FAF0E6]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{t('nonProfitPwa')}</span>
        </button>
      </div>

      {/* MOBILE PHONE WIREFRAME CONTAINER */}
      <div className="w-full max-w-[390px] rounded-[42px] border-[6px] border-[#0D031B] bg-[#0D031B] p-2.5 shadow-[8px_8px_0px_#DAEE01]">
        {/* Top Phone Speaker Notch & Status Bar */}
        <div className="bg-[#0D031B] text-[#FAF0E6] px-5 py-2 rounded-t-[30px] flex items-center justify-between text-[11px] font-mono">
          <span>9:41 AM</span>
          <div className="w-20 h-3.5 bg-[#806517] rounded-full border border-[#DAEE01]" />
          <span className="text-[#DAEE01] font-bold">PWA • 5G</span>
        </div>

        {/* Phone Screen Viewport */}
        <div className="bg-[#FAF0E6] rounded-b-[30px] overflow-hidden flex flex-col h-[700px] border-2 border-[#0D031B]">
          
          {/* =========================================================
              1. MEMBER PWA (Free Choice Ordering & Live Tracking)
          ========================================================= */}
          {activeApp === 'member' && (
            <>
              {/* Member App Header (#8FB31D) */}
              <div className="bg-[#8FB31D] p-3.5 border-b-2 border-[#0D031B]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#0D031B] shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono uppercase bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded inline-block font-bold">
                        {t('pwaHeaderMember')}
                      </div>
                      <div className="text-xs font-extrabold text-[#0D031B] mt-0.5">
                        1400 Block of 62nd Ave, Oakland
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded border-2 border-[#0D031B] bg-[#806517] text-[#FAF0E6] text-[10px] font-mono font-bold">
                    {t('freeBadge')}
                  </span>
                </div>

                {memberTab === 'browse' && (
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar mt-2.5 pt-2 border-t border-[#0D031B]">
                    {['All', 'Produce', 'Pantry', 'Hot Meal', 'Health', 'Family'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap border-2 transition cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                            : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#806517] hover:text-[#FAF0E6]'
                        }`}
                      >
                        {t(cat.toLowerCase().replace(' ', '')) || cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Member App Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
                {memberTab === 'browse' && (
                  <>
                    {/* Secondary Info Box (#8FB31D with dashed #DAEE01 border) */}
                    <div className="p-3 rounded-xl border-2 border-dashed border-[#DAEE01] bg-[#8FB31D] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-extrabold text-[#0D031B]">Choose Exact Items Your Family Needs</div>
                        <div className="text-[10px] bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded mt-1 inline-block font-mono font-bold">
                          Pooled from 3 local non-profits • Volunteer delivery
                        </div>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-[#0D031B] shrink-0" />
                    </div>

                    {NON_PROFIT_HUBS.map(hub => {
                      const items = selectedCategory === 'All'
                        ? hub.items
                        : hub.items.filter(i => i.category === selectedCategory);
                      if (items.length === 0) return null;

                      return (
                        <div key={hub.id} className="bg-[#FAF0E6] rounded-xl border-2 border-[#0D031B] p-3 space-y-2.5 shadow-[4px_4px_0px_#DAEE01]">
                          <div className="border-b-2 border-[#0D031B] pb-2">
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border border-[#0D031B] bg-[#806517] text-[#FAF0E6] font-bold">
                              {hub.badge}
                            </span>
                            <h3 className="text-xs font-extrabold mt-1 text-[#0D031B]">{hub.name}</h3>
                            <p className="text-[10px] bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded inline-block mt-0.5 font-mono font-semibold">
                              {hub.type} • {hub.distance}
                            </p>
                          </div>

                          <div className="space-y-2">
                            {items.map(item => {
                              const inCart = cart.find(c => c.id === item.id);
                              return (
                                <div
                                  key={item.id}
                                  className="p-2 rounded-lg border-2 border-[#0D031B] bg-[#8FB31D] flex items-center justify-between gap-2"
                                >
                                  <div>
                                    <div className="text-xs font-bold leading-snug text-[#0D031B]">{item.name}</div>
                                    <div className="text-[10px] font-mono bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded inline-block font-bold mt-1">
                                      {item.dietary} • $0.00 ({item.stock})
                                    </div>
                                  </div>

                                  {inCart ? (
                                    <div className="flex items-center gap-1.5 bg-[#0D031B] text-[#FAF0E6] px-2 py-1 rounded-lg border-2 border-[#806517] text-xs font-bold shrink-0">
                                      <button onClick={() => handleRemoveFromCart(item.id)} className="cursor-pointer">
                                        <Minus className="w-3 h-3 text-[#DAEE01]" />
                                      </button>
                                      <span>{inCart.qty}</span>
                                      <button onClick={() => handleAddToCart(item, hub.name)} className="cursor-pointer">
                                        <Plus className="w-3 h-3 text-[#8FB31D]" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => handleAddToCart(item, hub.name)}
                                      className="px-2.5 py-1 rounded-lg border-2 border-[#0D031B] bg-[#806517] text-[#FAF0E6] text-xs font-bold hover:bg-[#0D031B] hover:text-[#DAEE01] transition shrink-0 cursor-pointer"
                                    >
                                      + Add
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {memberTab === 'checkout' && (
                  <div className="space-y-3">
                    <div className="bg-[#FAF0E6] rounded-xl border-2 border-[#0D031B] p-3 space-y-2 shadow-[4px_4px_0px_#DAEE01]">
                      <div className="text-xs font-extrabold uppercase font-mono border-b-2 border-[#0D031B] pb-1.5 text-[#0D031B]">
                        Multi-Pantry Member Basket ({totalCartItems} Items)
                      </div>
                      {cart.map(item => (
                        <div key={item.id} className="flex items-start justify-between text-xs py-1.5 border-b last:border-0 border-[#0D031B]">
                          <div>
                            <div className="font-bold text-[#0D031B]">{item.qty}x {item.name}</div>
                            <div className="text-[10px] bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded inline-block mt-0.5 font-mono font-semibold">
                              From: {item.org}
                            </div>
                          </div>
                          <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-[#806517] text-[#FAF0E6] border border-[#0D031B]">
                            $0.00
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#FAF0E6] rounded-xl border-2 border-[#0D031B] p-3 space-y-2 shadow-[4px_4px_0px_#DAEE01]">
                      <div className="text-xs font-extrabold uppercase font-mono text-[#0D031B]">
                        Mobility & Accessibility Handoff
                      </div>
                      <label className="flex items-center justify-between text-xs py-1 cursor-pointer text-[#0D031B] font-semibold">
                        <span>Bring up porch steps to door</span>
                        <input
                          type="checkbox"
                          checked={deliveryPrefs.porchSteps}
                          onChange={e => setDeliveryPrefs({ ...deliveryPrefs, porchSteps: e.target.checked })}
                          className="w-4 h-4 accent-[#806517]"
                        />
                      </label>
                      <label className="flex items-center justify-between text-xs py-1 cursor-pointer text-[#0D031B] font-semibold">
                        <span>Wait 60s at door (Mobility Aid / Senior)</span>
                        <input
                          type="checkbox"
                          checked={deliveryPrefs.extraWaitTime}
                          onChange={e => setDeliveryPrefs({ ...deliveryPrefs, extraWaitTime: e.target.checked })}
                          className="w-4 h-4 accent-[#806517]"
                        />
                      </label>
                      <label className="flex items-center justify-between text-xs py-1 cursor-pointer text-[#0D031B] font-semibold">
                        <span>Contactless dropoff (Immunocompromised)</span>
                        <input
                          type="checkbox"
                          checked={deliveryPrefs.contactless}
                          onChange={e => setDeliveryPrefs({ ...deliveryPrefs, contactless: e.target.checked })}
                          className="w-4 h-4 accent-[#806517]"
                        />
                      </label>
                    </div>

                    <div className="bg-[#8FB31D] rounded-xl border-2 border-dashed border-[#DAEE01] p-3 font-mono text-xs space-y-1 text-[#0D031B]">
                      <div className="flex justify-between font-bold">
                        <span>Non-Profit Goods:</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Volunteer Courier Delivery:</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Corporate App Markup Fees:</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between pt-1.5 border-t-2 border-[#0D031B] font-extrabold text-sm">
                        <span>TOTAL DUE:</span>
                        <span className="px-2 py-0.5 rounded border-2 border-[#0D031B] bg-[#806517] text-[#FAF0E6]">
                          $0.00 FREE
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setMemberTab('track')}
                      className="w-full py-3 rounded-xl bg-[#806517] text-[#FAF0E6] border-2 border-[#0D031B] font-bold text-xs uppercase tracking-wider shadow-[4px_4px_0px_#DAEE01] hover:bg-[#0D031B] hover:text-[#DAEE01] transition cursor-pointer"
                    >
                      Request Free Volunteer Delivery →
                    </button>
                  </div>
                )}

                {memberTab === 'track' && (
                  <div className="space-y-3">
                    <div className="bg-[#0D031B] text-[#FAF0E6] p-3.5 rounded-xl space-y-1 border-2 border-[#0D031B] shadow-[4px_4px_0px_#DAEE01]">
                      <div className="flex justify-between text-[10px] font-mono text-[#DAEE01]">
                        <span>BATCH #OAK-409</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#806517] text-[#FAF0E6] font-bold">ETA: 14 MINS</span>
                      </div>
                      <div className="text-sm font-extrabold">Volunteer Courier Marcus En Route</div>
                      <div className="text-[11px] text-[#DAEE01]">
                        Consolidated from 2 non-profits • Porch step note active
                      </div>
                    </div>

                    {/* Secondary Info Box (#8FB31D) */}
                    <div className="bg-[#8FB31D] border-2 border-[#0D031B] rounded-xl p-3 space-y-2.5 shadow-[4px_4px_0px_#DAEE01]">
                      <div className="text-[10px] font-mono uppercase bg-[#0D031B] text-[#DAEE01] px-2 py-0.5 rounded inline-block font-bold">
                        [OpenStreetMap Live Courier Tracker]
                      </div>
                      <div className="bg-[#FAF0E6] p-2.5 rounded-lg border-2 border-[#0D031B] text-xs">
                        <div className="font-bold text-[#0D031B]">✓ Pickup 1: East Oakland Collective</div>
                        <div className="text-[10px] bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded inline-block mt-1 font-mono">
                          Produce & Grains loaded at 2:12 PM
                        </div>
                      </div>
                      <div className="bg-[#FAF0E6] p-2.5 rounded-lg border-2 border-[#0D031B] text-xs">
                        <div className="font-bold text-[#0D031B]">✓ Pickup 2: West County Mutual Aid</div>
                        <div className="text-[10px] bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded inline-block mt-1 font-mono">
                          N95 Masks consolidated at 2:26 PM
                        </div>
                      </div>
                      <div className="bg-[#806517] p-2.5 rounded-lg border-2 border-[#0D031B] text-xs text-[#FAF0E6]">
                        <div className="font-extrabold">● Next Stop: Your Household (62nd Ave)</div>
                        <div className="text-[10px] text-[#DAEE01] font-mono font-semibold mt-0.5">
                          Handoff: Walk up 4 porch steps & wait 60s
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Member Bottom Navigation (#8FB31D) */}
              <div className="bg-[#8FB31D] border-t-2 border-[#0D031B] px-4 py-2.5 flex justify-around text-[10px] font-bold">
                <button
                  onClick={() => setMemberTab('browse')}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg border-2 transition cursor-pointer ${
                    memberTab === 'browse'
                      ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                      : 'text-[#0D031B] border-transparent hover:border-[#0D031B]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>1. Choose Items</span>
                </button>
                <button
                  onClick={() => setMemberTab('checkout')}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg border-2 transition cursor-pointer ${
                    memberTab === 'checkout'
                      ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                      : 'text-[#0D031B] border-transparent hover:border-[#0D031B]'
                  }`}
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>2. $0 Basket ({totalCartItems})</span>
                </button>
                <button
                  onClick={() => setMemberTab('track')}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg border-2 transition cursor-pointer ${
                    memberTab === 'track'
                      ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                      : 'text-[#0D031B] border-transparent hover:border-[#0D031B]'
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                  <span>3. Track Courier</span>
                </button>
              </div>
            </>
          )}

          {/* =========================================================
              2. VOLUNTEER COURIER PWA (Multi-Pantry Batch Routing)
          ========================================================= */}
          {activeApp === 'volunteer' && (
            <>
              {/* Volunteer App Header (#8FB31D) */}
              <div className="bg-[#8FB31D] text-[#0D031B] p-3.5 border-b-2 border-[#0D031B]">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded font-bold">
                    THE COMMON NEED • VOLUNTEER PWA
                  </span>
                  <span className="bg-[#806517] text-[#FAF0E6] px-2 py-0.5 rounded border border-[#0D031B] font-bold">
                    BATCH #OAK-409
                  </span>
                </div>
                <div className="text-xs font-extrabold mt-1.5 text-[#0D031B]">
                  Deep East Oakland → Fruitvale Loop
                </div>
                <div className="flex items-center justify-between text-[11px] mt-1.5 pt-1.5 border-t border-[#0D031B] font-mono">
                  <span className="bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded font-bold">
                    42 mins • 4.6 mi
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#806517] text-[#FAF0E6] border border-[#0D031B] font-bold">
                    {completedStops.length}/4 Stops Done
                  </span>
                </div>
              </div>

              {/* Volunteer App Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
                {volunteerTab === 'route' && (
                  <>
                    {/* Secondary Info Box (#8FB31D with dashed #DAEE01 border) */}
                    <div className="p-2.5 rounded-xl border-2 border-dashed border-[#DAEE01] bg-[#8FB31D] text-[11px] flex items-center justify-between text-[#0D031B]">
                      <span><strong>Desiloed Route:</strong> 2 Non-Profits → 2 Homes</span>
                      <span className="font-mono font-bold bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded">
                        $47.50 CBO Fees Saved
                      </span>
                    </div>

                    {VOLUNTEER_STOPS.map(stop => {
                      const isDone = completedStops.includes(stop.step);
                      return (
                        <div
                          key={stop.step}
                          className="p-3 rounded-xl border-2 border-[#0D031B] bg-[#FAF0E6] shadow-[4px_4px_0px_#DAEE01] transition"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 py-0.5 rounded border border-[#0D031B] bg-[#0D031B] text-[#DAEE01] font-mono font-bold text-[10px]">
                              STOP {stop.step} • {stop.type}
                            </span>
                            <button
                              onClick={() => toggleStopCompletion(stop.step)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border-2 cursor-pointer ${
                                isDone
                                  ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B]'
                                  : 'bg-[#806517] text-[#FAF0E6] border-[#0D031B]'
                              }`}
                            >
                              <Check className="w-3 h-3" />
                              <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                            </button>
                          </div>

                          <div className="text-xs font-extrabold mt-2 text-[#0D031B]">{stop.org}</div>
                          <div className="text-[10px] bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded inline-block mt-1 font-mono font-semibold">
                            {stop.address} ({stop.timeWindow})
                          </div>

                          {/* Secondary Info Box (#8FB31D) */}
                          <div className="mt-2 p-2 rounded-lg bg-[#8FB31D] border-2 border-[#0D031B] text-[11px] space-y-1">
                            <div className="font-bold text-[#0D031B]">📦 {stop.itemsCount}</div>
                            <div className="text-[#0D031B] font-medium">📝 {stop.notes}</div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {volunteerTab === 'vote' && (
                  <div className="space-y-3">
                    <div className="bg-[#FAF0E6] rounded-xl border-2 border-[#0D031B] p-3 space-y-2 shadow-[4px_4px_0px_#DAEE01]">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-[#0D031B] bg-[#0D031B] text-[#DAEE01] font-bold">
                        decidim-module-courier Governance
                      </span>
                      <h3 className="text-xs font-extrabold text-[#0D031B]">
                        Volunteer Courier Assembly Proposal #206
                      </h3>
                      <p className="text-[11px] text-[#0D031B] bg-[#8FB31D] p-2 rounded-lg border border-[#0D031B] font-medium">
                        Allocate municipal grant funds to station 12 cargo e-bikes at local pantries so working-class volunteers never pay out-of-pocket fuel costs.
                      </p>
                      <div className="pt-2 flex items-center justify-between text-xs font-bold">
                        <span className="bg-[#0D031B] text-[#DAEE01] px-2 py-1 rounded font-mono text-[10px]">
                          Quorum: 96% Met
                        </span>
                        <span className="px-2.5 py-1 rounded bg-[#806517] text-[#FAF0E6] border-2 border-[#0D031B]">
                          Voted Support ✓
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Volunteer Bottom Navigation (#8FB31D) */}
              <div className="bg-[#8FB31D] border-t-2 border-[#0D031B] px-4 py-2.5 flex justify-around text-[10px] font-bold">
                <button
                  onClick={() => setVolunteerTab('route')}
                  className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg border-2 transition cursor-pointer ${
                    volunteerTab === 'route'
                      ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                      : 'text-[#0D031B] border-transparent hover:border-[#0D031B]'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>1. Active Batch Route</span>
                </button>
                <button
                  onClick={() => setVolunteerTab('vote')}
                  className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg border-2 transition cursor-pointer ${
                    volunteerTab === 'vote'
                      ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                      : 'text-[#0D031B] border-transparent hover:border-[#0D031B]'
                  }`}
                >
                  <Vote className="w-4 h-4" />
                  <span>2. Courier Co-op Vote</span>
                </button>
              </div>
            </>
          )}

          {/* =========================================================
              3. NON-PROFIT PWA (CBO Inventory & Volunteer Dispatch)
          ========================================================= */}
          {activeApp === 'nonprofit' && (
            <>
              {/* Non-Profit App Header (#8FB31D) */}
              <div className="bg-[#8FB31D] p-3.5 border-b-2 border-[#0D031B]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded inline-block font-bold">
                      THE COMMON NEED • NON-PROFIT PWA
                    </div>
                    <div className="text-xs font-extrabold text-[#0D031B] mt-0.5">
                      East Oakland Collective Pantry Hub
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded border-2 border-[#0D031B] bg-[#806517] text-[#FAF0E6] text-[10px] font-mono font-bold">
                    $0 FREE CO-OP
                  </span>
                </div>

                {/* CBO Sustainability Impact Strip */}
                <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-[#0D031B] text-[10px] font-mono">
                  <div className="bg-[#FAF0E6] p-1.5 rounded border-2 border-[#0D031B]">
                    <span className="bg-[#0D031B] text-[#DAEE01] px-1 rounded font-bold inline-block">
                      DOORDASH FEES SAVED:
                    </span>
                    <strong className="text-xs text-[#0D031B] block mt-0.5">$1,420 / mo</strong>
                  </div>
                  <div className="bg-[#FAF0E6] p-1.5 rounded border-2 border-[#0D031B]">
                    <span className="bg-[#0D031B] text-[#DAEE01] px-1 rounded font-bold inline-block">
                      STAFF HOURS SAVED:
                    </span>
                    <strong className="text-xs text-[#0D031B] block mt-0.5">18.5 hrs / wk</strong>
                  </div>
                </div>
              </div>

              {/* Non-Profit App Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
                {/* Tab 1: Outgoing Volunteer Batch Manifests */}
                {nonProfitTab === 'dispatch' && (
                  <>
                    {/* Secondary Info Box (#8FB31D with dashed #DAEE01 border) */}
                    <div className="p-2.5 rounded-xl border-2 border-dashed border-[#DAEE01] bg-[#8FB31D] text-[11px] text-[#0D031B]">
                      <strong>Shared Volunteer Fleet:</strong> Pre-pack member choice crates below for incoming volunteer couriers.
                    </div>

                    {manifests.map(m => (
                      <div key={m.batchId} className="bg-[#FAF0E6] rounded-xl border-2 border-[#0D031B] p-3 space-y-2 shadow-[4px_4px_0px_#DAEE01]">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded border border-[#0D031B] bg-[#0D031B] text-[#DAEE01]">
                            {m.batchId}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded">
                            {m.eta}
                          </span>
                        </div>

                        <div className="text-xs font-extrabold text-[#0D031B]">{m.courier}</div>
                        <div className="text-[11px] text-[#0D031B] font-semibold">
                          Serving {m.householdsServed} neighborhood households in this loop
                        </div>

                        {/* Secondary Info Box (#8FB31D) */}
                        <div className="p-2 rounded-lg bg-[#8FB31D] border-2 border-[#0D031B] text-[11px] text-[#0D031B]">
                          <strong>Pull from Shelf:</strong> {m.items}
                        </div>

                        <button
                          onClick={() => toggleManifestReady(m.batchId)}
                          className={`w-full py-2 rounded-lg text-xs font-bold border-2 transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            m.ready
                              ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B]'
                              : 'bg-[#806517] text-[#FAF0E6] border-[#0D031B]'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{m.ready ? 'Crates Staged at Loading Ramp ✓' : 'Mark Crates Ready for Courier'}</span>
                        </button>
                      </div>
                    ))}
                  </>
                )}

                {/* Tab 2: Publish Live Member-Choice Inventory */}
                {nonProfitTab === 'inventory' && (
                  <div className="space-y-3">
                    <form onSubmit={handleAddCboInventory} className="bg-[#FAF0E6] rounded-xl border-2 border-[#0D031B] p-3 space-y-2 shadow-[4px_4px_0px_#DAEE01]">
                      <div className="text-xs font-extrabold uppercase font-mono text-[#0D031B]">
                        + Post Surplus Goods to Member App
                      </div>
                      <input
                        type="text"
                        placeholder="Item name (e.g., Fresh Bok Choy & Ginger)"
                        value={newItemName}
                        onChange={e => setNewItemName(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border-2 border-[#0D031B] text-xs bg-[#FAF0E6] text-[#0D031B]"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Qty"
                          value={newItemQty}
                          onChange={e => setNewItemQty(e.target.value)}
                          className="w-24 px-2.5 py-1.5 rounded-lg border-2 border-[#0D031B] text-xs bg-[#FAF0E6] text-[#0D031B]"
                        />
                        <button
                          type="submit"
                          className="flex-1 py-1.5 rounded-lg bg-[#806517] text-[#FAF0E6] border-2 border-[#0D031B] text-xs font-bold hover:bg-[#0D031B] hover:text-[#DAEE01] transition cursor-pointer"
                        >
                          + Add to Common Need
                        </button>
                      </div>
                    </form>

                    <div className="space-y-2">
                      {cboInventory.map(item => (
                        <div key={item.id} className="bg-[#FAF0E6] rounded-xl border-2 border-[#0D031B] p-3 flex items-center justify-between shadow-[4px_4px_0px_#DAEE01]">
                          <div>
                            <div className="text-xs font-bold text-[#0D031B]">{item.name}</div>
                            <div className="text-[10px] font-mono bg-[#0D031B] text-[#DAEE01] px-1.5 py-0.5 rounded inline-block mt-1 font-semibold">
                              {item.dietary} • {item.status}
                            </div>
                          </div>
                          <span className="px-2 py-1 rounded bg-[#806517] border-2 border-[#0D031B] font-mono font-bold text-xs text-[#FAF0E6]">
                            {item.cratesReady} left
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Non-Profit Federation & Decidim Governance */}
                {nonProfitTab === 'coop' && (
                  <div className="space-y-3">
                    <div className="bg-[#FAF0E6] rounded-xl border-2 border-[#0D031B] p-3 space-y-2 shadow-[4px_4px_0px_#DAEE01]">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0D031B]">
                        <Sliders className="w-4 h-4 text-[#806517]" />
                        <span>CBO Federation Routing Priority</span>
                      </div>
                      <p className="text-[11px] text-[#0D031B] font-medium">
                        Your organization co-owns <code>decidim-module-courier</code> alongside 14 local pantries, pharmacies, and mutual aid kitchens.
                      </p>
                      {/* Secondary Info Box (#8FB31D) */}
                      <div className="p-2.5 rounded-lg bg-[#8FB31D] border-2 border-[#0D031B] text-[11px] space-y-1 font-mono text-[#0D031B] font-bold">
                        <div>✓ Co-op Van Pool: Active (Tues/Thurs)</div>
                        <div>✓ Perishable Hot Meal Priority: Enabled</div>
                        <div>✓ Zero Means-Testing Pledge: Verified</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Non-Profit Bottom Navigation (#8FB31D) */}
              <div className="bg-[#8FB31D] border-t-2 border-[#0D031B] px-4 py-2.5 flex justify-around text-[10px] font-bold">
                <button
                  onClick={() => setNonProfitTab('dispatch')}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg border-2 transition cursor-pointer ${
                    nonProfitTab === 'dispatch'
                      ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                      : 'text-[#0D031B] border-transparent hover:border-[#0D031B]'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>1. Courier Handoff</span>
                </button>
                <button
                  onClick={() => setNonProfitTab('inventory')}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg border-2 transition cursor-pointer ${
                    nonProfitTab === 'inventory'
                      ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                      : 'text-[#0D031B] border-transparent hover:border-[#0D031B]'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  <span>2. Live Shelf Stock</span>
                </button>
                <button
                  onClick={() => setNonProfitTab('coop')}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg border-2 transition cursor-pointer ${
                    nonProfitTab === 'coop'
                      ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                      : 'text-[#0D031B] border-transparent hover:border-[#0D031B]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>3. CBO Co-op</span>
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export const AlphaSection: React.FC = () => {
  const { t } = useAccessibility();

  return (
    <section id="alpha" className="py-16 sm:py-24 border-b border-[#E5E0D8] bg-[#FAF0E6] relative overflow-hidden font-sans text-[#0D031B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8FB31D] text-[#0D031B] text-xs font-mono font-bold tracking-wider mb-4 border-2 border-[#0D031B]">
            <span className="w-2 h-2 rounded-full bg-[#806517] animate-pulse" />
            [ {t('earlyPreview')} ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#0D031B] font-editorial leading-tight mb-4">
            {t('howAppsWork')}
          </h2>
          <p className="text-base sm:text-lg text-[#0D031B]/80 font-medium leading-relaxed">
            {t('appsDesc')}
          </p>
        </div>

        {/* Wireframe Showcase */}
        <TheCommonNeedWireframes />
      </div>
    </section>
  );
};

export default TheCommonNeedWireframes;
