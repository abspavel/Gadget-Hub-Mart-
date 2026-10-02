import { Product } from '../types';

export const ALL_PRODUCTS: Product[] = [
  // 1. Charging (4 products)
  {
    id: 'gh-gan-65w',
    name: 'FlexaGear 65W GaN Charger',
    category: 'Charging',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewCount: 1240,
    imageType: 'gan_charger',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    tag: 'Ultra Fast',
    description: 'Next-generation Gallium Nitride (GaN) fast-charging block capable of powering your laptop, smartphone, and tablet simultaneously with dynamic smart wattage allocation.',
    specs: {
      compatibility: 'MacBook Air/Pro, iPhone 16/15, Samsung Galaxy, iPad, Nintendo Switch',
      powerOrOutput: '65W Max (2x USB-C PD 3.0, 1x USB-A QC 4.0)',
      material: 'Fireproof V0 Polycarbonate & Aerospace Heat Sink',
      dimensions: '58 × 32 × 31 mm (105g)',
      warranty: '2-Year Replacement Warranty'
    },
    features: [
      'Gallium Nitride III architecture runs 40% cooler',
      'Dual USB-C Power Delivery ports plus USB-A',
      'Foldable travel prongs for compact pocket carry',
      'MultiProtect safety system with surge protection'
    ],
    colors: [
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Midnight Charcoal', hex: '#1e293b' }
    ]
  },
  {
    id: 'gh-magsafe-charger',
    name: 'MagSafe Wireless Charger',
    category: 'Charging',
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviewCount: 856,
    imageType: 'magsafe_charger',
    imageUrl: 'https://images.unsplash.com/photo-1622445275576-721325763dc5?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    tag: 'Magnetic Snap',
    description: 'Precision magnetic alignment snaps instantly to your phone back for efficient 15W wireless power delivery without cable clutter.',
    specs: {
      compatibility: 'iPhone 16, 15, 14, 13, 12 series & MagSafe cases',
      powerOrOutput: '15W Fast Qi Wireless Output',
      material: 'Anodized Aluminum & Soft Touch Silicone',
      dimensions: '60 × 60 × 6 mm (52g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Strong rare-earth N52 magnets for secure attachment',
      'Braided 1.5m integrated USB-C durable cable',
      'Smart temperature control prevents overheating during fast charging',
      'Slim profile allows comfortable phone usage while charging'
    ],
    colors: [
      { name: 'Space Gray', hex: '#374151' },
      { name: 'Silver White', hex: '#f3f4f6' }
    ]
  },
  {
    id: 'gh-dual-car-charger',
    name: 'VoltSpeed 45W Dual Car Charger',
    category: 'Charging',
    price: 19.99,
    originalPrice: 26.99,
    rating: 4.8,
    reviewCount: 412,
    imageType: 'gan_charger',
    imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    tag: 'On The Go',
    description: 'Ultra-compact flush-fit car charger with Power Delivery and Quick Charge ports. Powers two devices at maximum speed on your road trips.',
    specs: {
      compatibility: 'All 12V/24V Vehicle Sockets',
      powerOrOutput: '45W Total Output (PD 30W + QC 15W)',
      material: 'Scratch-Resistant Zinc Alloy Body',
      dimensions: '42 × 22 mm (28g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Miniature flush-fit design sits flush in cigarette lighter',
      'Smart IC chip protects against short circuit and overcharging',
      'LED indicator ring helps locate port easily during night drives'
    ]
  },
  {
    id: 'gh-desktop-charging-station',
    name: 'OmniStation 140W Desktop Hub',
    category: 'Charging',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviewCount: 310,
    imageType: 'gan_charger',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    tag: 'Heavy Duty',
    description: 'The ultimate desktop power powerhouse with 4 USB-C PD ports and 2 AC outlets. Powers dual laptops and mobile gear simultaneously.',
    specs: {
      compatibility: 'MacBook Pro, Laptops, Tablets, Smartphones',
      powerOrOutput: '140W Max GaN III Technology',
      material: 'Flame Retardant PC & Brushed Aluminum',
      dimensions: '110 × 80 × 30 mm (320g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Powers up to 6 devices at once with intelligent power distribution',
      'Detachable 1.5m AC power cord for convenient desk placement',
      'Advanced surge protection safeguard for expensive electronics'
    ]
  },

  // 2. Cables (4 products)
  {
    id: 'gh-braided-cable',
    name: 'Duraflex 100W Braided Cable 2.0m',
    category: 'Cables',
    price: 16.99,
    originalPrice: 22.99,
    rating: 4.8,
    reviewCount: 2100,
    imageType: 'usb_cable',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    isBestSeller: true,
    tag: 'Indestructible',
    description: 'Military-grade Kevlar reinforced nylon braided USB-C to USB-C cable built to endure 50,000+ bends. Supports 100W PD fast charging & 480Mbps data sync.',
    specs: {
      compatibility: 'All USB-C devices (Laptops, Tablets, Phones)',
      powerOrOutput: '100W (20V/5A) Fast Charge Support',
      material: 'Double-braided Nylon & Reinforced SR Joint',
      dimensions: 'Length: 2.0 Meters (6.5 ft)',
      warranty: 'Lifetime Replacement Warranty'
    },
    features: [
      'Built-in E-Marker smart chip automatically regulates safe voltage',
      'Tangle-free double braided nylon jacket resists fraying',
      'Extended strain relief collar prevents breakage at connector ends'
    ],
    colors: [
      { name: 'Space Gray', hex: '#475569' },
      { name: 'Silver White', hex: '#cbd5e1' }
    ]
  },
  {
    id: 'gh-lightning-cable',
    name: 'Duraflex MFi Certified Lightning Cable 1.5m',
    category: 'Cables',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviewCount: 950,
    imageType: 'usb_cable',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    tag: 'Apple MFi Certified',
    description: 'Officially Apple MFi certified lightning to USB-C cable for faultless iPhone fast charging and high-speed data transfer.',
    specs: {
      compatibility: 'iPhone 14 / 13 / 12 / 11 / SE / AirPods',
      powerOrOutput: '20W Power Delivery Fast Charge',
      material: 'Flexible Silicone & Aluminum Housing',
      dimensions: 'Length: 1.5 Meters (5 ft)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Original Apple C94 connector ensures 100% iOS compatibility',
      'Soft-touch silicone exterior that never tangles in your pocket'
    ]
  },
  {
    id: 'gh-3in1-cable',
    name: 'OmniCord 3-in-1 Multi Cable 1.2m',
    category: 'Cables',
    price: 21.99,
    originalPrice: 28.99,
    rating: 4.7,
    reviewCount: 530,
    imageType: 'usb_cable',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    tag: 'All-in-One',
    description: 'One cable for all your devices. Features USB-C, Lightning, and Micro-USB connectors on a single braided line.',
    specs: {
      compatibility: 'Universal iPhone, Android, Power Banks, Controllers',
      powerOrOutput: '3.5A Total Max Current Output',
      material: 'Aluminum Connectors & Braided Nylon',
      dimensions: 'Length: 1.2 Meters',
      warranty: '1-Year Warranty'
    },
    features: [
      'Eliminates the need to carry multiple separate cables',
      'Reinforced splitter joint designed for heavy daily travel use'
    ]
  },
  {
    id: 'gh-right-angle-cable',
    name: 'GameFlex 90-Degree Gaming Cable 1.8m',
    category: 'Cables',
    price: 15.99,
    originalPrice: 20.99,
    rating: 4.8,
    reviewCount: 680,
    imageType: 'usb_cable',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    tag: 'Gamer Choice',
    description: 'Ergonomic 90-degree right-angle connector lets you comfortably hold your phone horizontally while gaming or watching videos while charging.',
    specs: {
      compatibility: 'Smartphones, Nintendo Switch, Steam Deck',
      powerOrOutput: '60W PD Fast Charging Support',
      material: 'Zinc Alloy Housing & Nylon Braided',
      dimensions: 'Length: 1.8 Meters',
      warranty: '2-Year Warranty'
    },
    features: [
      'L-shaped connector prevents cable bending and hand strain',
      'LED charging status glow indicator'
    ]
  },

  // 3. Audio (4 products)
  {
    id: 'gh-noise-headphones',
    name: 'NoisePro ANC Headphones',
    category: 'Audio',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviewCount: 2300,
    imageType: 'headphones',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    badge: 'Best Seller',
    tag: 'Hi-Res Audio',
    description: 'Immerse in pristine studio sound with hybrid Active Noise Cancellation (ANC), 45-hour battery life, and ultra-plush memory foam ear cushions.',
    specs: {
      compatibility: 'Bluetooth 5.3 Universal (iOS, Android, Windows, Mac)',
      powerOrOutput: '45 Hours Playtime (ANC On)',
      material: 'Brushed Titanium Alloy & Protein Leather',
      dimensions: '190 × 165 × 80 mm (250g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Hybrid ANC blocks up to 98% of ambient background noise',
      '40mm custom neodymium dynamic drivers for deep bass',
      'Crystal clear quad-mic array for crisp phone calls'
    ],
    colors: [
      { name: 'Matte Black', hex: '#111827' },
      { name: 'Pearl Silver', hex: '#e5e7eb' }
    ]
  },
  {
    id: 'gh-litebuds-pro',
    name: 'LiteBuds Pro True Wireless',
    category: 'Audio',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviewCount: 1580,
    imageType: 'litebuds_pro',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    isBestSeller: true,
    tag: 'Spatial Audio',
    description: 'Studio-grade acoustics in an ultra-lightweight ergonomic pod. Features adaptive noise canceling, IPX5 water resistance, and 32 hours total playtime.',
    specs: {
      compatibility: 'Bluetooth 5.3 Universal (iOS & Android)',
      powerOrOutput: '32h Total Playtime (8h single charge)',
      material: 'Nano-coated Acoustic ABS Polymer',
      dimensions: 'Charging Case: 60 × 45 × 25 mm (45g total)',
      warranty: '1-Year Replacement Warranty'
    },
    features: [
      'Custom 11mm titanium drivers deliver punchy bass & pristine highs',
      'IPX5 sweat and rain resistance for rigorous workouts',
      'Smart touch controls for music playback and voice assistant'
    ],
    colors: [
      { name: 'Ceramic White', hex: '#ffffff' },
      { name: 'Onyx Black', hex: '#000000' }
    ]
  },
  {
    id: 'gh-sound-pulse-speaker',
    name: 'SoundPulse Waterproof Bluetooth Speaker',
    category: 'Audio',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviewCount: 740,
    imageType: 'headphones',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    tag: 'IP67 Waterproof',
    description: 'Rugged outdoor wireless speaker delivering 360-degree room-filling sound with deep bass radiators and 20 hours battery life.',
    specs: {
      compatibility: 'Bluetooth 5.3 & AUX input',
      powerOrOutput: '30W Stereo Output with Dual Subwoofers',
      material: 'Rubberized Armor & Woven Acoustic Fabric',
      dimensions: '180 × 70 × 70 mm (540g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'IP67 waterproof and dustproof design for beach and pool parties',
      'TWS pairing mode lets you link two speakers for stereo sound'
    ]
  },
  {
    id: 'gh-sport-neckband',
    name: 'PulseNeck Sport Bluetooth Earphones',
    category: 'Audio',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviewCount: 420,
    imageType: 'headphones',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    tag: 'Workout Ready',
    description: 'Magnetic lightweight wireless neckband earphones with 24-hour battery and sweatproof collar design for active runners and gym enthusiasts.',
    specs: {
      compatibility: 'Universal Bluetooth Devices',
      powerOrOutput: '24 Hours Continuous Playtime',
      material: 'Liquid Silicone & Memory Titanium Wire',
      dimensions: 'Flexible Neckband (35g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Magnetic earbuds snap together around your neck when not in use',
      'Fast charge gives 3 hours playback from 10 minutes charging'
    ]
  },

  // 4. Cases & Protection (4 products)
  {
    id: 'gh-armor-case',
    name: 'AeroShield Ultra Matte Case',
    category: 'Cases & Protection',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviewCount: 940,
    imageType: 'phone_case',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    tag: 'Drop Proof',
    description: 'Military-grade drop protection meets silky anti-fingerprint matte texture. Engineered for absolute slimness without sacrificing rugged durability.',
    specs: {
      compatibility: 'iPhone 16 Pro Max / 16 Pro / 15 / Samsung S24 Ultra',
      powerOrOutput: 'MagSafe Compatible Ring Embedded',
      material: 'German Bayer TPU & Polycarbonate Composite',
      dimensions: 'Exact OEM Form-Fit (32g)',
      warranty: 'Lifetime Case Warranty'
    },
    features: [
      'Tested to withstand 12-foot military drop standards',
      'Raised bezel camera lip protects lenses from scratches',
      'Oleophobic matte coating resists grease and fingerprints'
    ],
    colors: [
      { name: 'Phantom Black', hex: '#0f172a' },
      { name: 'Titanium Gray', hex: '#64748b' }
    ]
  },
  {
    id: 'gh-crystal-clear-case',
    name: 'CrystalGuard Anti-Yellowing Case',
    category: 'Cases & Protection',
    price: 19.99,
    originalPrice: 25.99,
    rating: 4.7,
    reviewCount: 610,
    imageType: 'phone_case',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80',
    tag: 'Zero Yellowing',
    description: 'Ultra-transparent crystal clear case treated with optical UV-defense coating to maintain original phone color without yellowing over time.',
    specs: {
      compatibility: 'iPhone & Samsung Flagship Models',
      powerOrOutput: 'Wireless Charging Compatible',
      material: 'Molecular Anti-Yellowing TPU',
      dimensions: 'Slim Profile (26g)',
      warranty: '1-Year Anti-Yellow Guarantee'
    },
    features: [
      'Diamond clarity showcases your phone design perfectly',
      'Air-cushion corners absorb shock from accidental corner drops'
    ]
  },
  {
    id: 'gh-leather-wallet-case',
    name: 'Executive MagLeather Wallet Case',
    category: 'Cases & Protection',
    price: 34.99,
    originalPrice: 45.99,
    rating: 4.9,
    reviewCount: 480,
    imageType: 'phone_case',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80',
    tag: 'Premium Leather',
    description: 'Crafted from supple genuine top-grain leather with built-in card slot pockets and MagSafe alignment ring.',
    specs: {
      compatibility: 'iPhone 16 / 15 / 14 Series',
      powerOrOutput: 'MagSafe Pass-Through Support',
      material: 'Top-Grain Italian Leather & Microfiber Lining',
      dimensions: 'OEM Form-Fit (44g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Develops a rich natural patina over time of usage',
      'Secure card slots hold up to 3 credit cards or IDs safely'
    ]
  },
  {
    id: 'gh-rugged-armor-case',
    name: 'TitanArmor Heavy Duty Defender',
    category: 'Cases & Protection',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviewCount: 520,
    imageType: 'phone_case',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80',
    tag: 'Maximum Armor',
    description: 'Dual-layer shock-absorbing rugged exoskeleton case with built-in kickstand for hands-free media viewing on job sites or travels.',
    specs: {
      compatibility: 'Samsung Galaxy & iPhone Series',
      powerOrOutput: 'Heavy Duty Impact Dispersion',
      material: 'Hard Polycarbonate & Shock-Deflecting Rubber',
      dimensions: 'Rugged Build (58g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Built-in kickstand supports both portrait and landscape angles',
      'Port covers block dust, lint, and moisture ingress'
    ]
  },

  // 5. Mounts & Holders (4 products)
  {
    id: 'gh-car-mount',
    name: 'MagGrip Air Vent Car Mount',
    category: 'Mounts & Holders',
    price: 22.99,
    originalPrice: 29.99,
    rating: 4.7,
    reviewCount: 680,
    imageType: 'car_mount',
    imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    tag: 'One-Touch Lock',
    description: 'Secure magnetic car mount with steel twist-lock vent hook and 360-degree ball joint rotation. Holds your phone rock-steady even on bumpy roads.',
    specs: {
      compatibility: 'MagSafe iPhones & Universal Metal Ring cases',
      powerOrOutput: 'Optional 15W Qi Wireless Fast Charging',
      material: 'Aircraft Aluminum Alloy & High-Temp ABS',
      dimensions: '65 × 65 × 90 mm (95g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Steel twist-lock clamp grips vent louvers firmly over speedbumps',
      '20 powerful N52 magnets hold phone securely in bumps & sharp turns',
      '360-degree ball joint switches instantly between portrait and landscape'
    ],
    colors: [
      { name: 'Matte Black', hex: '#111827' }
    ]
  },
  {
    id: 'gh-desktop-phone-stand',
    name: 'FlexDesk Adjustable Phone Stand',
    category: 'Mounts & Holders',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviewCount: 510,
    imageType: 'phone_stand',
    imageUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80',
    tag: 'Desktop Essential',
    description: 'Sturdy weighted metal base desktop phone and tablet stand with height and angle adjustment for video calls and recipe reading.',
    specs: {
      compatibility: 'All Smartphones and Tablets up to 11 inches',
      powerOrOutput: 'Foldable Ergonomic Multi-Angle',
      material: 'Solid Aluminum Alloy & Anti-Slip Rubber',
      dimensions: '110 × 70 × 160 mm (185g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Weighted base prevents tipping even when tapping phone screen',
      'Reserved charging cable cutout lets you charge while docked'
    ]
  },
  {
    id: 'gh-mag-desk-stand',
    name: 'MagFloat Magnetic Desk Stand',
    category: 'Mounts & Holders',
    price: 32.99,
    originalPrice: 42.99,
    rating: 4.9,
    reviewCount: 390,
    imageType: 'phone_stand',
    imageUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80',
    tag: 'Floating Effect',
    description: 'Floating magnetic desktop stand inspired by Studio Display architecture. Snaps your phone securely in mid-air with 360-degree rotation.',
    specs: {
      compatibility: 'MagSafe iPhones & Cases',
      powerOrOutput: 'Adjustable Viewing Tilt & Rotation',
      material: 'Anodized CNC Aluminum',
      dimensions: '140 × 90 × 140 mm (290g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Creates a stunning floating display effect on your work desk',
      'Silicone magnetic contact pad prevents any scratching'
    ]
  },
  {
    id: 'gh-bike-phone-mount',
    name: 'RiderShield Waterproof Bike & Moto Mount',
    category: 'Mounts & Holders',
    price: 27.99,
    originalPrice: 35.99,
    rating: 4.7,
    reviewCount: 310,
    imageType: 'car_mount',
    imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    tag: 'All Weather',
    description: 'Fully enclosed waterproof handlebar phone mount with touchscreen sensitivity and vibration dampening for bicycles and motorcycles.',
    specs: {
      compatibility: 'Handlebars 22mm to 32mm diameter / Phones up to 6.8"',
      powerOrOutput: 'IP65 Waterproof Rainproof Case',
      material: 'Polycarbonate & Shock Absorption EVA',
      dimensions: '190 × 100 × 30 mm (210g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Transparent touch-sensitive screen cover allows full navigation use in rain',
      'Tool-free handlebar quick installation clamp'
    ]
  },

  // 6. Adapters & Hubs (4 products)
  {
    id: 'gh-hub-pro',
    name: 'NexusLink 7-in-1 USB-C Hub',
    category: 'Adapters & Hubs',
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviewCount: 620,
    imageType: 'usb_hub',
    imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    tag: 'Pro Workstation',
    description: 'Transform your laptop into an ultimate workstation with 4K HDMI, 100W Power Delivery pass-through, high-speed USB 3.0 ports, and SD card readers.',
    specs: {
      compatibility: 'MacBook Pro/Air, iPad Pro, Windows Laptops, Steam Deck',
      powerOrOutput: '100W Power Delivery In / 4K @ 60Hz HDMI Out',
      material: 'Space-Gray Unibody Anodized Aluminum',
      dimensions: '115 × 45 × 14 mm (68g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Crystal clear 4K 60Hz HDMI display output for external monitors',
      'Blazing fast 5Gbps data transfer speeds across USB 3.0 ports',
      'Simultaneous SD and MicroSD card slots for photographers'
    ],
    colors: [
      { name: 'Space Gray', hex: '#334155' }
    ]
  },
  {
    id: 'gh-ethernet-adapter',
    name: 'Gigabit USB-C to Ethernet Adapter',
    category: 'Adapters & Hubs',
    price: 19.99,
    originalPrice: 25.99,
    rating: 4.8,
    reviewCount: 340,
    imageType: 'usb_hub',
    imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80',
    tag: 'Ultra Fast LAN',
    description: 'Plug-and-play wired 1000Mbps Gigabit Ethernet network adapter for lightning fast, lag-free gaming and internet streaming on USB-C laptops.',
    specs: {
      compatibility: 'MacBook, Windows, iPad, ChromeOS',
      powerOrOutput: '10/100/1000 Mbps Gigabit Speed',
      material: 'Braided Cable & Aluminum Casing',
      dimensions: '50 × 24 × 15 mm (32g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Stable wired internet connection removes Wi-Fi dropouts and lag',
      'Compact plug-and-play driverless operation'
    ]
  },
  {
    id: 'gh-hdmi-adapter',
    name: 'UltraHD 4K USB-C to HDMI Cable 1.8m',
    category: 'Adapters & Hubs',
    price: 21.99,
    originalPrice: 28.99,
    rating: 4.8,
    reviewCount: 460,
    imageType: 'usb_hub',
    imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80',
    tag: '4K 60Hz Display',
    description: 'Direct bi-directional USB-C to HDMI braided cable supporting crisp 4K resolution at 60Hz for home theater projectors and monitors.',
    specs: {
      compatibility: 'USB-C Phones, Tablets, and Laptops with DP Alt Mode',
      powerOrOutput: '4K @ 60Hz HDR Resolution',
      material: 'Gold-Plated Connectors & Nylon Braided',
      dimensions: 'Length: 1.8 Meters',
      warranty: '2-Year Warranty'
    },
    features: [
      'No clumsy adapters needed—direct single cable connection',
      'Supports high dynamic range (HDR) for vivid movie colors'
    ]
  },
  {
    id: 'gh-multi-card-reader',
    name: 'ProCard Dual-Slot SD/MicroSD Reader',
    category: 'Adapters & Hubs',
    price: 17.99,
    originalPrice: 23.99,
    rating: 4.7,
    reviewCount: 290,
    imageType: 'usb_hub',
    imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80',
    tag: 'High Speed UHS-II',
    description: 'High-speed dual slot memory card reader supporting UHS-II SDXC and MicroSDXC cards simultaneously at 312MB/s transfer speeds.',
    specs: {
      compatibility: 'Cameras, Drones, GoPros, Laptops, Phones',
      powerOrOutput: 'Up to 312 MB/s Data Transfer Speed',
      material: 'Zinc Alloy Shell',
      dimensions: '60 × 20 × 11 mm (24g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Read and write on SD and MicroSD cards simultaneously',
      'Pocket-sized portable keychain lanyard loop'
    ]
  },

  // 7. Laptop Accessories (4 products)
  {
    id: 'gh-desk-stand',
    name: 'ErgoFold Aluminum Desk Stand',
    category: 'Laptop Accessories',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.7,
    reviewCount: 790,
    imageType: 'laptop_stand',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    isBestSeller: true,
    tag: 'Posture Correct',
    description: 'Elevate your workflow and improve ergonomics. CNC-machined solid aluminum folding laptop stand with open airflow cooling design and non-slip silicone pads.',
    specs: {
      compatibility: 'All Laptops and Tablets from 10 to 17.3 inches',
      powerOrOutput: 'Supports up to 20kg evenly distributed load',
      material: 'Anodized Aircraft Aluminum & Silicone Grips',
      dimensions: 'Folded: 240 × 50 × 20 mm (310g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Adjustable multi-angle height settings for perfect eye-level posture',
      'Open aluminum frame enhances natural laptop heat dissipation',
      'Foldable pocket-size design for easy commuting in backpacks'
    ],
    colors: [
      { name: 'Silver', hex: '#e2e8f0' },
      { name: 'Space Gray', hex: '#334155' }
    ]
  },
  {
    id: 'gh-vertical-laptop-stand',
    name: 'DualSlot Vertical Laptop Dock',
    category: 'Laptop Accessories',
    price: 26.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviewCount: 440,
    imageType: 'laptop_stand',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    tag: 'Desk Saver',
    description: 'Save valuable desk space with an adjustable heavy-duty vertical dock that holds up to two laptops or MacBooks in clamshell mode.',
    specs: {
      compatibility: 'MacBooks, Windows Laptops, Chromebooks (12mm-40mm thickness)',
      powerOrOutput: 'Adjustable screw width slots',
      material: 'Anodized Aluminum & Protective Silicone',
      dimensions: '150 × 120 × 55 mm (480g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Frees up desk real estate while connecting to external monitor',
      'Protective silicone padding prevents scratches on laptop body'
    ]
  },
  {
    id: 'gh-laptop-cooling-pad',
    name: 'AeroCool RGB Laptop Cooling Pad',
    category: 'Laptop Accessories',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviewCount: 380,
    imageType: 'laptop_stand',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    tag: 'Gamer Cooling',
    description: 'High-performance gaming laptop cooling pad with 6 quiet high-speed fans, LCD speed controller, and adjustable height settings.',
    specs: {
      compatibility: 'Laptops up to 17.3 inches',
      powerOrOutput: 'Powered via USB pass-through port',
      material: 'Metal Mesh Grill & ABS Frame',
      dimensions: '380 × 270 × 30 mm (750g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Six ultra-quiet fans rapidly dissipate heat during intense gaming or rendering',
      'Built-in smartphone stand attachment on side'
    ]
  },
  {
    id: 'gh-laptop-sleeve-pouch',
    name: 'Water-Repellent Executive Laptop Sleeve',
    category: 'Laptop Accessories',
    price: 22.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviewCount: 560,
    imageType: 'laptop_stand',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    tag: 'Splashproof',
    description: 'Plush velvet-lined waterproof protective laptop sleeve with accessory zipper pouch for charger, mouse, and cables.',
    specs: {
      compatibility: 'MacBook Air/Pro 13" - 16"',
      powerOrOutput: 'Shock-absorbing Bubble Foam Interior',
      material: 'Cordura Oxford Polyester & YKK Zippers',
      dimensions: 'Custom Fit (220g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Thick plush velvet interior lining cushions against bumps and drops',
      'Extra front pocket stores power adapter and mouse effortlessly'
    ]
  },

  // 8. Smart Accessories (4 products)
  {
    id: 'gh-smart-watch-strap',
    name: 'Titanium Link Smartwatch Band',
    category: 'Smart Accessories',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviewCount: 510,
    imageType: 'smart_watch',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    tag: 'Executive Style',
    description: 'Crafted from aerospace-grade titanium alloy. Lightweight yet incredibly durable link band designed to elevate your smartwatch for formal and casual wear.',
    specs: {
      compatibility: 'Apple Watch Ultra/Series 10/9/8/SE & Galaxy Watch',
      powerOrOutput: 'Adjustable link size with tool included',
      material: 'Grade 2 Solid Titanium & Stainless Steel Clasp',
      dimensions: 'Fits wrist sizes 140mm to 220mm (54g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Hypoallergenic titanium is gentle on skin and completely rust-proof',
      'Secure dual-button folding magnetic clasp prevents accidental drops',
      'Includes link-removal tool for effortless DIY custom sizing'
    ],
    colors: [
      { name: 'Natural Titanium', hex: '#94a3b8' },
      { name: 'Stealth Black', hex: '#1e293b' }
    ]
  },
  {
    id: 'gh-silicone-sport-band',
    name: 'Breathable Sport Loop Smartwatch Band',
    category: 'Smart Accessories',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviewCount: 780,
    imageType: 'smart_watch',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    tag: 'Sweatproof',
    description: 'Soft fluoroelastomer breathable sport band with pin-and-tuck closure designed for intense workouts and swimming.',
    specs: {
      compatibility: 'Apple Watch & Smartwatches with 20mm/22mm lugs',
      powerOrOutput: 'Waterproof & Sweatproof',
      material: 'Fluoroelastomer Rubber',
      dimensions: 'Standard S/M and M/L sizes (22g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Perforated airflow channels keep wrist cool during marathons',
      'Quick-drying material is ideal for swimming and gym use'
    ]
  },
  {
    id: 'gh-apple-watch-charger-stand',
    name: 'NightStand Portable Apple Watch Charger',
    category: 'Smart Accessories',
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.7,
    reviewCount: 310,
    imageType: 'smart_watch',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    tag: 'MFi Magnetic',
    description: 'Pocket-sized magnetic induction charging dongle for Apple Watch with built-in USB-C connector for wireless charging anywhere.',
    specs: {
      compatibility: 'All Apple Watch Series Ultra / 10 / 9 / SE',
      powerOrOutput: '5W Magnetic Induction Charging',
      material: 'ABS Casing & Magnetic Module',
      dimensions: '50 × 40 × 12 mm (25g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Plug directly into any power bank, laptop, or wall charger',
      'Ultra compact keychain hook design for travel convenience'
    ]
  },
  {
    id: 'gh-airtag-leather-loop',
    name: 'ArmorLoop Leather Protective AirTag Case',
    category: 'Smart Accessories',
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.9,
    reviewCount: 650,
    imageType: 'smart_watch',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    tag: 'Secure Key Ring',
    description: 'Genuine leather protective loop holder with spring steel key ring for tracking your keys, luggage, and backpacks with Apple AirTag.',
    specs: {
      compatibility: 'Apple AirTag Tracker',
      powerOrOutput: 'Snug Form-Fit Enclosure',
      material: 'Top-Grain Leather & Stainless Steel Ring',
      dimensions: '90 × 38 mm (14g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Open design showcases Apple logo while keeping tracker secure',
      'Sturdy steel spring gate clasp attaches firmly to bags and keys'
    ]
  },

  // 9. Power Banks (4 products)
  {
    id: 'gh-power-bank-20k',
    name: 'PowerVolt 20,000mAh Power Bank',
    category: 'Power Banks',
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.9,
    reviewCount: 1420,
    imageType: 'power_bank',
    imageUrl: 'https://images.unsplash.com/photo-1609592424155-22d7335d556a?auto=format&fit=crop&w=600&q=80',
    isBestSeller: true,
    isFeatured: true,
    tag: 'Massive Capacity',
    description: 'Keep your gear powered for days. 20,000mAh high-density power bank featuring 65W Power Delivery output capable of fast-charging a MacBook or charging your phone 5 times.',
    specs: {
      compatibility: 'Laptops, Tablets, Smartphones, Drones, Nintendo Switch',
      powerOrOutput: '65W Max USB-C PD Output + Dual USB-A QC Ports',
      material: 'Fire-retardant Matte Polycarbonate Casing',
      dimensions: '150 × 68 × 28 mm (380g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'TSA airline approved capacity for hassle-free carry-on flights',
      'Digital LED screen displays exact remaining battery percentage',
      'Pass-through charging lets you charge the bank while powering devices'
    ],
    colors: [
      { name: 'Matte Black', hex: '#0f172a' },
      { name: 'Titanium White', hex: '#f8fafc' }
    ]
  },
  {
    id: 'gh-magsafe-power-bank',
    name: 'SnapPower 10,000mAh MagSafe Power Bank',
    category: 'Power Banks',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewCount: 920,
    imageType: 'power_bank',
    imageUrl: 'https://images.unsplash.com/photo-1609592424155-22d7335d556a?auto=format&fit=crop&w=600&q=80',
    tag: 'Magnetic Wireless',
    description: 'Magnetic wireless power bank with folding metal kickstand. Snaps to your phone back for wire-free charging while you watch movies on the go.',
    specs: {
      compatibility: 'MagSafe iPhones 12 to 16 series',
      powerOrOutput: '15W Wireless + 20W USB-C PD Wired Output',
      material: 'Soft-touch Silicone & Aluminum Stand',
      dimensions: '105 × 67 × 18 mm (210g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Built-in kickstand props up your phone vertically or horizontally',
      'Strong magnets hold firmly in pocket or bag without detaching'
    ]
  },
  {
    id: 'gh-mini-power-bank-5k',
    name: 'NanoVolt 5,000mAh Lipstick Power Bank',
    category: 'Power Banks',
    price: 24.99,
    originalPrice: 31.99,
    rating: 4.7,
    reviewCount: 510,
    imageType: 'power_bank',
    imageUrl: 'https://images.unsplash.com/photo-1609592424155-22d7335d556a?auto=format&fit=crop&w=600&q=80',
    tag: 'Pocket Size',
    description: 'Ultra-miniature lipstick-sized direct plug-in portable charger with built-in folding USB-C connector. Fits effortlessly in tiny pockets.',
    specs: {
      compatibility: 'USB-C Phones & AirPods',
      powerOrOutput: '20W Fast Power Delivery Output',
      material: 'Matte Polycarbonate',
      dimensions: '78 × 35 × 25 mm (98g)',
      warranty: '1-Year Warranty'
    },
    features: [
      'Built-in foldable connector plugs directly into phone without loose cables',
      'Compact enough to charge phone while holding in one hand'
    ]
  },
  {
    id: 'gh-solar-power-bank',
    name: 'SunVolt 30,000mAh Rugged Solar Power Bank',
    category: 'Power Banks',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviewCount: 290,
    imageType: 'power_bank',
    imageUrl: 'https://images.unsplash.com/photo-1609592424155-22d7335d556a?auto=format&fit=crop&w=600&q=80',
    tag: 'Outdoor Explorer',
    description: 'Heavy duty waterproof solar power bank with built-in emergency LED flashlight, dual solar charging panels, and 4 output cords.',
    specs: {
      compatibility: 'Camping, Hiking, Emergency Preparedness',
      powerOrOutput: '30,000mAh Ultra Capacity with Solar Panel',
      material: 'Shockproof Rubber Armor & IP65 Waterproof',
      dimensions: '170 × 88 × 35 mm (510g)',
      warranty: '2-Year Warranty'
    },
    features: [
      'Recharges via sunlight when outdoors in emergency situations',
      'Ultra bright dual LED flashlight with SOS emergency strobe mode'
    ]
  },

  // 10. Bundles
  {
    id: 'gh-bundle-suite',
    name: 'Better Together Curated Suite',
    category: 'Audio',
    price: 139.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewCount: 418,
    imageType: 'bundle_suite',
    imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
    badge: 'Save 30%',
    tag: 'Curated Bundle',
    description: 'The ultimate all-in-one productivity & audio kit: NoisePro Bluetooth Headphones, 65W GaN Dual Fast Charger, 2.0m Braided USB-C Cable, and hard-shell EVA travel organizer.',
    specs: {
      compatibility: 'Universal Workstation Setup (Apple, Windows, Android)',
      powerOrOutput: '65W GaN Fast Charge + 45h Audio Battery',
      material: 'Water-resistant Ballistic EVA + Brushed Metals',
      dimensions: 'Bundle Travel Pouch: 230 × 170 × 85 mm',
      warranty: '3-Year Complete Suite Warranty'
    },
    features: [
      'Includes NoisePro Headphones, 65W GaN Block, 100W Cable, and Travel Pouch',
      'Save $60 compared to purchasing each accessory separately',
      'Custom molded organizer partitions protect cables and charger pins'
    ]
  },
  {
    id: 'gh-travel-collection',
    name: 'Travel Light Tech Explorer Kit',
    category: 'Charging',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviewCount: 382,
    imageType: 'travel_kit',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    isTravel: true,
    tag: 'Ready for Anywhere',
    description: 'Engineered for seamless world travel: 20,000mAh Power Bank, Ultra-Compact 30W GaN Travel Adapter, Universal International Pins, braided fast cable, and weather-resistant pouch.',
    specs: {
      compatibility: 'Universal Worldwide Plugs (US/UK/EU/AU)',
      powerOrOutput: '20,000mAh High Capacity + 30W GaN Plug',
      material: 'Cordura Water-Repellent Fabric + Matte Composites',
      dimensions: '210 × 140 × 60 mm',
      warranty: '2-Year International Warranty'
    },
    features: [
      'Compact TSA-approved power storage fits neatly under airline seats',
      'Built-in worldwide socket interchange adapters for 150+ countries',
      'YKK splashproof zippers protect electronics against sudden downpours'
    ]
  }
];

