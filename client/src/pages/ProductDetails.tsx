import { useState } from "react";
import { Link, useParams } from "wouter";
import {
  ArrowLeft, ChevronLeft, ChevronRight, Star, SlidersHorizontal,
  ChevronDown, ChevronUp, Pencil, Ruler, X, Save, Plus,
} from "lucide-react";
import { getProductByProductId, ProductData, ColorOption, Specification } from "@/data/products";

const SHOE_SIZES = ["US 6","US 6.5","US 7","US 7.5","US 8","US 8.5","US 9","US 9.5","US 10","US 10.5","US 11","US 11.5","US 12"];
const CLOTHING_SIZES = ["XS","S","M","L","XL","XXL"];

const REVIEWS = [
  { id: 1, name: "John Doe",      avatar: "/products/reviewer-1.png", rating: 5.0, date: "25 Jul 28", text: "Absolutely love this product! Great quality and it arrived quickly. Will definitely be buying again." },
  { id: 2, name: "Sarah Lee",     avatar: "/products/reviewer-2.png", rating: 4.5, date: "14 Aug 28", text: "Really impressed with the quality. Fits perfectly and looks exactly like the pictures. Highly recommend." },
  { id: 3, name: "Michael Brown", avatar: "/products/reviewer-3.png", rating: 4.0, date: "1 Sep 28",  text: "Good value for the price. Sturdy and well-made. Took a little while to arrive but worth the wait." },
];

const CATEGORY_BADGE: Record<string, string> = {
  footwear:    "bg-[#d2ebff] text-[#2a6fa8]",
  clothing:    "bg-[#e2d7fa] text-[#5b21b6]",
  accessories: "bg-[#d1fae5] text-[#065f46]",
  electronics: "bg-[#fff3e0] text-[#c45400]",
};

