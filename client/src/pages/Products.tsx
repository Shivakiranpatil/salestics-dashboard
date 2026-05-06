import { useState } from "react";
import { Link } from "wouter";
import {
  Search, ChevronDown, SlidersHorizontal, Plus, Star,
  ChevronLeft, ChevronRight, ArrowUpDown, LayoutGrid,
  List, Trash2, Tag, Eye, X, Save,
} from "lucide-react";
import { ALL_PRODUCTS, ProductData, StockStatus } from "@/data/products";

/* ── Helpers ── */
function fmtPrice(n: number) { return `₹${n.toLocaleString("en-IN")}`; }
function fmtEarnings(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

const CATEGORY_OPTIONS = ["Men's Clothing","Women's Clothing","Footwear","Accessories","Electronics"];
const TYPE_MAP: Record<string, ProductData["type"]> = {
  "Men's Clothing": "clothing",
  "Women's Clothing": "clothing",
  "Footwear": "footwear",
  "Accessories": "accessories",
  "Electronics": "electronics",
};

function StatusBadge({ status }: { status: StockStatus }) {
  const styles: Record<StockStatus, string> = {
    "In Stock":     "bg-[#d1fae5] text-[#065f46]",
    "Low Stock":    "bg-[#ff683a] text-white",
    "Out of Stock": "bg-[#e2d7fa] text-[#2a2b2a]",
  };
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  );
}

