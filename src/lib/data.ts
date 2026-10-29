export const bikes = [
  { slug: "classic-350", name: "Classic 350", sub: "Reborn · J-Series", engine: "349cc", years: "2021–2025", schematics: 328, img: "/images/classic-350.avif" },
  { slug: "bullet-350", name: "Bullet 350", sub: "Standard & Military", engine: "349cc · Timeless", years: "1996–2025", schematics: 294, img: "/images/bullet-350.avif" },
  { slug: "hunter-350", name: "Hunter 350", sub: "Retro & Metro", engine: "349cc · Roadster", years: "2022–2025", schematics: 210, img: "/images/hunter-350.avif" },
  { slug: "himalayan-450", name: "Himalayan 450", sub: "Base / Pass / Summit", engine: "452cc · Sherpa", years: "2023–2025", schematics: 380, img: "/images/himalayan-450.avif" },
  { slug: "interceptor-650", name: "Interceptor 650", sub: "Custom & Standard", engine: "648cc · Parallel Twin", years: "2018–2025", schematics: 412, img: "/images/interceptor-650.avif" },
  { slug: "continental-gt-650", name: "Continental GT 650", sub: "Mr. Clean & British Green", engine: "648cc · Café Racer", years: "2018–2025", schematics: 398, img: "/images/continental-gt-650.avif" },
];

export const categories = [
  { slug: "engine-filters", name: "Engine & Filters", short: "Engine & Filters", parts: 142, icon: "filter", blurb: "Spin-on oil filters, high-flow air filter elements, V-twin cylinder head gaskets, OEM spark plugs, and sump plugs.", img: "/images/engine-filters.jpg" },
  { slug: "brakes-hydraulics", name: "Brakes & Hydraulics", short: "Brakes & Fluids", parts: 88, icon: "disc", blurb: "Original ByBre sintered and organic brake pad sets, floating stainless discs, master cylinder rebuild kits, and ABS sensor cables.", img: "/images/brakes-fluid.jpg" },
  { slug: "chain-sprockets", name: "Chain & Sprockets", short: "Chain & Sprockets", parts: 64, icon: "cog", blurb: "Rolon / RE factory-sealed X-Ring & O-Ring drive chains, rear alloy sprockets, countershaft sprockets, and rubber cush drive dampers.", img: "/images/chain-sprocket.jpg" },
  { slug: "cables-controls", name: "Cables & Controls", short: "Cables & Levers", parts: 52, icon: "cable", blurb: "Friction-free PTFE lined clutch cables, dual throttle cables, rotary handlebar switchgear units, and forged ergonomic clip levers.", img: "/images/cable-levers.jpg" },
  { slug: "electrical-ignition", name: "Electrical & Ignition", short: "Electrical & ECU", parts: 118, icon: "zap", blurb: "Copper wound stator coils, MR units (rectifier/regulator), starter relays, LED headlight modules, oxygen lambda sensors, and ECU loom.", img: "/images/eletrical-ecu.jpg" },
  { slug: "body-chassis", name: "Body & Chassis", short: "Chassis & Body", parts: 95, icon: "shield", blurb: "Vibration-damped bar end masses, rubber footpeg inserts, fork oil seals, dust boots, factory crash guards, and center stand assemblies.", img: "/images/chasis-body.webp" },
];

export interface TorqueSpec {
  component: string;
  metric: string;
  imperial: string;
  note: string;
}

export interface CompatibilityItem {
  model: string;
  years: string;
  engine: string;
  ratio: string;
  status: "direct-fit" | "compatible" | "incompatible";
  badge: string;
}

export interface PackageItem {
  index: string;
  name: string;
  qty: string;
  spec: string;
}

export interface BundleItem {
  id: string;
  name: string;
  oem: string;
  price: number;
  img: string;
  checked?: boolean;
}

export interface ReviewItem {
  author: string;
  role: string;
  city: string;
  rating: number;
  date: string;
  headline: string;
  content: string;
}

export interface Part {
  id: string;
  slug: string;
  oem: string;
  batch: string;
  tag: string;
  name: string;
  headline: string;
  sub: string;
  fits: string;
  description: string;
  price: number;
  mrp: number;
  discountPct: number;
  saveAmount: number;
  taxNote: string;
  gstAmount: number;
  stock: string;
  stockUnits: number;
  stockShort: string;
  img: string;
  gallery: { label: string; src: string; is360?: boolean }[];
  breadcrumbs: { label: string; href: string }[];
  matchedBike: {
    name: string;
    chassis: string;
    matchPct: string;
    engine: string;
  };
  microfiche: {
    diagramCode: string;
    diagramSub: string;
    schematicType: "chain-sprocket" | "brake-pads" | "oil-filter" | "clutch-cable";
    scale: string;
    hotspots: { id: string; label: string; x: number; y: number; spec: string }[];
    torqueStandards: TorqueSpec[];
    serviceAlert: string;
  };
  compatibility: CompatibilityItem[];
  specs: { label: string; value: string }[];
  packageContents: PackageItem[];
  bundle: {
    title: string;
    subtitle: string;
    discountText: string;
    bundleSavings: number;
    items: BundleItem[];
  };
  reviews: {
    rating: number;
    totalReviews: number;
    distribution: { stars: number; pct: number }[];
    items: ReviewItem[];
  };
  manual: {
    title: string;
    desc: string;
    file: string;
    size: string;
  };
}

