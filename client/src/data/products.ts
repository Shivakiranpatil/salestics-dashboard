export type ProductType = "footwear" | "clothing" | "accessories" | "electronics";
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface ColorOption { name: string; hex: string; }
export interface Specification { label: string; value: string; }

export interface ProductData {
  id: string;
  name: string;
  category: string;
  type: ProductType;
  productId: string;
  price: number;
  discount: string | null;
  rating: number;
  reviews: number;
  sales: number;
  earnings: number;
  stock: number;
  status: StockStatus;
  image: string;
  images: string[];
  color: string;
  initials: string;
  description: string;
  sizes?: string[];
  colors?: ColorOption[];
  details?: string[];
  materials?: string[];
  care?: string[];
  specifications?: Specification[];
}

const SHOE_SIZES = ["US 6","US 6.5","US 7","US 7.5","US 8","US 8.5","US 9","US 9.5","US 10","US 10.5","US 11","US 11.5","US 12"];
const CLOTHING_SIZES = ["XS","S","M","L","XL","XXL"];

export const ALL_PRODUCTS: ProductData[] = [
  {
    id: "1", name: "Classic Leather Jacket", category: "Men's Clothing", type: "clothing",
    productId: "CLJ-1023", price: 50, discount: "12% Off", rating: 4.8, reviews: 250,
    sales: 500, earnings: 25000, stock: 150, status: "In Stock",
    color: "#c8a882", initials: "LJ",
    image: "/products/leather-jacket.png",
    images: ["/products/leather-jacket.png","/products/leather-jacket.png","/products/leather-jacket.png","/products/leather-jacket.png"],
    description: "A timeless classic leather jacket crafted from premium full-grain leather. Features a sleek silhouette with a quilted lining for extra warmth, YKK zippers, and multiple interior pockets. Perfect for layering in any season.",
    sizes: CLOTHING_SIZES,
    colors: [{ name: "Black", hex: "#2a2b2a" },{ name: "Brown", hex: "#8B5E3C" },{ name: "Tan", hex: "#c8a882" }],
    details: ["Style: Moto/Biker","Fit: Regular","Closure: Front zipper","Collar: Band collar with snap","Pockets: 2 front zip + 1 interior"],
    materials: ["Outer: 100% Full-grain leather","Lining: 100% Polyester (quilted)","Hardware: YKK zinc alloy zippers"],
    care: ["Spot clean with a damp cloth","Do not machine wash or tumble dry","Apply leather conditioner every 3–6 months","Store on a wide-shoulder hanger away from sunlight"],
  },
  {
    id: "2", name: "Designer Handbag", category: "Accessories", type: "accessories",
    productId: "DHB-3056", price: 150, discount: "15% Off", rating: 4.7, reviews: 180,
    sales: 350, earnings: 52500, stock: 80, status: "Low Stock",
    color: "#e8c97a", initials: "HB",
    image: "/products/handbag.png",
    images: ["/products/handbag.png","/products/handbag.png","/products/handbag.png","/products/handbag.png"],
    description: "An elegant designer handbag with structured silhouette, gold-tone hardware, and a detachable crossbody strap. Features a spacious interior with zip pockets and card slots.",
    colors: [{ name: "Beige", hex: "#e8c97a" },{ name: "Black", hex: "#2a2b2a" },{ name: "Red", hex: "#cc3333" }],
    details: ["Style: Structured Top-handle","Dimensions: 28 × 20 × 10 cm","Handles: Dual top + detachable strap","Closure: Magnetic snap","Pockets: 1 zip interior, 2 slip, 6 card slots"],
    materials: ["Exterior: Pebble-grain faux leather","Interior: Satin polyester lining","Hardware: Gold-tone zinc alloy"],
    care: ["Wipe with a soft, dry cloth","Avoid water and harsh chemicals","Store in the dust bag when not in use","Keep away from sharp objects to prevent scratches"],
  },
  {
    id: "3", name: "Running Sneakers", category: "Footwear", type: "footwear",
    productId: "RNS-7892", price: 75, discount: null, rating: 4.6, reviews: 320,
    sales: 420, earnings: 31500, stock: 200, status: "In Stock",
    color: "#f4a4a4", initials: "RS",
    image: "/products/sneakers.png",
    images: ["/products/sneakers-1.png","/products/sneakers-2.png","/products/sneakers-3.png","/products/sneakers-4.png"],
    description: "Designed for comfort and performance, these running sneakers are ideal for both casual wear and athletic activities. High-quality materials deliver excellent support and durability whether you're hitting the gym or just strolling.",
    sizes: SHOE_SIZES,
    colors: [{ name: "Black", hex: "#2a2b2a" },{ name: "Orange", hex: "#ff683a" },{ name: "Blue", hex: "#2563eb" }],
    details: ["Style: Athletic/Casual","Pattern: Solid with subtle branding","Closure: Lace-up","Sole: Rubber with grip-enhancing texture","Heel Type: Flat"],
    materials: ["Upper: Breathable mesh and synthetic","Sole: High-grip rubber","Insole: EVA foam cushioning"],
    care: ["Clean with a damp cloth only","Air dry away from direct heat","Avoid prolonged exposure to sunlight","Do not machine wash or tumble dry"],
  },
  {
    id: "4", name: "Men's Denim Jeans", category: "Men's Clothing", type: "clothing",
    productId: "MDJ-2210", price: 30, discount: null, rating: 4.4, reviews: 400,
    sales: 600, earnings: 18000, stock: 0, status: "Out of Stock",
    color: "#7ba7c8", initials: "DJ",
    image: "/products/denim-jeans.png",
    images: ["/products/denim-jeans.png","/products/denim-jeans.png","/products/denim-jeans.png","/products/denim-jeans.png"],
    description: "Classic straight-fit denim jeans made from premium stretch denim. Comfortable, durable, and versatile — a staple for every wardrobe. Available in multiple washes to suit any style.",
    sizes: ["28","30","32","34","36","38"],
    colors: [{ name: "Dark Blue", hex: "#1a3a5c" },{ name: "Light Blue", hex: "#7ba7c8" },{ name: "Black", hex: "#2a2b2a" }],
    details: ["Style: Straight-fit","Rise: Mid-rise","Pockets: 5-pocket style","Fly: Zip with button closure","Wash: Stonewashed"],
    materials: ["98% Cotton, 2% Elastane (stretch denim)","Rivets: Copper-tone zinc alloy","Thread: Contrasting topstitch"],
    care: ["Machine wash cold, inside out","Tumble dry on low heat","Do not bleach","Iron on medium heat if needed","Wash with similar colours"],
  },
  {
    id: "5", name: "Women's Silk Scarf", category: "Accessories", type: "accessories",
    productId: "WSS-3345", price: 40, discount: "5% Off", rating: 4.9, reviews: 100,
    sales: 280, earnings: 11200, stock: 0, status: "Out of Stock",
    color: "#e8a4b8", initials: "SC",
    image: "/products/silk-scarf.png",
    images: ["/products/silk-scarf.png","/products/silk-scarf.png","/products/silk-scarf.png","/products/silk-scarf.png"],
    description: "Luxuriously soft pure silk scarf with a vibrant floral print. Lightweight and versatile, it can be worn as a neck scarf, headband, or tied to a bag for a chic accessory touch.",
    colors: [{ name: "Rose", hex: "#e8a4b8" },{ name: "Ivory", hex: "#f5f0e8" },{ name: "Navy", hex: "#1a2a4a" }],
    details: ["Dimensions: 90 × 90 cm","Print: Digital floral print","Finish: Hand-rolled edges","Style: Square"],
    materials: ["100% Pure mulberry silk (16 momme)","Dyes: AZO-free fabric dyes"],
    care: ["Dry clean recommended","Hand wash in cold water with mild detergent","Do not wring or twist","Lay flat to dry","Iron on low heat through a cloth"],
  },
  {
    id: "6", name: "Designer Sunglasses", category: "Accessories", type: "accessories",
    productId: "DSG-6789", price: 120, discount: "20% Off", rating: 4.8, reviews: 93,
    sales: 150, earnings: 18000, stock: 15, status: "Low Stock",
    color: "#2a2b2a", initials: "SG",
    image: "/products/sunglasses.png",
    images: ["/products/sunglasses.png","/products/sunglasses.png","/products/sunglasses.png","/products/sunglasses.png"],
    description: "Premium designer sunglasses with polarised lenses and a lightweight titanium frame. Offers 100% UV400 protection while delivering timeless style. Comes in a branded hard case.",
    colors: [{ name: "Black", hex: "#2a2b2a" },{ name: "Gold", hex: "#c8a830" },{ name: "Silver", hex: "#a0a0a0" }],
    details: ["Frame: Titanium lightweight","Lenses: Polarised, UV400","Frame Width: 140mm","Bridge: 18mm","Temple: 145mm"],
    materials: ["Frame: Premium titanium alloy","Lenses: CR-39 polarised optical glass","Nose pads: Medical-grade silicone"],
    care: ["Clean lenses with the microfibre cloth provided","Avoid placing face-down on hard surfaces","Store in the hard case when not in use","Do not use paper towels or clothing to clean lenses"],
  },
  {
    id: "7", name: "Eco-Friendly T-Shirt", category: "Women's Clothing", type: "clothing",
    productId: "EFT-4521", price: 20, discount: "Buy 2 Get 1", rating: 4.5, reviews: 150,
    sales: 800, earnings: 16000, stock: 500, status: "In Stock",
    color: "#7ab8a0", initials: "TS",
    image: "/products/tshirt.png",
    images: ["/products/tshirt.png","/products/tshirt.png","/products/tshirt.png","/products/tshirt.png"],
    description: "Soft and breathable eco-friendly T-shirt made from 100% organic cotton. Ethically produced with GOTS-certified fabric and low-impact dyes. A comfortable everyday essential that's kind to the planet.",
    sizes: CLOTHING_SIZES,
    colors: [{ name: "Sage", hex: "#7ab8a0" },{ name: "White", hex: "#f5f5f5" },{ name: "Blush", hex: "#e8c4b8" }],
    details: ["Fit: Relaxed","Neckline: Crew neck","Sleeve: Short sleeve","Certification: GOTS certified organic","Print: Water-based ink"],
    materials: ["100% Organic cotton (180 GSM)","Dyes: Low-impact, AZO-free"],
    care: ["Machine wash cold (30°C)","Tumble dry on low","Do not bleach","Iron on low if needed","Wash inside out to preserve colour"],
  },
  {
    id: "8", name: "Casual Slip-On Shoes", category: "Footwear", type: "footwear",
    productId: "CSS-9821", price: 55, discount: null, rating: 4.3, reviews: 90,
    sales: 220, earnings: 12100, stock: 250, status: "In Stock",
    color: "#c8b4a0", initials: "CS",
    image: "/products/slip-on-shoes.png",
    images: ["/products/slip-on-shoes.png","/products/slip-on-shoes.png","/products/slip-on-shoes.png","/products/slip-on-shoes.png"],
    description: "Easy slip-on shoes with a flexible rubber sole and a comfortable foam footbed. Ideal for everyday casual wear, errands, or light walks. Simply step in and go.",
    sizes: SHOE_SIZES,
    colors: [{ name: "Tan", hex: "#c8b4a0" },{ name: "Navy", hex: "#1a2a4a" },{ name: "Black", hex: "#2a2b2a" }],
    details: ["Style: Slip-on loafer","Closure: Elastic gore panels","Sole: Flexible rubber","Insole: Memory foam footbed","Toe: Round"],
    materials: ["Upper: Canvas and synthetic blend","Sole: Flexible vulcanised rubber","Insole: Removable memory foam"],
    care: ["Spot clean canvas with damp cloth and mild soap","Air dry only — do not use direct heat","Remove insoles and wash separately","Use a shoe brush for stubborn stains"],
  },
  {
    id: "9", name: "Luxury Wristwatch", category: "Accessories", type: "accessories",
    productId: "LWW-7310", price: 250, discount: null, rating: 4.9, reviews: 70,
    sales: 80, earnings: 20000, stock: 0, status: "Out of Stock",
    color: "#888888", initials: "WW",
    image: "/products/sunglasses.png",
    images: ["/products/sunglasses.png","/products/sunglasses.png","/products/sunglasses.png","/products/sunglasses.png"],
    description: "Elegant Swiss-inspired luxury wristwatch with a sapphire crystal face, stainless steel case, and a genuine leather strap. Water-resistant to 50m, featuring a precision quartz movement.",
    details: ["Case Diameter: 40mm","Case Thickness: 9mm","Water Resistance: 50m","Movement: Swiss quartz","Lug Width: 20mm"],
    materials: ["Case: 316L stainless steel","Crystal: Scratch-resistant sapphire","Strap: Genuine Italian leather","Buckle: Stainless steel pin buckle"],
    care: ["Wipe case with a soft, dry cloth","Rinse strap with clean water if exposed to saltwater","Service movement every 3–5 years","Store in the box away from magnets","Replace battery every 2–3 years"],
  },
  {
    id: "10", name: "Women's Summer Dress", category: "Women's Clothing", type: "clothing",
    productId: "WSD-5623", price: 45, discount: null, rating: 4.6, reviews: 140,
    sales: 400, earnings: 18000, stock: 100, status: "In Stock",
    color: "#e8c4d4", initials: "SD",
    image: "/products/silk-scarf.png",
    images: ["/products/silk-scarf.png","/products/silk-scarf.png","/products/silk-scarf.png","/products/silk-scarf.png"],
    description: "A breezy, flowy summer dress perfect for warm days. Features an adjustable tie waist, V-neckline, and a midi length. Made from lightweight chiffon that moves beautifully in the breeze.",
    sizes: CLOTHING_SIZES,
    colors: [{ name: "Blush", hex: "#e8c4d4" },{ name: "Sky Blue", hex: "#a0c8e8" },{ name: "Lemon", hex: "#f0e080" }],
    details: ["Style: Midi dress","Neckline: V-neck","Sleeve: Spaghetti straps","Waist: Adjustable tie belt","Length: Midi (below knee)"],
    materials: ["100% Polyester chiffon (lightweight)","Lining: 100% Polyester"],
    care: ["Hand wash in cold water","Do not tumble dry — hang to dry","Iron on low heat if needed","Do not bleach","Dry clean acceptable"],
  },
  {
    id: "11", name: "Wireless Bluetooth Headphones", category: "Electronics", type: "electronics",
    productId: "WHB-1001", price: 89, discount: "10% Off", rating: 4.7, reviews: 410,
    sales: 630, earnings: 56070, stock: 85, status: "In Stock",
    color: "#4a90d9", initials: "BH",
    image: "/products/sunglasses.png",
    images: ["/products/sunglasses.png","/products/sunglasses.png","/products/sunglasses.png","/products/sunglasses.png"],
    description: "Premium over-ear wireless headphones with active noise cancellation, 40-hour battery life, and a foldable design. Hi-Fi sound with deep bass and crystal-clear highs. Compatible with all Bluetooth 5.0 devices.",
    details: ["Type: Over-ear, closed-back","ANC: Active noise cancellation","Foldable: Yes","Microphone: Built-in with call support","Driver Size: 40mm dynamic"],
    specifications: [
      { label: "Connectivity", value: "Bluetooth 5.0 / 3.5mm aux" },
      { label: "Driver Size", value: "40mm dynamic" },
      { label: "Frequency Response", value: "20Hz – 20kHz" },
      { label: "Battery Life", value: "Up to 40 hours" },
      { label: "Charging", value: "USB-C, 2h full charge" },
      { label: "Weight", value: "250g" },
      { label: "ANC", value: "Active noise cancellation" },
      { label: "Warranty", value: "1 year manufacturer" },
    ],
    care: ["Store in the included carrying case when not in use","Clean ear cups with a slightly damp cloth","Avoid exposing to rain or moisture","Do not fold forcefully — use the designed folding mechanism","Keep away from extreme heat or cold"],
  },
  {
    id: "12", name: "Portable Bluetooth Speaker", category: "Electronics", type: "electronics",
    productId: "PBS-3003", price: 49, discount: "5% Off", rating: 4.5, reviews: 290,
    sales: 510, earnings: 24990, stock: 200, status: "In Stock",
    color: "#e05c30", initials: "BS",
    image: "/products/slip-on-shoes.png",
    images: ["/products/slip-on-shoes.png","/products/slip-on-shoes.png","/products/slip-on-shoes.png","/products/slip-on-shoes.png"],
    description: "Compact, waterproof Bluetooth speaker delivering 360° rich sound with punchy bass. IPX7 water-resistant, 24-hour battery life, and a built-in carabiner for outdoor adventures.",
    details: ["Form Factor: Cylindrical portable","360° Sound: Yes","IPX7: Waterproof","Speakerphone: Built-in mic","Carabiner: Included"],
    specifications: [
      { label: "Output Power", value: "20W RMS" },
      { label: "Connectivity", value: "Bluetooth 5.1" },
      { label: "Frequency Range", value: "60Hz – 20kHz" },
      { label: "Battery Life", value: "Up to 24 hours" },
      { label: "Charging", value: "USB-C, 3h full charge" },
      { label: "Water Resistance", value: "IPX7 (submersible 1m/30min)" },
      { label: "Weight", value: "540g" },
      { label: "Warranty", value: "1 year manufacturer" },
    ],
    care: ["Rinse with fresh water after saltwater exposure","Dry thoroughly before charging","Store in a cool, dry place","Do not drop from height — internal components may shift","Keep charging port covered when not in use"],
  },
  {
    id: "13", name: "Smart 4K LED TV 55\"", category: "Electronics", type: "electronics",
    productId: "STV-2002", price: 499, discount: "15% Off", rating: 4.6, reviews: 185,
    sales: 120, earnings: 59880, stock: 30, status: "Low Stock",
    color: "#333333", initials: "TV",
    image: "/products/denim-jeans.png",
    images: ["/products/denim-jeans.png","/products/denim-jeans.png","/products/denim-jeans.png","/products/denim-jeans.png"],
    description: "55-inch 4K UHD Smart TV with a vivid VA panel, Dolby Vision HDR, and built-in streaming apps. Features voice control, 3 HDMI ports, and a thin bezel design to complement any living space.",
    details: ["Screen Size: 55 inches","Panel: VA, edge-lit LED","Resolution: 3840 × 2160 (4K UHD)","HDR: Dolby Vision, HDR10, HLG","Smart Platform: Android TV 11"],
    specifications: [
      { label: "Screen Size", value: "55 inches" },
      { label: "Resolution", value: "4K UHD (3840 × 2160)" },
      { label: "Refresh Rate", value: "60Hz (120Hz motion enhancement)" },
      { label: "HDR", value: "Dolby Vision, HDR10, HLG" },
      { label: "Smart OS", value: "Android TV 11" },
      { label: "HDMI Ports", value: "3 × HDMI 2.1" },
      { label: "USB Ports", value: "2 × USB 3.0" },
      { label: "Warranty", value: "2 years manufacturer" },
    ],
    care: ["Clean screen with a dry microfibre cloth only","Never spray liquid directly on the screen","Ensure adequate ventilation around the TV","Power off during lightning storms","Do not block ventilation slots on rear panel"],
  },
];

export function getProductByProductId(productId: string): ProductData | undefined {
  return ALL_PRODUCTS.find(p => p.productId === productId);
}

export function getProductById(id: string): ProductData | undefined {
  return ALL_PRODUCTS.find(p => p.id === id);
}