/* ── Sub-components ── */
function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <span key={i} className="relative" style={{ width: size, height: size }}>
            <Star size={size} className="text-[#e8e8e8]" fill="#e8e8e8" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: filled ? "100%" : half ? "50%" : "0%" }}>
              <Star size={size} className="text-[#f59e0b]" fill="#f59e0b" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function AccordionSection({ title, items, numbered = false }: { title: string; items: string[]; numbered?: boolean }) {
  const [open, setOpen] = useState(true);
  if (!items || items.length === 0) return null;
  return (
    <div className="border-t border-[#f0f0f0]">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between py-3 text-left"
        data-testid={`accordion-${title.toLowerCase().replace(/\s/g, "-")}`}
      >
        <span className="text-[13px] font-semibold text-[#2a2b2a]">{title}</span>
        {open ? <ChevronUp size={15} className="text-[#8c8d8c] shrink-0" /> : <ChevronDown size={15} className="text-[#8c8d8c] shrink-0" />}
      </button>
      {open && (
        <ul className="mb-3 flex flex-col gap-1.5 pl-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-[#555] leading-snug">
              {numbered
                ? <span className="shrink-0 text-[#8c8d8c]">{i + 1}.</span>
                : <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8c8d8c]" />}
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PageFooter() {
  return (
    <div className="flex items-center justify-between pt-1 pb-2">
      <div className="flex items-center gap-5 text-[12px]">
        <span className="font-semibold text-[#555]">Copyright © 2024 Peterdraw</span>
        {["Privacy Policy","Term and conditions","Contact"].map(t => (
          <span key={t} className="cursor-pointer text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors">{t}</span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button className="text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors"><svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]"><path d="M18 10a8 8 0 1 0-9.25 7.903V12.75H7v-2.75h1.75V8.25C8.75 6.455 9.846 5.5 11.5 5.5c.827 0 1.5.062 1.5.062v1.75h-.844c-.832 0-1.156.516-1.156 1.047V10H13l-.313 2.75h-1.937v5.153A8.001 8.001 0 0 0 18 10Z"/></svg></button>
        <button className="text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors"><svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]"><path d="M11.902 8.767 17.517 2h-1.335L11.3 7.882 7.194 2H2.5l5.9 8.585L2.5 18h1.335l5.158-5.993L13.304 18H18l-6.098-9.233Zm-1.826 2.122-.598-.855-4.757-6.803h2.049l3.842 5.494.598.855 4.992 7.138h-2.05l-4.076-5.83Z"/></svg></button>
        <button className="text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors"><svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]"><path d="M10 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 13.056 2 12.717 2 10c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 10 2Zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.987.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.987-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058ZM10 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.802a2.198 2.198 0 1 0 0 4.396 2.198 2.198 0 0 0 0-4.396Zm4.204-3.204a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92Z"/></svg></button>
        <button className="text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors"><svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]"><path d="M18.54 5.34A2.34 2.34 0 0 0 16.9 3.7C15.5 3.33 10 3.33 10 3.33s-5.5 0-6.9.37A2.34 2.34 0 0 0 1.46 5.34 24.36 24.36 0 0 0 1.1 10a24.36 24.36 0 0 0 .37 4.66A2.34 2.34 0 0 0 3.1 16.3c1.4.37 6.9.37 6.9.37s5.5 0 6.9-.37a2.34 2.34 0 0 0 1.64-1.64A24.36 24.36 0 0 0 18.9 10a24.36 24.36 0 0 0-.36-4.66ZM8.17 12.73V7.27L12.9 10l-4.73 2.73Z"/></svg></button>
        <button className="text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors"><svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]"><path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014V7.86h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.599ZM4.558 6.685a1.548 1.548 0 1 1 0-3.095 1.548 1.548 0 0 1 0 3.095ZM5.892 16.338H3.225V7.86h2.667v8.478ZM17.668 2H2.328C1.595 2 1 2.581 1 3.298v13.404C1 17.42 1.595 18 2.328 18h15.34C18.406 18 19 17.42 19 16.702V3.298C19 2.581 18.406 2 17.668 2Z"/></svg></button>
      </div>
    </div>
  );
}

/* ── Edit Panel ── */
function EditPanel({ product, onSave, onClose }: { product: ProductData; onSave: (p: ProductData) => void; onClose: () => void }) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState(String(product.stock));
  const [description, setDescription] = useState(product.description);
  const [discount, setDiscount] = useState(product.discount || "");
  const [materials, setMaterials] = useState((product.materials || []).join("\n"));
  const [care, setCare] = useState((product.care || []).join("\n"));
  const [details, setDetails] = useState((product.details || []).join("\n"));
  const [sizes, setSizes] = useState<string[]>(product.sizes || []);
  const [colors, setColors] = useState<ColorOption[]>(product.colors || []);
  const [specs, setSpecs] = useState<Specification[]>(product.specifications || []);
  const [images, setImages] = useState<string[]>(product.images || []);

  const allSizes = product.type === "footwear" ? SHOE_SIZES : CLOTHING_SIZES;

  function toggleSize(s: string) {
    setSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const urls = files.map(f => URL.createObjectURL(f));
    setImages(prev => [...prev, ...urls].slice(0, 4));
    e.target.value = "";
  }

  function handleSave() {
    const mainImage = images[0] || product.image;
    onSave({
      ...product,
      name,
      category,
      price: parseFloat(price) || product.price,
      stock: parseInt(stock, 10) >= 0 ? parseInt(stock, 10) : product.stock,
      description,
      discount: discount.trim() || null,
      image: mainImage,
      images: images.length ? images : product.images,
      sizes: sizes.length ? sizes : undefined,
      colors: colors.length ? colors : undefined,
      specifications: specs.length ? specs : undefined,
      details: details.split("\n").filter(s => s.trim()),
      materials: materials.split("\n").filter(s => s.trim()),
      care: care.split("\n").filter(s => s.trim()),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-[420px] h-full bg-white overflow-y-auto flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0f0] sticky top-0 bg-white z-10">
          <h2 className="text-[16px] font-bold text-[#2a2b2a]">Edit Product</h2>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#f3f3f3] transition-colors" data-testid="button-edit-close">
            <X size={16} className="text-[#8c8d8c]" />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-5 flex-1">

          {/* Images */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Product Images</p>
            <div className="flex flex-wrap gap-2">
              {images.map((src, i) => (
                <div key={i} className="relative h-[72px] w-[72px] rounded-[6px] overflow-hidden border border-[#e8e8e8] bg-[#f6f7f6] shrink-0">
                  <img src={src} alt="" className="w-full h-full object-contain p-1" />
                  {i === 0 && <span className="absolute bottom-0.5 left-0.5 rounded-[3px] bg-[#ff683a] px-1 py-0.5 text-[9px] font-semibold text-white leading-none">Main</span>}
                  <button onClick={() => setImages(prev => prev.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                    <X size={9} className="text-white" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="flex h-[72px] w-[72px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[6px] border-2 border-dashed border-[#e8e8e8] bg-[#fafafa] hover:border-[#ff683a] hover:bg-[#fff5f2] transition-colors shrink-0" data-testid="label-upload-image">
                  <Plus size={16} className="text-[#8c8d8c]" />
                  <span className="text-[10px] text-[#8c8d8c] text-center leading-tight">Add<br/>Image</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
            <p className="text-[11px] text-[#c0c0c0]">First image is shown as the main display image. Up to 4 images.</p>
          </div>

          {/* Basic Info */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Basic Info</p>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Product Name</span>
              <input value={name} onChange={e => setName(e.target.value)} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2 text-[13px] outline-none focus:border-[#ff683a] transition-colors" data-testid="input-edit-name" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Category</span>
              <input value={category} onChange={e => setCategory(e.target.value)} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2 text-[13px] outline-none focus:border-[#ff683a] transition-colors" data-testid="input-edit-category" />
            </label>
            <div className="flex gap-3">
              <label className="flex flex-1 flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#2a2b2a]">Price (₹)</span>
                <input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2 text-[13px] outline-none focus:border-[#ff683a] transition-colors" data-testid="input-edit-price" />
              </label>
              <label className="flex flex-1 flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#2a2b2a]">Stock</span>
                <input type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2 text-[13px] outline-none focus:border-[#ff683a] transition-colors" data-testid="input-edit-stock" />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Discount Label <span className="text-[#c0c0c0] font-normal">(optional)</span></span>
              <input value={discount} onChange={e => setDiscount(e.target.value)} placeholder="e.g. 10% Off" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2 text-[13px] outline-none focus:border-[#ff683a] transition-colors placeholder:text-[#c0c0c0]" data-testid="input-edit-discount" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Description</span>
              <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2 text-[13px] outline-none focus:border-[#ff683a] transition-colors resize-none leading-relaxed" data-testid="input-edit-description" />
            </label>
          </div>

          {/* Sizes — footwear / clothing only */}
          {(product.type === "footwear" || product.type === "clothing") && (
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Available Sizes</p>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map(s => (
                  <button key={s} type="button" onClick={() => toggleSize(s)}
                    className={`rounded-[5px] border px-2 py-1 text-[11px] font-medium transition-colors ${sizes.includes(s) ? "border-[#ff683a] bg-[#ff683a] text-white" : "border-[#e8e8e8] text-[#555] hover:border-[#ff683a] hover:text-[#ff683a]"}`}
                    data-testid={`toggle-size-${s.replace(/\s/g, "-")}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors — non-electronics only */}
          {product.type !== "electronics" && (
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Colors</p>
              <div className="flex flex-col gap-2">
                {colors.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-[4px] border border-[#e8e8e8] shrink-0" style={{ backgroundColor: c.hex }} />
                    <input value={c.name} onChange={e => setColors(prev => prev.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} className="flex-1 rounded-[5px] border border-[#e8e8e8] px-2 py-1 text-[12px] outline-none focus:border-[#ff683a]" />
                    <input type="color" value={c.hex} onChange={e => setColors(prev => prev.map((x, j) => j === i ? { ...x, hex: e.target.value } : x))} className="h-7 w-7 cursor-pointer rounded border-0 p-0" />
                    <button onClick={() => setColors(prev => prev.filter((_, j) => j !== i))} className="flex h-6 w-6 items-center justify-center rounded hover:bg-[#ffe5e5] transition-colors">
                      <X size={12} className="text-[#8c8d8c]" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => setColors(prev => [...prev, { name: "New Color", hex: "#cccccc" }])}
                  className="flex w-fit items-center gap-1.5 rounded-[6px] border border-dashed border-[#e8e8e8] px-3 py-1.5 text-[11px] text-[#8c8d8c] hover:border-[#ff683a] hover:text-[#ff683a] transition-colors"
                  data-testid="button-add-color">
                  <Plus size={11} /> Add Color
                </button>
              </div>
            </div>
          )}

          {/* Specifications — electronics only */}
          {product.type === "electronics" && (
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Specifications</p>
              <div className="flex flex-col gap-2">
                {specs.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input value={s.label} onChange={e => setSpecs(prev => prev.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} placeholder="Label" className="w-[120px] shrink-0 rounded-[5px] border border-[#e8e8e8] px-2 py-1 text-[11px] outline-none focus:border-[#ff683a]" />
                    <input value={s.value} onChange={e => setSpecs(prev => prev.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="Value" className="flex-1 rounded-[5px] border border-[#e8e8e8] px-2 py-1 text-[11px] outline-none focus:border-[#ff683a]" />
                    <button onClick={() => setSpecs(prev => prev.filter((_, j) => j !== i))} className="flex h-6 w-6 items-center justify-center rounded hover:bg-[#ffe5e5] transition-colors">
                      <X size={12} className="text-[#8c8d8c]" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => setSpecs(prev => [...prev, { label: "", value: "" }])}
                  className="flex w-fit items-center gap-1.5 rounded-[6px] border border-dashed border-[#e8e8e8] px-3 py-1.5 text-[11px] text-[#8c8d8c] hover:border-[#ff683a] hover:text-[#ff683a] transition-colors"
                  data-testid="button-add-spec">
                  <Plus size={11} /> Add Spec
                </button>
              </div>
            </div>
          )}

          {/* Product Details */}
          <label className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Product Details</p>
            <span className="text-[11px] text-[#c0c0c0]">One item per line</span>
            <textarea rows={4} value={details} onChange={e => setDetails(e.target.value)} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2 text-[12px] outline-none focus:border-[#ff683a] transition-colors resize-none" data-testid="input-edit-details" />
          </label>

          {/* Materials */}
          <label className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Materials</p>
            <span className="text-[11px] text-[#c0c0c0]">One item per line</span>
            <textarea rows={3} value={materials} onChange={e => setMaterials(e.target.value)} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2 text-[12px] outline-none focus:border-[#ff683a] transition-colors resize-none" data-testid="input-edit-materials" />
          </label>

          {/* Care */}
          <label className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Care Instructions</p>
            <span className="text-[11px] text-[#c0c0c0]">One item per line</span>
            <textarea rows={3} value={care} onChange={e => setCare(e.target.value)} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2 text-[12px] outline-none focus:border-[#ff683a] transition-colors resize-none" data-testid="input-edit-care" />
          </label>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-[#f0f0f0] px-5 py-4 flex gap-3">
          <button onClick={handleSave} className="flex flex-1 items-center justify-center gap-1.5 rounded-[7px] bg-[#ff683a] py-2.5 text-[13px] font-semibold text-white hover:bg-[#e85a2e] transition-colors" data-testid="button-edit-save">
            <Save size={14} /> Save Changes
          </button>
          <button onClick={onClose} className="flex flex-1 items-center justify-center rounded-[7px] border border-[#e8e8e8] py-2.5 text-[13px] font-medium text-[#555] hover:bg-[#f3f3f3] transition-colors" data-testid="button-edit-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export function ProductDetails() {
  const params = useParams<{ id: string }>();
  const found = getProductByProductId(params.id || "");
  const [product, setProduct] = useState<ProductData | undefined>(found);
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedSize, setSelectedSize] = useState(() => product?.sizes?.[4] ?? "");
  const [selectedColor, setSelectedColor] = useState(() => product?.colors?.[0]?.name ?? "");
  const [reviewPage, setReviewPage] = useState(1);
  const [editOpen, setEditOpen] = useState(false);
  const totalReviewPages = 14;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-[18px] font-semibold text-[#2a2b2a]">Product not found</p>
        <Link href="/products" className="flex items-center gap-1.5 rounded-[7px] bg-[#ff683a] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#e85a2e] transition-colors">
          <ArrowLeft size={14} /> Back to Products
        </Link>
      </div>
    );
  }

  const thumbnails = product.images;
  const badgeClass = CATEGORY_BADGE[product.type] ?? "bg-[#f0f0f0] text-[#555]";
  const hasSize = (product.type === "footwear" || product.type === "clothing") && product.sizes && product.sizes.length > 0;
  const hasColor = product.type !== "electronics" && product.colors && product.colors.length > 0;
  const hasSpecs = product.type === "electronics" && product.specifications && product.specifications.length > 0;

  function handleSave(updated: ProductData) {
    setProduct(updated);
    setEditOpen(false);
  }

  return (
    <div className="flex flex-col gap-5 min-h-full">
      {editOpen && <EditPanel product={product} onSave={handleSave} onClose={() => setEditOpen(false)} />}

      {/* Back nav + title */}
      <div>
        <Link href="/products" className="inline-flex items-center gap-1.5 text-[12px] text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors mb-2" data-testid="link-back-to-products">
          <ArrowLeft size={13} /> Back to Product List
        </Link>
        <h1 className="text-[22px] font-bold text-[#2a2b2a] leading-tight">Product Details</h1>
      </div>

      {/* Two-column body */}
      <div className="flex gap-5 items-start">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4 w-[340px] shrink-0">

          {/* Image gallery */}
          <div className="rounded-[10px] bg-[#fdfcff] border border-[#f0f0f0] overflow-hidden">
            <div className="flex gap-3 p-3">
              <div className="flex flex-col gap-2 shrink-0">
                {thumbnails.map((src, i) => (
                  <button key={i} onClick={() => setActiveThumb(i)}
                    className={`h-[66px] w-[66px] rounded-[6px] overflow-hidden border-2 transition-colors bg-[#f6f7f6] ${activeThumb === i ? "border-[#ff683a]" : "border-[#f0f0f0] hover:border-[#e0e0e0]"}`}
                    data-testid={`thumb-${i}`}>
                    <img src={src} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
              <div className="relative flex-1 rounded-[8px] bg-[#f6f7f6] overflow-hidden" style={{ minHeight: 290 }}>
                <img src={thumbnails[activeThumb]} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-4" />
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                  <button onClick={() => setActiveThumb(i => (i - 1 + thumbnails.length) % thumbnails.length)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-[#e8e8e8] shadow-sm hover:bg-[#f3f3f3] transition-colors" data-testid="button-prev-image">
                    <ChevronLeft size={14} className="text-[#555]" />
                  </button>
                  <button onClick={() => setActiveThumb(i => (i + 1) % thumbnails.length)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-[#e8e8e8] shadow-sm hover:bg-[#f3f3f3] transition-colors" data-testid="button-next-image">
                    <ChevronRight size={14} className="text-[#555]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings & Reviews */}
          <div className="rounded-[10px] bg-[#fdfcff] border border-[#f0f0f0] p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#2a2b2a]">Rating & Reviews</h2>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-[6px] border border-[#e8e8e8] px-2.5 py-1.5 text-[11px] font-medium text-[#555] hover:bg-[#f3f3f3] transition-colors" data-testid="button-review-filters">
                  <SlidersHorizontal size={11} /> Filters
                </button>
                <button className="flex items-center gap-1 rounded-[6px] border border-[#e8e8e8] px-2.5 py-1.5 text-[11px] font-medium text-[#555] hover:bg-[#f3f3f3] transition-colors" data-testid="button-review-sort">
                  Newest <ChevronDown size={11} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[36px] font-bold text-[#2a2b2a] leading-none">{product.rating}</span>
                <StarRating rating={product.rating} size={16} />
                <span className="text-[10px] text-[#8c8d8c] text-center">Based on {product.reviews} Reviews</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {REVIEWS.map(review => (
                <div key={review.id} className="flex flex-col gap-2 border-t border-[#f5f5f5] pt-3 first:border-t-0 first:pt-0" data-testid={`review-${review.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-[#d2ebff] shrink-0">
                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[13px] font-semibold text-[#2a2b2a]">{review.name}</span>
                    </div>
                    <span className="text-[11px] text-[#8c8d8c]">{review.date}</span>
                  </div>
                  <StarRating rating={review.rating} size={13} />
                  <p className="text-[12px] text-[#555] leading-snug">{review.text}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1 border-t border-[#f0f0f0] pt-3">
              <button onClick={() => setReviewPage(p => Math.max(1, p - 1))} disabled={reviewPage === 1} className="flex h-7 w-7 items-center justify-center rounded text-[#8c8d8c] hover:bg-[#f3f3f3] disabled:opacity-30 transition-colors" data-testid="button-review-prev">
                <ChevronLeft size={14} />
              </button>
              {[1, 2, 3].map(p => (
                <button key={p} onClick={() => setReviewPage(p)} className={`flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium transition-colors ${reviewPage === p ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`} data-testid={`button-review-page-${p}`}>{p}</button>
              ))}
              <span className="flex h-7 w-7 items-center justify-center text-[12px] text-[#8c8d8c]">…</span>
              <button onClick={() => setReviewPage(totalReviewPages)} className={`flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium transition-colors ${reviewPage === totalReviewPages ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`} data-testid="button-review-page-last">{totalReviewPages}</button>
              <button onClick={() => setReviewPage(p => Math.min(totalReviewPages, p + 1))} disabled={reviewPage === totalReviewPages} className="flex h-7 w-7 items-center justify-center rounded text-[#8c8d8c] hover:bg-[#f3f3f3] disabled:opacity-30 transition-colors" data-testid="button-review-next">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-1 flex-col gap-4 min-w-0">
          <div className="rounded-[10px] bg-[#fdfcff] border border-[#f0f0f0] p-5 flex flex-col gap-4">

            {/* Category badge + Edit */}
            <div className="flex items-start justify-between gap-3">
              <span className={`inline-flex items-center rounded-[5px] px-2.5 py-1 text-[11px] font-medium ${badgeClass}`}>
                {product.category}
              </span>
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-1.5 rounded-[6px] bg-[#ff683a] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#e85a2e] transition-colors shrink-0"
                data-testid="button-edit-product"
              >
                <Pencil size={11} /> Edit
              </button>
            </div>

            {/* Title + ID */}
            <div>
              <h2 className="text-[22px] font-bold text-[#2a2b2a] leading-tight">{product.name}</h2>
              <p className="text-[12px] text-[#8c8d8c] mt-0.5">Product ID: {product.productId}</p>
            </div>

            {/* Description */}
            <p className="text-[12px] text-[#555] leading-relaxed">{product.description}</p>

            {/* Price + Stock */}
            <div className="flex items-start gap-10">
              <div>
                <p className="text-[11px] text-[#8c8d8c] mb-0.5">Price</p>
                <p className="text-[24px] font-bold text-[#2a2b2a] leading-none">₹{product.price.toLocaleString("en-IN")}</p>
                {product.discount && (
                  <span className="inline-flex mt-1 rounded-[4px] bg-[#d1fae5] px-1.5 py-0.5 text-[10px] font-medium text-[#065f46]">{product.discount}</span>
                )}
              </div>
              <div>
                <p className="text-[11px] text-[#8c8d8c] mb-0.5">Stock</p>
                <p className="text-[24px] font-bold text-[#2a2b2a] leading-none">{product.stock}</p>
              </div>
            </div>

            <div className="border-t border-[#f0f0f0]" />

            {/* Size selector — footwear / clothing only */}
            {hasSize && (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#2a2b2a]">Size</span>
                  {product.type === "footwear" && (
                    <button className="flex items-center gap-1 text-[11px] text-[#ff683a] font-medium hover:underline" data-testid="button-size-guide">
                      <Ruler size={11} /> Size Guide
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes!.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`rounded-[6px] border px-2.5 py-1.5 text-[11px] font-medium transition-colors ${selectedSize === size ? "border-[#ff683a] bg-[#ff683a] text-white" : "border-[#e8e8e8] bg-[#fdfcff] text-[#2a2b2a] hover:border-[#ff683a] hover:text-[#ff683a]"}`}
                      data-testid={`button-size-${size.replace(/\s/g, "-")}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector — non-electronics only */}
            {hasColor && (
              <div className="flex flex-col gap-2.5">
                <span className="text-[13px] font-semibold text-[#2a2b2a]">Color</span>
                <div className="flex items-center gap-2.5">
                  {product.colors!.map(color => (
                    <button key={color.name} onClick={() => setSelectedColor(color.name)} title={color.name}
                      className={`h-8 w-8 rounded-[6px] transition-all ${selectedColor === color.name ? "ring-2 ring-offset-2 ring-[#ff683a]" : "hover:ring-2 hover:ring-offset-2 hover:ring-[#ccc]"}`}
                      style={{ backgroundColor: color.hex }}
                      data-testid={`button-color-${color.name.toLowerCase().replace(/\s/g, "-")}`} />
                  ))}
                  <span className="text-[12px] text-[#8c8d8c]">{selectedColor}</span>
                </div>
              </div>
            )}

            {/* Specifications table — electronics only */}
            {hasSpecs && (
              <div className="flex flex-col gap-2.5">
                <span className="text-[13px] font-semibold text-[#2a2b2a]">Specifications</span>
                <div className="rounded-[7px] border border-[#f0f0f0] overflow-hidden">
                  {product.specifications!.map((spec, i) => (
                    <div key={i} className={`flex items-start gap-4 px-4 py-2.5 text-[12px] ${i % 2 === 0 ? "bg-[#fafafa]" : "bg-[#fdfcff]"}`}>
                      <span className="w-[140px] shrink-0 text-[#8c8d8c] font-medium">{spec.label}</span>
                      <span className="text-[#2a2b2a]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accordion sections — shown based on available data */}
            {product.details && product.details.length > 0 && (
              <AccordionSection title="Product Details" items={product.details} />
            )}
            {product.materials && product.materials.length > 0 && (
              <AccordionSection title="Materials" items={product.materials} />
            )}
            {product.care && product.care.length > 0 && (
              <AccordionSection title="Care Instructions" items={product.care} numbered />
            )}
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