export const parts: Part[] = [
  {
    id: "p1",
    slug: "classic-350-reborn-chain-sprocket-kit",
    oem: "570547/C",
    batch: "Batch 2024.12",
    tag: "Genuine RE",
    name: "Classic 350 Reborn Chain Sprocket Kit",
    headline: "Royal Enfield Classic 350 Chain Sprocket Kit",
    sub: "520 Pitch X-Ring · Rolon OE Heavy Duty Spec · Induction Hardened SCM420/C45",
    fits: "Fits: Classic 350 Reborn (2021+)",
    description: "Full factory transmission overhaul pack comprising 15T countershaft pinion, 42T induction-hardened rear ring gear, and prefabricated 104-link continuous pitch sealed chain.",
    price: 2850,
    mrp: 3200,
    discountPct: 11,
    saveAmount: 350,
    taxNote: "Inclusive of all GST & factory handling. Invoice with input tax credit available.",
    gstAmount: 434.74,
    stock: "Bangalore Hub",
    stockUnits: 14,
    stockShort: "In stock",
    img: "/images/classic-350-chain-sprocket.webp",
    gallery: [
      { label: "360° View", src: "/images/classic-350-chain-sprocket.webp", is360: true },
      { label: "15T Front Box", src: "/images/chain-sprocket.jpg" },
      { label: "42T Rear Disc", src: "/images/clutch-rotor.webp" },
      { label: "RE Sealed Box", src: "/images/chasis-body.webp" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Classic 350", href: "/#finder" },
      { label: "Transmission", href: "/categories" },
      { label: "570547/C", href: "/parts/p1" },
    ],
    matchedBike: {
      name: "Classic 350 Reborn (J-1D Series)",
      chassis: "Chassis Frame J1D — MY 2021 through 2025 · Bullet, Classic...",
      matchPct: "100% MATCH",
      engine: "J-Series 349cc SOHC",
    },
    microfiche: {
      diagramCode: "Chassis Diagram J1D-FIG-14 (Final Drive)",
      diagramSub: "EXPLODED VIEW: FIG 14D (CHAIN) & FIG 14E (SPROCKET REAR)",
      schematicType: "chain-sprocket",
      scale: "Scale: 1:1 OEM",
      hotspots: [
        { id: "1", label: "Front Countershaft Pinion (15T)", x: 26, y: 56, spec: "SCM420 Chromoly · 45 Nm" },
        { id: "2", label: "520 X-Ring Sealed Chain (104 Links)", x: 50, y: 32, spec: "38.2 kN Tensile · Gold Zinc Plated" },
        { id: "3", label: "Rear Drive Sprocket (42T)", x: 74, y: 56, spec: "Induction Hardened C45 · 32 Nm" },
      ],
      torqueStandards: [
        { component: "Rear Axle Nut (M18)", metric: "70 Nm", imperial: "51.6 ft-lb", note: "Requires Loctite 243 threadlocker" },
        { component: "Countershaft Nut (M20)", metric: "45 Nm", imperial: "33.2 ft-lb", note: "Stake washer tab down firmly" },
        { component: "Rear Sprocket Studs (M10)", metric: "32 Nm", imperial: "23.6 ft-lb", note: "Cross-pattern sequence (Star)" },
        { component: "Recommended Chain Slack", metric: "25–30 mm", imperial: "1.0–1.2 in", note: "Check midway on lower run" },
      ],
      serviceAlert: "Always replace the front sprocket lock washer after removal. Never reuse flattened washers.",
    },
    compatibility: [
      { model: "Classic 350 Reborn", years: "2021 – 2025", engine: "J-Series 349cc SOHC", ratio: "15T / 42T (2.80)", status: "direct-fit", badge: "Guaranteed Direct Fit" },
      { model: "Meteor 350 (Fireball / Stellar / Supernova)", years: "2020 – 2025", engine: "J-Series 349cc SOHC", ratio: "15T / 42T (2.80)", status: "direct-fit", badge: "Guaranteed Direct Fit" },
      { model: "Hunter 350 (Retro / Metro)", years: "2022 – 2025", engine: "J-Series 349cc SOHC", ratio: "15T / 42T (2.80)", status: "compatible", badge: "Verified Compatible" },
      { model: "Classic 350 UCE Pushrod (Pre-2021)", years: "2009 – 2020", engine: "UCE Twinspark 4S", ratio: "16T / 38T (530 Pitch)", status: "incompatible", badge: "Incompatible (Older Platform)" },
    ],
    specs: [
      { label: "Chain Specification", value: "520 Pitch X-Ring Sealed Heavy Duty" },
      { label: "Link Configuration", value: "104 Links (Riveted Master Type)" },
      { label: "Engine Sprocket (Front)", value: "15 Teeth · SCM420 Chromoly Alloy" },
      { label: "Rear Drive Sprocket", value: "42 Teeth · High-Carbon C45 Steel" },
      { label: "Tensile Strength", value: "38.2 kN (8,587 lbf)" },
      { label: "Metallurgy & Finish", value: "Induction Heat Hardened & Gold Zinc Plating" },
      { label: "Kit Packaging", value: "Sealed OEM Tamper-Proof Box" },
      { label: "Factory Net Weight", value: "2,420 grams" },
    ],
    packageContents: [
      { index: "01", name: "Rear Drive Sprocket (42T)", qty: "1 unit", spec: "P/N: 570547-R · Black Phosphate Finish" },
      { index: "02", name: "Countershaft Front Pinion (15T)", qty: "1 unit", spec: "P/N: 570547-F · Case Carburized" },
      { index: "03", name: "X-Ring Sealed Drive Chain 520 x 104L", qty: "1 unit", spec: "Pre-waxed high viscosity grease filled" },
      { index: "04", name: "Master Rivet Link & Cotter Safety Clip", qty: "1 set", spec: "Pair of grease sachets & quad O-rings" },
      { index: "05", name: "Official Setup & Tension Manual Card", qty: "1 pack", spec: "2-Year / 25,000 KM Royal Enfield Equipment Warranty" },
    ],
    bundle: {
      title: "Essential Driveline Maintenance",
      subtitle: "Frequently Bought Together with Kit # 570547/C",
      discountText: "Save ₹159",
      bundleSavings: 159,
      items: [
        { id: "b1", name: "Rear Hub Cush Rubber Damper Set", oem: "594218/A", price: 320, img: "/images/clutch-rotor.webp", checked: true },
        { id: "b2", name: "Motul C1 Cleaner + C2 Chain Lube Gel Pack", oem: "MOTUL-CL-100", price: 499, img: "/images/chain-sprocket.jpg", checked: true },
      ],
    },
    reviews: {
      rating: 4.9,
      totalReviews: 182,
      distribution: [
        { stars: 5, pct: 92 },
        { stars: 4, pct: 7 },
        { stars: 3, pct: 1 },
        { stars: 2, pct: 0 },
        { stars: 1, pct: 0 },
      ],
      items: [
        {
          author: "Rakesh Sharma",
          role: "Certified RE Master Tech",
          city: "Bengaluru",
          rating: 5,
          date: "2 days ago",
          headline: "OEM Genuine Rolon Factory Crate Overhauls J-Series Transmission Drive",
          content: "Replaced at 24,000 km on a 2022 Reborn that toured Leh. Factory sprocket pitch is spot-on. Zero chatter after 500 km bed-in period. Fast dispatch directly to our shop.",
        },
        {
          author: "Vikramaditya Singh",
          role: "Workshop Lead",
          city: "Pune",
          rating: 5,
          date: "1 week ago",
          headline: "Stocked for state-wide overnight in Pune. Fitted dozens free",
          content: "Solid factory kit. The master link sets securely with a standard rivet tool. No kinks and perfect roller engagement across the 42T rear cog.",
        },
        {
          author: "Rahul Iyer",
          role: "Long Distance Touring Rider",
          city: "Mumbai",
          rating: 5,
          date: "3 weeks ago",
          headline: "Completed 5,000 km Ladakh circuit after install, zero stretch",
          content: "Fitted this just right before my Spiti and Ladakh expedition. Chain retained its initial factory tension across 5,000 km without requiring mid-ride adjustment.",
        },
      ],
    },
    manual: {
      title: "Need factory mechanical service notes?",
      desc: "Download official Royal Enfield Workshop Manual Section 07 (Drive Train, PDF · 2.4 MB)",
      file: "RE-Workshop-Manual-Section-07-FinalDrive.pdf",
      size: "2.4 MB",
    },
  },
  {
    id: "p2",
    slug: "bybre-front-sintered-brake-pad-set",
    oem: "888421/B",
    batch: "Batch 2024.11",
    tag: "Spare OEM",
    name: "ByBre Front Sintered Brake Pad Set (Twin Caliper)",
    headline: "Royal Enfield ByBre Front Sintered Brake Pad Set",
    sub: "Twin Caliper Sintered Spec · High Thermal Dissipation · OE Anti-Rattle Shim Kit",
    fits: "Fits: Interceptor & Continental GT (2018–2025)",
    description: "Official Brembo ByBre factory sintered brake pad set designed for high thermal stability and aggressive initial bite on 320mm front floating rotors.",
    price: 1120,
    mrp: 1450,
    discountPct: 22,
    saveAmount: 330,
    taxNote: "Inclusive of all GST & factory handling. Invoice with input tax credit available.",
    gstAmount: 170.85,
    stock: "Ready Dispatch",
    stockUnits: 28,
    stockShort: "In stock",
    img: "/images/brakepad-interceptor.png",
    gallery: [
      { label: "Brake Pad Front", src: "/images/brakepad-interceptor.png", is360: true },
      { label: "Friction Surface", src: "/images/brakes-fluid.jpg" },
      { label: "Twin Caliper View", src: "/images/interceptor-650.avif" },
      { label: "Anti-Rattle Shim", src: "/images/chasis-body.webp" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "650 Twins", href: "/#finder" },
      { label: "Braking & Hydraulics", href: "/categories" },
      { label: "888421/B", href: "/parts/p2" },
    ],
    matchedBike: {
      name: "Interceptor 650 (Twin Cylinder)",
      chassis: "Chassis Frame P-650 — MY 2018 through 2025",
      matchPct: "100% MATCH",
      engine: "648cc Parallel Twin SOHC",
    },
    microfiche: {
      diagramCode: "Chassis Diagram 650-FIG-08 (Braking System)",
      diagramSub: "EXPLODED VIEW: FIG 08A (BYBRE DUAL CALIPER) & ROTOR",
      schematicType: "brake-pads",
      scale: "Scale: 1:1 OEM",
      hotspots: [
        { id: "1", label: "ByBre Caliper Mounting Bolts (M10)", x: 28, y: 44, spec: "Forged Alloy · 35 Nm Torque" },
        { id: "2", label: "Sintered Friction Pad Pair", x: 50, y: 52, spec: "High Friction Co-efficient 0.48μ" },
        { id: "3", label: "Stainless Anti-Rattle Guide Pin", x: 72, y: 38, spec: "Slide Pin · 18 Nm Torque" },
      ],
      torqueStandards: [
        { component: "Caliper Mounting Bolts (M10)", metric: "35 Nm", imperial: "25.8 ft-lb", note: "Factory medium blue threadlocker" },
        { component: "Brake Pad Retaining Pin", metric: "18 Nm", imperial: "13.2 ft-lb", note: "Clean guide clips with brake cleaner" },
        { component: "Brake Bleeder Valve (M8)", metric: "8 Nm", imperial: "5.9 ft-lb", note: "Do not overtighten brass nipple" },
        { component: "Rotor Disc Fasteners (M8)", metric: "24 Nm", imperial: "17.7 ft-lb", note: "Cross-pattern with red threadlocker" },
      ],
      serviceAlert: "Ensure brake fluid reservoir cap is loosened before retracting dual pistons with an approved plastic caliper spreader.",
    },
    compatibility: [
      { model: "Interceptor 650", years: "2018 – 2025", engine: "648cc Parallel Twin", ratio: "320mm Front Rotor", status: "direct-fit", badge: "Guaranteed Direct Fit" },
      { model: "Continental GT 650", years: "2018 – 2025", engine: "648cc Parallel Twin", ratio: "320mm Front Rotor", status: "direct-fit", badge: "Guaranteed Direct Fit" },
      { model: "Super Meteor 650", years: "2023 – 2025", engine: "648cc Parallel Twin", ratio: "320mm Front Rotor", status: "compatible", badge: "Verified Compatible" },
      { model: "Classic 350 Reborn", years: "2021 – 2025", engine: "349cc Single", ratio: "300mm Single Disc", status: "incompatible", badge: "Incompatible (Single Caliper)" },
    ],
    specs: [
      { label: "Compound", value: "Full Metallic Sintered Bronze Matrix" },
      { label: "Operating Temperature", value: "-20°C to 650°C fade-free" },
      { label: "Friction Rating", value: "HH High Coefficient (ECE R90 Certified)" },
      { label: "Backing Plate", value: "Laser-cut 4mm High Tensile Steel" },
      { label: "Shims Included", value: "Dual Perforated Anti-Squeal Stainless Shims" },
      { label: "Wear Indicator", value: "Central Acoustic & Visual Groove Line" },
      { label: "Package Net Weight", value: "480 grams" },
    ],
    packageContents: [
      { index: "01", name: "Front Inboard Sintered Pad", qty: "1 unit", spec: "P/N: 888421-IN · OEM Friction Material" },
      { index: "02", name: "Front Outboard Sintered Pad", qty: "1 unit", spec: "P/N: 888421-OUT · With Chamfered Edges" },
      { index: "03", name: "Anti-Rattle Spring Clip", qty: "1 set", spec: "Stainless Spring Steel OE Spec" },
      { index: "04", name: "Caliper Slide Pin Retaining Cotter", qty: "2 units", spec: "Cadmium Plated" },
    ],
    bundle: {
      title: "Front Brake System Overhaul Pack",
      subtitle: "Frequently Bought Together with Kit # 888421/B",
      discountText: "Save ₹120",
      bundleSavings: 120,
      items: [
        { id: "b3", name: "DOT 4 High Temp Hydraulic Brake Fluid (250ml)", oem: "582014/D", price: 290, img: "/images/brakes-fluid.jpg", checked: true },
        { id: "b4", name: "OEM Brake Caliper Rubber Dust Boot Kit", oem: "782019/K", price: 340, img: "/images/brakepad-interceptor.png", checked: true },
      ],
    },
    reviews: {
      rating: 4.8,
      totalReviews: 124,
      distribution: [
        { stars: 5, pct: 89 },
        { stars: 4, pct: 9 },
        { stars: 3, pct: 2 },
        { stars: 2, pct: 0 },
        { stars: 1, pct: 0 },
      ],
      items: [
        {
          author: "Anand Murthy",
          role: "Track & Highway Rider",
          city: "Chennai",
          rating: 5,
          date: "4 days ago",
          headline: "Immediate stopping bite on my Continental GT 650",
          content: "Replaced stock organic pads with this sintered set. Noticeable reduction in lever travel and zero fade coming down Kolli Hills ghat sections.",
        },
        {
          author: "Karthik Subramanian",
          role: "Independent Royal Enfield Specialist",
          city: "Coimbatore",
          rating: 5,
          date: "2 weeks ago",
          headline: "Original ByBre blister packaging with tamper seals intact",
          content: "Fits directly into the ByBre dual pot caliper without sanding or tweaking. Rotor contact pattern is clean and uniform.",
        },
      ],
    },
    manual: {
      title: "Need factory mechanical service notes?",
      desc: "Download official Royal Enfield Workshop Manual Section 04 (Front Braking System, PDF · 1.8 MB)",
      file: "RE-Workshop-Manual-Section-04-Brakes.pdf",
      size: "1.8 MB",
    },
  },
  {
    id: "p3",
    slug: "sherpa-450-engine-oil-filter-cartridge",
    oem: "594012/A",
    batch: "Batch 2024.12",
    tag: "Genuine RE",
    name: "Sherpa 450 Engine Oil Filter Cartridge",
    headline: "Royal Enfield Himalayan 450 Sherpa Oil Filter Cartridge",
    sub: "Micron Pleated Cellulose Core · Viton High-Temp O-Ring · OEM Bypass Valve",
    fits: "Fits: Himalayan 450 (2023+)",
    description: "Factory OEM oil filter cartridge engineered exclusively for the high-compression liquid-cooled Sherpa 450 DOHC engine. Ensures 99.4% particulate trap efficiency at 20 microns.",
    price: 340,
    mrp: 399,
    discountPct: 15,
    saveAmount: 59,
    taxNote: "Inclusive of all GST & factory handling. Invoice with input tax credit available.",
    gstAmount: 51.86,
    stock: "300+ units",
    stockUnits: 340,
    stockShort: "In stock",
    img: "/images/sherpa-450-oil-filter.jpg",
    gallery: [
      { label: "Filter Core", src: "/images/sherpa-450-oil-filter.jpg", is360: true },
      { label: "Engine Sump Area", src: "/images/engine-filters.jpg" },
      { label: "Himalayan 450", src: "/images/himalayan-450.avif" },
      { label: "Viton O-Ring", src: "/images/chasis-body.webp" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Himalayan 450", href: "/#finder" },
      { label: "Engine & Filters", href: "/categories" },
      { label: "594012/A", href: "/parts/p3" },
    ],
    matchedBike: {
      name: "Himalayan 450 (Sherpa Engine)",
      chassis: "Chassis Frame H-452 — MY 2023 through 2025",
      matchPct: "100% MATCH",
      engine: "452cc Liquid-Cooled Sherpa DOHC",
    },
    microfiche: {
      diagramCode: "Engine Diagram H450-FIG-02 (Lubrication & Sump)",
      diagramSub: "EXPLODED VIEW: FIG 02B (OIL FILTER COVER & BYPASS VALVE)",
      schematicType: "oil-filter",
      scale: "Scale: 1:1 OEM",
      hotspots: [
        { id: "1", label: "Filter Chamber Cap Bolts (3x M6)", x: 30, y: 40, spec: "Hex Socket · 10 Nm Torque" },
        { id: "2", label: "20-Micron Pleated Cellulose Filter", x: 50, y: 52, spec: "Internal Reinforced Metal Cage" },
        { id: "3", label: "Viton Seal Ring & Inner Return Spring", x: 70, y: 45, spec: "Temperature resistant up to 180°C" },
      ],
      torqueStandards: [
        { component: "Oil Filter Cover Bolts (M6)", metric: "10 Nm", imperial: "7.4 ft-lb", note: "Even tightening order across 3 bolts" },
        { component: "Main Sump Drain Bolt (M12)", metric: "20 Nm", imperial: "14.7 ft-lb", note: "Always fit new copper crush washer" },
        { component: "Secondary Strainer Plug (M14)", metric: "15 Nm", imperial: "11.1 ft-lb", note: "Clean magnetic tip with solvent" },
        { component: "Engine Oil Capacity", metric: "2.1 Litres", imperial: "2.22 qt", note: "SAE 10W-40 JASO MA2 Full Synthetic" },
      ],
      serviceAlert: "Position filter with the rubber grommet facing inward toward the crankcase oil supply gallery. Do not reverse direction.",
    },
    compatibility: [
      { model: "Himalayan 450 (Base / Pass / Summit)", years: "2023 – 2025", engine: "452cc Sherpa DOHC", ratio: "Liquid-Cooled Sump", status: "direct-fit", badge: "Guaranteed Direct Fit" },
      { model: "Guerrilla 450", years: "2024 – 2025", engine: "452cc Sherpa DOHC", ratio: "Liquid-Cooled Sump", status: "direct-fit", badge: "Guaranteed Direct Fit" },
      { model: "Himalayan 411 (LS410)", years: "2016 – 2023", engine: "411cc LS410 Air-Cooled", ratio: "Air-Cooled Spin-on", status: "incompatible", badge: "Incompatible (LS410 Engine)" },
      { model: "Scram 411", years: "2022 – 2024", engine: "411cc LS410 Air-Cooled", ratio: "Air-Cooled Spin-on", status: "incompatible", badge: "Incompatible (LS410 Engine)" },
    ],
    specs: [
      { label: "Filtration Rating", value: "20 Micron High-Efficiency Synthetic Blend" },
      { label: "Gasket Material", value: "Fluorocarbon (Viton) High Chemical Resistance" },
      { label: "Bypass Valve Setting", value: "1.2 Bar Differential Opening Pressure" },
      { label: "Burst Strength", value: "14.5 Bar Internal Hydraulic Threshold" },
      { label: "Replacement Interval", value: "Every 10,000 km or 12 months" },
      { label: "Net Weight", value: "115 grams" },
    ],
    packageContents: [
      { index: "01", name: "Sherpa 450 Filter Cartridge", qty: "1 unit", spec: "P/N: 594012/A · Sealed in foil wrapper" },
      { index: "02", name: "OEM Viton Outer Chamber O-Ring", qty: "1 unit", spec: "High temperature synthetic elastomeric" },
      { index: "03", name: "Copper Sump Drain Crush Gasket", qty: "1 unit", spec: "12mm ID Annealed Copper" },
    ],
    bundle: {
      title: "Periodic Service Maintenance Kit",
      subtitle: "Frequently Bought Together with Cartridge # 594012/A",
      discountText: "Save ₹80",
      bundleSavings: 80,
      items: [
        { id: "b5", name: "High-Flow Pleated Air Filter Element", oem: "594102/B", price: 680, img: "/images/engine-filters.jpg", checked: true },
        { id: "b6", name: "OEM Magnetic Sump Plug & Copper Washer", oem: "571092/S", price: 210, img: "/images/sherpa-450-oil-filter.jpg", checked: true },
      ],
    },
    reviews: {
      rating: 4.9,
      totalReviews: 86,
      distribution: [
        { stars: 5, pct: 95 },
        { stars: 4, pct: 4 },
        { stars: 3, pct: 1 },
        { stars: 2, pct: 0 },
        { stars: 1, pct: 0 },
      ],
      items: [
        {
          author: "Siddharth Verma",
          role: "Adv Tourer & Himalayan Rider",
          city: "Dehradun",
          rating: 5,
          date: "1 day ago",
          headline: "Essential replacement for 10,000 km mountain interval",
          content: "The liquid cooled Sherpa engine demands high oil flow. Genuine filter pleats did not collapse under pressure. Came with the replacement O-ring.",
        },
      ],
    },
    manual: {
      title: "Need factory mechanical service notes?",
      desc: "Download official Royal Enfield Workshop Manual Section 02 (Sherpa 450 Lubrication, PDF · 1.5 MB)",
      file: "RE-Workshop-Manual-Section-02-SherpaLubrication.pdf",
      size: "1.5 MB",
    },
  },
  {
    id: "p4",
    slug: "oem-teflon-coated-clutch-cable-assembly",
    oem: "150418/E",
    batch: "Batch 2024.10",
    tag: "Spare OEM",
    name: "OEM Teflon Coated Clutch Cable Assembly",
    headline: "Royal Enfield Hunter & Meteor 350 Clutch Cable Assembly",
    sub: "Friction-Free PTFE Liner · Stainless Wound Inner Core · Factory Molded Weather Boots",
    fits: "Fits: Hunter 350 / Meteor 350",
    description: "Official factory replacement clutch cable featuring full-length fluoropolymer (PTFE) inner lining for up to 35% reduced lever pull effort and zero binding in traffic.",
    price: 490,
    mrp: 620,
    discountPct: 21,
    saveAmount: 130,
    taxNote: "Inclusive of all GST & factory handling. Invoice with input tax credit available.",
    gstAmount: 74.74,
    stock: "Bangalore Hub",
    stockUnits: 55,
    stockShort: "In stock",
    img: "/images/hunter350-clutch-cable.webp",
    gallery: [
      { label: "Cable Assembly", src: "/images/hunter350-clutch-cable.webp", is360: true },
      { label: "PTFE Sheath", src: "/images/cable-levers.jpg" },
      { label: "Hunter 350", src: "/images/hunter-350.avif" },
      { label: "End Barrel Fitting", src: "/images/chasis-body.webp" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Hunter 350", href: "/#finder" },
      { label: "Cables & Controls", href: "/categories" },
      { label: "150418/E", href: "/parts/p4" },
    ],
    matchedBike: {
      name: "Hunter 350 (Retro & Metro)",
      chassis: "Chassis Frame J-HNTR — MY 2022 through 2025",
      matchPct: "100% MATCH",
      engine: "J-Series 349cc SOHC",
    },
    microfiche: {
      diagramCode: "Chassis Diagram J1-FIG-05 (Handlebar & Cables)",
      diagramSub: "EXPLODED VIEW: FIG 05C (CLUTCH LEVER PERCH & ACTUATOR ARM)",
      schematicType: "clutch-cable",
      scale: "Scale: 1:1 OEM",
      hotspots: [
        { id: "1", label: "Handlebar Lever Barrel End", x: 25, y: 35, spec: "Zinc Molded Barrel With Nylon Bush" },
        { id: "2", label: "PTFE Flexible Armor Conduit", x: 50, y: 50, spec: "Low Friction Self-Lubricating Liner" },
        { id: "3", label: "Engine Actuator Arm Bracket (M8)", x: 75, y: 65, spec: "Dual Locknuts · 12 Nm Torque" },
      ],
      torqueStandards: [
        { component: "Engine Cable Bracket Locknut (M8)", metric: "12 Nm", imperial: "8.8 ft-lb", note: "Adjust for 2–3mm free play at lever" },
        { component: "Clutch Perch Clamp Screw (M6)", metric: "7 Nm", imperial: "5.1 ft-lb", note: "Tighten upper bolt first, then lower" },
        { component: "Recommended Lever Freeplay", metric: "2–3 mm", imperial: "0.08–0.12 in", note: "Measure at ball end before tensioning" },
      ],
      serviceAlert: "Never inject petro-chemical lubricants into PTFE lined cables as it degrades the internal polymer sleeve.",
    },
    compatibility: [
      { model: "Hunter 350 (Retro / Metro)", years: "2022 – 2025", engine: "J-Series 349cc SOHC", ratio: "Compact Bar Sweep", status: "direct-fit", badge: "Guaranteed Direct Fit" },
      { model: "Meteor 350", years: "2020 – 2025", engine: "J-Series 349cc SOHC", ratio: "Standard Routing", status: "direct-fit", badge: "Guaranteed Direct Fit" },
      { model: "Classic 350 Reborn", years: "2021 – 2025", engine: "J-Series 349cc SOHC", ratio: "Higher Bar Rise (+25mm)", status: "compatible", badge: "Verified Compatible (Route Check)" },
      { model: "Himalayan 450", years: "2023 – 2025", engine: "Sherpa 452cc", ratio: "Different Actuator Arm", status: "incompatible", badge: "Incompatible (Cable Length)" },
    ],
    specs: [
      { label: "Inner Wire Material", value: "Multi-Strand Flexible Stainless Steel (7x7)" },
      { label: "Outer Conduit", value: "Flat-wound tempered steel with PVC jacket" },
      { label: "Inner Liner", value: "Extruded Teflon (PTFE) low-friction sleeve" },
      { label: "Overall Length", value: "1,140 mm ± 3mm" },
      { label: "Free Stroke Travel", value: "62 mm travel range" },
      { label: "Weather Sealing", value: "NBR Rubber Accordion Boot at Engine End" },
      { label: "Net Weight", value: "210 grams" },
    ],
    packageContents: [
      { index: "01", name: "Clutch Cable Assembly", qty: "1 unit", spec: "P/N: 150418/E · Pre-adjusted with locknuts" },
      { index: "02", name: "Rubber Dust Seal Boot", qty: "1 unit", spec: "Molded NBR Weather Seal" },
      { index: "03", name: "Lever Pivot Nylon Bushing", qty: "1 unit", spec: "Low-friction bearing collar" },
    ],
    bundle: {
      title: "Control System Overhaul Pack",
      subtitle: "Frequently Bought Together with Cable # 150418/E",
      discountText: "Save ₹95",
      bundleSavings: 95,
      items: [
        { id: "b7", name: "Forged Alloy Ergonomic Clutch Lever", oem: "150390/A", price: 380, img: "/images/cable-levers.jpg", checked: true },
        { id: "b8", name: "Dual Throttle Cable Assembly (Push-Pull)", oem: "150422/A", price: 540, img: "/images/hunter350-clutch-cable.webp", checked: true },
      ],
    },
    reviews: {
      rating: 4.9,
      totalReviews: 64,
      distribution: [
        { stars: 5, pct: 94 },
        { stars: 4, pct: 5 },
        { stars: 3, pct: 1 },
        { stars: 2, pct: 0 },
        { stars: 1, pct: 0 },
      ],
      items: [
        {
          author: "Deepak Menon",
          role: "City Commuter & Hunter Rider",
          city: "Bengaluru",
          rating: 5,
          date: "5 days ago",
          headline: "Clutch feel transformed from stiff to featherlight",
          content: "Installed this after my stock cable started fraying at the lever barrel. Clutch pull is significantly lighter in Bangalore traffic. 10/10 fitment.",
        },
      ],
    },
    manual: {
      title: "Need factory mechanical service notes?",
      desc: "Download official Royal Enfield Workshop Manual Section 05 (Controls & Cables, PDF · 1.2 MB)",
      file: "RE-Workshop-Manual-Section-05-Cables.pdf",
      size: "1.2 MB",
    },
  },
];

export function getPartByIdOrSlug(identifier: string): Part | undefined {
  if (!identifier) return undefined;
  const clean = decodeURIComponent(identifier).trim().toLowerCase();
  
  return parts.find((p) => {
    return (
      p.id.toLowerCase() === clean ||
      p.slug.toLowerCase() === clean ||
      p.oem.toLowerCase() === clean ||
      p.oem.toLowerCase().replace(/[\/\-_]/g, "") === clean.replace(/[\/\-_]/g, "") ||
      p.slug.toLowerCase().replace(/[^a-z0-9]/g, "") === clean.replace(/[^a-z0-9]/g, "")
    );
  }) ?? parts[0]; // fallback to first part if not found
}

export const articles = [
  {
    kind: "Engineering Whitepaper · 12 min read",
    title: "Decoding the J-Series 349cc Engine: Architecture, Oil Circuitry & Valve Tolerances",
    body: "A mechanical breakdown of Royal Enfield's counterbalanced single: metallurgy, high-pressure galleries, and critical service tolerances.",
    cta: "Read full protocol",
    img: "/images/classic-350.avif",
  },
  {
    kind: "Catalog architecture · 6 min read",
    title: "Understanding Royal Enfield OEM part numbering & microfiche schemes",
    body: "Decode prefixes, letter revisions (/A, /C, /E), and sub-assembly trees to match your chassis was assembled with at Oragadam.",
    cta: "Read catalog guide",
    img: "/images/continental-gt-650.avif",
  },
  {
    kind: "Service protocol · 5 min read",
    title: "Chain tensioning & sprocket maintenance interval guide for J-Series engines",
    body: "Recommended slack measurements (25–30mm), rear axle nut torque specs (70 Nm), and inspection parameters before long touring legs.",
    cta: "Read service guide",
    img: "/images/chain-sprocket.jpg",
  },
];

export const footerCols = [
  { title: "Shop by motorcycle", links: ["Interceptor 650", "Continental GT 650", "Himalayan 450 / 411", "Classic 350 (Reborn)", "Bullet 350", "Hunter 350"] },
  { title: "Spare parts", links: ["Engine & Transmission", "Braking & Hydraulics", "Electrical & ECU", "Suspension & Chassis", "Periodic Service Kits"] },
  { title: "Navigation", links: ["Categories Catalog", "OEM Part Schematics", "VIN Decoder", "Technical Manuals", "Torque Spec Sheets"] },
  { title: "Logistics", links: ["PIN Code Delivery", "Shipping & Courier SLAs", "Authenticity Guarantee", "Hassle-Free Returns"] },
  { title: "Support", links: ["Contact Desk", "Workshop Support", "Track Order", "FAQ"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "OEM Compliance"] },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export interface BikeSpecItem {
  label: string;
  value: string;
}

export interface BikeAssembly {
  id: string;
  name: string;
  count: number;
}

export interface BikeDetail {
  slug: string;
  name: string;
  sub: string;
  years: string;
  platform: string;
  platformTag: string;
  garageSync: string;
  schematicRev: string;
  depotStock: string;
  title: string;
  subtitle: string;
  specs: BikeSpecItem[];
  watermark: string;
  assemblies: BikeAssembly[];
  img: string;
}

export interface CatalogPartItem {
  id: string;
  partId: string;
  oem: string;
  tag: string;
  tagType: "sealed" | "high-wear" | "bybre" | "low-stock" | "endurance" | "service" | "spec";
  name: string;
  specLabel: string;
  description: string;
  fitmentLabel: string;
  price: number;
  mrp: number;
  discountPct: number;
  stockText: string;
  stockDepot: string;
  isQuickShip: boolean;
  assembly: "transmission" | "engine" | "brakes" | "electrical" | "suspension";
  brand: "Royal Enfield Genuine" | "Rolon Chain Co." | "ByBre (Brembo India)" | "Endurance Engineering" | "Bosch Automotive";
  trimEditions: string[];
  img: string;
}

export const bikeDetails: Record<string, BikeDetail> = {
  "classic-350": {
    slug: "classic-350",
    name: "Classic 350 Reborn",
    sub: "Reborn · J-Series",
    years: "2021–2025",
    platform: "J1D REBORN (2021–2025)",
    platformTag: "J-Platform",
    garageSync: "KA-01-MJ-4520 (Halcyon Black)",
    schematicRev: "FACTORY SCHEMATIC REV: 2024.11",
    depotStock: "DEPOT STOCK: BENGALURU AIR-CARGO",
    title: "Classic 350 Reborn (2021–Present)",
    subtitle:
      "J-Series 349cc SOHC Counterbalanced Platform. Complete factory-stamped mechanical, electrical, and chassis components with certified workshop tolerances.",
    specs: [
      { label: "CHASSIS ARCHITECTURE", value: "J1D Twin Downtube Spine" },
      { label: "GEARBOX CONFIGURATION", value: "5-Speed Constant Mesh" },
      { label: "INDUCTION & SENSE", value: "Bosch EMS EFI + 42mm TB" },
      { label: "FRONT BRAKE NO.", value: "ByBre 300mm Disc (Dual ABS)" },
    ],
    watermark: "J1D-349",
    assemblies: [
      { id: "all", name: "All Components", count: 48 },
      { id: "transmission", name: "Transmission & Final Drive", count: 14 },
      { id: "engine", name: "Engine & Crankcase", count: 38 },
      { id: "brakes", name: "Brakes & Master Cylinder", count: 24 },
      { id: "electrical", name: "Electrical & Ignition", count: 19 },
      { id: "suspension", name: "Suspension & Steering", count: 16 },
    ],
    img: "/images/classic-350.avif",
  },
  "bullet-350": {
    slug: "bullet-350",
    name: "Bullet 350",
    sub: "Standard & Military",
    years: "1996–2025",
    platform: "J-SERIES BULLET (2023–2025)",
    platformTag: "J-Platform",
    garageSync: "DL-03-CB-1901 (Military Black)",
    schematicRev: "FACTORY SCHEMATIC REV: 2024.10",
    depotStock: "DEPOT STOCK: DELHI NCR AIR-DEPOT",
    title: "Bullet 350 (Standard & Military)",
    subtitle:
      "Timeless hand-pinstriped tank platform with modern J-Series powertrain. Factory authorized parts catalog with full vintage & contemporary schematics.",
    specs: [
      { label: "CHASSIS ARCHITECTURE", value: "Twin Downtube Cradle" },
      { label: "GEARBOX CONFIGURATION", value: "5-Speed Constant Mesh" },
      { label: "INDUCTION & SENSE", value: "Electronic Fuel Injection" },
      { label: "FRONT BRAKE NO.", value: "ByBre 300mm Single/Dual ABS" },
    ],
    watermark: "BLT-349",
    assemblies: [
      { id: "all", name: "All Components", count: 42 },
      { id: "transmission", name: "Transmission & Final Drive", count: 12 },
      { id: "engine", name: "Engine & Crankcase", count: 34 },
      { id: "brakes", name: "Brakes & Master Cylinder", count: 20 },
      { id: "electrical", name: "Electrical & Ignition", count: 16 },
      { id: "suspension", name: "Suspension & Steering", count: 14 },
    ],
    img: "/images/bullet-350.avif",
  },
  "hunter-350": {
    slug: "hunter-350",
    name: "Hunter 350",
    sub: "Retro & Metro",
    years: "2022–2025",
    platform: "J-HNTR ROADSTER (2022–2025)",
    platformTag: "J-Platform",
    garageSync: "MH-02-HN-3502 (Dapper Ash)",
    schematicRev: "FACTORY SCHEMATIC REV: 2024.12",
    depotStock: "DEPOT STOCK: MUMBAI AIR CARGO",
    title: "Hunter 350 (Retro & Metro)",
    subtitle:
      "Agile urban roadster platform with compact 17-inch cast architecture, aggressive steering rake, and quick-shifting J-Series driveline.",
    specs: [
      { label: "CHASSIS ARCHITECTURE", value: "Compact Twin Downtube Spine" },
      { label: "GEARBOX CONFIGURATION", value: "5-Speed Constant Mesh" },
      { label: "INDUCTION & SENSE", value: "Bosch EFI System" },
      { label: "FRONT BRAKE NO.", value: "ByBre 300mm Floating Caliper" },
    ],
    watermark: "HNTR-349",
    assemblies: [
      { id: "all", name: "All Components", count: 39 },
      { id: "transmission", name: "Transmission & Final Drive", count: 11 },
      { id: "engine", name: "Engine & Crankcase", count: 30 },
      { id: "brakes", name: "Brakes & Master Cylinder", count: 18 },
      { id: "electrical", name: "Electrical & Ignition", count: 15 },
      { id: "suspension", name: "Suspension & Steering", count: 12 },
    ],
    img: "/images/hunter-350.avif",
  },
  "himalayan-450": {
    slug: "himalayan-450",
    name: "Himalayan 450",
    sub: "Base / Pass / Summit",
    years: "2023–2025",
    platform: "H-452 SHERPA DOHC (2023–2025)",
    platformTag: "Sherpa DOHC",
    garageSync: "KA-04-HM-4520 (Kamet White)",
    schematicRev: "FACTORY SCHEMATIC REV: 2024.12",
    depotStock: "DEPOT STOCK: BENGALURU AIR-CARGO",
    title: "Himalayan 450 (Base / Pass / Summit)",
    subtitle:
      "High-output liquid-cooled 452cc DOHC Sherpa platform with 43mm Showa USD forks and ride-by-wire electronic throttle architecture.",
    specs: [
      { label: "CHASSIS ARCHITECTURE", value: "Twin-Spar Steel Tubular" },
      { label: "GEARBOX CONFIGURATION", value: "6-Speed with Assist & Slipper" },
      { label: "INDUCTION & SENSE", value: "Ride-by-Wire 42mm Throttle Body" },
      { label: "FRONT BRAKE NO.", value: "ByBre 320mm Disc (Switchable ABS)" },
    ],
    watermark: "SHERPA-452",
    assemblies: [
      { id: "all", name: "All Components", count: 54 },
      { id: "transmission", name: "Transmission & Final Drive", count: 15 },
      { id: "engine", name: "Engine & Crankcase", count: 42 },
      { id: "brakes", name: "Brakes & Master Cylinder", count: 26 },
      { id: "electrical", name: "Electrical & Ignition", count: 22 },
      { id: "suspension", name: "Suspension & Steering", count: 18 },
    ],
    img: "/images/himalayan-450.avif",
  },
  "interceptor-650": {
    slug: "interceptor-650",
    name: "Interceptor 650",
    sub: "Custom & Standard",
    years: "2018–2025",
    platform: "P-650 TWIN (2018–2025)",
    platformTag: "Parallel Twin",
    garageSync: "TN-09-IN-6500 (Baker Express)",
    schematicRev: "FACTORY SCHEMATIC REV: 2024.11",
    depotStock: "DEPOT STOCK: CHENNAI FACTORY HUB",
    title: "Interceptor 650 (Twin Cylinder)",
    subtitle:
      "Parallel twin 648cc counterbalanced 270-degree firing crank platform with Harris Performance chassis and oil-cooled twin radiators.",
    specs: [
      { label: "CHASSIS ARCHITECTURE", value: "Harris Double Cradle Tubular" },
      { label: "GEARBOX CONFIGURATION", value: "6-Speed Slipper Clutch" },
      { label: "INDUCTION & SENSE", value: "Bosch Dual Throttle Bodies" },
      { label: "FRONT BRAKE NO.", value: "ByBre 320mm Twin Caliper (ABS)" },
    ],
    watermark: "TWIN-648",
    assemblies: [
      { id: "all", name: "All Components", count: 52 },
      { id: "transmission", name: "Transmission & Final Drive", count: 16 },
      { id: "engine", name: "Engine & Crankcase", count: 39 },
      { id: "brakes", name: "Brakes & Master Cylinder", count: 28 },
      { id: "electrical", name: "Electrical & Ignition", count: 20 },
      { id: "suspension", name: "Suspension & Steering", count: 15 },
    ],
    img: "/images/interceptor-650.avif",
  },
  "continental-gt-650": {
    slug: "continental-gt-650",
    name: "Continental GT 650",
    sub: "Mr. Clean & British Green",
    years: "2018–2025",
    platform: "P-650 GT CAFE RACER (2018–2025)",
    platformTag: "Café Racer",
    garageSync: "KA-01-GT-6501 (Mr. Clean Chrome)",
    schematicRev: "FACTORY SCHEMATIC REV: 2024.11",
    depotStock: "DEPOT STOCK: BENGALURU AIR-CARGO",
    title: "Continental GT 650 (Mr. Clean & British Green)",
    subtitle:
      "Pure café racer ergonomics with clip-on bars, rear-set footpegs, and sculpted tank on the celebrated 648cc twin platform.",
    specs: [
      { label: "CHASSIS ARCHITECTURE", value: "Harris Performance Steel Frame" },
      { label: "GEARBOX CONFIGURATION", value: "6-Speed with Assist & Slipper" },
      { label: "INDUCTION & SENSE", value: "Dual Mikuni / Bosch EFI" },
      { label: "FRONT BRAKE NO.", value: "ByBre 320mm Floating Rotor" },
    ],
    watermark: "GT-648",
    assemblies: [
      { id: "all", name: "All Components", count: 49 },
      { id: "transmission", name: "Transmission & Final Drive", count: 14 },
      { id: "engine", name: "Engine & Crankcase", count: 36 },
      { id: "brakes", name: "Brakes & Master Cylinder", count: 26 },
      { id: "electrical", name: "Electrical & Ignition", count: 18 },
      { id: "suspension", name: "Suspension & Steering", count: 16 },
    ],
    img: "/images/continental-gt-650.avif",
  },
};

export function getBikeBySlug(slug: string): BikeDetail {
  const clean = decodeURIComponent(slug).trim().toLowerCase();
  return bikeDetails[clean] ?? bikeDetails["classic-350"];
}

export const bikeCatalogParts: CatalogPartItem[] = [
  {
    id: "cp1",
    partId: "p1",
    oem: "570547/C",
    tag: "SEALED OEM",
    tagType: "sealed",
    name: "Final Drive Chain Sprocket Kit (520 Pitch X-Ring)",
    specLabel: "15T / 42T - 104L",
    description: "Hardened steel alloy sprocket set with sealed low-friction master-link drive chain.",
    fitmentLabel: "100% Guaranteed J1D Fitment",
    price: 2850,
    mrp: 3200,
    discountPct: 11,
    stockText: "42 in BLR Hub",
    stockDepot: "In Stock (42 units)",
    isQuickShip: true,
    assembly: "transmission",
    brand: "Rolon Chain Co.",
    trimEditions: ["All Editions (2021-2025)", "Halcyon Series", "Signals (Dual ABS)", "Dark Stealth / Gunmetal", "Chrome Bronze / Red"],
    img: "/images/classic-350-chain-sprocket.webp",
  },
  {
    id: "cp2",
    partId: "p1",
    oem: "594218/A",
    tag: "HIGH WEAR ITEM",
    tagType: "high-wear",
    name: "Rear Sprocket Hub Cush Rubber Dampers",
    specLabel: "Pack of 4 Pcs",
    description: "High-durometer synthetic elastomer absorbs torque spikes to preserve rear wheel spline.",
    fitmentLabel: "Direct Fit: J1D Classic & Meteor 350",
    price: 320,
    mrp: 380,
    discountPct: 16,
    stockText: "192 in Stock",
    stockDepot: "In Stock (192 units)",
    isQuickShip: true,
    assembly: "transmission",
    brand: "Royal Enfield Genuine",
    trimEditions: ["All Editions (2021-2025)", "Halcyon Series", "Signals (Dual ABS)", "Dark Stealth / Gunmetal", "Redditch Series"],
    img: "/images/clutch-rotor.webp",
  },
  {
    id: "cp3",
    partId: "p2",
    oem: "888421/B",
    tag: "BYBRE OEM SPEC",
    tagType: "bybre",
    name: "Front Caliper Sintered Brake Pad Set (ByBre)",
    specLabel: "Dual-Channel ABS",
    description: "Factory metallic compound delivers consistent friction coefficient under high rotor thermal load.",
    fitmentLabel: "Pre-drilled for OEM Anti-Chirp Shim",
    price: 1540,
    mrp: 2100,
    discountPct: 26,
    stockText: "273 in Stock",
    stockDepot: "In Stock (273 units)",
    isQuickShip: true,
    assembly: "brakes",
    brand: "ByBre (Brembo India)",
    trimEditions: ["All Editions (2021-2025)", "Signals (Dual ABS)", "Dark Stealth / Gunmetal", "Chrome Bronze / Red"],
    img: "/images/brakepad-interceptor.png",
  },
  {
    id: "cp4",
    partId: "p4",
    oem: "110943/E",
    tag: "LOW STOCK (5 LEFT)",
    tagType: "low-stock",
    name: "Low-Friction Clutch Cable with Dust Boot",
    specLabel: "Teflon-Core Braid",
    description: "Precision coiled inner wire with weather-sealed bellow grommets for feather-light lever engagement.",
    fitmentLabel: "Guaranteed Direct J-Series Fit",
    price: 285,
    mrp: 340,
    discountPct: 16,
    stockText: "Depot Dispatched",
    stockDepot: "Only 5 left in stock!",
    isQuickShip: true,
    assembly: "transmission",
    brand: "Royal Enfield Genuine",
    trimEditions: ["All Editions (2021-2025)", "Halcyon Series", "Redditch Series", "Dark Stealth / Gunmetal"],
    img: "/images/hunter350-clutch-cable.webp",
  },
  {
    id: "cp5",
    partId: "p1",
    oem: "570541/D",
    tag: "ENDURANCE OEM",
    tagType: "endurance",
    name: "Heavy Duty Clutch Friction Discs & Steels",
    specLabel: "7-Plate Matched Set",
    description: "Endurance Tier-1 composite friction facing absorbs torque spikes for 15W-50 semi-synthetic oil immersion.",
    fitmentLabel: "Matched for 349cc SOHC Engine",
    price: 1340,
    mrp: 1650,
    discountPct: 18,
    stockText: "115 in Stock",
    stockDepot: "In Stock (115 units)",
    isQuickShip: false,
    assembly: "engine",
    brand: "Endurance Engineering",
    trimEditions: ["All Editions (2021-2025)", "Halcyon Series", "Chrome Bronze / Red", "Dark Stealth / Gunmetal"],
    img: "/images/clutch-rotor.webp",
  },
  {
    id: "cp6",
    partId: "p3",
    oem: "194821/C",
    tag: "NEODYMIUM CORE",
    tagType: "spec",
    name: "Magnetic Crankcase Sump Drain Plug (M14)",
    specLabel: "M14 Thread + Copper Ring",
    description: "Catches micro ferrous particles before they enter oil passages. Includes genuine copper crush gasket.",
    fitmentLabel: "Factory Torque: 20 Nm Torx",
    price: 185,
    mrp: 230,
    discountPct: 19,
    stockText: "58 in Stock",
    stockDepot: "In Stock (58 units)",
    isQuickShip: true,
    assembly: "engine",
    brand: "Royal Enfield Genuine",
    trimEditions: ["All Editions (2021-2025)", "Halcyon Series", "Signals (Dual ABS)", "Redditch Series"],
    img: "/images/engine-filters.jpg",
  },
  {
    id: "cp7",
    partId: "p1",
    oem: "281209/A",
    tag: "OEM IGNITION SPEC",
    tagType: "spec",
    name: "NGK Resistor Spark Plug (CPR8EA-9)",
    specLabel: "CPR8EA-9 (0.8mm Gap)",
    description: "Factory standard heat-range spark plug for optimal combustion across all ambient climates.",
    fitmentLabel: "Pre-calibrated 0.8-0.9mm gap",
    price: 260,
    mrp: 310,
    discountPct: 16,
    stockText: "340 in Stock",
    stockDepot: "In Stock (340 units)",
    isQuickShip: true,
    assembly: "electrical",
    brand: "Bosch Automotive",
    trimEditions: ["All Editions (2021-2025)", "Halcyon Series", "Dark Stealth / Gunmetal", "Signals (Dual ABS)"],
    img: "/images/eletrical-ecu.jpg",
  },
  {
    id: "cp8",
    partId: "p3",
    oem: "594012/A",
    tag: "SERVICE ESSENTIAL",
    tagType: "service",
    name: "Engine Oil Filter Cartridge & O-Ring Set",
    specLabel: "Includes Viton O-Ring",
    description: "Deep pleated synthetic fiber media ensures 99.2% micron filtration efficiency for SOHC valve train.",
    fitmentLabel: "Required for every 10,000 KM service",
    price: 210,
    mrp: 320,
    discountPct: 34,
    stockText: "52 in Stock",
    stockDepot: "In Stock (52 units)",
    isQuickShip: true,
    assembly: "engine",
    brand: "Royal Enfield Genuine",
    trimEditions: ["All Editions (2021-2025)", "Halcyon Series", "Dark Stealth / Gunmetal", "Redditch Series"],
    img: "/images/sherpa-450-oil-filter.jpg",
  },
  {
    id: "cp9",
    partId: "p3",
    oem: "594102/B",
    tag: "SERVICE ESSENTIAL",
    tagType: "service",
    name: "High-Flow Pleated Air Filter Element",
    specLabel: "Cellulose High-Flow Core",
    description: "Multi-layered resin impregnated filter element engineered for dusty tropical and off-highway conditions.",
    fitmentLabel: "Factory Replacement: Every 15,000 KM",
    price: 420,
    mrp: 520,
    discountPct: 19,
    stockText: "180 in Stock",
    stockDepot: "In Stock (180 units)",
    isQuickShip: true,
    assembly: "engine",
    brand: "Royal Enfield Genuine",
    trimEditions: ["All Editions (2021-2025)", "Dark Stealth / Gunmetal", "Signals (Dual ABS)"],
    img: "/images/engine-filters.jpg",
  },
  {
    id: "cp10",
    partId: "p2",
    oem: "888310/C",
    tag: "BYBRE OEM SPEC",
    tagType: "bybre",
    name: "Rear Floating Brake Disc Rotor (270mm)",
    specLabel: "270mm Heat-Treated",
    description: "Stainless steel rotor disc with laser slotted ventilation channels for fade-free rear deceleration.",
    fitmentLabel: "Direct Fit: J1D Rear Wheel Hub",
    price: 1890,
    mrp: 2350,
    discountPct: 20,
    stockText: "44 in Stock",
    stockDepot: "In Stock (44 units)",
    isQuickShip: true,
    assembly: "brakes",
    brand: "ByBre (Brembo India)",
    trimEditions: ["All Editions (2021-2025)", "Signals (Dual ABS)", "Dark Stealth / Gunmetal", "Chrome Bronze / Red"],
    img: "/images/brakes-fluid.jpg",
  },
  {
    id: "cp11",
    partId: "p1",
    oem: "771020/F",
    tag: "SEALED OEM",
    tagType: "sealed",
    name: "Front Fork Oil Seal & Dust Cap Pair (41mm)",
    specLabel: "41mm NOK Triple Lip",
    description: "High-durometer NBR oil seal with external anti-grit garter spring prevents stanchion weeping.",
    fitmentLabel: "Matched for 41mm Telescopic Forks",
    price: 480,
    mrp: 620,
    discountPct: 22,
    stockText: "95 in Stock",
    stockDepot: "In Stock (95 units)",
    isQuickShip: true,
    assembly: "suspension",
    brand: "Royal Enfield Genuine",
    trimEditions: ["All Editions (2021-2025)", "Halcyon Series", "Redditch Series"],
    img: "/images/chasis-body.webp",
  },
  {
    id: "cp12",
    partId: "p1",
    oem: "391040/M",
    tag: "SPEC OEM",
    tagType: "spec",
    name: "Stator Coil Magneto Generator Assembly",
    specLabel: "12V 28A Copper Wound",
    description: "Factory wound copper stator coil with high-temp insulation lacquer and pre-crimped terminal connector.",
    fitmentLabel: "J-Series AC Generator Assembly",
    price: 3450,
    mrp: 4100,
    discountPct: 16,
    stockText: "22 in Stock",
    stockDepot: "In Stock (22 units)",
    isQuickShip: false,
    assembly: "electrical",
    brand: "Bosch Automotive",
    trimEditions: ["All Editions (2021-2025)", "Dark Stealth / Gunmetal", "Chrome Bronze / Red"],
    img: "/images/eletrical-ecu.jpg",
  },
];

export function getBikeCatalogParts(slug?: string): CatalogPartItem[] {
  // If slug is provided and not classic-350, adjust names or return the catalog
  return bikeCatalogParts;
}

export interface SubCategory {
  id: string;
  name: string;
  count: number;
}

export interface CategoryDetail {
  slug: string;
  name: string;
  short: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  standards: string;
  partsCount: number;
  safetyTested: string;
  tolerance: string;
  qualitySpec: string;
  dispatchHub: string;
  subCategories: SubCategory[];
  bulletin: {
    code: string;
    title: string;
    desc: string;
    params: string[];
    pdfName: string;
    pdfSize: string;
  };
  vinNotice: {
    heading: string;
    sub: string;
  };
}

export interface CategoryProductItem {
  id: string;
  partId: string;
  oem: string;
  tag: string;
  badgeType: "sealed" | "verified" | "direct" | "spec" | "abs" | "high-carbon";
  name: string;
  subCategory: string; // "pads" | "calipers" | "master" | "hoses" | "discs"
  imageLabel: string;
  fitsText: string;
  description: string;
  price: number;
  mrp: number;
  discountPct: number;
  stockCount: number;
  stockText: string;
  mountPosition: "front" | "rear" | "dual";
  manufacturer: "ByBre (Brembo India)" | "RE Genuine Factory" | "Endurance Tech" | "Bosch ABS India";
  compatibleBikes: string[];
  badges: string[];
  isNextDay: boolean;
  img: string;
}

export const categoryDetails: Record<string, CategoryDetail> = {
  "brakes-hydraulics": {
    slug: "brakes-hydraulics",
    name: "Brakes & Hydraulics",
    short: "Brakes & Fluids",
    title: "Brakes & Hydraulics Parts",
    subtitle:
      "OEM Factory Calipers, Master Cylinders, Sintered Brake Pads, Hydraulic Lines & Fluid Reservoirs engineered specifically for all Royal Enfield platforms.",
    eyebrow: "SERIES 888 / 594 INDEX",
    standards: "BYBRE / BREMBO STANDARDS · SAFETY CRITICAL HYDRAULIC COMPONENTS",
    partsCount: 38,
    safetyTested: "100% QA",
    tolerance: "±0.02mm",
    qualitySpec: "ByBre / Brembo Tier-1",
    dispatchHub: "BLR & MAA Depots",
    subCategories: [
      { id: "all", name: "All", count: 38 },
      { id: "pads", name: "Pads & Shoes", count: 14 },
      { id: "calipers", name: "Calipers", count: 12 },
      { id: "master", name: "Master Cylinders", count: 8 },
      { id: "hoses", name: "Hoses & ABS", count: 5 },
      { id: "discs", name: "Discs", count: 4 },
    ],
    bulletin: {
      code: "WORKSHOP SERVICE BULLETIN RE-BR-2024",
      title: "Bleeding & Bedding Guide for Sintered Brake Pads",
      desc: "Proper bedding transfers an even microscopic layer of friction material to your rotor face. Review the official torque specifications (Front Banjo 24 Nm, Caliper Mounting 35 Nm) to avoid uneven heat cycling or brake shudder.",
      params: [
        "Bleed Order: Caliper to Master",
        "DOT 4 Fluid Only",
        "Bedding Phase: 150 km gradual stops",
      ],
      pdfName: "RE-Technical-Bulletin-Brake-Bleeding-Bedding.pdf",
      pdfSize: "4.2 MB",
    },
    vinNotice: {
      heading: "Unsure About ABS vs Non-ABS Hydraulic Bore?",
      sub: "Input your 17-digit Chassis / VIN number. Our catalog engine cross-references the factory parts assembly manual for your exact production month and year.",
    },
  },
  "engine-filters": {
    slug: "engine-filters",
    name: "Engine & Filters",
    short: "Engine & Filters",
    title: "Engine & Filtration Components",
    subtitle:
      "Factory-tolerance spin-on oil filters, high-flow air filter elements, cylinder head gaskets, spark plugs, and sump plugs for long-stroke longevity.",
    eyebrow: "SERIES 594 / 571 INDEX",
    standards: "ISO 5011 / DIN 8187 FACTORY SPEC",
    partsCount: 42,
    safetyTested: "100% QA",
    tolerance: "±0.01mm",
    qualitySpec: "Royal Enfield Direct Tier-1",
    dispatchHub: "Chennai Works HQ",
    subCategories: [
      { id: "all", name: "All", count: 42 },
      { id: "filters", name: "Oil & Air Filters", count: 16 },
      { id: "gaskets", name: "Gaskets & Seals", count: 14 },
      { id: "spark", name: "Spark Plugs", count: 6 },
      { id: "sump", name: "Sump Plugs & Magnets", count: 6 },
    ],
    bulletin: {
      code: "WORKSHOP SERVICE BULLETIN RE-EN-2024",
      title: "Engine Oil Flow & Filter Bypass Pressure Protocol",
      desc: "Ensure Viton sealing rings are coated with fresh engine oil before tightening cover bolts in star sequence to 10 Nm.",
      params: ["Torque: 10 Nm Cover Bolts", "Viton O-Ring Inspection", "Oil Capacity: 2.1L Full Synthetic"],
      pdfName: "RE-Technical-Bulletin-Filtration.pdf",
      pdfSize: "3.8 MB",
    },
    vinNotice: {
      heading: "Verify Engine Displacement & Valve Clearance",
      sub: "Enter your 17-digit Chassis VIN to verify factory shim thickness and cylinder head gasket revisions.",
    },
  },
  "chain-sprockets": {
    slug: "chain-sprockets",
    name: "Chain & Sprockets",
    short: "Chain & Sprockets",
    title: "Chain, Sprockets & Final Drive Assemblies",
    subtitle:
      "Rolon and Royal Enfield factory sealed 520 X-Ring chains, induction hardened rear alloy sprockets, front countershaft pinions, and cush dampers.",
    eyebrow: "SERIES 570 / 520 INDEX",
    standards: "JIS / ISO CONTINUOUS PITCH",
    partsCount: 34,
    safetyTested: "38.2 kN Tensile",
    tolerance: "±0.02mm",
    qualitySpec: "Rolon Factory Crate Spec",
    dispatchHub: "BLR & MAA Hubs",
    subCategories: [
      { id: "all", name: "All", count: 34 },
      { id: "chains", name: "Drive Chains", count: 12 },
      { id: "sprockets", name: "Rear & Front Sprockets", count: 12 },
      { id: "dampers", name: "Cush Drive Dampers", count: 6 },
      { id: "kits", name: "Full Overhaul Kits", count: 4 },
    ],
    bulletin: {
      code: "WORKSHOP SERVICE BULLETIN RE-DR-2024",
      title: "Drive Chain Tension & Countershaft Alignment Guide",
      desc: "Recommended free slack at midway point is 25-30mm with rider unladen. Always torque axle nut to 70 Nm.",
      params: ["Axle Torque: 70 Nm", "Slack: 25-30mm", "Loctite 243 on rear studs"],
      pdfName: "RE-Technical-Bulletin-FinalDrive.pdf",
      pdfSize: "2.4 MB",
    },
    vinNotice: {
      heading: "Unsure About 520 vs 530 Chain Pitch?",
      sub: "Input your 17-digit Chassis VIN to determine if your model takes J-Series 520 pitch or earlier UCE 530 pitch setup.",
    },
  },
  "cables-controls": {
    slug: "cables-controls",
    name: "Cables & Controls",
    short: "Cables & Levers",
    title: "Cables, Levers & Handlebar Controls",
    subtitle:
      "PTFE fluoropolymer-lined clutch cables, push-pull dual throttle cables, forged brake levers, and switchgear harnesses.",
    eyebrow: "SERIES 150 / 110 INDEX",
    standards: "PTFE SELF-LUBRICATING CORE",
    partsCount: 28,
    safetyTested: "100% QA",
    tolerance: "±1.5mm",
    qualitySpec: "Minda / Royal Enfield OEM",
    dispatchHub: "Bangalore Depot",
    subCategories: [
      { id: "all", name: "All", count: 28 },
      { id: "clutch", name: "Clutch Cables", count: 8 },
      { id: "throttle", name: "Throttle Cables", count: 8 },
      { id: "levers", name: "Forged Alloy Levers", count: 8 },
      { id: "switch", name: "Handlebar Switches", count: 4 },
    ],
    bulletin: {
      code: "WORKSHOP SERVICE BULLETIN RE-CB-2024",
      title: "PTFE Cable Routing & Free Play Calibration",
      desc: "Do not inject aerosol petroleum solvents into PTFE liners. Adjust lever ball-end freeplay to 2-3mm.",
      params: ["Lever Play: 2-3mm", "No Petroleum Solvent", "Check Rake Routing"],
      pdfName: "RE-Technical-Bulletin-Controls.pdf",
      pdfSize: "1.9 MB",
    },
    vinNotice: {
      heading: "Unsure About Handlebar Riser & Cable Length?",
      sub: "Verify chassis series to ensure exact factory routing length without binding at full steering lock.",
    },
  },
  "electrical-ignition": {
    slug: "electrical-ignition",
    name: "Electrical & Ignition",
    short: "Electrical & ECU",
    title: "Electrical, Stator & Ignition Systems",
    subtitle:
      "Copper-wound stator magnetos, rectifier regulators, ECU wiring looms, LED headlamp units, starter relays, and lambda O2 sensors.",
    eyebrow: "SERIES 391 / 281 INDEX",
    standards: "BOSCH / CONTINENTAL EMS",
    partsCount: 36,
    safetyTested: "High-Dielectric 500V",
    tolerance: "±0.1V",
    qualitySpec: "Bosch / Denso Tier-1",
    dispatchHub: "Delhi NCR & BLR",
    subCategories: [
      { id: "all", name: "All", count: 36 },
      { id: "stator", name: "Stators & Magnetos", count: 10 },
      { id: "regulator", name: "Rectifier / Regulators", count: 8 },
      { id: "sensors", name: "O2 & ABS Sensors", count: 10 },
      { id: "lighting", name: "LED Modules & Relays", count: 8 },
    ],
    bulletin: {
      code: "WORKSHOP SERVICE BULLETIN RE-EL-2024",
      title: "Charging Circuit Output & Stator Resistance Check",
      desc: "Measure phase-to-phase AC output at 3,000 RPM (should exceed 50V AC). Inspect harness grommets for tight sealing.",
      params: ["Output: >50V AC @ 3k RPM", "Resistance: 0.6-0.9 Ohm", "Dielectric Sealed"],
      pdfName: "RE-Technical-Bulletin-Electrical.pdf",
      pdfSize: "3.1 MB",
    },
    vinNotice: {
      heading: "Unsure About ECU Firmware & Stator Output?",
      sub: "Enter 17-digit Chassis VIN to determine exact wiring harness pinout and magneto generator capacity.",
    },
  },
  "body-chassis": {
    slug: "body-chassis",
    name: "Body & Chassis",
    short: "Chassis & Body",
    title: "Chassis, Suspension & Body Components",
    subtitle:
      "Harris Performance frame dampers, 41mm/43mm fork oil seals, dust boots, factory crash guards, and vibration-isolated footpegs.",
    eyebrow: "SERIES 771 / 820 INDEX",
    standards: "HARRIS ENGINEERING CHASSIS",
    partsCount: 30,
    safetyTested: "Torsional Rigid",
    tolerance: "±0.05mm",
    qualitySpec: "Endurance / Gabriel OEM",
    dispatchHub: "Chennai Works HQ",
    subCategories: [
      { id: "all", name: "All", count: 30 },
      { id: "suspension", name: "Fork Seals & Bushings", count: 10 },
      { id: "dampers", name: "Rubber Mounts & Footpegs", count: 8 },
      { id: "guards", name: "Crash Guards & Stands", count: 8 },
      { id: "fasteners", name: "Chassis Fasteners", count: 4 },
    ],
    bulletin: {
      code: "WORKSHOP SERVICE BULLETIN RE-CH-2024",
      title: "Telescopic Fork Oil Capacity & Seal Installation",
      desc: "Use approved seal driver tools to seat NOK triple-lip seals square without scoring stanchion chrome.",
      params: ["Fork Oil: 10W Synthetic", "Torque: 25 Nm Pinch Bolts", "Triple-Lip Inspection"],
      pdfName: "RE-Technical-Bulletin-Suspension.pdf",
      pdfSize: "2.6 MB",
    },
    vinNotice: {
      heading: "Verify Chassis Generation & Rake Angle",
      sub: "Input 17-digit Chassis VIN to isolate frame revisions across J-Series, Sherpa, and 650 Twin platforms.",
    },
  },
};

export function getCategoryBySlug(slug: string): CategoryDetail {
  const clean = decodeURIComponent(slug).trim().toLowerCase();
  return categoryDetails[clean] ?? categoryDetails["brakes-hydraulics"];
}

export const categoryProducts: CategoryProductItem[] = [
  {
    id: "cp-b1",
    partId: "p2",
    oem: "888421/B",
    tag: "OEM Spec",
    badgeType: "spec",
    name: "ByBre Front Caliper Sintered Brake Pad Set",
    subCategory: "pads",
    imageLabel: "ByBre Factory Batch",
    fitsText: "Fits: Classic 350 / Meteor 350 / Hunter 350",
    description: "Factory sintered metallic compound delivers rapid heat dissipation and uniform rotor friction.",
    price: 1540,
    mrp: 2100,
    discountPct: 26,
    stockCount: 273,
    stockText: "273 in stock",
    mountPosition: "front",
    manufacturer: "ByBre (Brembo India)",
    compatibleBikes: ["Classic 350 (J-Series)", "Meteor 350 / Hunter", "Interceptor / GT 650"],
    badges: ["Dual-piston", "Sintered Copper"],
    isNextDay: true,
    img: "/images/brakepad-interceptor.png",
  },
  {
    id: "cp-b2",
    partId: "p2",
    oem: "594182/C",
    tag: "Verified Caliper",
    badgeType: "verified",
    name: "ByBre Front Twin-Piston Caliper Assembly with Pads",
    subCategory: "calipers",
    imageLabel: "Factory Calibrated",
    fitsText: "Fits: Royal Enfield J-Series 350 Platform",
    description: "Fully assembled and pressure-tested front dual pot hydraulic caliper pre-bled with factory fluid.",
    price: 3680,
    mrp: 4450,
    discountPct: 17,
    stockCount: 48,
    stockText: "48 in stock",
    mountPosition: "front",
    manufacturer: "ByBre (Brembo India)",
    compatibleBikes: ["Classic 350 (J-Series)", "Meteor 350 / Hunter"],
    badges: ["Complete Unit", "DOT 4 Fluid"],
    isNextDay: true,
    img: "/images/brakes-fluid.jpg",
  },
  {
    id: "cp-b3",
    partId: "p2",
    oem: "594211/A",
    tag: "Direct Fit",
    badgeType: "direct",
    name: "Rear Disc Brake Pad Kit (Endurance / ByBre)",
    subCategory: "pads",
    imageLabel: "Ceramic Compound",
    fitsText: "Fits: Classic 350 & Interceptor 650 Rear",
    description: "Organic ceramic friction formula with stainless anti-rattle spring clips for quiet rear modulation.",
    price: 780,
    mrp: 1050,
    discountPct: 25,
    stockCount: 142,
    stockText: "142 in stock",
    mountPosition: "rear",
    manufacturer: "Endurance Tech",
    compatibleBikes: ["Classic 350 (J-Series)", "Interceptor / GT 650", "Himalayan 450 (Sherpa)"],
    badges: ["Includes Clips", "OEM Spec"],
    isNextDay: true,
    img: "/images/brakepad-interceptor.png",
  },
  {
    id: "cp-b4",
    partId: "p2",
    oem: "888129/D",
    tag: "Pre-bled Spec",
    badgeType: "spec",
    name: "Front Master Cylinder Assembly (13mm Piston with Alloy Lever)",
    subCategory: "master",
    imageLabel: "Integrated Sight Glass",
    fitsText: "Fits: Interceptor 650 / Continental GT / Meteor 350",
    description: "OEM 13mm hydraulic radial pump with integrated fluid reservoir, brake light switch, and mirror mount.",
    price: 2450,
    mrp: 2990,
    discountPct: 18,
    stockCount: 34,
    stockText: "34 in stock",
    mountPosition: "front",
    manufacturer: "RE Genuine Factory",
    compatibleBikes: ["Interceptor / GT 650", "Meteor 350 / Hunter", "Standard 350 / 500 (UCE)"],
    badges: ["Switch Included", "Mirror Mount"],
    isNextDay: true,
    img: "/images/cable-levers.jpg",
  },
  {
    id: "cp-b5",
    partId: "p2",
    oem: "592810/A",
    tag: "Low Stock (5 Left)",
    badgeType: "sealed",
    name: "Stainless Steel Braided Front Brake Hose (PTFE Lined)",
    subCategory: "hoses",
    imageLabel: "PTFE Teflon Core",
    fitsText: "Fits: Himalayan 450 & Scram 411 / Interceptor 650",
    description: "Zero volumetric expansion under pressure. Armored stainless steel braid with factory swaged M10 banjos.",
    price: 1120,
    mrp: 1480,
    discountPct: 24,
    stockCount: 89,
    stockText: "89 in stock",
    mountPosition: "front",
    manufacturer: "RE Genuine Factory",
    compatibleBikes: ["Himalayan 450 (Sherpa)", "Interceptor / GT 650"],
    badges: ["Zero Expansion", "Banjo M10"],
    isNextDay: true,
    img: "/images/hunter350-clutch-cable.webp",
  },
  {
    id: "cp-b6",
    partId: "p2",
    oem: "888300/F",
    tag: "High-Carbon Alloy",
    badgeType: "high-carbon",
    name: "300mm Front Floating Brake Disc Rotor",
    subCategory: "discs",
    imageLabel: "300mm Floating Rotor",
    fitsText: "Fits: Classic 350 (2021+), Meteor 350, Hunter 350",
    description: "Heat-treated stainless steel disc with precision drilled ventilation holes and vibration damping rivets.",
    price: 2890,
    mrp: 3650,
    discountPct: 21,
    stockCount: 66,
    stockText: "66 in stock",
    mountPosition: "front",
    manufacturer: "ByBre (Brembo India)",
    compatibleBikes: ["Classic 350 (J-Series)", "Meteor 350 / Hunter"],
    badges: ["Ventilated", "High Carbon"],
    isNextDay: true,
    img: "/images/brakes-fluid.jpg",
  },
  {
    id: "cp-b7",
    partId: "p2",
    oem: "194098/B",
    tag: "Dual-Channel ABS",
    badgeType: "abs",
    name: "Dual-Channel Bosch ABS Wheel Speed Sensor Front",
    subCategory: "hoses",
    imageLabel: "Digital Pickup",
    fitsText: "Fits: All J-Series & Twin Dual ABS",
    description: "Magnetic hall-effect tone wheel sensor reads rotational frequency for anti-lock brake control unit.",
    price: 950,
    mrp: 1200,
    discountPct: 21,
    stockCount: 115,
    stockText: "115 in stock",
    mountPosition: "front",
    manufacturer: "Bosch ABS India",
    compatibleBikes: ["Classic 350 (J-Series)", "Interceptor / GT 650", "Himalayan 450 (Sherpa)"],
    badges: ["OEM Tier-1", "Digital Signal"],
    isNextDay: true,
    img: "/images/eletrical-ecu.jpg",
  },
  {
    id: "cp-b8",
    partId: "p2",
    oem: "114002/A",
    tag: "DOT 4 Spec",
    badgeType: "spec",
    name: "Castrol DOT 4 Response Synthetic Brake Fluid (250ml)",
    subCategory: "master",
    imageLabel: "260°C Boiling 500ml",
    fitsText: "Universal Royal Enfield Compatibility",
    description: "High vapor lock resistance formulation prevents hydraulic compressibility during aggressive braking.",
    price: 380,
    mrp: 450,
    discountPct: 15,
    stockCount: 110,
    stockText: "110 in stock",
    mountPosition: "dual",
    manufacturer: "RE Genuine Factory",
    compatibleBikes: ["Classic 350 (J-Series)", "Interceptor / GT 650", "Himalayan 450 (Sherpa)", "Meteor 350 / Hunter", "Standard 350 / 500 (UCE)"],
    badges: ["260°C Dry Boiling", "DOT 4 Spec"],
    isNextDay: true,
    img: "/images/brakes-fluid.jpg",
  },
];

export function getCategoryProducts(slug?: string): CategoryProductItem[] {
  return categoryProducts;
}


