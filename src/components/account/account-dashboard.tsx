"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  MapPin,
  CreditCard,
  Heart,
  RotateCcw,
  HelpCircle,
  Headphones,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  Star,
  FileText,
  Lock,
  Bell,
  Bike,
  LogOut,
  Edit3,
  Plus,
  X,
  ExternalLink,
  Eye,
  Check,
  Download,
  Search,
  ShoppingBag,
  Sliders,
  Building,
  Smartphone,
  Navigation,
  CheckCircle,
  Trash2,
  AlertTriangle,
  PhoneCall,
  Send,
} from "lucide-react";
import { useCart } from "@/components/cart";
import { inr } from "@/lib/data";

interface OrderItem {
  id: string;
  name: string;
  spec: string;
  oem: string;
  qty: number;
  price: number;
  img: string;
}

interface Order {
  id: string;
  orderNumber: string;
  placedDate: string;
  totalAmount: number;
  shipTo: string;
  status: "in-transit" | "delivered";
  statusText: string;
  deliverySubtext: string;
  expectedDate: string;
  courier: string;
  awb: string;
  items: OrderItem[];
  destination: string;
}

interface WishlistItem {
  id: string;
  name: string;
  oem: string;
  fits: string;
  price: number;
  img: string;
}

interface AddressItem {
  id: string;
  label: string;
  name: string;
  line: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

const mockOrders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "RS-884920",
    placedDate: "Nov 12, 2024",
    totalAmount: 3270,
    shipTo: "Raghavan Iyer",
    status: "in-transit",
    statusText: "In Transit · Expected Delivery Tomorrow by 4:00 PM",
    deliverySubtext: "Dispatched via BlueDart Express (AWB: BLR9940182)",
    expectedDate: "Tomorrow by 4:00 PM",
    courier: "BlueDart Express",
    awb: "BLR9940182",
    destination: "Indiranagar, Bengaluru - 560038",
    items: [
      {
        id: "p1",
        name: "Classic 350 Reborn Chain Sprocket Kit",
        spec: "520 Pitch X-Ring · Induction Hardened",
        oem: "RAC00192/4",
        qty: 1,
        price: 2850,
        img: "/images/classic-350-chain-sprocket.webp",
      },
      {
        id: "p3",
        name: "Engine Oil Filter Cartridge & O-Ring",
        spec: "J-Series 350cc · 25-Micron Pleated Filter",
        oem: "888414",
        qty: 2,
        price: 210,
        img: "/images/engine-filters.jpg",
      },
    ],
  },
  {
    id: "ord-2",
    orderNumber: "RS-881042",
    placedDate: "Oct 26, 2024",
    totalAmount: 1540,
    shipTo: "Raghavan Iyer",
    status: "delivered",
    statusText: "Delivered on Oct 28, 2024 · Handed directly to resident",
    deliverySubtext: "Delivered to Indiranagar, Bengaluru",
    expectedDate: "Delivered Oct 28",
    courier: "Delhivery Surface",
    awb: "DEL84729104",
    destination: "Indiranagar, Bengaluru - 560038",
    items: [
      {
        id: "p2",
        name: "ByBre Front Caliper Sintered Brake Pad Set",
        spec: "High Friction Compound · Warranty Active (12 Months)",
        oem: "KBD00041",
        qty: 1,
        price: 1540,
        img: "/images/brakepad-interceptor.png",
      },
    ],
  },
];

const mockWishlist: WishlistItem[] = [
  {
    id: "w-1",
    name: "Classic Touring Mirrors (Bar-End Pair)",
    oem: "1990482",
    fits: "Classic 350, Hunter 350, Meteor 350",
    price: 2450,
    img: "/images/clutch-rotor.webp",
  },
  {
    id: "w-2",
    name: "Sherpa Performance High-Flow Air Filter",
    oem: "1990214",
    fits: "Himalayan 450 (Sherpa Platform)",
    price: 1850,
    img: "/images/engine-filters.jpg",
  },
  {
    id: "w-3",
    name: "Stainless Steel LED Sump Guard / Bash Plate",
    oem: "1990391",
    fits: "Interceptor 650 & Continental GT 650",
    price: 3200,
    img: "/images/chasis-body.webp",
  },
];

const mockAddresses: AddressItem[] = [
  {
    id: "addr-1",
    label: "Home (Primary)",
    name: "Raghavan Iyer",
    line: "#42/1, 8th Main Road, HAL 2nd Stage, Near Indiranagar Club, Indiranagar",
    city: "Bengaluru, Karnataka - 560038",
    phone: "+91 98450 18274",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Workshop & Garage",
    name: "Raghavan Iyer (SpeedCrafters Garage)",
    line: "Garage Bay 14B, 27th Main Rd, HSR Layout Sector 2",
    city: "Bengaluru, Karnataka - 560102",
    phone: "+91 98450 18274",
    isDefault: false,
  },
];