function PageFooter() {
  return (
    <div className="flex items-center justify-between pt-1 pb-2">
      <div className="flex items-center gap-5 text-[12px]">
        <span className="font-semibold text-[#555]">Copyright © 2024 Peterdraw</span>
        <span className="text-[#8c8d8c] hover:text-[#2a2b2a] cursor-pointer transition-colors">Privacy Policy</span>
        <span className="text-[#8c8d8c] hover:text-[#2a2b2a] cursor-pointer transition-colors">Term and conditions</span>
        <span className="text-[#8c8d8c] hover:text-[#2a2b2a] cursor-pointer transition-colors">Contact</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors" data-testid="button-social-facebook"><svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]"><path d="M18 10a8 8 0 1 0-9.25 7.903V12.75H7v-2.75h1.75V8.25C8.75 6.455 9.846 5.5 11.5 5.5c.827 0 1.5.062 1.5.062v1.75h-.844c-.832 0-1.156.516-1.156 1.047V10H13l-.313 2.75h-1.937v5.153A8.001 8.001 0 0 0 18 10Z"/></svg></button>
        <button className="text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors" data-testid="button-social-twitter"><svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]"><path d="M11.902 8.767 17.517 2h-1.335L11.3 7.882 7.194 2H2.5l5.9 8.585L2.5 18h1.335l5.158-5.993L13.304 18H18l-6.098-9.233Zm-1.826 2.122-.598-.855-4.757-6.803h2.049l3.842 5.494.598.855 4.992 7.138h-2.05l-4.076-5.83Z"/></svg></button>
        <button className="text-[#8c8d8c] hover:text-[#2a2b2a] transition-colors" data-testid="button-social-instagram"><svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]"><path d="M10 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 13.056 2 12.717 2 10c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 10 2Zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.987.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.987-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058ZM10 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.802a2.198 2.198 0 1 0 0 4.396 2.198 2.198 0 0 0 0-4.396Zm4.204-3.204a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92Z"/></svg></button>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, perPage, total, onPage, onPrev, onNext }: {
  currentPage: number; totalPages: number; perPage: number; total: number;
  onPage: (p: number) => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-0 py-1">
      <div className="flex items-center gap-2 text-[12px] text-[#8c8d8c]">
        <span>Showing</span>
        <button className="flex items-center gap-1 rounded border border-[#e8e8e8] bg-[#fdfcff] px-2 py-0.5 text-[12px] text-[#2a2b2a] hover:bg-[#f3f3f3]" data-testid="select-page-size">
          {perPage} <ChevronDown size={11} />
        </button>
        <span>out of {total}</span>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onPrev} disabled={currentPage === 1} className="flex h-7 w-7 items-center justify-center rounded text-[#8c8d8c] hover:bg-[#f3f3f3] disabled:opacity-30 transition-colors" data-testid="button-page-prev">
          <ChevronLeft size={14} />
        </button>
        {[1, 2, 3].map(p => (
          <button key={p} onClick={() => onPage(p)} className={`flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium transition-colors ${currentPage === p ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`} data-testid={`button-page-${p}`}>{p}</button>
        ))}
        <span className="flex h-7 w-7 items-center justify-center text-[12px] text-[#8c8d8c]">…</span>
        <button onClick={() => onPage(totalPages)} className={`flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium transition-colors ${currentPage === totalPages ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`} data-testid="button-page-last">{totalPages}</button>
        <button onClick={onNext} disabled={currentPage === totalPages} className="flex h-7 w-7 items-center justify-center rounded text-[#8c8d8c] hover:bg-[#f3f3f3] disabled:opacity-30 transition-colors" data-testid="button-page-next">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function GridCard({ product }: { product: ProductData }) {
  return (
    <div className="flex flex-col rounded-[8px] border border-[#e8e8e8] bg-[#fdfcff] overflow-hidden hover:shadow-md transition-shadow" data-testid={`card-product-${product.id}`}>
      <div className="relative h-[200px] bg-[#f6f7f6] overflow-hidden">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-4" />
        <div className="absolute bottom-2.5 left-2.5 rounded-[6px] bg-[#fdfcff] px-2 py-1">
          <span className="text-[11px] font-normal text-[#8c8d8c]">{product.category}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2.5 p-3">
        <div className="flex flex-col gap-1.5">
          <p className="text-[14px] font-semibold text-[#2a2b2a] leading-snug">{product.name}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-[#f59e0b] text-[#f59e0b]" />
              <span className="text-[12px] font-medium text-[#555]">{product.rating}</span>
              <span className="text-[11px] text-[#8c8d8c]">({product.reviews} Reviews)</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-[#d0d0d0]" />
            <span className="text-[11px] text-[#555]">{product.sales} Sold</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[18px] font-bold text-[#2a2b2a]">{fmtPrice(product.price)}</span>
            {product.discount && (
              <div className="flex items-center gap-0.5">
                <Tag size={11} className="text-[#8c8d8c]" />
                <span className="text-[11px] text-[#8c8d8c]">{product.discount}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/products/${product.productId}`} className="flex items-center justify-center rounded-[5px] bg-[#ff683a] px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#e85a2e] transition-colors" data-testid={`button-view-${product.id}`}>
              View
            </Link>
            <button className="flex items-center justify-center rounded-[5px] bg-[#f3f3f3] p-1.5 hover:bg-[#ffe5e5] transition-colors" data-testid={`button-delete-${product.id}`}>
              <Trash2 size={14} className="text-[#8c8d8c]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Add Product Modal ── */
const SHOE_SIZES_ADD = ["US 6","US 6.5","US 7","US 7.5","US 8","US 8.5","US 9","US 9.5","US 10","US 10.5","US 11","US 11.5","US 12"];
const CLOTHING_SIZES_ADD = ["XS","S","M","L","XL","XXL"];

const EMPTY_FORM = {
  name: "", category: "Men's Clothing", productId: "",
  price: "", stock: "", discount: "", description: "", status: "In Stock" as StockStatus,
};

function AddProductModal({ onAdd, onClose }: { onAdd: (p: ProductData) => void; onClose: () => void }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([]);
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([]);
  const [productDetails, setProductDetails] = useState("");
  const [materials, setMaterials] = useState("");
  const [care, setCare] = useState("");

  const currentType = TYPE_MAP[form.category] ?? "accessories";

  function set(field: string, val: string) {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: "" }));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const urls = files.map(f => URL.createObjectURL(f));
    setImages(prev => [...prev, ...urls].slice(0, 4));
    e.target.value = "";
  }

  function toggleSize(s: string) {
    setSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Product name is required";
    if (!form.productId.trim()) errs.productId = "Product ID is required";
    if (!form.price || isNaN(parseFloat(form.price)) || parseFloat(form.price) < 0) errs.price = "Enter a valid price";
    if (!form.stock || isNaN(parseInt(form.stock, 10)) || parseInt(form.stock, 10) < 0) errs.stock = "Enter a valid stock";
    if (!form.description.trim()) errs.description = "Description is required";
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const type = currentType;
    const fallbackImg = "/products/tshirt.png";
    const mainImg = images[0] || fallbackImg;
    const imgArr = images.length ? [...images, ...Array(4 - images.length).fill(mainImg)].slice(0, 4) : [fallbackImg, fallbackImg, fallbackImg, fallbackImg];

    const newProduct: ProductData = {
      id: String(Date.now()),
      name: form.name.trim(),
      category: form.category,
      type,
      productId: form.productId.trim().toUpperCase(),
      price: parseFloat(form.price),
      discount: form.discount.trim() || null,
      rating: 0, reviews: 0, sales: 0, earnings: 0,
      stock: parseInt(form.stock, 10),
      status: form.status,
      image: mainImg,
      images: imgArr,
      color: colors[0]?.hex ?? "#cccccc",
      initials: form.name.slice(0, 2).toUpperCase(),
      description: form.description.trim(),
      sizes: (type === "footwear" || type === "clothing") ? (sizes.length ? sizes : undefined) : undefined,
      colors: type !== "electronics" ? (colors.length ? colors : [{ name: "Default", hex: "#888888" }]) : undefined,
      details: productDetails.split("\n").filter(s => s.trim()),
      materials: materials.split("\n").filter(s => s.trim()),
      care: care.split("\n").filter(s => s.trim()),
      specifications: type === "electronics" ? (specs.length ? specs : []) : undefined,
    };
    onAdd(newProduct);
  }

  const allSizesForType = currentType === "footwear" ? SHOE_SIZES_ADD : CLOTHING_SIZES_ADD;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-[600px] max-h-[92vh] overflow-y-auto bg-white rounded-[12px] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0] sticky top-0 bg-white rounded-t-[12px] z-10">
          <div>
            <h2 className="text-[16px] font-bold text-[#2a2b2a]">Add New Product</h2>
            <p className="text-[12px] text-[#8c8d8c] mt-0.5">Fill in the details below to add a product</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f3f3] transition-colors" data-testid="button-add-product-close">
            <X size={16} className="text-[#8c8d8c]" />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6 p-6">

          {/* ── Images ── */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Product Images</p>
            <div className="flex flex-wrap gap-2">
              {images.map((src, i) => (
                <div key={i} className="relative h-[80px] w-[80px] rounded-[8px] overflow-hidden border border-[#e8e8e8] bg-[#f6f7f6] shrink-0">
                  <img src={src} alt="" className="w-full h-full object-contain p-1" />
                  {i === 0 && <span className="absolute bottom-1 left-1 rounded-[3px] bg-[#ff683a] px-1 py-0.5 text-[9px] font-semibold text-white leading-none">Main</span>}
                  <button onClick={() => setImages(prev => prev.filter((_, j) => j !== i))} className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                    <X size={9} className="text-white" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[8px] border-2 border-dashed border-[#e8e8e8] bg-[#fafafa] hover:border-[#ff683a] hover:bg-[#fff5f2] transition-colors shrink-0" data-testid="label-upload-image-add">
                  <Plus size={18} className="text-[#8c8d8c]" />
                  <span className="text-[10px] text-[#8c8d8c] text-center leading-tight">Add<br/>Image</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
            <p className="text-[11px] text-[#c0c0c0]">First image is the main display image. Up to 4 images.</p>
          </div>

          {/* ── Basic Info ── */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Basic Info</p>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Product Name <span className="text-[#ff683a]">*</span></span>
              <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Classic White Sneakers" className={`rounded-[7px] border px-3 py-2.5 text-[13px] outline-none transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-[#e8e8e8] focus:border-[#ff683a]"}`} data-testid="input-add-name" />
              {errors.name && <span className="text-[11px] text-red-500">{errors.name}</span>}
            </label>

            <div className="flex gap-3">
              <label className="flex flex-1 flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#2a2b2a]">Category <span className="text-[#ff683a]">*</span></span>
                <select value={form.category} onChange={e => { set("category", e.target.value); setSizes([]); setColors([]); setSpecs([]); }} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] bg-white transition-colors" data-testid="select-add-category">
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="flex flex-1 flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#2a2b2a]">Status</span>
                <select value={form.status} onChange={e => set("status", e.target.value as StockStatus)} className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] bg-white transition-colors" data-testid="select-add-status">
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Product ID <span className="text-[#ff683a]">*</span></span>
              <input value={form.productId} onChange={e => set("productId", e.target.value)} placeholder="e.g. CWS-0042" className={`rounded-[7px] border px-3 py-2.5 text-[13px] outline-none transition-colors ${errors.productId ? "border-red-400 bg-red-50" : "border-[#e8e8e8] focus:border-[#ff683a]"}`} data-testid="input-add-product-id" />
              {errors.productId && <span className="text-[11px] text-red-500">{errors.productId}</span>}
            </label>

            <div className="flex gap-3">
              <label className="flex flex-1 flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#2a2b2a]">Price (₹) <span className="text-[#ff683a]">*</span></span>
                <input type="number" min="0" value={form.price} onChange={e => set("price", e.target.value)} placeholder="0.00" className={`rounded-[7px] border px-3 py-2.5 text-[13px] outline-none transition-colors ${errors.price ? "border-red-400 bg-red-50" : "border-[#e8e8e8] focus:border-[#ff683a]"}`} data-testid="input-add-price" />
                {errors.price && <span className="text-[11px] text-red-500">{errors.price}</span>}
              </label>
              <label className="flex flex-1 flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#2a2b2a]">Stock <span className="text-[#ff683a]">*</span></span>
                <input type="number" min="0" value={form.stock} onChange={e => set("stock", e.target.value)} placeholder="0" className={`rounded-[7px] border px-3 py-2.5 text-[13px] outline-none transition-colors ${errors.stock ? "border-red-400 bg-red-50" : "border-[#e8e8e8] focus:border-[#ff683a]"}`} data-testid="input-add-stock" />
                {errors.stock && <span className="text-[11px] text-red-500">{errors.stock}</span>}
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Discount Label <span className="text-[#c0c0c0] font-normal">(optional)</span></span>
              <input value={form.discount} onChange={e => set("discount", e.target.value)} placeholder="e.g. 10% Off or Buy 2 Get 1" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] transition-colors placeholder:text-[#c0c0c0]" data-testid="input-add-discount" />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Description <span className="text-[#ff683a]">*</span></span>
              <textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe the product — its features, use cases, and what makes it special..." className={`rounded-[7px] border px-3 py-2.5 text-[13px] outline-none transition-colors resize-none leading-relaxed ${errors.description ? "border-red-400 bg-red-50" : "border-[#e8e8e8] focus:border-[#ff683a]"}`} data-testid="input-add-description" />
              {errors.description && <span className="text-[11px] text-red-500">{errors.description}</span>}
            </label>
          </div>

          {/* ── Sizes — footwear / clothing only ── */}
          {(currentType === "footwear" || currentType === "clothing") && (
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Available Sizes</p>
              <div className="flex flex-wrap gap-1.5">
                {allSizesForType.map(s => (
                  <button key={s} type="button" onClick={() => toggleSize(s)}
                    className={`rounded-[5px] border px-2 py-1 text-[11px] font-medium transition-colors ${sizes.includes(s) ? "border-[#ff683a] bg-[#ff683a] text-white" : "border-[#e8e8e8] text-[#555] hover:border-[#ff683a] hover:text-[#ff683a]"}`}
                    data-testid={`add-toggle-size-${s.replace(/\s/g, "-")}`}>
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#c0c0c0]">Select all sizes this product is available in.</p>
            </div>
          )}

          {/* ── Colors — non-electronics ── */}
          {currentType !== "electronics" && (
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Colors</p>
              <div className="flex flex-col gap-2">
                {colors.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-[4px] border border-[#e8e8e8] shrink-0" style={{ backgroundColor: c.hex }} />
                    <input value={c.name} onChange={e => setColors(prev => prev.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} placeholder="Color name" className="flex-1 rounded-[5px] border border-[#e8e8e8] px-2 py-1 text-[12px] outline-none focus:border-[#ff683a]" />
                    <input type="color" value={c.hex} onChange={e => setColors(prev => prev.map((x, j) => j === i ? { ...x, hex: e.target.value } : x))} className="h-7 w-7 cursor-pointer rounded border-0 p-0" />
                    <button onClick={() => setColors(prev => prev.filter((_, j) => j !== i))} className="flex h-6 w-6 items-center justify-center rounded hover:bg-[#ffe5e5] transition-colors">
                      <X size={12} className="text-[#8c8d8c]" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => setColors(prev => [...prev, { name: "New Color", hex: "#888888" }])}
                  className="flex w-fit items-center gap-1.5 rounded-[6px] border border-dashed border-[#e8e8e8] px-3 py-1.5 text-[11px] text-[#8c8d8c] hover:border-[#ff683a] hover:text-[#ff683a] transition-colors"
                  data-testid="button-add-color-modal">
                  <Plus size={11} /> Add Color
                </button>
              </div>
            </div>
          )}

          {/* ── Specifications — electronics only ── */}
          {currentType === "electronics" && (
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Specifications</p>
              <div className="flex flex-col gap-2">
                {specs.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input value={s.label} onChange={e => setSpecs(prev => prev.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} placeholder="Label (e.g. Battery Life)" className="w-[150px] shrink-0 rounded-[5px] border border-[#e8e8e8] px-2 py-1.5 text-[12px] outline-none focus:border-[#ff683a]" />
                    <input value={s.value} onChange={e => setSpecs(prev => prev.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="Value (e.g. Up to 20h)" className="flex-1 rounded-[5px] border border-[#e8e8e8] px-2 py-1.5 text-[12px] outline-none focus:border-[#ff683a]" />
                    <button onClick={() => setSpecs(prev => prev.filter((_, j) => j !== i))} className="flex h-7 w-7 items-center justify-center rounded hover:bg-[#ffe5e5] transition-colors">
                      <X size={12} className="text-[#8c8d8c]" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => setSpecs(prev => [...prev, { label: "", value: "" }])}
                  className="flex w-fit items-center gap-1.5 rounded-[6px] border border-dashed border-[#e8e8e8] px-3 py-1.5 text-[11px] text-[#8c8d8c] hover:border-[#ff683a] hover:text-[#ff683a] transition-colors"
                  data-testid="button-add-spec-modal">
                  <Plus size={11} /> Add Specification
                </button>
              </div>
            </div>
          )}

          {/* ── Product Details ── */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">Product Details</p>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Key Details <span className="text-[#c0c0c0] font-normal">(one per line)</span></span>
              <textarea rows={3} value={productDetails} onChange={e => setProductDetails(e.target.value)}
                placeholder={currentType === "electronics" ? "e.g. Type: Over-ear\nDriver: 40mm\nMic: Built-in" : "e.g. Style: Casual\nFit: Regular\nClosure: Zipper"}
                className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] transition-colors resize-none" data-testid="input-add-details" />
            </label>

            {currentType !== "electronics" ? (
              <>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-medium text-[#2a2b2a]">Materials <span className="text-[#c0c0c0] font-normal">(one per line)</span></span>
                  <textarea rows={2} value={materials} onChange={e => setMaterials(e.target.value)}
                    placeholder="e.g. Outer: 100% Cotton&#10;Lining: Polyester"
                    className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] transition-colors resize-none" data-testid="input-add-materials" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-medium text-[#2a2b2a]">Care Instructions <span className="text-[#c0c0c0] font-normal">(one per line)</span></span>
                  <textarea rows={2} value={care} onChange={e => setCare(e.target.value)}
                    placeholder="e.g. Machine wash cold&#10;Do not tumble dry"
                    className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] transition-colors resize-none" data-testid="input-add-care" />
                </label>
              </>
            ) : (
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#2a2b2a]">Care / Maintenance <span className="text-[#c0c0c0] font-normal">(one per line)</span></span>
                <textarea rows={2} value={care} onChange={e => setCare(e.target.value)}
                  placeholder="e.g. Store in carrying case&#10;Avoid moisture&#10;1 year warranty"
                  className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] transition-colors resize-none" data-testid="input-add-care" />
              </label>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#f0f0f0] px-6 py-4 flex gap-3 rounded-b-[12px]">
          <button onClick={handleSubmit} className="flex flex-1 items-center justify-center gap-1.5 rounded-[7px] bg-[#ff683a] py-2.5 text-[13px] font-semibold text-white hover:bg-[#e85a2e] transition-colors" data-testid="button-add-product-submit">
            <Save size={14} /> Add Product
          </button>
          <button onClick={onClose} className="flex flex-1 items-center justify-center rounded-[7px] border border-[#e8e8e8] py-2.5 text-[13px] font-medium text-[#555] hover:bg-[#f3f3f3] transition-colors" data-testid="button-add-product-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export function Products() {
  const [products, setProducts] = useState<ProductData[]>(ALL_PRODUCTS);
  const [view, setView] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const isGrid = view === "grid";

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.productId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchStatus && matchCat;
  });

  const perPage = isGrid ? 8 : 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const displayProducts = isGrid ? paginated.slice(0, 8) : paginated;

  function handleAdd(p: ProductData) {
    setProducts(prev => [p, ...prev]);
    setShowAddModal(false);
  }

  return (
    <div className="flex flex-col gap-5 min-h-full">
      {showAddModal && <AddProductModal onAdd={handleAdd} onClose={() => setShowAddModal(false)} />}

      <h1 className="text-[22px] font-bold text-[#2a2b2a] leading-tight">Products</h1>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-[8px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 w-[200px]">
          <Search size={14} className="text-[#8c8d8c] shrink-0" />
          <input type="text" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search product" className="flex-1 text-[12px] bg-transparent outline-none text-[#2a2b2a] placeholder:text-[#c0c0c0]" data-testid="input-search-product" />
        </div>

        {/* Status filter */}
        <div className="relative">
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="appearance-none rounded-[8px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-2 text-[12px] font-medium text-[#2a2b2a] hover:bg-[#f3f3f3] transition-colors outline-none cursor-pointer" data-testid="select-filter-status">
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
        </div>

        {/* Category filter */}
        <div className="relative">
          <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }} className="appearance-none rounded-[8px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-2 text-[12px] font-medium text-[#2a2b2a] hover:bg-[#f3f3f3] transition-colors outline-none cursor-pointer" data-testid="select-filter-category">
            <option value="All">All Categories</option>
            {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
        </div>

        <div className="flex-1" />

        <button className="flex items-center gap-1.5 rounded-[8px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 text-[12px] font-medium text-[#2a2b2a] hover:bg-[#f3f3f3] transition-colors" data-testid="button-filters">
          <SlidersHorizontal size={13} className="text-[#8c8d8c]" /> Filters <ChevronDown size={13} className="text-[#8c8d8c]" />
        </button>

        {!isGrid && (
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-[#8c8d8c]">Sort by:</span>
            <button className="flex items-center gap-1 rounded-[8px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 text-[12px] font-medium text-[#2a2b2a] hover:bg-[#f3f3f3] transition-colors" data-testid="button-sort">
              Newest <ChevronDown size={13} className="text-[#8c8d8c]" />
            </button>
          </div>
        )}

        <div className="flex items-center rounded-[8px] border border-[#e8e8e8] bg-[#fdfcff] overflow-hidden">
          <button onClick={() => setView("list")} className={`flex items-center justify-center px-2.5 py-2 transition-colors ${view === "list" ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`} data-testid="button-view-list"><List size={15} /></button>
          <button onClick={() => setView("grid")} className={`flex items-center justify-center px-2.5 py-2 transition-colors ${view === "grid" ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`} data-testid="button-view-grid"><LayoutGrid size={15} /></button>
        </div>

        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 rounded-[8px] bg-[#ff683a] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#e85a2e] transition-colors" data-testid="button-add-product">
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="flex flex-col rounded-[10px] bg-[#fdfcff] overflow-hidden border border-[#f0f0f0]">
          <div className="grid items-center border-b border-[#f0f0f0] px-4 py-3" style={{ gridTemplateColumns: "2fr 1fr 90px 140px 70px 100px 70px 100px 40px" }}>
            {["Product Name","Product ID","Price","Rating","Sales","Earnings","Stock","Status",""].map((col, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="text-[11px] font-medium text-[#8c8d8c] whitespace-nowrap">{col}</span>
                {col && <ArrowUpDown size={10} className="text-[#c0c0c0]" />}
              </div>
            ))}
          </div>

          {displayProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-[#8c8d8c]">
              <p className="text-[14px] font-medium">No products found</p>
              <p className="text-[12px]">Try adjusting your search or filters</p>
            </div>
          ) : (
            displayProducts.map((product, idx) => (
              <div key={product.id}
                className={`grid items-center px-4 py-3 hover:bg-[#fafafa] transition-colors ${idx < displayProducts.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}
                style={{ gridTemplateColumns: "2fr 1fr 90px 140px 70px 100px 70px 100px 40px" }}
                data-testid={`row-product-${product.id}`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] overflow-hidden bg-[#f6f7f6]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-[#2a2b2a] truncate">{product.name}</p>
                    <p className="text-[11px] text-[#8c8d8c] truncate">{product.category}</p>
                  </div>
                </div>
                <span className="text-[12px] text-[#2a2b2a]">{product.productId}</span>
                <span className="text-[12px] text-[#2a2b2a]">{fmtPrice(product.price)}.00</span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-[#f59e0b] text-[#f59e0b] shrink-0" />
                  <span className="text-[12px] font-medium text-[#2a2b2a]">{product.rating}</span>
                  <span className="text-[11px] text-[#8c8d8c]">({product.reviews} reviews)</span>
                </div>
                <span className="text-[12px] text-[#2a2b2a]">{product.sales}</span>
                <span className="text-[12px] text-[#2a2b2a]">{fmtEarnings(product.earnings)}</span>
                <span className="text-[12px] text-[#2a2b2a]">{product.stock}</span>
                <div><StatusBadge status={product.status} /></div>
                <Link href={`/products/${product.productId}`} className="flex items-center justify-center rounded-[6px] p-1.5 hover:bg-[#fff0eb] transition-colors" data-testid={`button-view-${product.id}`}>
                  <Eye size={15} className="text-[#8c8d8c]" />
                </Link>
              </div>
            ))
          )}

          <div className="border-t border-[#f0f0f0] px-4 py-3">
            <Pagination currentPage={currentPage} totalPages={totalPages} perPage={perPage} total={filtered.length} onPage={setCurrentPage} onPrev={() => setCurrentPage(p => Math.max(1, p - 1))} onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))} />
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="flex flex-col gap-4">
          {displayProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-[10px] bg-[#fdfcff] border border-[#f0f0f0] py-12 text-[#8c8d8c]">
              <p className="text-[14px] font-medium">No products found</p>
              <p className="text-[12px]">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {displayProducts.map(product => <GridCard key={product.id} product={product} />)}
            </div>
          )}
          <div className="rounded-[10px] bg-[#fdfcff] border border-[#f0f0f0] px-4 py-3">
            <Pagination currentPage={currentPage} totalPages={totalPages} perPage={perPage} total={filtered.length} onPage={setCurrentPage} onPrev={() => setCurrentPage(p => Math.max(1, p - 1))} onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))} />
          </div>
        </div>
      )}

      <PageFooter />
    </div>
  );
}
