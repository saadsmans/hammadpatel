import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  ShoppingBag, 
  Search, 
  Server, 
  Palette, 
  Clock, 
  Check, 
  CheckCircle2, 
  Copy, 
  MessageCircle, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw,
  Layers,
  Zap,
  Layout,
  IndianRupee,
  CreditCard,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

// Hourly rate in Indian Rupees (₹ INR) for Indian freelance market
const HOURLY_RATE_INR = 499;

export interface ServiceOption {
  id: string;
  category: string;
  title: string;
  description: string;
  baseHours: number;
  iconName: 'globe' | 'shopping-bag' | 'palette' | 'search' | 'server' | 'layout';
}

export interface PackageDepth {
  id: string;
  title: string;
  description: string;
  extraHours: number;
}

export interface DeliverableItem {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  hours: number;
  description: string;
  defaultChecked?: boolean;
}

const SERVICES: ServiceOption[] = [
  {
    id: 'wordpress-business',
    category: 'BUSINESS WEBSITES',
    title: 'Business Website (WordPress / Custom)',
    description: 'A clean, modern website designed to make your business look trustworthy, look great on phones, and bring customer inquiries.',
    baseHours: 8,
    iconName: 'globe'
  },
  {
    id: 'shopify-store',
    category: 'ONLINE STORES & E-COMMERCE',
    title: 'Online Shop (Shopify / WooCommerce)',
    description: 'A complete online shop where customers can browse your products on their phone, add to cart, and pay safely via UPI, Cards, or Netbanking.',
    baseHours: 12,
    iconName: 'shopping-bag'
  },
  {
    id: 'branding-design',
    category: 'BRANDING & GRAPHIC DESIGN',
    title: 'Logo, Banners & Graphic Design Kit',
    description: 'A complete visual look for your brand: high-resolution logos, matching social media banners, printed flyers, and promo graphics.',
    baseHours: 5,
    iconName: 'palette'
  },
  {
    id: 'google-seo',
    category: 'GOOGLE SEARCH & MARKETING',
    title: 'Get Found on Google & Local SEO',
    description: 'Help your business show up higher when people search for what you do on Google, set up Google Search Console, and track new leads.',
    baseHours: 4,
    iconName: 'search'
  },
  {
    id: 'website-maintenance',
    category: 'HOSTING, BACKUPS & MAINTENANCE',
    title: 'Website Hosting & Monthly Support',
    description: 'Fast, reliable website management, automatic daily safety backups, connecting your domain name, and friendly WhatsApp support whenever you need edits.',
    baseHours: 3,
    iconName: 'server'
  },
  {
    id: 'website-builder',
    category: 'VISUAL WEB BUILDERS',
    title: 'Website Builders (Wix / Webflow / Framer)',
    description: 'A custom landing page or company profile built with smooth animations, modern typography, and fast launch on visual builders.',
    baseHours: 6,
    iconName: 'layout'
  }
];

const PACKAGE_DEPTHS: PackageDepth[] = [
  {
    id: 'starter',
    title: 'Quick Starter Package',
    description: 'Essential core pages, clean responsive layout & standard setup (+1.5h)',
    extraHours: 1.5
  },
  {
    id: 'standard',
    title: 'Standard Business Package',
    description: 'Full multi-page setup, customized design, lead capture & complete branding (+3.5h)',
    extraHours: 3.5
  },
  {
    id: 'complete',
    title: 'Complete Growth Kit',
    description: 'Advanced visual polish, conversion funnels, complete SEO & priority delivery (+5.5h)',
    extraHours: 5.5
  }
];