export const CATEGORIES = [
  { id: 'Charging', label: 'Charging', imageType: 'gan_charger', imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80' },
  { id: 'Cables', label: 'Cables', imageType: 'usb_cable', imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80' },
  { id: 'Audio', label: 'Audio', imageType: 'headphones', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' },
  { id: 'Cases & Protection', label: 'Cases & Protection', imageType: 'phone_case', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=300&q=80' },
  { id: 'Mounts & Holders', label: 'Mounts & Holders', imageType: 'car_mount', imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=300&q=80' },
  { id: 'Adapters & Hubs', label: 'Adapters & Hubs', imageType: 'usb_hub', imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=300&q=80' },
  { id: 'laptop-accessories', label: 'Laptop Accessories', imageType: 'laptop_stand', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80' },
  { id: 'Smart Accessories', label: 'Smart Accessories', imageType: 'smart_watch', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80' },
  { id: 'Power Banks', label: 'Power Banks', imageType: 'power_bank', imageUrl: 'https://images.unsplash.com/photo-1609592424155-22d7335d556a?auto=format&fit=crop&w=300&q=80' },
];

export const CURRENCIES = {
  USD: { code: 'USD' as const, symbol: '$', rate: 1 },
  EUR: { code: 'EUR' as const, symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP' as const, symbol: '£', rate: 0.79 },
  BDT: { code: 'BDT' as const, symbol: '৳', rate: 120 }
};