export function AccountDashboard() {
  const { add, setIsOpen } = useCart();
  const [userProfile, setUserProfile] = useState({
    name: "Raghavan Iyer",
    email: "raghavan.iyer@gmail.com",
    phone: "+91 98450 18274",
    memberSince: "Aug 2022",
    clubTier: "RE PASSIONATE CLUB",
  });

  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
  const deleteTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeMobileModal, setActiveMobileModal] = useState<"orders" | "wishlist" | "addresses" | "help" | null>(null);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(mockWishlist);
  const [addresses, setAddresses] = useState<AddressItem[]>(mockAddresses);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBuyAgain = (item: OrderItem) => {
    add({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      oem: item.oem,
    });
    setIsOpen(true);
    showToast(`Added ${item.name} to cart`);
  };

  const handleAddWishlistToCart = (item: WishlistItem) => {
    add({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      oem: item.oem,
    });
    setWishlist((prev) => prev.filter((w) => w.id !== item.id));
    setIsOpen(true);
    showToast(`Moved ${item.name} to bag`);
  };

  const handleRemoveWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((w) => w.id !== id));
    showToast("Removed from wishlist");
  };

  const handleDownloadInvoice = (orderNumber: string) => {
    showToast(`Downloading Tax Invoice for #${orderNumber} (PDF)...`);
  };

  const handleCancelDeleteCountdown = useCallback(() => {
    if (deleteTimerRef.current) {
      clearInterval(deleteTimerRef.current);
      deleteTimerRef.current = null;
    }
    setDeleteCountdown(null);
    setIsDeleteAccountOpen(false);
    showToast("Account deletion cancelled");
  }, []);

  const handleConfirmDeleteAccount = useCallback(() => {
    setDeleteCountdown(15);
    deleteTimerRef.current = setInterval(() => {
      setDeleteCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (deleteTimerRef.current) clearInterval(deleteTimerRef.current);
          deleteTimerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  /* When countdown reaches 0, execute deletion */
  useEffect(() => {
    if (deleteCountdown === 0) {
      setIsDeleteAccountOpen(false);
      setDeleteCountdown(null);
      setUserProfile({
        name: "Guest User",
        email: "deleted@royalspares.in",
        phone: "—",
        memberSince: "—",
        clubTier: "ACCOUNT DELETED",
      });
      showToast("Your account and personal data have been permanently removed");
    }
  }, [deleteCountdown]);

  /* Cleanup timer on unmount */
  useEffect(() => {
    return () => {
      if (deleteTimerRef.current) clearInterval(deleteTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-offset text-ink pb-24 md:pb-20 lg:pb-16">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-[80] rounded-card bg-ink text-white px-4 py-2.5 shadow-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: TRACK SHIPMENT MODAL (z-[70]) */}
      {/* ======================================================== */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setTrackingModalOrder(null)} />
          <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative w-full max-w-lg rounded-t-[24px] sm:rounded-panel border border-line bg-canvas p-5 sm:p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
              {/* Grab handle on mobile */}
              <div className="w-12 h-1.5 rounded-full bg-line mx-auto mb-3 sm:hidden" />

              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <span className="text-[11px] font-semibold text-stock">Shipment tracking</span>
                  <h3 className="text-[17px] font-bold text-ink">Package #{trackingModalOrder.orderNumber}</h3>
                  <p className="text-[12px] text-mute">{trackingModalOrder.courier} · AWB: {trackingModalOrder.awb}</p>
                </div>
                <button
                  onClick={() => setTrackingModalOrder(null)}
                  className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Progress Milestones */}
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="size-7 rounded-full bg-stock text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-[13px] font-semibold text-ink">Order Verified &amp; Packed</h5>
                    <p className="text-[11px] text-mute">Nov 12, 2024 · 11:20 AM · Chennai Hub</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-7 rounded-full bg-stock text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-[13px] font-semibold text-ink">In Transit · Dispatched from Central Hub</h5>
                    <p className="text-[11px] text-mute">Nov 13, 2024 · 04:30 AM · Line-haul Flight BLR-772</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-7 rounded-full bg-heritage text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    <Truck className="size-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-heritage">Out for Delivery (Bengaluru Depot)</h5>
                    <p className="text-[11px] text-mute">Expected: Tomorrow by 4:00 PM · Courier: BlueDart</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-40">
                  <div className="size-7 rounded-full border border-line bg-well flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-mute">
                    4
                  </div>
                  <div>
                    <h5 className="text-[13px] font-medium text-mute">Final Delivery</h5>
                    <p className="text-[11px] text-mute">Indiranagar, Bengaluru - 560038</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line flex justify-end">
                <button
                  onClick={() => setTrackingModalOrder(null)}
                  className="btn-primary w-full sm:w-auto h-10 px-5 text-[13px] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: MOBILE ORDERS MODAL / DRAWER (z-[70]) */}
      {/* ======================================================== */}
      {activeMobileModal === "orders" && (
        <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setActiveMobileModal(null)} />
          <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative w-full max-w-lg rounded-t-[24px] sm:rounded-panel border border-line bg-canvas p-5 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col">
              <div className="w-12 h-1.5 rounded-full bg-line mx-auto mb-2 sm:hidden" />
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Package className="size-5 text-heritage" />
                  <h3 className="text-[16px] font-bold text-ink">Your Orders &amp; History</h3>
                </div>
                <button
                  onClick={() => setActiveMobileModal(null)}
                  className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-4 flex-1 overflow-y-auto space-y-4 pr-1">
                {mockOrders.map((ord) => (
                  <div key={ord.id} className="rounded-card border border-line bg-well/70 p-3.5 space-y-3">
                    <div className="flex items-center justify-between border-b border-line/60 pb-2 text-[12px]">
                      <span className="font-bold text-ink">#{ord.orderNumber}</span>
                      <span className="text-mute">{ord.placedDate}</span>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2.5">
                          <div className="size-11 rounded-md bg-canvas border border-line p-1 flex items-center justify-center shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[12px] font-semibold text-ink truncate">{item.name}</p>
                            <p className="text-[11px] text-mute">Qty: {item.qty} · {inr(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-line/60 flex items-center justify-between">
                      <span className="text-[13px] font-bold text-ink">Total: {inr(ord.totalAmount)}</span>
                      <div className="flex items-center gap-2">
                        {ord.status === "in-transit" ? (
                          <button
                            onClick={() => {
                              setActiveMobileModal(null);
                              setTrackingModalOrder(ord);
                            }}
                            className="btn-primary h-7 px-3 text-[11px] gap-1 cursor-pointer"
                          >
                            <Navigation className="size-3" /> Track
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBuyAgain(ord.items[0])}
                            className="btn-primary h-7 px-3 text-[11px] gap-1 cursor-pointer"
                          >
                            <RotateCcw className="size-3" /> Reorder
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setActiveMobileModal(null);
                            setSelectedOrder(ord);
                          }}
                          className="btn-secondary h-7 px-2.5 text-[11px] cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: MOBILE WISHLIST MODAL / DRAWER (z-[70]) */}
      {/* ======================================================== */}
      {activeMobileModal === "wishlist" && (
        <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setActiveMobileModal(null)} />
          <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative w-full max-w-lg rounded-t-[24px] sm:rounded-panel border border-line bg-canvas p-5 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col">
              <div className="w-12 h-1.5 rounded-full bg-line mx-auto mb-2 sm:hidden" />
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Heart className="size-5 text-heritage" />
                  <h3 className="text-[16px] font-bold text-ink">Saved Wishlist ({wishlist.length})</h3>
                </div>
                <button
                  onClick={() => setActiveMobileModal(null)}
                  className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
                {wishlist.length === 0 ? (
                  <div className="py-12 text-center text-mute text-[13px]">
                    <Heart className="mx-auto size-8 text-mute/50 mb-2" />
                    <p>Your wishlist is currently empty.</p>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="rounded-card border border-line bg-well/70 p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-14 rounded-lg bg-canvas border border-line p-1 flex items-center justify-center shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-ink truncate">{item.name}</p>
                          <p className="text-[11px] text-mute font-mono">OEM #{item.oem}</p>
                          <p className="text-[13px] font-bold text-ink mt-0.5">{inr(item.price)}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => handleAddWishlistToCart(item)}
                          className="btn-primary h-8 px-3 text-[11px] gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="size-3" /> Move to Bag
                        </button>
                        <button
                          onClick={() => handleRemoveWishlist(item.id)}
                          className="text-[11px] text-danger hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: MOBILE ADDRESSES MODAL / DRAWER (z-[70]) */}
      {/* ======================================================== */}
      {activeMobileModal === "addresses" && (
        <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setActiveMobileModal(null)} />
          <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative w-full max-w-lg rounded-t-[24px] sm:rounded-panel border border-line bg-canvas p-5 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col">
              <div className="w-12 h-1.5 rounded-full bg-line mx-auto mb-2 sm:hidden" />
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-heritage" />
                  <h3 className="text-[16px] font-bold text-ink">Saved Delivery Addresses</h3>
                </div>
                <button
                  onClick={() => setActiveMobileModal(null)}
                  className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`rounded-card border p-3.5 space-y-2 ${
                      addr.isDefault ? "border-heritage bg-heritage/5 ring-1 ring-heritage" : "border-line bg-well/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-ink flex items-center gap-1.5">
                        {addr.label}
                        {addr.isDefault && (
                          <span className="rounded bg-stock/15 text-stock px-1.5 py-0.2 text-[9px] font-semibold">
                            Default
                          </span>
                        )}
                      </span>
                      <button
                        onClick={() => {
                          setActiveMobileModal(null);
                          setIsEditProfileOpen(true);
                        }}
                        className="text-[12px] text-heritage font-medium hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>

                    <p className="text-[13px] font-medium text-ink">{addr.name}</p>
                    <p className="text-[12px] text-mute leading-relaxed">{addr.line}, {addr.city}</p>
                    <p className="text-[12px] text-ink font-medium">{addr.phone}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-line">
                <button
                  onClick={() => {
                    setActiveMobileModal(null);
                    showToast("Add new address form opened");
                  }}
                  className="btn-secondary w-full h-10 text-[13px] font-semibold gap-1.5 cursor-pointer"
                >
                  <Plus className="size-4" /> Add New Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: MOBILE HELP CENTER MODAL / DRAWER (z-[70]) */}
      {/* ======================================================== */}
      {activeMobileModal === "help" && (
        <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setActiveMobileModal(null)} />
          <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative w-full max-w-lg rounded-t-[24px] sm:rounded-panel border border-line bg-canvas p-5 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col">
              <div className="w-12 h-1.5 rounded-full bg-line mx-auto mb-2 sm:hidden" />
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Headphones className="size-5 text-heritage" />
                  <h3 className="text-[16px] font-bold text-ink">RoyalSpares 24x7 Help Center</h3>
                </div>
                <button
                  onClick={() => setActiveMobileModal(null)}
                  className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
                {/* Instant WhatsApp Support */}
                <div className="rounded-card border border-stock/30 bg-stock/5 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[13px] text-stock flex items-center gap-1.5">
                      <MessageSquare className="size-4" /> Instant WhatsApp Helpline
                    </span>
                    <span className="rounded bg-stock/20 text-stock text-[9px] font-bold px-1.5 py-0.2">Online</span>
                  </div>
                  <p className="text-[12px] text-mute leading-normal">
                    Connect directly with our technicians for fitment verification and courier status.
                  </p>
                  <button
                    onClick={() => {
                      setActiveMobileModal(null);
                      showToast("Connecting to WhatsApp desk...");
                    }}
                    className="btn-primary h-8 w-full text-[12px] gap-1.5 cursor-pointer"
                  >
                    <Send className="size-3" /> Start WhatsApp Chat
                  </button>
                </div>

                {/* Direct Dial Desk */}
                <div className="rounded-card border border-line bg-well p-3.5 flex items-center justify-between">
                  <div>
                    <h5 className="text-[13px] font-semibold text-ink flex items-center gap-1.5">
                      <PhoneCall className="size-3.5 text-heritage" /> Support Phone Desk
                    </h5>
                    <p className="text-[11px] text-mute">Toll-free: 1800-420-7727 (9 AM – 9 PM)</p>
                  </div>
                  <button
                    onClick={() => alert("Calling RoyalSpares Toll-Free Desk: 1800-420-7727")}
                    className="btn-secondary h-8 px-3 text-[11px] cursor-pointer"
                  >
                    Call
                  </button>
                </div>

                {/* Frequently Asked Inquiries */}
                <div className="rounded-card border border-line bg-canvas p-3.5 space-y-2">
                  <h5 className="text-[13px] font-bold text-ink">Popular FAQs</h5>
                  <ul className="space-y-2 text-[12px] text-mute">
                    <li className="flex items-center justify-between cursor-pointer hover:text-ink py-1 border-b border-line/60">
                      <span>How to verify OEM part number compatibility?</span>
                      <ChevronRight className="size-3.5" />
                    </li>
                    <li className="flex items-center justify-between cursor-pointer hover:text-ink py-1 border-b border-line/60">
                      <span>10-day easy return policy details</span>
                      <ChevronRight className="size-3.5" />
                    </li>
                    <li className="flex items-center justify-between cursor-pointer hover:text-ink py-1">
                      <span>B2B GST invoice input credit claims</span>
                      <ChevronRight className="size-3.5" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 6: DELETE ACCOUNT CONFIRMATION + COUNTDOWN (z-[70]) */}
      {/* ======================================================== */}
      {isDeleteAccountOpen && (
        <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => {
              if (deleteCountdown !== null) {
                handleCancelDeleteCountdown();
              } else {
                setIsDeleteAccountOpen(false);
              }
            }}
          />
          <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative w-full max-w-md rounded-t-[24px] sm:rounded-panel border border-danger/30 bg-canvas p-6 shadow-2xl space-y-4">
              <div className="w-12 h-1.5 rounded-full bg-line mx-auto mb-1 sm:hidden" />

              {/* Countdown active */}
              {deleteCountdown !== null && deleteCountdown > 0 ? (
                <div className="flex flex-col items-center text-center space-y-5 py-2">
                  {/* Circular countdown ring */}
                  <div className="relative size-24">
                    <svg className="size-24 -rotate-90" viewBox="0 0 96 96">
                      <circle
                        cx="48" cy="48" r="42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-line"
                      />
                      <circle
                        cx="48" cy="48" r="42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="text-danger transition-all duration-1000 ease-linear"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - deleteCountdown / 15)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Trash2 className="size-5 text-danger mb-0.5" />
                      <span className="text-2xl font-bold text-danger tabular-nums">{deleteCountdown}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[17px] font-bold text-ink">Account Deletion in Progress</h3>
                    <p className="text-[13px] text-mute mt-1 leading-relaxed max-w-xs mx-auto">
                      Your account <strong className="text-ink">{userProfile.email}</strong> will be permanently deleted in{" "}
                      <strong className="text-danger">{deleteCountdown}s</strong>. All data including orders, garage, and addresses will be erased.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCancelDeleteCountdown}
                    className="w-full h-11 rounded-control border-2 border-ink bg-canvas text-ink text-[14px] font-bold hover:bg-well transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <X className="size-4" />
                    Cancel — Keep My Account
                  </button>
                </div>
              ) : (
                /* Initial confirmation prompt */
                <>
                  <div className="flex items-center gap-3 text-danger">
                    <div className="size-10 rounded-full bg-danger/10 flex items-center justify-center shrink-0">
                      <AlertTriangle className="size-5 text-danger" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-ink">Delete Account &amp; Data?</h3>
                      <p className="text-[12px] text-mute">Irreversible security action</p>
                    </div>
                  </div>

                  <div className="rounded-control border border-danger/20 bg-danger/5 p-3.5 text-[12px] text-ink/90 leading-relaxed">
                    Are you sure you want to permanently delete your RoyalSpares account for <strong>{userProfile.email}</strong>?
                    All saved garage vehicles, order invoices, delivery addresses, and fitment data will be permanently erased.
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsDeleteAccountOpen(false)}
                      className="btn-secondary h-9 px-4 text-[13px] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmDeleteAccount}
                      className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-control bg-danger text-white text-[13px] font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Permanently Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL (z-[70]) */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setIsEditProfileOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md rounded-panel border border-line bg-canvas p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-[16px] font-bold text-ink">Edit Profile &amp; Contact</h3>
                <button
                  onClick={() => setIsEditProfileOpen(false)}
                  className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsEditProfileOpen(false);
                  showToast("Profile details saved successfully");
                }}
                className="mt-4 space-y-4"
              >
                <div>
                  <label className="text-[12px] text-mute font-medium block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="field h-10 text-[13px]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[12px] text-mute font-medium block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="field h-10 text-[13px]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[12px] text-mute font-medium block mb-1">Phone (with SMS/WhatsApp)</label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                    className="field h-10 text-[13px]"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="btn-secondary h-9 px-4 text-[13px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary h-9 px-4 text-[13px] cursor-pointer">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* VIEW ORDER DETAILS MODAL (z-[70]) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg rounded-panel border border-line bg-canvas p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div>
                  <span className="text-[11px] font-semibold text-mute">Order Details</span>
                  <h3 className="text-[16px] font-bold text-ink">Order #{selectedOrder.orderNumber}</h3>
                  <p className="text-[12px] text-mute">Placed on {selectedOrder.placedDate}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="mt-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-card border border-line bg-well">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-12 rounded-lg bg-canvas border border-line overflow-hidden p-1 shrink-0 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-ink truncate">{item.name}</p>
                        <p className="text-[11px] text-mute truncate">OEM #{item.oem} · Qty: {item.qty}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-bold text-ink">{inr(item.price * item.qty)}</p>
                      <button
                        onClick={() => handleBuyAgain(item)}
                        className="text-[12px] font-semibold text-heritage hover:underline cursor-pointer"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="mt-4 pt-3 border-t border-line text-[12px] space-y-1 text-mute">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-ink font-semibold">{inr(selectedOrder.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Standard Ground):</span>
                  <span className="text-stock font-semibold">FREE (Order promo)</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18% Input Tax Credit):</span>
                  <span className="text-ink">Included in price</span>
                </div>
                <div className="flex justify-between text-[14px] text-ink font-bold pt-2 border-t border-line/60">
                  <span>Grand Total:</span>
                  <span>{inr(selectedOrder.totalAmount)}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-line flex items-center justify-between">
                <button
                  onClick={() => handleDownloadInvoice(selectedOrder.orderNumber)}
                  className="inline-flex items-center gap-1.5 text-[12px] font-mono font-medium text-mute hover:text-ink cursor-pointer"
                >
                  <Download className="size-3.5" /> Invoice (PDF)
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="btn-secondary h-9 px-4 text-[13px] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOP USER PROFILE HEADER CARD */}
      <section className="shell pt-6 md:pt-8 lg:pt-10">
        <div className="rounded-card border border-line bg-canvas p-5 md:p-6 lg:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar with Verified Shield */}
              <div className="relative">
                <div className="size-14 sm:size-16 rounded-full bg-heritage text-white flex items-center justify-center font-bold text-lg sm:text-xl shrink-0 shadow-inner">
                  RI
                </div>
                <span className="absolute bottom-0 right-0 grid size-5 place-items-center rounded-full bg-canvas border border-line text-stock shadow-sm">
                  <CheckCircle className="size-3.5 text-stock fill-stock/20" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">{userProfile.name}</h1>
                  <span className="rounded bg-well border border-line px-2 py-0.5 text-[11px] font-medium text-mute">
                    {userProfile.clubTier}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-mute">
                  <span>{userProfile.email}</span>
                  <span className="text-line hidden sm:inline">·</span>
                  <span>{userProfile.phone}</span>
                  <span className="text-line hidden md:inline">·</span>
                  <span className="text-[12px] text-mute/80 hidden md:inline">
                    Member since {userProfile.memberSince}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="btn-secondary h-9 text-[13px] gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Edit3 className="size-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </section>

      {/* MOBILE-ONLY TOP 4 QUICK ACTION TILES (< 768px) */}
      <section className="shell mt-4 md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {/* Tile 1: Your Orders */}
          <button
            onClick={() => setActiveMobileModal("orders")}
            className="flex items-center gap-3 rounded-card border border-line bg-canvas p-3.5 cursor-pointer hover:border-heritage active:scale-[0.98] transition-all text-left"
          >
            <div className="relative grid size-10 place-items-center rounded-xl bg-heritage/10 text-heritage shrink-0">
              <Package className="size-5" />
              <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-heritage text-[9px] font-bold text-white">
                {mockOrders.length}
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-[13px] font-semibold text-ink block">Your Orders</span>
              <span className="text-[11px] text-mute block truncate">Track & reorder</span>
            </div>
          </button>

          {/* Tile 2: Wishlist */}
          <button
            onClick={() => setActiveMobileModal("wishlist")}
            className="flex items-center gap-3 rounded-card border border-line bg-canvas p-3.5 cursor-pointer hover:border-heritage active:scale-[0.98] transition-all text-left"
          >
            <div className="relative grid size-10 place-items-center rounded-xl bg-pink-50 text-pink-600 shrink-0">
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-pink-500 text-[9px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <span className="text-[13px] font-semibold text-ink block">Wishlist</span>
              <span className="text-[11px] text-mute block truncate">Saved parts</span>
            </div>
          </button>

          {/* Tile 3: Addresses */}
          <button
            onClick={() => setActiveMobileModal("addresses")}
            className="flex items-center gap-3 rounded-card border border-line bg-canvas p-3.5 cursor-pointer hover:border-heritage active:scale-[0.98] transition-all text-left"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
              <MapPin className="size-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[13px] font-semibold text-ink block">Addresses</span>
              <span className="text-[11px] text-mute block truncate">{addresses.length} saved</span>
            </div>
          </button>

          {/* Tile 4: Help Center */}
          <button
            onClick={() => setActiveMobileModal("help")}
            className="flex items-center gap-3 rounded-card border border-line bg-canvas p-3.5 cursor-pointer hover:border-heritage active:scale-[0.98] transition-all text-left"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-600 shrink-0">
              <Headphones className="size-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[13px] font-semibold text-ink block">Help Center</span>
              <span className="text-[11px] text-mute block truncate">24×7 support</span>
            </div>
          </button>
        </div>
      </section>

      {/* ACTIVE LIVE TRANSIT BANNER CARD (FIXED TRACK SHIPMENT BUTTON ON MOBILE) */}
      <section className="shell mt-6">
        <div className="rounded-card border border-line bg-canvas p-5 md:p-6 shadow-sm">
          {/* Header of transit card */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-stock" />
              <span className="text-[12px] font-semibold text-stock">
                In transit · #{mockOrders[0].orderNumber}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[12px] font-semibold text-ink">Total: {inr(mockOrders[0].totalAmount)}</span>
              <span className="rounded bg-well border border-line px-2 py-0.5 text-[11px] text-mute hidden sm:inline">
                Standard Ground
              </span>
            </div>
          </div>

          {/* Stepper details */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-ink">Arriving Tomorrow by 4:00 PM</h2>
              <p className="text-[12px] text-mute mt-0.5">
                Classic 350 Sprocket Kit + 1 more OEM part · {mockOrders[0].courier} (AWB: {mockOrders[0].awb})
              </p>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-5 space-y-2">
            <div className="relative h-2 w-full rounded-full bg-well overflow-hidden">
              <div className="h-full rounded-full bg-heritage transition-all duration-500 w-[65%]" />
            </div>
            <div className="flex justify-between text-[11px] text-mute">
              <span className="flex items-center gap-1 text-stock font-semibold">
                <Check className="size-3" /> Confirmed
              </span>
              <span className="flex items-center gap-1 text-stock font-semibold">
                <Check className="size-3" /> Shipped (BLR Hub)
              </span>
              <span className="flex items-center gap-1 text-heritage font-bold">
                <Truck className="size-3" /> Out for Delivery
              </span>
            </div>
          </div>

          {/* Product inside transit card */}
          <div className="mt-5 rounded-control border border-line bg-well p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-12 rounded-lg bg-canvas border border-line overflow-hidden p-1 shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mockOrders[0].items[0].img}
                  alt={mockOrders[0].items[0].name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-semibold text-ink truncate">
                  {mockOrders[0].items[0].name} &amp; Oil Filter Assembly
                </h4>
                <p className="text-[11px] text-mute truncate">
                  SKU: RE-DRV-99382 · OEM Certified · Qty: 1 Kit + 2 Consumables
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action buttons: Responsive & Fixed for Mobile */}
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => setTrackingModalOrder(mockOrders[0])}
              className="flex-[2] btn-primary h-11 text-[13px] sm:text-[14px] font-semibold gap-2 shadow-sm cursor-pointer justify-center"
            >
              <Navigation className="size-4" />
              <span>Track Order</span>
            </button>

            <button
              onClick={() => setSelectedOrder(mockOrders[0])}
              className="flex-1 btn-secondary h-11 text-[13px] sm:text-[14px] font-medium justify-center cursor-pointer"
            >
              <span>Details</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* DESKTOP & TABLET: 6-GRID / 4-GRID QUICK ACCESS CARDS */}
      <section className="shell mt-6 hidden md:block">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-semibold text-ink">Account Overview</h3>
          <span className="text-[12px] text-mute">Overview &amp; Preferences</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Your Orders */}
          <div
            onClick={() => setActiveMobileModal("orders")}
            className="card card-hover p-4 bg-canvas border border-line rounded-card flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="size-9 rounded-control bg-well flex items-center justify-center text-ink">
                  <Package className="size-4 text-heritage" />
                </div>
                <span className="rounded bg-stock/10 px-2 py-0.5 text-[10px] font-semibold text-stock">
                  1 Active
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-ink mt-3">Your Orders</h4>
              <p className="text-[12px] text-mute mt-1 leading-normal">
                Track current shipments, request returns, or reorder genuine OEM assemblies.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60">
              <span className="inline-flex items-center gap-1 text-[12px] text-mute bg-well px-2 py-1 rounded">
                <span className="size-1.5 rounded-full bg-stock" /> #RS-884920 · Arriving Tomorrow
              </span>
            </div>
          </div>

          {/* Card 2: Saved Addresses */}
          <div
            onClick={() => setActiveMobileModal("addresses")}
            className="card card-hover p-4 bg-canvas border border-line rounded-card flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="size-9 rounded-control bg-well flex items-center justify-center text-ink">
                  <MapPin className="size-4 text-heritage" />
                </div>
                <span className="rounded bg-well px-2 py-0.5 text-[10px] font-semibold text-mute">
                  2 Saved
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-ink mt-3">Delivery Addresses</h4>
              <p className="text-[12px] text-mute mt-1 leading-normal">
                Manage delivery locations and set dispatch defaults for doorstep spares.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60">
              <span className="inline-flex items-center gap-1 text-[12px] text-mute bg-well px-2 py-1 rounded truncate max-w-full">
                Default: Indiranagar, Bengaluru - 560038
              </span>
            </div>
          </div>

          {/* Card 3: Payments & GST */}
          <div className="card card-hover p-4 bg-canvas border border-line rounded-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="size-9 rounded-control bg-well flex items-center justify-center text-ink">
                  <CreditCard className="size-4 text-heritage" />
                </div>
                <span className="rounded bg-stock/10 px-2 py-0.5 text-[10px] font-semibold text-stock">
                  GST Active
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-ink mt-3">Payment Methods</h4>
              <p className="text-[12px] text-mute mt-1 leading-normal">
                Saved UPI accounts, corporate GSTIN, and verified workshop billing handles.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60">
              <span className="inline-flex items-center gap-1 text-[12px] text-mute bg-well px-2 py-1 rounded">
                <ShieldCheck className="size-3 text-stock" /> HDFC •••• 4019 &amp; 1 UPI ID
              </span>
            </div>
          </div>

          {/* Card 4: Wishlist & Saved Parts */}
          <div
            onClick={() => setActiveMobileModal("wishlist")}
            className="card card-hover p-4 bg-canvas border border-line rounded-card flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="size-9 rounded-control bg-well flex items-center justify-center text-ink">
                  <Heart className="size-4 text-heritage" />
                </div>
                <span className="rounded bg-well px-2 py-0.5 text-[10px] font-semibold text-mute">
                  {wishlist.length} Spares
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-ink mt-3">Wishlist &amp; Saved Parts</h4>
              <p className="text-[12px] text-mute mt-1 leading-normal">
                Saved OEM parts, price drops, and reserved assemblies for your next tune-up.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60">
              <span className="inline-flex items-center gap-1 text-[12px] text-mute bg-well px-2 py-1 rounded truncate max-w-full">
                {wishlist.length} items · Classic Touring Mirrors &amp; Filters
              </span>
            </div>
          </div>

          {/* Card 5: Returns & Refunds (Desktop) */}
          <div className="card card-hover p-4 bg-canvas border border-line rounded-card hidden lg:flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="size-9 rounded-control bg-well flex items-center justify-center text-ink">
                  <RotateCcw className="size-4 text-heritage" />
                </div>
                <span className="rounded bg-well px-2 py-0.5 text-[10px] font-semibold text-mute">
                  Policy 10D
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-ink mt-3">Returns &amp; Refunds</h4>
              <p className="text-[12px] text-mute mt-1 leading-normal">
                10-day hassle-free fitment returns &amp; replacement refund status.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60">
              <span className="inline-flex items-center gap-1 text-[12px] text-mute bg-well px-2 py-1 rounded">
                <span className="size-1.5 rounded-full bg-stock" /> No active returns currently pending
              </span>
            </div>
          </div>

          {/* Card 6: Help & Support (Desktop) */}
          <div
            onClick={() => setActiveMobileModal("help")}
            className="card card-hover p-4 bg-canvas border border-line rounded-card hidden lg:flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="size-9 rounded-control bg-well flex items-center justify-center text-ink">
                  <Headphones className="size-4 text-heritage" />
                </div>
                <span className="rounded bg-stock/10 px-2 py-0.5 text-[10px] font-semibold text-stock">
                  Instant
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-ink mt-3">Help &amp; Support</h4>
              <p className="text-[12px] text-mute mt-1 leading-normal">
                24x7 RoyalSpares Desk, fitment questions, and warranty claims.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60">
              <span className="inline-flex items-center gap-1 text-[12px] text-mute bg-well px-2 py-1 rounded">
                <MessageSquare className="size-3 text-heritage" /> Live Chat &amp; Ticket Desk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SAVED MOTORCYCLE GARAGE BANNER CARD */}
      <section className="shell mt-6">
        <div className="rounded-card border border-line bg-canvas p-4 sm:p-5 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-10 sm:size-11 rounded-control bg-heritage/10 text-heritage flex items-center justify-center shrink-0">
              <Bike className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-[14px] sm:text-[15px] font-semibold text-ink truncate">
                  Interceptor 650 (Mark 2 Chrome)
                </h4>
                <span className="rounded bg-well px-1.5 py-0.2 text-[10px] font-medium text-mute hidden sm:inline">
                  Primary bike
                </span>
              </div>
              <p className="text-[12px] text-mute mt-0.5 truncate">
                VIN: ME3U3S5C8K1029 · Model Year: 2021 · 648cc Parallel Twin
              </p>
            </div>
          </div>

          <Link
            href="/bikes/interceptor-650"
            className="btn-secondary h-8 px-3 text-[12px] gap-1 shrink-0 cursor-pointer"
          >
            <span>Garage</span>
            <ChevronRight className="size-3" />
          </Link>
        </div>
      </section>

      {/* RECENT ORDERS (Desktop & Tablet) */}
      <section className="shell mt-8 hidden md:block">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-ink">Recent Orders</h3>
            <p className="text-[12px] text-mute">View shipment updates, manage items, and re-order genuine consumables.</p>
          </div>
          <button
            onClick={() => setActiveMobileModal("orders")}
            className="link-action text-[13px] cursor-pointer"
          >
            View all 14 past orders <ChevronRight className="size-3.5" />
          </button>
        </div>

        <div className="space-y-4">
          {mockOrders.map((ord) => (
            <div key={ord.id} className="rounded-card border border-line bg-canvas p-5 shadow-sm space-y-4">
              {/* Order Meta Header Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-line pb-3 text-[12px]">
                <div>
                  <span className="text-mute block text-[11px]">Order placed</span>
                  <span className="font-semibold text-ink">{ord.placedDate}</span>
                </div>
                <div>
                  <span className="text-mute block text-[11px]">Total amount</span>
                  <span className="font-semibold text-ink">{inr(ord.totalAmount)}</span>
                </div>
                <div>
                  <span className="text-mute block text-[11px]">Ship to</span>
                  <span className="font-semibold text-ink truncate block">{ord.shipTo}</span>
                </div>
                <div className="text-right">
                  <span className="text-mute block text-[11px]">Order ID</span>
                  <span className="font-bold text-ink">#{ord.orderNumber}</span>
                </div>
              </div>

              {/* Status banner */}
              <div className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-2">
                  {ord.status === "in-transit" ? (
                    <Truck className="size-4 text-link" />
                  ) : (
                    <CheckCircle2 className="size-4 text-stock" />
                  )}
                  <span className="font-semibold text-ink">{ord.statusText}</span>
                </div>
                <span className="text-[12px] text-mute">{ord.deliverySubtext}</span>
              </div>

              {/* Items in this order */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
                <div className="md:col-span-8 space-y-2">
                  {ord.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="size-12 rounded-lg bg-well border border-line p-1 shrink-0 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-ink truncate">{item.name}</p>
                        <p className="text-[11px] text-mute truncate">{item.spec} · Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="md:col-span-4 flex flex-col items-end gap-2">
                  {ord.status === "in-transit" ? (
                    <>
                      <button
                        onClick={() => setTrackingModalOrder(ord)}
                        className="btn-primary h-8 px-4 text-[12px] gap-1.5 w-full sm:w-auto cursor-pointer"
                      >
                        <Navigation className="size-3.5" />
                        <span>Track Package</span>
                      </button>
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="btn-secondary h-8 px-4 text-[12px] w-full sm:w-auto cursor-pointer"
                      >
                        View Details
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleBuyAgain(ord.items[0])}
                        className="btn-primary h-8 px-4 text-[12px] gap-1.5 w-full sm:w-auto cursor-pointer"
                      >
                        <RotateCcw className="size-3.5" />
                        <span>Buy Again</span>
                      </button>
                      <button
                        onClick={() => showToast("Opening verified review form...")}
                        className="btn-secondary h-8 px-4 text-[12px] gap-1.5 w-full sm:w-auto cursor-pointer"
                      >
                        <Star className="size-3.5" />
                        <span>Leave a Review</span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDownloadInvoice(ord.orderNumber)}
                    className="inline-flex items-center gap-1 text-[12px] text-mute hover:text-ink cursor-pointer mt-1"
                  >
                    <Download className="size-3" /> Invoice PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TWO COLUMN LOWER SECTION: Shipping Address & Security/Preferences */}
      <section className="shell mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Default Shipping Address */}
          <div className="lg:col-span-6 rounded-card border border-line bg-canvas p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-heritage" />
                <h3 className="text-[15px] font-bold text-ink">Default Shipping Address</h3>
                <span className="rounded bg-stock/10 px-1.5 py-0.2 text-[10px] font-semibold text-stock">
                  Default
                </span>
              </div>
            </div>

            <div className="rounded-control border border-line bg-well p-4 space-y-2">
              <p className="text-[14px] font-bold text-ink">{userProfile.name}</p>
              <p className="text-[13px] text-mute leading-relaxed font-normal">
                #42/1, 8th Main Road, HAL 2nd Stage, Near Indiranagar Club, Indiranagar, Bengaluru, Karnataka - 560038
              </p>
              <p className="text-[12px] text-ink font-semibold mt-2">{userProfile.phone}</p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[12px]">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="btn-secondary h-8 px-3 text-[12px] cursor-pointer"
              >
                Edit Address
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveMobileModal("addresses")}
                  className="text-mute hover:text-ink cursor-pointer"
                >
                  Manage All ({addresses.length})
                </button>
                <button
                  onClick={() => showToast("Adding new delivery address...")}
                  className="text-heritage font-semibold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Plus className="size-3" /> Add New
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Security & Preferences */}
          <div className="lg:col-span-6 rounded-card border border-line bg-canvas p-5 md:p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="size-4 text-heritage" />
                <h3 className="text-[15px] font-bold text-ink">Security &amp; Preferences</h3>
              </div>
            </div>

            <div className="divide-y divide-line/70">
              {/* Item 1 */}
              <div
                onClick={() => showToast("2FA Authenticator verified")}
                className="py-3 flex items-center justify-between gap-3 hover:bg-well/50 p-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-well flex items-center justify-center text-mute shrink-0">
                    <Lock className="size-4" />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-semibold text-ink">Login &amp; Password</h5>
                    <p className="text-[12px] text-mute">Last changed 4 months ago · 2FA Active</p>
                  </div>
                </div>
                <ChevronRight className="size-4 text-mute" />
              </div>

              {/* Item 2 */}
              <div className="py-3 flex items-center justify-between gap-3 hover:bg-well/50 p-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-well flex items-center justify-center text-mute shrink-0">
                    <Bell className="size-4" />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-semibold text-ink">WhatsApp Dispatch &amp; Tracking Alerts</h5>
                    <p className="text-[12px] text-mute">Updates delivered to {userProfile.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setWhatsappAlerts(!whatsappAlerts);
                    showToast(whatsappAlerts ? "WhatsApp alerts muted" : "WhatsApp alerts enabled");
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    whatsappAlerts ? "bg-heritage" : "bg-line"
                  }`}
                >
                  <span
                    className={`size-4 rounded-full bg-white absolute top-1 transition-transform ${
                      whatsappAlerts ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Item 3 */}
              <div
                onClick={() => showToast("Managing saved bikes in garage")}
                className="py-3 flex items-center justify-between gap-3 hover:bg-well/50 p-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-well flex items-center justify-center text-mute shrink-0">
                    <Bike className="size-4" />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-semibold text-ink">Saved Motorcycle Garage</h5>
                    <p className="text-[12px] text-mute">Interceptor 650 (2021) · Mark 2 Chrome</p>
                  </div>
                </div>
                <ChevronRight className="size-4 text-mute" />
              </div>
            </div>

            {/* Session info, Delete Account & Sign out */}
            <div className="mt-4 pt-3 border-t border-line flex flex-wrap items-center justify-between gap-3 text-[12px]">
              <span className="text-mute">Session active on 2 devices</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsDeleteAccountOpen(true)}
                  className="text-danger font-semibold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="size-3 text-danger" /> Delete Account
                </button>
                <button
                  onClick={() => showToast("Signed out successfully")}
                  className="inline-flex items-center gap-1 text-mute hover:text-ink cursor-pointer"
                >
                  <LogOut className="size-3" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE-ONLY PREFERENCES LIST, LOGOUT & DELETE ACCOUNT (< 768px) */}
      <section className="shell mt-6 md:hidden space-y-4">
        <div className="rounded-card border border-line bg-canvas divide-y divide-line/70 shadow-sm">
          <div
            onClick={() => setActiveMobileModal("orders")}
            className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileText className="size-4 text-heritage" />
              <span className="text-[13px] font-medium text-ink">All Orders &amp; Purchase History</span>
            </div>
            <ChevronRight className="size-4 text-mute" />
          </div>

          <div
            onClick={() => setActiveMobileModal("addresses")}
            className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <MapPin className="size-4 text-heritage" />
              <div>
                <span className="text-[13px] font-medium text-ink block">Saved Delivery Addresses</span>
                <span className="text-[11px] text-mute">Default: Indiranagar, Bangalore</span>
              </div>
            </div>
            <ChevronRight className="size-4 text-mute" />
          </div>

          <div
            onClick={() => showToast("Managing cards & UPI handles")}
            className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="size-4 text-heritage" />
              <span className="text-[13px] font-medium text-ink">Saved Cards &amp; UPI Accounts</span>
            </div>
            <ChevronRight className="size-4 text-mute" />
          </div>

          <div
            onClick={() => showToast("Verified GSTIN: 29AABCU9603R1ZM")}
            className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Building className="size-4 text-heritage" />
              <span className="text-[13px] font-medium text-ink">GST Invoices &amp; Business Details</span>
            </div>
            <ChevronRight className="size-4 text-mute" />
          </div>

          <div
            onClick={() => showToast("Zero active returns currently pending")}
            className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="size-4 text-heritage" />
              <span className="text-[13px] font-medium text-ink">Returns &amp; Refunds</span>
            </div>
            <ChevronRight className="size-4 text-mute" />
          </div>

          <div
            onClick={() => {
              setWhatsappAlerts(!whatsappAlerts);
              showToast(whatsappAlerts ? "WhatsApp alerts muted" : "WhatsApp alerts enabled");
            }}
            className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Bell className="size-4 text-heritage" />
              <span className="text-[13px] font-medium text-ink">Notifications &amp; WhatsApp Alerts</span>
            </div>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                whatsappAlerts ? "bg-stock/10 text-stock" : "bg-well text-mute"
              }`}
            >
              {whatsappAlerts ? "On" : "Off"}
            </span>
          </div>

          <div
            onClick={() => setActiveMobileModal("help")}
            className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Headphones className="size-4 text-heritage" />
              <span className="text-[13px] font-medium text-ink">24x7 Customer Support &amp; Help</span>
            </div>
            <ChevronRight className="size-4 text-mute" />
          </div>

          <div
            onClick={() => showToast("Opening privacy & password settings")}
            className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Lock className="size-4 text-heritage" />
              <span className="text-[13px] font-medium text-ink">Privacy &amp; Account Settings</span>
            </div>
            <ChevronRight className="size-4 text-mute" />
          </div>
        </div>

        {/* Mobile Log Out Button */}
        <button
          onClick={() => showToast("Signed out successfully")}
          className="w-full flex items-center justify-center gap-2 rounded-control border border-line bg-canvas p-3.5 text-[13px] font-semibold text-ink hover:bg-well shadow-sm cursor-pointer transition-colors"
        >
          <LogOut className="size-4 text-mute" />
          <span>Log Out</span>
        </button>

        {/* Mobile Delete Account Button */}
        <button
          onClick={() => setIsDeleteAccountOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-control border border-danger/30 bg-danger/5 hover:bg-danger/10 p-3.5 text-[13px] font-semibold text-danger shadow-sm cursor-pointer transition-colors"
        >
          <Trash2 className="size-4 text-danger" />
          <span>Delete Account</span>
        </button>

        {/* Mobile Trust Guarantee Banner */}
        <div className="rounded-control border border-line bg-well p-3 flex items-center justify-center gap-2 text-center text-[11px] text-mute">
          <ShieldCheck className="size-4 text-stock" />
          <span>100% Genuine OEM Spares Guarantee · Secure Payments</span>
        </div>
      </section>
    </div>
  );
}
