import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, CartItem } from '../types';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ArrowLeft,
  ShoppingBag,
  Video,
  Play,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  PhoneCall,
  Clock,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  step?: string;
  quickReplies?: Array<{ label: string; action: string; icon?: string }>;
  showProductCarousel?: boolean;
  products?: Product[];
  showVideoCarousel?: boolean;
  showPincodeInput?: boolean;
  showOrderSummary?: boolean;
  orderItems?: CartItem[];
  orderTotal?: number;
  selectedProduct?: Product | null;
  pincode?: string;
  showSupportCard?: boolean;
}

interface VideoStory {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  description: string;
  highlights: string[];
}

const CRAFTSMANSHIP_VIDEOS: VideoStory[] = [
  {
    id: 'video-1',
    title: 'From Leather to Last: Sourcing',
    subtitle: 'Chapter 1 • Raw Material Excellence',
    duration: '1:45 min',
    thumbnail: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80',
    description: 'We source the top 5% full-grain leather from certified sustainable European and Argentine tanneries, ensuring unmatched suppleness, natural breathability, and age-defying durability.',
    highlights: [
      'Top-tier full-grain hide selection',
      'Vegetable tanning without harsh chemicals',
      'Zero synthetic plastic coatings'
    ]
  },
  {
    id: 'video-2',
    title: 'Handstitched: Inside Our Workshop',
    subtitle: 'Chapter 2 • 18 Hours of Master Artisan Craft',
    duration: '2:10 min',
    thumbnail: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80',
    description: 'Every pair of Titaan shoes undergoes 120 individual artisanal steps, including Goodyear-welted double stitching, hand-shaped lasts, and custom memory foam arch molding.',
    highlights: [
      'Over 120 precision manufacturing steps',
      'Hand-sewn moc-toe and welted seams',
      'Orthopedic arch-cushioned footbeds'
    ]
  },
  {
    id: 'video-3',
    title: 'Final Polish: Quality Check',
    subtitle: 'Chapter 3 • Mirror Gloss & Soling',
    duration: '1:30 min',
    thumbnail: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    description: 'Before boxed in luxury magnetic packaging, each shoe is burnished by hand using organic carnauba waxes and inspected for microscopic stitching tolerances.',
    highlights: [
      'Triple-layer carnauba wax burnishing',
      'Neolite & TPR non-slip sole vulcanization',
      'Signed certificate of authenticity'
    ]
  }
];