const DELIVERABLE_ITEMS: DeliverableItem[] = [
  {
    id: 'logo-package',
    title: 'Complete Logo Package (Primary, Secondary & Icon)',
    badge: 'LOGO PACKAGE',
    badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    hours: 3.0,
    description: 'A sharp, custom logo with versions for light backgrounds, dark backgrounds, and square profile icons for WhatsApp and Instagram.',
    defaultChecked: true
  },
  {
    id: 'banners',
    title: 'Website Banners & Header Images',
    badge: 'DIGITAL',
    badgeColor: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
    hours: 2.0,
    description: 'Eye-catching banner images and promotional graphics for your website homepage, sales announcements, or special deals.',
    defaultChecked: true
  },
  {
    id: 'social-kit',
    title: 'Social Media Graphics Kit',
    badge: 'SOCIAL MEDIA',
    badgeColor: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    hours: 2.0,
    description: 'Profile pictures, matching cover banners, and reusable post templates for Instagram, Facebook, and LinkedIn.',
    defaultChecked: true
  },
  {
    id: 'whatsapp-chat',
    title: 'WhatsApp Instant Chat & Lead Inquiry Form',
    badge: 'LEAD CAPTURE',
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    hours: 1.5,
    description: 'Direct 1-click floating WhatsApp button on every page, plus a custom quote inquiry form that sends leads straight to your phone.',
    defaultChecked: true
  },
  {
    id: 'product-setup',
    title: 'Product Catalog & Variant Setup (Shopify / WooCommerce)',
    badge: 'E-COMMERCE',
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    hours: 3.5,
    description: 'Setting up products with sizes, colors, high-res photo galleries, inventory tracking, and collection categorizations.',
    defaultChecked: false
  },
  {
    id: 'indian-payments',
    title: 'Indian Payment Gateways (UPI, Razorpay, Cashfree, Cards)',
    badge: 'PAYMENTS',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    hours: 2.5,
    description: 'Seamless integration of Indian payment methods: Google Pay, PhonePe, Paytm, UPI QR, Netbanking, and Credit/Debit cards.',
    defaultChecked: false
  },
  {
    id: 'seo-setup',
    title: 'On-Page SEO & Google Search Console Indexing',
    badge: 'SEO & GOOGLE',
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    hours: 2.0,
    description: 'Meta titles, descriptions, XML sitemap generation, and submitting your site to Google Search Console for fast indexing.',
    defaultChecked: false
  },
  {
    id: 'speed-optimization',
    title: 'Speed Optimization & Image Compression',
    badge: 'PERFORMANCE',
    badgeColor: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
    hours: 1.5,
    description: 'Asset minification, caching setup, and image compression for sub-second page load times on Indian mobile networks (4G/5G).',
    defaultChecked: false
  },
  {
    id: 'domain-ssl',
    title: 'Custom Domain & Free SSL Security Certificate Setup',
    badge: 'HOSTING / SSL',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    hours: 1.0,
    description: 'Connecting your custom .in/.com domain name, setting up DNS records, and activating HTTPS green padlock security.',
    defaultChecked: false
  },
  {
    id: 'video-tutorial',
    title: 'Personal Video Tutorial & Handover Walkthrough',
    badge: 'WALKTHROUGH',
    badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    hours: 1.0,
    description: 'A screen-recorded personalized video tutorial showing you exactly how to edit text, change photos, and add products yourself.',
    defaultChecked: false
  }
];