export const Chatbot: React.FC = () => {
  const {
    products,
    cart,
    cartFinalTotal,
    addToCart,
    applyCoupon,
    placeOrder,
    setActiveProductDetail,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsTrackOrderOpen,
    setIsStoreLocatorOpen,
    setIsSizeGuideOpen,
    addToast
  } = useShop();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showCallout, setShowCallout] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [pincodeVal, setPincodeVal] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoStory | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // In-session memory
  const [sessionData, setSessionData] = useState<{
    shoppingFor: string;
    stylePreference: string;
    selectedProduct: Product | null;
    pincode: string;
    fallbackCount: number;
    stepHistory: string[];
    pendingStyleKey: string | null;
  }>({
    shoppingFor: 'Myself',
    stylePreference: 'All',
    selectedProduct: null,
    pincode: '',
    fallbackCount: 0,
    stepHistory: ['step-welcome'],
    pendingStyleKey: null
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Proactive greeting bubble after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowCallout(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Initial welcome message setup
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'msg-welcome-1',
          sender: 'bot',
          text: '👋 Hey there! Welcome to Titaan Footwear — handcrafted, premium luxury shoes designed for timeless elegance and all-day comfort.',
          timestamp: getTimeString(),
          step: 'step-welcome'
        },
        {
          id: 'msg-welcome-2',
          sender: 'bot',
          text: "I'm your personal Titaan Stylist & Concierge. Let me help you find your ideal pair, show you how our shoes are crafted, or assist with your order. How would you like to start?",
          timestamp: getTimeString(),
          step: 'step-welcome',
          quickReplies: [
            { label: '✨ Guide Me / Quick Tour', action: 'action_start_tour' },
            { label: '👞 Browse Formal Shoes', action: 'action_browse_formal' },
            { label: '👟 Explore Sneakers', action: 'action_browse_sneakers' },
            { label: '🎥 Craftsmanship Videos', action: 'action_show_craft_videos' },
            { label: '📦 Track My Order', action: 'action_open_tracker' }
          ]
        }
      ]);
    }
  }, [messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  function getTimeString() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Play subtle sound if enabled
  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
    setShowCallout(false);
    playSound();
  };

  const addBotMessage = (msg: Omit<ChatMessage, 'id' | 'sender' | 'timestamp'>) => {
    playSound();
    const newMsg: ChatMessage = {
      ...msg,
      id: `bot-msg-${Date.now()}-${Math.random()}`,
      sender: 'bot',
      timestamp: getTimeString()
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const addUserMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: getTimeString()
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Helper to filter 3 curated products based on style preference
  const getCuratedProducts = (style: string): Product[] => {
    const s = style.toLowerCase();
    let matches: Product[] = [];

    if (s.includes('formal')) {
      matches = products.filter((p) => p.category === 'Formal Shoes' || p.category === 'Loafers & Moccasins');
    } else if (s.includes('sneaker')) {
      matches = products.filter((p) => p.category === 'Sneakers');
    } else if (s.includes('everyday') || s.includes('loafer')) {
      matches = products.filter((p) => p.category === 'Loafers & Moccasins' || p.category === 'Sandals & Floaters');
    } else if (s.includes('heel') || s.includes('women') || s.includes('party')) {
      matches = products.filter((p) => p.gender === 'Women' || p.category === 'Heels & Pumps' || p.category === 'Wedges');
    } else {
      matches = products.filter((p) => p.isBestseller || p.isSpecialDeal);
    }

    if (matches.length < 3) {
      matches = [...matches, ...products.filter((p) => !matches.includes(p))];
    }
    return matches.slice(0, 3);
  };

  // Handle Quick Reply / Button Actions
  const handleAction = (action: string, label: string) => {
    addUserMessage(label);

    setTimeout(() => {
      switch (action) {
        // --- STEP 1: TOUR & PREFERENCE DISCOVERY ---
        case 'action_start_tour':
          setSessionData((prev) => ({
            ...prev,
            stepHistory: [...prev.stepHistory, 'step-preference-target']
          }));
          addBotMessage({
            text: 'Splendid! Let us craft your personalized shoe experience. First off, who are we shopping for today?',
            step: 'step-preference-target',
            quickReplies: [
              { label: '👔 Myself', action: 'action_target_myself' },
              { label: '🎁 Gift for Someone Else', action: 'action_target_gift' },
              { label: '⬅ Back', action: 'action_back_to_welcome' }
            ]
          });
          break;

        case 'action_target_myself':
        case 'action_target_gift': {
          const target = action === 'action_target_myself' ? 'Myself' : 'Someone Else';

          // If the user arrived via a top-level "Browse Formal/Sneakers" shortcut,
          // this qualifying question was inserted before the carousel — honor that
          // pending style now instead of asking a second (redundant) style question.
          if (sessionData.pendingStyleKey) {
            const pendingKey = sessionData.pendingStyleKey;
            setSessionData((prev) => ({ ...prev, shoppingFor: target, pendingStyleKey: null }));
            showCuratedPicks(
              pendingKey,
              pendingKey === 'Formal Shoes' ? 'Formal & Oxford styles' : 'Urban sneakers'
            );
            break;
          }

          setSessionData((prev) => ({
            ...prev,
            shoppingFor: target,
            stepHistory: [...prev.stepHistory, 'step-preference-style']
          }));

          addBotMessage({
            text: `Got it! What style or occasion are you looking for ${target === 'Myself' ? 'for yourself' : 'as a gift'}?`,
            step: 'step-preference-style',
            quickReplies: [
              { label: '👞 Formal & Business', action: 'action_style_formal' },
              { label: '👟 Urban Casual Sneakers', action: 'action_style_sneakers' },
              { label: '👞 Everyday Leather Loafers', action: 'action_style_loafers' },
              { label: '👠 Party & Heels', action: 'action_style_heels' },
              { label: '✨ Show Top Bestsellers', action: 'action_style_bestsellers' },
              { label: '⬅ Back', action: 'action_back_to_target' }
            ]
          });
          break;
        }

        // --- TOP-LEVEL SHORTCUTS: ask the one qualifying question first,      ---
        // --- then show the same curated carousel as the full tour would.     ---
        case 'action_browse_formal':
        case 'action_browse_sneakers': {
          const key = action === 'action_browse_formal' ? 'Formal Shoes' : 'Sneakers';
          setSessionData((prev) => ({
            ...prev,
            pendingStyleKey: key,
            stepHistory: [...prev.stepHistory, 'step-preference-target']
          }));
          addBotMessage({
            text: 'Great pick! One quick question first — who are we shopping for today?',
            step: 'step-preference-target',
            quickReplies: [
              { label: '👔 Myself', action: 'action_target_myself' },
              { label: '🎁 Gift for Someone Else', action: 'action_target_gift' },
              { label: '⬅ Back', action: 'action_back_to_welcome' }
            ]
          });
          break;
        }

        // --- STEP 2: SHOW CURATED PICKS (CAROUSEL) ---
        case 'action_style_formal':
          showCuratedPicks('Formal Shoes', 'Formal & Oxford styles');
          break;

        case 'action_style_sneakers':
          showCuratedPicks('Sneakers', 'Urban sneakers');
          break;

        case 'action_style_loafers':
          showCuratedPicks('Loafers', 'Handcrafted leather loafers');
          break;

        case 'action_style_heels':
          showCuratedPicks('Heels', 'Party pumps & wedges');
          break;

        case 'action_style_bestsellers':
          showCuratedPicks('Bestsellers', 'Top handcrafted bestsellers');
          break;

        // --- STEP 3: CRAFTSMANSHIP VIDEOS ---
        case 'action_show_craft_videos':
          setSessionData((prev) => ({
            ...prev,
            stepHistory: [...prev.stepHistory, 'step-craft-videos']
          }));
          addBotMessage({
            text: 'Every pair of Titaan Footwear takes over 18 hours of dedicated handwork by master artisans. Here is an exclusive behind-the-scenes look at our workshop:',
            step: 'step-craft-videos',
            showVideoCarousel: true,
            quickReplies: [
              { label: '🛍 Ready to Pick a Pair', action: 'action_start_tour' },
              { label: '📦 Check Delivery to Pincode', action: 'action_ask_pincode' },
              { label: '⬅ Back', action: 'action_back_to_welcome' }
            ]
          });
          break;

        // --- STEP 4: ORDER & PINCODE DELIVERY CHECK ---
        case 'action_ask_pincode':
          setSessionData((prev) => ({
            ...prev,
            stepHistory: [...prev.stepHistory, 'step-ask-pincode']
          }));
          addBotMessage({
            text: 'We deliver nationwide across 19,000+ pincodes with complimentary Express Shipping. Please enter your 6-digit delivery pincode below:',
            step: 'step-ask-pincode',
            showPincodeInput: true,
            quickReplies: [
              { label: '📍 110001 (New Delhi)', action: 'action_pincode_110001' },
              { label: '📍 400001 (Mumbai)', action: 'action_pincode_400001' },
              { label: '📍 560001 (Bengaluru)', action: 'action_pincode_560001' },
              { label: '⬅ Back', action: 'action_back_to_welcome' }
            ]
          });
          break;

        case 'action_pincode_110001':
          handlePincodeSubmit('110001');
          break;
        case 'action_pincode_400001':
          handlePincodeSubmit('400001');
          break;
        case 'action_pincode_560001':
          handlePincodeSubmit('560001');
          break;

        // --- SHORTCUTS & SUPPORT ---
        case 'action_open_tracker':
          setIsTrackOrderOpen(true);
          addBotMessage({
            text: 'I have opened our Order Tracking system for you! Enter your Order ID (e.g. TITN-ORD-98214) or AWB Tracking Number to check real-time courier status.',
            quickReplies: [
              { label: '🛍 Continue Shopping', action: 'action_start_tour' },
              { label: '💬 Talk to Stylist', action: 'action_contact_support' }
            ]
          });
          break;

        case 'action_open_stores':
          setIsStoreLocatorOpen(true);
          addBotMessage({
            text: 'I have opened our Store Locator. We have 100+ flagship luxury retail locations across Mumbai, Delhi, Bengaluru, Chennai, Kolkata, and Hyderabad.',
            quickReplies: [
              { label: '🛍 Shop Online Catalog', action: 'action_start_tour' },
              { label: '📏 Check Size Guide', action: 'action_open_size_guide' }
            ]
          });
          break;

        case 'action_open_size_guide':
          setIsSizeGuideOpen(true);
          addBotMessage({
            text: 'I have opened our Footwear Size Guide. Titaan follows standard UK / Indian shoe sizing with a true-to-fit ergonomic contour.',
            quickReplies: [
              { label: '👞 Find My Shoe Style', action: 'action_start_tour' },
              { label: '💬 Need Sizing Advice', action: 'action_contact_support' }
            ]
          });
          break;

        case 'action_contact_support':
          addBotMessage({
            text: 'Our dedicated Customer Support & Styling Team is available 7 days a week to assist with custom fit, corporate orders, and styling advice.',
            showSupportCard: true,
            quickReplies: [
              { label: '✨ Back to Shopping Tour', action: 'action_start_tour' },
              { label: '🎥 Watch Craftsmanship Videos', action: 'action_show_craft_videos' }
            ]
          });
          break;

        // --- STEP 6: ORDER SUMMARY, CONFIRMATION & CLOSING (Objective O4) ---
        case 'action_open_cart':
          if (cart.length === 0) {
            addBotMessage({
              text: "Your bag's empty right now — let's fix that. Want me to show you a few handcrafted picks?",
              quickReplies: [
                { label: '👞 Help Me Pick Shoes', action: 'action_start_tour' },
                { label: '⬅ Back', action: 'action_back_to_welcome' }
              ]
            });
            break;
          }
          setIsCartOpen(true);
          setSessionData((prev) => ({
            ...prev,
            stepHistory: [...prev.stepHistory, 'step-order-summary']
          }));
          addBotMessage({
            text: `Here's your bag${sessionData.pincode ? ` — ready to ship to **${sessionData.pincode}**` : ''}. Everything look right?`,
            step: 'step-order-summary',
            showOrderSummary: true,
            orderItems: cart,
            orderTotal: cartFinalTotal,
            quickReplies: [
              { label: '✅ Confirm Order', action: 'action_confirm_order' },
              { label: '🏷 Apply FLAT 50% Coupon', action: 'action_apply_coupon_bot' },
              { label: '👞 Pick More Shoes', action: 'action_start_tour' },
              { label: '⬅ Back', action: 'action_back_to_welcome' }
            ]
          });
          break;

        case 'action_confirm_order': {
          if (cart.length === 0) {
            addBotMessage({
              text: "Looks like your bag is empty, so there's nothing to confirm yet. Let's find you a pair first.",
              quickReplies: [{ label: '👞 Help Me Pick Shoes', action: 'action_start_tour' }]
            });
            break;
          }
          const order = placeOrder(
            {
              fullName: 'Titaan Concierge Guest',
              mobile: '',
              pincode: sessionData.pincode || '110001',
              flatHouse: '',
              areaStreet: '',
              city: '',
              state: '',
              addressType: 'Home'
            },
            'COD'
          );
          setIsCartOpen(false);
          addBotMessage({
            text: `🎉 You're all set! Order **${order.id}** is confirmed${sessionData.pincode ? ` for delivery to **${sessionData.pincode}**` : ''} — estimated by **${order.estimatedDeliveryDate}**. You'll get a tracking link by email shortly. Thank you for choosing Titaan Footwear!`,
            step: 'step-closing',
            quickReplies: [
              { label: '📦 Track My Order', action: 'action_open_tracker' },
              { label: '💬 Talk to Support', action: 'action_contact_support' },
              { label: '👋 No thanks, bye', action: 'action_say_bye' }
            ]
          });
          break;
        }

        case 'action_apply_coupon_bot': {
          const result = applyCoupon('TITAAN50');
          addBotMessage({
            text: result.success
              ? `${result.message} 🎉 Ready to lock in your order?`
              : `Hmm — ${result.message}`,
            quickReplies: result.success
              ? [
                  { label: '✅ Confirm Order', action: 'action_confirm_order' },
                  { label: '🛍 View Bag', action: 'action_open_cart' }
                ]
              : [
                  { label: '👞 Pick More Shoes', action: 'action_start_tour' },
                  { label: '🛍 View Bag', action: 'action_open_cart' }
                ]
          });
          break;
        }

        case 'action_say_bye':
          addBotMessage({
            text: 'Thanks for stopping by Titaan Footwear — hope to see you (and your new shoes) again soon! 👋'
          });
          break;

        // --- BACK NAVIGATION BUTTONS ---
        case 'action_back_to_welcome':
          addBotMessage({
            text: 'Back to the start! How can I assist you today?',
            step: 'step-welcome',
            quickReplies: [
              { label: '✨ Guide Me / Quick Tour', action: 'action_start_tour' },
              { label: '👞 Browse Formal Shoes', action: 'action_browse_formal' },
              { label: '👟 Explore Sneakers', action: 'action_browse_sneakers' },
              { label: '🎥 Craftsmanship Videos', action: 'action_show_craft_videos' },
              { label: '📦 Track My Order', action: 'action_open_tracker' }
            ]
          });
          break;

        case 'action_back_to_target':
          addBotMessage({
            text: 'Who are we shopping for today?',
            step: 'step-preference-target',
            quickReplies: [
              { label: '👔 Myself', action: 'action_target_myself' },
              { label: '🎁 Gift for Someone Else', action: 'action_target_gift' },
              { label: '⬅ Back', action: 'action_back_to_welcome' }
            ]
          });
          break;

        default:
          handleNaturalQuery(label);
      }
    }, 450);
  };

  const showCuratedPicks = (styleKey: string, styleLabel: string) => {
    const curated = getCuratedProducts(styleKey);
    setSessionData((prev) => ({
      ...prev,
      stylePreference: styleKey,
      stepHistory: [...prev.stepHistory, 'step-curated-picks']
    }));

    addBotMessage({
      text: `Excellent choice! Here are 3 signature ${styleLabel} curated especially for you. Handcrafted with genuine Argentine leather and ergonomic arch support:`,
      step: 'step-curated-picks',
      showProductCarousel: true,
      products: curated,
      quickReplies: [
        { label: '🎥 Show Me How These Are Made', action: 'action_show_craft_videos' },
        { label: '📍 Check Delivery Pincode', action: 'action_ask_pincode' },
        { label: '🔄 Change Shoe Style', action: 'action_start_tour' },
        { label: '⬅ Back', action: 'action_back_to_target' }
      ]
    });
  };

  // Pincode submission handler
  const handlePincodeSubmit = (codeToVerify?: string) => {
    const code = (codeToVerify || pincodeVal).trim();
    if (!/^\d{6}$/.test(code)) {
      addBotMessage({
        text: 'That does not look like a standard 6-digit Indian postal code. Mind double-checking? (e.g. 110001, 400001, 560001)',
        showPincodeInput: true,
        quickReplies: [
          { label: '📍 Use 110001 (Delhi)', action: 'action_pincode_110001' },
          { label: '📍 Use 400001 (Mumbai)', action: 'action_pincode_400001' },
          { label: '⬅ Back', action: 'action_back_to_welcome' }
        ]
      });
      return;
    }

    setPincodeVal('');
    setSessionData((prev) => ({ ...prev, pincode: code }));
    addUserMessage(`Pincode: ${code}`);

    setTimeout(() => {
      addBotMessage({
        text: `🎉 Great news! We deliver to **Pincode ${code}** in **3–5 business days** via BlueDart Express Air with **Free Delivery & 15-Day Free Returns**!`,
        step: 'step-order-prompt',
        quickReplies: [
          { label: '🛍 Place Order / View Bag', action: 'action_open_cart' },
          { label: '🏷 Apply FLAT 50% Coupon', action: 'action_apply_coupon_bot' },
          { label: '👞 Pick More Shoes', action: 'action_start_tour' },
          { label: '⬅ Back', action: 'action_back_to_welcome' }
        ]
      });
    }, 400);
  };

  // Text input submit (Natural language handler & Fallback matrix)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const query = inputVal.trim();
    setInputVal('');
    addUserMessage(query);

    setTimeout(() => {
      handleNaturalQuery(query);
    }, 450);
  };

  const handleNaturalQuery = (query: string) => {
    const q = query.toLowerCase();

    // Check if user typed a pincode directly
    if (/^\d{6}$/.test(q)) {
      handlePincodeSubmit(q);
      return;
    }

    // Greetings
    if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'namaste') {
      addBotMessage({
        text: 'Hey there! How can I assist you with Titaan Footwear today?',
        quickReplies: [
          { label: '✨ Start Shoe Tour', action: 'action_start_tour' },
          { label: '👞 Formal Loafers', action: 'action_browse_formal' },
          { label: '👟 Casual Sneakers', action: 'action_browse_sneakers' },
          { label: '🎥 Craftsmanship Videos', action: 'action_show_craft_videos' }
        ]
      });
      return;
    }

    // Discounts / Coupons
    if (q.includes('coupon') || q.includes('discount') || q.includes('promo') || q.includes('offer') || q.includes('code')) {
      addBotMessage({
        text: 'We currently have our End of Season Clearance Sale live! Use coupon code **TITAAN50** at checkout for a **Flat 50% discount** across our entire catalog, plus an extra 10% off on all prepaid UPI/Cards.',
        quickReplies: [
          { label: '🛍 Start Shopping Now', action: 'action_start_tour' },
          { label: '📦 Check My Delivery Time', action: 'action_ask_pincode' }
        ]
      });
      return;
    }

    // Delivery / Shipping
    if (q.includes('delivery') || q.includes('shipping') || q.includes('courier') || q.includes('time') || q.includes('pincode')) {
      addBotMessage({
        text: 'We provide **Free Express Delivery** on all prepaid orders across India (3–5 business days via BlueDart & Delhivery Air). Would you like to verify your pincode?',
        showPincodeInput: true,
        quickReplies: [
          { label: '📍 Enter My Pincode', action: 'action_ask_pincode' },
          { label: '📦 Track Existing Order', action: 'action_open_tracker' }
        ]
      });
      return;
    }

    // Returns / Refunds
    if (q.includes('return') || q.includes('exchange') || q.includes('refund') || q.includes('policy') || q.includes('guarantee')) {
      addBotMessage({
        text: 'Titaan Footwear offers a hassle-free **15-Day Free Return and Exchange Policy**. If the shoe fit or style is not 100% perfect, our courier partner will pick it up from your doorstep with zero return charges.',
        quickReplies: [
          { label: '👞 Find My Size & Style', action: 'action_start_tour' },
          { label: '📏 View Sizing Guide', action: 'action_open_size_guide' }
        ]
      });
      return;
    }

    // Sizing
    if (q.includes('size') || q.includes('chart') || q.includes('fit') || q.includes('uk size')) {
      setIsSizeGuideOpen(true);
      addBotMessage({
        text: 'I have opened our official Footwear Size Chart. Our shoes use standard UK / Indian sizing (UK 6 to UK 11 for Men; UK 4 to UK 8 for Women).',
        quickReplies: [
          { label: '✨ Guide Me to a Pair', action: 'action_start_tour' },
          { label: '💬 Talk to a Human Stylist', action: 'action_contact_support' }
        ]
      });
      return;
    }

    // Stores
    if (q.includes('store') || q.includes('shop near me') || q.includes('mumbai') || q.includes('delhi') || q.includes('bangalore') || q.includes('location')) {
      setIsStoreLocatorOpen(true);
      addBotMessage({
        text: 'Titaan Footwear operates over 100 flagship boutique stores in major shopping malls and high streets nationwide.',
        quickReplies: [
          { label: '🛍 Shop Online Collection', action: 'action_start_tour' },
          { label: '🎥 See How Shoes Are Made', action: 'action_show_craft_videos' }
        ]
      });
      return;
    }

    // Video / Craftsmanship
    if (q.includes('video') || q.includes('craft') || q.includes('leather') || q.includes('how made') || q.includes('factory') || q.includes('workshop')) {
      setSessionData((prev) => ({ ...prev, stepHistory: [...prev.stepHistory, 'step-craft-videos'] }));
      addBotMessage({
        text: 'Here are our 3 exclusive craftsmanship story videos showcasing our artisanal leather sourcing and handstitching process:',
        showVideoCarousel: true,
        quickReplies: [
          { label: '🛍 Browse Catalog', action: 'action_start_tour' },
          { label: '⬅ Back to Menu', action: 'action_back_to_welcome' }
        ]
      });
      return;
    }

    // Fallback handling with progressive escalation
    const nextFallbackCount = sessionData.fallbackCount + 1;
    setSessionData((prev) => ({ ...prev, fallbackCount: nextFallbackCount }));

    if (nextFallbackCount >= 2) {
      addBotMessage({
        text: "I want to ensure you get exact answers. Would you like to connect directly with our luxury support specialist or explore one of these popular options?",
        showSupportCard: true,
        quickReplies: [
          { label: '✨ Start Shoe Finder Tour', action: 'action_start_tour' },
          { label: '🎥 Craftsmanship Videos', action: 'action_show_craft_videos' },
          { label: '📦 Track My Order', action: 'action_open_tracker' },
          { label: '🏪 Store Locator', action: 'action_open_stores' }
        ]
      });
    } else {
      addBotMessage({
        text: "Hmm, I didn't quite catch that. Here are the most helpful ways I can assist you right now:",
        quickReplies: [
          { label: '✨ Help Me Pick Shoes', action: 'action_start_tour' },
          { label: '🎥 How Titaan Shoes Are Made', action: 'action_show_craft_videos' },
          { label: '📦 Check Delivery Pincode', action: 'action_ask_pincode' },
          { label: '💬 Talk to Customer Support', action: 'action_contact_support' }
        ]
      });
    }
  };

  const handleProductSelect = (product: Product) => {
    setActiveProductDetail(product);
    addToast(`Viewing ${product.title}`, 'info');
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0] || 8;
    const defaultColor = product.colors[0]?.name || 'Black';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleVideoCardClick = (video: VideoStory) => {
    setActiveVideoModal(video);
    setIsVideoPlaying(true);
  };

  return (
    <>
      {/* 1. Floating Launcher Button with Subtle Pulse and Callout */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
        {/* Proactive Callout Speech Bubble */}
        {showCallout && !isOpen && (
          <div
            onClick={handleOpenChat}
            className="mb-3 cursor-pointer max-w-xs bg-neutral-900 text-white p-3.5 rounded-2xl shadow-2xl border border-neutral-700 flex items-start gap-3 animate-bounce select-none"
          >
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-md">
              TF
            </div>
            <div className="flex-1 text-xs">
              <p className="font-bold text-amber-400">Titaan Stylist Concierge</p>
              <p className="text-neutral-300 mt-0.5 leading-snug">
                👋 Need help finding your perfect shoe size or style? Tap to chat with us!
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCallout(false);
              }}
              className="text-neutral-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* The Main Round Trigger Button */}
        {!isOpen && (
          <button
            id="titaan-chatbot-launcher"
            onClick={handleOpenChat}
            aria-label="Open Titaan Footwear Concierge Chatbot"
            className="group relative flex items-center gap-3 bg-neutral-950 hover:bg-neutral-900 text-white px-4 py-3.5 rounded-full shadow-2xl border border-neutral-800 hover:border-red-600 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-neutral-950"></span>
              </span>
            </div>

            <div className="text-left pr-1 hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-wide text-neutral-100">
                  TITAAN CONCIERGE
                </span>
                <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium">Stylist & Customer Assistant</p>
            </div>

            {hasUnread && (
              <span className="absolute -top-1.5 -left-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                1
              </span>
            )}
          </button>
        )}
      </div>

      {/* 2. Main Chatbot Drawer / Window */}
      {isOpen && (
        <div
          id="titaan-chatbot-window"
          className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col bg-white overflow-hidden border border-neutral-300 ${
            isMinimized
              ? 'bottom-6 right-6 w-80 h-14 rounded-2xl'
              : 'bottom-0 sm:bottom-6 right-0 sm:right-6 w-full sm:w-[420px] h-[100dvh] sm:h-[640px] sm:max-h-[85vh] sm:rounded-3xl'
          }`}
        >
          {/* Header Bar */}
          <div className="bg-neutral-950 text-white px-4 py-3.5 flex items-center justify-between border-b border-neutral-800 select-none shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow">
                  TF
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-neutral-950"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-neutral-100 tracking-tight">
                    Titaan Concierge
                  </h3>
                  <span className="text-[9px] bg-neutral-800 text-amber-400 border border-neutral-700 px-1.5 py-0.2 rounded font-bold">
                    Official
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Online • Luxury Footwear Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-neutral-400">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
                className="p-1.5 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand Chat' : 'Minimize'}
                className="p-1.5 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Shortcuts Ribbon */}
          {!isMinimized && (
            <div className="bg-neutral-900 px-3 py-2 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-[11px] text-neutral-300">
              <button
                onClick={() => handleAction('action_start_tour', '✨ Stylist Tour')}
                className="flex items-center gap-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full whitespace-nowrap transition-colors"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Shoe Tour</span>
              </button>

              <button
                onClick={() => handleAction('action_show_craft_videos', '🎥 Craft Videos')}
                className="flex items-center gap-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full whitespace-nowrap transition-colors"
              >
                <Video className="w-3 h-3 text-red-400" />
                <span>Craftsmanship</span>
              </button>

              <button
                onClick={() => handleAction('action_ask_pincode', '📍 Delivery Check')}
                className="flex items-center gap-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full whitespace-nowrap transition-colors"
              >
                <Truck className="w-3 h-3 text-emerald-400" />
                <span>Pincode</span>
              </button>

              <button
                onClick={() => handleAction('action_open_tracker', '📦 Track Order')}
                className="flex items-center gap-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full whitespace-nowrap transition-colors"
              >
                <Clock className="w-3 h-3 text-sky-400" />
                <span>Track Order</span>
              </button>

              <button
                onClick={() => handleAction('action_open_stores', '🏪 Stores')}
                className="flex items-center gap-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full whitespace-nowrap transition-colors"
              >
                <MapPin className="w-3 h-3 text-violet-400" />
                <span>Stores</span>
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          {!isMinimized && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/70">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender & Timestamp */}
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 mb-1 px-1">
                    <span>{msg.sender === 'bot' ? 'Titaan Concierge' : 'You'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`p-3.5 rounded-2xl text-xs max-w-[88%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white rounded-tr-none shadow-md font-medium'
                        : 'bg-white text-neutral-800 rounded-tl-none border border-neutral-200/80 shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Step 3: Curated Products Carousel */}
                    {msg.showProductCarousel && msg.products && (
                      <div className="mt-3 -mx-1">
                        <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 px-1 no-scrollbar snap-x">
                          {msg.products.map((prod) => (
                            <div
                              key={prod.id}
                              className="snap-center w-52 shrink-0 bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden flex flex-col shadow-sm group hover:border-neutral-400 transition-colors"
                            >
                              <div className="relative aspect-[4/3] bg-neutral-200 overflow-hidden">
                                <img
                                  src={prod.images[0]}
                                  alt={prod.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-2 left-2 bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow">
                                  {prod.discountPercentage}% OFF
                                </span>
                              </div>

                              <div className="p-2.5 flex-1 flex flex-col justify-between">
                                <div>
                                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                                    {prod.brand}
                                  </span>
                                  <h4 className="font-bold text-neutral-900 text-xs line-clamp-1 mt-0.5">
                                    {prod.title}
                                  </h4>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <span className="font-extrabold text-neutral-900 text-xs">
                                      ₹{prod.price.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-[10px] text-neutral-400 line-through">
                                      ₹{prod.originalPrice.toLocaleString('en-IN')}
                                    </span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-1.5 mt-2.5 pt-2 border-t border-neutral-200">
                                  <button
                                    onClick={() => handleProductSelect(prod)}
                                    className="text-[10px] font-bold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 py-1.5 rounded-lg transition-colors"
                                  >
                                    Quick View
                                  </button>
                                  <button
                                    onClick={() => handleQuickAdd(prod)}
                                    className="text-[10px] font-bold text-white bg-neutral-900 hover:bg-red-600 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                                  >
                                    <ShoppingBag className="w-2.5 h-2.5" />
                                    <span>Add</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Craftsmanship Videos Carousel */}
                    {msg.showVideoCarousel && (
                      <div className="mt-3 -mx-1">
                        <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 px-1 no-scrollbar snap-x">
                          {CRAFTSMANSHIP_VIDEOS.map((vid) => (
                            <div
                              key={vid.id}
                              onClick={() => handleVideoCardClick(vid)}
                              className="snap-center w-52 shrink-0 bg-neutral-900 text-white rounded-xl overflow-hidden cursor-pointer shadow-md hover:ring-2 hover:ring-red-500 transition-all group"
                            >
                              <div className="relative aspect-video bg-neutral-800 overflow-hidden">
                                <img
                                  src={vid.thumbnail}
                                  alt={vid.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-90 group-hover:brightness-100"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                  </div>
                                </div>
                                <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  {vid.duration}
                                </span>
                              </div>

                              <div className="p-2.5">
                                <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider block">
                                  {vid.subtitle}
                                </span>
                                <h4 className="font-bold text-xs text-neutral-100 mt-0.5 line-clamp-1">
                                  {vid.title}
                                </h4>
                                <p className="text-[10px] text-neutral-400 line-clamp-2 mt-1">
                                  {vid.description}
                                </p>
                                <div className="mt-2 text-[10px] font-bold text-red-400 flex items-center gap-1 group-hover:text-red-300">
                                  <span>Watch Story</span>
                                  <ChevronRight className="w-3 h-3" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 5: Inline Pincode Input */}
                    {msg.showPincodeInput && (
                      <div className="mt-3 pt-2 border-t border-neutral-100">
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            maxLength={6}
                            value={pincodeVal}
                            onChange={(e) => setPincodeVal(e.target.value.replace(/\D/g, ''))}
                            placeholder="Enter 6-digit Pincode"
                            className="flex-1 text-xs px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-mono focus:outline-none focus:border-red-600"
                          />
                          <button
                            onClick={() => handlePincodeSubmit()}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1"
                          >
                            <span>Verify</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 6: Order/Bag Summary (snapshot at the time this message was sent) */}
                    {msg.showOrderSummary && msg.orderItems && (
                      <div className="mt-3 pt-3 border-t border-neutral-100 space-y-2">
                        {msg.orderItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-2.5">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.title}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold text-neutral-900 line-clamp-1">{item.product.title}</p>
                              <p className="text-[10px] text-neutral-500">
                                Size {item.selectedSize} • {item.selectedColor} • Qty {item.quantity}
                              </p>
                            </div>
                            <span className="text-[11px] font-extrabold text-neutral-900 shrink-0">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                          <span className="font-semibold text-neutral-600">Total</span>
                          <span className="font-extrabold text-neutral-900">
                            ₹{(msg.orderTotal ?? 0).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Human Support Card */}
                    {msg.showSupportCard && (
                      <div className="mt-3 p-3 bg-neutral-900 text-white rounded-xl space-y-2 border border-neutral-800">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Titaan Concierge Direct Line</span>
                        </div>
                        <p className="text-[11px] text-neutral-300">
                          Toll-Free: <strong>1800-266-6244</strong> (10 AM – 7 PM IST)
                        </p>
                        <p className="text-[11px] text-neutral-300">
                          Email: <strong>customercare@titaanfootwear.com</strong>
                        </p>
                        <div className="pt-2 border-t border-neutral-800 flex gap-2">
                          <button
                            onClick={() => {
                              addToast('Connecting to Luxury Stylist queue...', 'info');
                              setTimeout(() => {
                                addToast('Stylist Rahul joined session', 'success');
                              }, 1200);
                            }}
                            className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold"
                          >
                            Request Live Callback
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Replies Options */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.quickReplies.map((qr, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAction(qr.action, qr.label)}
                          className={`text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all shadow-sm flex items-center gap-1.5 ${
                            qr.label.includes('Back')
                              ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
                              : 'bg-white hover:bg-red-50 text-neutral-800 hover:text-red-600 border border-neutral-300 hover:border-red-500'
                          }`}
                        >
                          {qr.label.includes('Back') && <ArrowLeft className="w-3 h-3" />}
                          <span>{qr.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Footer Input Bar */}
          {!isMinimized && (
            <div className="p-3 bg-white border-t border-neutral-200 shrink-0">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask a question or type pincode..."
                  className="flex-1 text-xs bg-neutral-100 border border-neutral-300 rounded-full px-4 py-2.5 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 text-[10px] text-neutral-400 px-1">
                <span>⚡ Powered by Titaan Bot Engine</span>
                <button
                  onClick={() => {
                    setMessages([]);
                    setSessionData({
                      shoppingFor: 'Myself',
                      stylePreference: 'All',
                      selectedProduct: null,
                      pincode: '',
                      fallbackCount: 0,
                      stepHistory: ['step-welcome'],
                      pendingStyleKey: null
                    });
                  }}
                  className="text-neutral-500 hover:text-neutral-900 flex items-center gap-0.5"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Restart</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Craftsmanship Video Modal Player */}
      {activeVideoModal && (
        <div
          id="craftsmanship-video-modal"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="bg-neutral-950 text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">
                  {activeVideoModal.subtitle}
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-neutral-100">
                  {activeVideoModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Display Container */}
            <div className="relative aspect-video bg-neutral-900 overflow-hidden flex items-center justify-center group">
              <img
                src={activeVideoModal.thumbnail}
                alt={activeVideoModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4 sm:p-6">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-200">
                  <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold">
                    TITAAN ATELIER FILM
                  </span>
                  <span className="bg-black/60 px-2 py-0.5 rounded font-mono">
                    {activeVideoModal.duration}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center my-auto">
                  <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl animate-pulse">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-200 mt-2">
                    Playing High Definition Master Stream
                  </span>
                </div>

                {/* Simulated Scrubber */}
                <div className="space-y-1.5">
                  <div className="w-full h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                    <div className="w-3/5 h-full bg-red-600 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-neutral-400">
                    <span>0:45</span>
                    <span>{activeVideoModal.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Story Content & Highlights */}
            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeVideoModal.description}
              </p>

              <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                <h4 className="text-xs font-bold text-neutral-100 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Artisan Standards & Craft Pledges:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {activeVideoModal.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveVideoModal(null);
                    setIsOpen(true);
                    handleAction('action_start_tour', '🛍 Pick My Handcrafted Shoes');
                  }}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Handcrafted Shoes</span>
                </button>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="py-3 px-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-bold transition-colors"
                >
                  Close Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