export const ProjectEstimator: React.FC = () => {
  // Step 01: Service Selection
  const [selectedServiceId, setSelectedServiceId] = useState<string>('wordpress-business');
  
  // Step 02: Package Depth & Deliverables Checklist
  const [selectedDepthId, setSelectedDepthId] = useState<string>('standard');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([
    'logo-package',
    'banners',
    'social-kit',
    'whatsapp-chat'
  ]);

  // Step 03: Delivery Pace & Timeline
  const [deliveryPace, setDeliveryPace] = useState<'standard' | 'rush'>('standard');

  // Copied state
  const [copied, setCopied] = useState<boolean>(false);

  // Active service object
  const activeService = useMemo(() => {
    return SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  // Active depth object
  const activeDepth = useMemo(() => {
    return PACKAGE_DEPTHS.find(d => d.id === selectedDepthId) || PACKAGE_DEPTHS[1];
  }, [selectedDepthId]);

  // Toggle deliverable checkbox
  const toggleItem = (itemId: string) => {
    if (selectedItemIds.includes(itemId)) {
      setSelectedItemIds(selectedItemIds.filter(id => id !== itemId));
    } else {
      setSelectedItemIds([...selectedItemIds, itemId]);
    }
  };

  const selectAllItems = () => {
    setSelectedItemIds(DELIVERABLE_ITEMS.map(i => i.id));
  };

  const clearAllItems = () => {
    setSelectedItemIds([]);
  };

  // Calculations
  const calculations = useMemo(() => {
    const baseHours = activeService.baseHours;
    const depthHours = activeDepth.extraHours;
    
    // Sum hours from checked deliverable items
    const itemsHours = selectedItemIds.reduce((sum, id) => {
      const item = DELIVERABLE_ITEMS.find(i => i.id === id);
      return sum + (item ? item.hours : 0);
    }, 0);

    const totalHours = baseHours + depthHours + itemsHours;
    const paceMultiplier = deliveryPace === 'rush' ? 1.25 : 1.0;
    
    // Calculate price in Indian Rupees
    const rawPriceInr = totalHours * HOURLY_RATE_INR * paceMultiplier;
    // Round to clean, standard Indian price ending in 99 or 49
    const roundedPriceInr = Math.round(rawPriceInr / 50) * 50 - 1;

    // Timeline estimate
    let timelineDays = '3 – 5 Days';
    if (deliveryPace === 'rush') {
      timelineDays = '1 – 2 Days (Priority Fast Track)';
    } else if (totalHours > 20) {
      timelineDays = '5 – 7 Days';
    } else if (totalHours > 12) {
      timelineDays = '3 – 5 Days';
    } else {
      timelineDays = '2 – 3 Days';
    }

    return {
      baseHours,
      depthHours,
      itemsHours,
      totalHours,
      roundedPriceInr: Math.max(roundedPriceInr, 1499),
      timelineDays,
      paceMultiplier
    };
  }, [activeService, activeDepth, selectedItemIds, deliveryPace]);

  // Generate WhatsApp prefilled message
  const whatsappUrl = useMemo(() => {
    const checkedItemNames = DELIVERABLE_ITEMS
      .filter(i => selectedItemIds.includes(i.id))
      .map(i => `• ${i.title} (+${i.hours}h)`)
      .join('\n');

    const text = `Hello Hammad Patel! 👋
I used your Interactive Price & Hour Estimator on your portfolio and would like to hire you for a project:

📌 *Service:* ${activeService.title}
📦 *Package Depth:* ${activeDepth.title}
⚡ *Delivery Pace:* ${deliveryPace === 'rush' ? 'Priority Rush Delivery (Fast Track)' : 'Standard Milestone Pace'}
⏱️ *Estimated Timeline:* ${calculations.timelineDays}

✅ *Selected Deliverables (${selectedItemIds.length} items):*
${checkedItemNames || '• Standard Setup'}

📊 *Estimated Hours:* ~${calculations.totalHours.toFixed(1)} hours
💰 *Estimated Investment:* ₹${calculations.roundedPriceInr.toLocaleString('en-IN')} (Indian Rupees)

Please let me know when we can discuss the project details!`;

    return `https://wa.me/919974761355?text=${encodeURIComponent(text)}`;
  }, [activeService, activeDepth, deliveryPace, calculations, selectedItemIds]);

  // Copy Summary to Clipboard
  const handleCopySummary = () => {
    const checkedItemNames = DELIVERABLE_ITEMS
      .filter(i => selectedItemIds.includes(i.id))
      .map(i => `  - ${i.title} (+${i.hours}h)`)
      .join('\n');

    const summary = `=====================================================
PROPOSAL ESTIMATE · HAMMAD PATEL (WEBSITE SPECIALIST)
Direct WhatsApp: +91 99747 61355 | Email: ${PERSONAL_INFO.email}
=====================================================

Service: ${activeService.title}
Package Depth: ${activeDepth.title}
Delivery Pace: ${deliveryPace === 'rush' ? 'Priority Rush Delivery' : 'Standard Milestone Pace'}
Estimated Timeline: ${calculations.timelineDays}

Included Deliverables (${selectedItemIds.length} items):
${checkedItemNames}

Total Estimated Hours: ~${calculations.totalHours.toFixed(1)} hours
Total Estimated Investment: ₹${calculations.roundedPriceInr.toLocaleString('en-IN')} INR
Hourly Base: ₹${HOURLY_RATE_INR}/hr

Guaranteed Deliverables:
- 100% full ownership of all website credentials & files
- Fixed-price agreement with no hidden surprises
- Direct WhatsApp support (+91 99747 61355)
=====================================================`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // safe fallback
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const getServiceIcon = (name: string) => {
    switch(name) {
      case 'globe': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'shopping-bag': return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'palette': return <Palette className="w-5 h-5 text-sky-400" />;
      case 'search': return <Search className="w-5 h-5 text-purple-400" />;
      case 'server': return <Server className="w-5 h-5 text-amber-400" />;
      default: return <Layout className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="w-full">
      
      {/* Estimator Header Banner */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>INSTANT UPFRONT PRICING · ₹{HOURLY_RATE_INR}/HR FAIR INDIAN RATE</span>
        </div>

        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white uppercase leading-tight max-w-4xl">
          INTERACTIVE PROJECT{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500">
            PRICE & HOUR
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
            ESTIMATOR
          </span>
        </h3>

        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl text-xs sm:text-sm leading-relaxed">
          Calculate an honest, upfront price in 3 simple steps. Pick your deliverables and generate a transparent proposal with no hidden surprises, priced for Indian businesses and startups.
        </p>
      </div>

      {/* STEP 01 · WHAT DOES YOUR BUSINESS NEED? */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
            <span>STEP 01 · WHAT DOES YOUR BUSINESS NEED?</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {SERVICES.length} Clear Options
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => {
            const isSelected = selectedServiceId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-cyan-400 shadow-xl ring-2 ring-cyan-400/20 scale-101'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                      ~{service.baseHours}h base (₹{(service.baseHours * HOURLY_RATE_INR).toLocaleString('en-IN')})
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
                    {service.category}
                  </span>

                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-400 transition-colors">
                    {service.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Base Cost:</span>
                  <span className={`font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    ₹{(service.baseHours * HOURLY_RATE_INR).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 02 · CHOOSE YOUR DELIVERABLES & FEATURES */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
            <span>STEP 02 · CHOOSE YOUR SPECIFIC DELIVERABLES & FEATURES</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={selectAllItems}
              className="text-indigo-500 hover:text-indigo-400 transition-colors"
            >
              Select All
            </button>
            <span className="text-slate-400">·</span>
            <button
              onClick={clearAllItems}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Brand Style Guide Depth Selector Pills */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm mb-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
            PROJECT SCOPE & PACKAGE DEPTH:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PACKAGE_DEPTHS.map((pkg) => {
              const isSelected = selectedDepthId === pkg.id;
              const pkgCost = Math.round(pkg.extraHours * HOURLY_RATE_INR);
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedDepthId(pkg.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-500/10 dark:bg-cyan-950/40 border-cyan-400 shadow-md ring-1 ring-cyan-400/30'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                      {pkg.title}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    {pkg.description}
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-cyan-500 font-semibold">
                    +{pkg.extraHours}h (+₹{pkgCost.toLocaleString('en-IN')})
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1 mb-1">
            <span>CHECK THE ITEMS YOU WANT INCLUDED ({selectedItemIds.length} SELECTED):</span>
            <span>Indian Market Add-on Rates</span>
          </div>

          {DELIVERABLE_ITEMS.map((item) => {
            const isChecked = selectedItemIds.includes(item.id);
            const itemCost = Math.round(item.hours * HOURLY_RATE_INR);

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-cyan-500/5 dark:bg-cyan-950/20 border-cyan-400/80 shadow-sm'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                {/* Custom Checkbox */}
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isChecked 
                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-sm' 
                    : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                }`}>
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                        {item.title}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 shrink-0">
                      +{item.hours}h (+₹{itemCost.toLocaleString('en-IN')})
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 03 · DELIVERY PACE & TIMELINE */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
            <span>STEP 03 · DELIVERY PACE & TIMELINE</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Select Launch Speed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Standard Pace Card */}
          <div
            onClick={() => setDeliveryPace('standard')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
              deliveryPace === 'standard'
                ? 'bg-cyan-500/10 dark:bg-cyan-950/30 border-cyan-400 shadow-md ring-1 ring-cyan-400/30'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold font-display text-slate-900 dark:text-white">
                  Standard Milestone Pace
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  REGULAR PACE
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Comfortable milestone timeline with regular live preview links for you to review and give design feedback.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/5 text-xs font-mono text-slate-400">
              Estimated: <strong className="text-slate-900 dark:text-white">3 – 5 Business Days</strong>
            </div>
          </div>

          {/* Priority Rush Card */}
          <div
            onClick={() => setDeliveryPace('rush')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
              deliveryPace === 'rush'
                ? 'bg-amber-500/10 dark:bg-amber-950/30 border-amber-400 shadow-md ring-1 ring-amber-400/30'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold font-display text-slate-900 dark:text-white">
                  Priority Rush Delivery
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  FAST TRACK (+25%)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Priority schedule allocation if you have an urgent product launch deadline or marketing event to hit.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/5 text-xs font-mono text-amber-500">
              Estimated: <strong className="text-amber-400">1 – 2 Days Priority Turnaround</strong>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE PROPOSAL & INSTANT ESTIMATE CARD (Matching the Screenshots) */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 relative">
        
        {/* Top Header of the Estimate */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-0.5">
              [ YOUR INSTANT ESTIMATE ]
            </div>
            <h4 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
              Hammad Patel · Website Specialist
            </h4>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-bold text-cyan-500 dark:text-cyan-400 self-start sm:self-auto">
            <span>Rate: ₹{HOURLY_RATE_INR}/hr</span>
          </div>
        </div>

        {/* Selected Details Table */}
        <div className="py-6 space-y-3.5 text-xs font-mono border-b border-slate-200 dark:border-white/10">
          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500 shrink-0">Service:</span>
            <span className="font-bold text-slate-900 dark:text-white uppercase text-right">
              {activeService.title}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500 shrink-0">Selected Scope:</span>
            <span className="font-semibold text-cyan-600 dark:text-cyan-400 text-right">
              {activeDepth.title} (+{activeDepth.extraHours}h)
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500 shrink-0">Included Deliverables:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-right">
              {selectedItemIds.length} Specific Items Checked
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500 shrink-0">Delivery Pace:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
              {deliveryPace === 'rush' ? 'Priority Rush Delivery (Fast Track)' : 'Standard Milestone Pace'}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500 shrink-0">Estimated Timeline:</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-right">
              {calculations.timelineDays}
            </span>
          </div>
        </div>

        {/* Big Investment Callout */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              ESTIMATED INVESTMENT:
            </span>
            <span className="text-xs font-mono text-cyan-500 dark:text-cyan-400 block font-medium">
              ~{calculations.totalHours.toFixed(1)} hours of dedicated work
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md leading-relaxed">
              Clear, honest pricing based on ₹{HOURLY_RATE_INR}/hr. Full ownership of all files and code, zero surprise charges, and direct communication with Hammad.
            </p>
          </div>

          {/* Giant Price in Indian Rupees */}
          <div className="text-left sm:text-right shrink-0">
            <div className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500">
              ₹{calculations.roundedPriceInr.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-1">
              All-inclusive transparent Indian estimate
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Main WhatsApp CTA Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-mono text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-emerald-600/30 hover:scale-101 active:scale-99"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Send This Estimate to WhatsApp (+91 99747 61355)</span>
          </a>

          {/* Secondary Actions (Copy Summary & Email) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleCopySummary}
              className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-indigo-400" />}
              <span>{copied ? 'Estimate Copied to Clipboard!' : 'Copy Summary'}</span>
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`Project Estimate: ${activeService.title} (₹${calculations.roundedPriceInr.toLocaleString('en-IN')})`)}&body=${encodeURIComponent(`Hello Hammad,\n\nI created an estimate on your website for ${activeService.title} totaling ₹${calculations.roundedPriceInr.toLocaleString('en-IN')} (~${calculations.totalHours.toFixed(1)} hours).\n\nPlease get in touch to discuss details.`)}`}
              className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Email Hammad Directly</span>
            </a>
          </div>
        </div>

        {/* The Hammad Patel Guarantee Banner */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>The Hammad Patel Guarantee:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>100% full ownership of all website credentials & files</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Fixed-price milestone agreement so your price never changes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Personal video tutorial on how to update words & photos yourself</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Direct phone & WhatsApp support with Hammad (+91 99747 61355)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
