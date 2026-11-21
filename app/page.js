"use client";
import { useEffect, useMemo, useState } from "react";
import {
  LuCoffee, LuSoup, LuSalad, LuIceCream, LuSearch, LuPrinter, LuTrash2, LuSun, LuMoon, LuMonitor, LuReceipt,
  LuBookOpen, LuHistory, LuFlame, LuSandwich, LuWheat, LuDrumstick, LuLeaf, LuUtensils, LuPlus, LuMinus, LuX,
  LuUtensilsCrossed, LuChefHat, LuSettings, LuPencil, LuCheck, LuRotateCcw, LuCroissant, LuPopcorn, LuMilk, LuDownload, LuUpload, LuLayoutGrid,
} from "react-icons/lu";
import { BUSINESS, MENU, MENU_VERSION, DEFAULT_TAX_PERCENT } from "../data/menu";

const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const inr = (n) => "₹" + (Math.round(n * 100) / 100).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

// GST state codes = first two digits of a GSTIN.
const GST_STATES = { "01":"Jammu & Kashmir","02":"Himachal Pradesh","03":"Punjab","04":"Chandigarh","05":"Uttarakhand","06":"Haryana","07":"Delhi","08":"Rajasthan","09":"Uttar Pradesh","10":"Bihar","11":"Sikkim","12":"Arunachal Pradesh","13":"Nagaland","14":"Manipur","15":"Mizoram","16":"Tripura","17":"Meghalaya","18":"Assam","19":"West Bengal","20":"Jharkhand","21":"Odisha","22":"Chhattisgarh","23":"Madhya Pradesh","24":"Gujarat","26":"Dadra & Nagar Haveli and Daman & Diu","27":"Maharashtra","29":"Karnataka","30":"Goa","31":"Lakshadweep","32":"Kerala","33":"Tamil Nadu","34":"Puducherry","35":"Andaman & Nicobar","36":"Telangana","37":"Andhra Pradesh","38":"Ladakh" };
const stateOf = (gstin) => GST_STATES[String(gstin || "").slice(0, 2)] || "";
const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
// Same-state supply → split into CGST + SGST; a guest GSTIN from another state → IGST.
function gstSplit(biz, guestGstin, taxPercent, taxAmt) {
  if (!biz.gstin || !taxPercent) return null;
  const inter = guestGstin && guestGstin.slice(0, 2) !== biz.gstin.slice(0, 2);
  return inter ? [["IGST", taxPercent, taxAmt]] : [["CGST", taxPercent / 2, taxAmt / 2], ["SGST", taxPercent / 2, taxAmt / 2]];
}

const CAT_ICONS = {
  "Breakfast": LuCroissant, "Bread": LuWheat, "Snacks": LuPopcorn, "Main Course (Veg)": LuUtensils,
  "Raita / Curd": LuMilk, "Non Veg": LuDrumstick, "Chinese": LuUtensilsCrossed, "South Indian": LuChefHat,
  "Desserts": LuIceCream, "Drinks": LuCoffee, "Appetisers": LuSandwich, "Soups": LuSoup, "Maggi Wala": LuSoup,
  "Barbeque": LuFlame, "Natural Products": LuLeaf, "Buffets & Thalis": LuSalad,
};
const CAT_HUES = {
  "Breakfast": 35, "Bread": 28, "Snacks": 15, "Main Course (Veg)": 140, "Raita / Curd": 200, "Non Veg": 0,
  "Chinese": 350, "South Indian": 50, "Desserts": 320, "Drinks": 25, "Appetisers": 60, "Soups": 10,
  "Maggi Wala": 45, "Barbeque": 5, "Natural Products": 110, "Buffets & Thalis": 170,
};
const catIcon = (c) => CAT_ICONS[c] || LuUtensils;

// Indian food-label convention: green = veg, brown/red triangle = non-veg, amber = egg.
const NONVEG = /chicken|fish|mutton|non[- ]?veg/i;
const EGG = /egg|omelette/i;
const dietOf = (m) => m.diet || (NONVEG.test(m.name) || m.category === "Non Veg" ? "nonveg" : EGG.test(m.name) ? "egg" : "veg");
function DietMark({ diet }) {
  return <span className={`diet ${diet}`} title={diet === "nonveg" ? "Non-veg" : diet === "egg" ? "Contains egg" : "Veg"}><i /></span>;
}

export default function Home() {
  const [tab, setTab] = useState("bill");
  const [menu, setMenu] = useState(MENU);
  const [invoices, setInvoices] = useState([]);
  const [ready, setReady] = useState(false);
  const [printing, setPrinting] = useState(null);
  const [biz, setBiz] = useState(BUSINESS);

  useEffect(() => {
    // A newer data/menu.js replaces any older menu saved in the browser.
    if (load("aa_menu_version", 0) !== MENU_VERSION) { save("aa_menu", MENU); save("aa_menu_version", MENU_VERSION); }
    setMenu(load("aa_menu", MENU));
    setInvoices(load("aa_invoices", []));
    const savedBiz = load("aa_business", {});
    if (/^apna adda/i.test(savedBiz.name || "")) savedBiz.name = BUSINESS.name; // renamed to Apna Stay
    setBiz({ ...BUSINESS, ...savedBiz });
    setReady(true);
    // Ask the browser to keep this site's data even when disk space runs low.
    try { navigator.storage?.persist?.(); } catch {}
  }, []);
  useEffect(() => { if (ready) save("aa_menu", menu); }, [menu, ready]);
  useEffect(() => { if (ready) save("aa_invoices", invoices); }, [invoices, ready]);
  useEffect(() => { if (ready) save("aa_business", biz); }, [biz, ready]);

  // The page title becomes the default file name in "Save as PDF", e.g. AA-0001_2026-11-20.
  const printInvoice = (inv) => {
    setPrinting(inv);
    const d = new Date(inv.date);
    const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const prev = document.title;
    document.title = `${inv.no}_${day}${inv.customer ? "_" + inv.customer.replace(/[^\w ]+/g, "").trim().replace(/\s+/g, "-") : ""}`;
    const restore = () => { document.title = prev; window.removeEventListener("afterprint", restore); };
    window.addEventListener("afterprint", restore);
    setTimeout(() => window.print(), 50);
  };

  return (
    <>
      <header className="noprint">
        <div className="brand"><img className="logo" src="/logo.png" alt="" /><div><h1>{biz.name}</h1><small>{biz.address}</small></div></div>
        <nav>
          {[["bill", "New Bill", LuReceipt], ["menu", "Menu", LuBookOpen], ["history", "Invoices", LuHistory], ["settings", "Settings", LuSettings]].map(([k, l, I]) => (
            <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}><I /> {l}</button>
          ))}
        </nav>
        <ThemeSwitch />
      </header>
      <main className="noprint">
        {tab === "bill" && <Biller biz={biz} menu={menu} invoices={invoices} onSave={(inv) => { setInvoices([inv, ...invoices]); printInvoice(inv); }} />}
        {tab === "menu" && <MenuEditor menu={menu} setMenu={setMenu} />}
        {tab === "settings" && <Settings biz={biz} setBiz={setBiz} />}
        {tab === "history" && <History invoices={invoices} onPrint={printInvoice} onDelete={(no) => setInvoices(invoices.filter((i) => i.no !== no))} />}
      </main>
      {printing && <PrintView inv={printing} biz={biz} />}
    </>
  );
}

function ThemeSwitch() {
  const [theme, setThemeState] = useState("auto");
  // Read the saved choice once; only save when the user clicks, so the mount never overwrites it.
  useEffect(() => { setThemeState(load("aa_theme", "auto")); }, []);
  useEffect(() => {
    const el = document.documentElement;
    if (theme === "auto") el.removeAttribute("data-theme"); else el.setAttribute("data-theme", theme);
  }, [theme]);
  const setTheme = (t) => { setThemeState(t); save("aa_theme", t); };
  return (
    <nav className="theme" aria-label="Theme">
      {[["light", LuSun, "Light"], ["auto", LuMonitor, "Auto"], ["dark", LuMoon, "Dark"]].map(([k, I, l]) => (
        <button key={k} className={theme === k ? "on" : ""} onClick={() => setTheme(k)} title={l} aria-label={l}><I /></button>
      ))}
    </nav>
  );
}

function Biller({ biz, menu, invoices, onSave }) {
  const [cat, setCat] = useState("All");
  const [diet, setDiet] = useState("all");
  const [q, setQ] = useState("");
  const [lines, setLines] = useState([]);
  const [customer, setCustomer] = useState("");
  const [room, setRoom] = useState("");
  const [guestGstin, setGuestGstin] = useState("");
  const [tax, setTax] = useState(biz.taxPercent ?? DEFAULT_TAX_PERCENT);
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState("Cash");

  const cats = ["All", ...new Set(menu.map((m) => m.category))];
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = menu
    .filter((m) => cat === "All" || m.category === cat)
    .filter((m) => diet === "all" || (diet === "veg" ? dietOf(m) === "veg" : dietOf(m) !== "veg"))
    .filter((m) => { const hay = `${m.name} ${m.category} ${m.sub || ""}`.toLowerCase(); return words.every((w) => hay.includes(w)); })
    .sort((a, b) => words.length ? (b.name.toLowerCase().startsWith(words[0]) - a.name.toLowerCase().startsWith(words[0])) : 0);

  const add = (m) => setLines((ls) => {
    const f = ls.find((l) => l.id === m.id);
    return f ? ls.map((l) => (l.id === m.id ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { id: m.id, name: m.name, price: m.price, qty: 1, diet: dietOf(m) }];
  });
  const setQty = (id, qty) => setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))));
  const setPrice = (id, price) => setLines((ls) => ls.map((l) => (l.id === id ? { ...l, price: Number(price) || 0 } : l)));
  const qtyOf = (id) => lines.find((l) => l.id === id)?.qty || 0;

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const disc = Math.min(Number(discount) || 0, subtotal);
  const taxAmt = ((subtotal - disc) * (Number(tax) || 0)) / 100;
  const total = subtotal - disc + taxAmt;
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);

  const nextNo = useMemo(() => {
    const max = invoices.reduce((m, i) => Math.max(m, Number(String(i.no).split("-")[1]) || 0), 0);
    return (biz.prefix || "AA") + "-" + String(max + 1).padStart(4, "0");
  }, [invoices]);

  const generate = () => {
    if (!lines.length) return;
    onSave({ biz, no: nextNo, date: new Date().toISOString(), customer, room, guestGstin: guestGstin.toUpperCase().trim(), lines, subtotal, discount: disc, taxPercent: Number(tax) || 0, tax: taxAmt, total, payment });
    setLines([]); setCustomer(""); setRoom(""); setGuestGstin(""); setDiscount(0);
  };

  return (
    <div className="pos">
      <div className="panel">
        <div className="search">
          <LuSearch />
          <input placeholder={`Search ${menu.length} items… (Enter adds the top match)`} value={q} onChange={(e) => setQ(e.target.value)} autoFocus
            onKeyDown={(e) => { if (e.key === "Enter" && q && shown[0]) { add(shown[0]); setQ(""); } if (e.key === "Escape") setQ(""); }} />
          {q && <button className="icon" onClick={() => setQ("")} aria-label="Clear search"><LuX /></button>}
        </div>
        <div className="filters">
          <div className="seg">
            {[["all", "All"], ["veg", "Veg"], ["nonveg", "Non-veg"]].map(([k, l]) => (
              <button key={k} className={diet === k ? "on" : ""} onClick={() => setDiet(k)}>
                {k !== "all" && <DietMark diet={k} />} {l}
              </button>
            ))}
          </div>
        </div>
        <div className="cats">
          {cats.map((c) => { const I = c === "All" ? LuLayoutGrid : catIcon(c); return (
            <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}><I /> {c}</button>
          ); })}
        </div>
        {menu.length === 0 ? <div className="empty">No menu items yet. Add them in the <b>Menu</b> tab or in data/menu.js.</div> : (
          <div className="grid">
            {shown.map((m) => { const I = catIcon(m.category); const n = qtyOf(m.id); return (
              <button key={m.id} className={"item" + (n ? " picked" : "")} onClick={() => add(m)} title={m.sub || ""}
                style={{ "--h": CAT_HUES[m.category] ?? 30 }}>
                <div className="itop"><span className="cicon"><I /></span><DietMark diet={dietOf(m)} />{n > 0 && <span className="badge">{n}</span>}</div>
                <b>{m.name}</b>
                {m.unit && <em>{m.sub}</em>}
                <span className={"pr" + (m.price ? "" : " ask")}>{m.price ? inr(m.price) + (m.unit ? " / " + m.unit : "") : "Price on request"}</span>
              </button>
            ); })}
            {!shown.length && <div className="empty">No match for “{q}”</div>}
          </div>
        )}
      </div>
      <div className="panel bill">
        <div className="billhead"><span><LuReceipt /> {nextNo}</span>{itemCount > 0 && <span className="pill">{itemCount} item{itemCount > 1 ? "s" : ""}</span>}</div>
        <div className="row">
          <input placeholder="Guest name" value={customer} onChange={(e) => setCustomer(e.target.value)} style={{ flex: 1, minWidth: 0 }} />
          <input placeholder="Room / Table" value={room} onChange={(e) => setRoom(e.target.value)} style={{ width: 120 }} />
        </div>
        {biz.gstin && <input className="guestgst" placeholder="Guest GSTIN (optional, for company bills)" value={guestGstin} maxLength={15}
          onChange={(e) => setGuestGstin(e.target.value.toUpperCase())} style={guestGstin && !GSTIN_RE.test(guestGstin) ? { boxShadow: "0 0 0 1px var(--red)" } : {}} />}
        <div className="lines">
          {lines.map((l) => (
            <div className="line" key={l.id}>
              <DietMark diet={l.diet || "veg"} />
              <div className="lname">{l.name}<small>₹ <input className="price" type="number" min="0" value={l.price || ""} placeholder="price" onChange={(e) => setPrice(l.id, e.target.value)} /></small></div>
              <div className="qty"><button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Less">{l.qty === 1 ? <LuTrash2 /> : <LuMinus />}</button><span>{l.qty}</span><button onClick={() => setQty(l.id, l.qty + 1)} aria-label="More"><LuPlus /></button></div>
              <div className="lamt">{inr(l.price * l.qty)}</div>
            </div>
          ))}
          {!lines.length && <div className="empty"><LuUtensils size={28} /><br />Tap items to add</div>}
        </div>
        <div className="row opts">
          <label>Discount ₹<input type="number" min="0" value={discount} onChange={(e) => setDiscount(e.target.value)} /></label>
          <label>Tax %<input type="number" min="0" value={tax} onChange={(e) => setTax(e.target.value)} /></label>
          <div className="seg">{["Cash", "UPI", "Card"].map((p) => <button key={p} className={payment === p ? "on" : ""} onClick={() => setPayment(p)}>{p}</button>)}</div>
        </div>
        <div className="totals">
          <div><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          {disc > 0 && <div><span>Discount</span><span>−{inr(disc)}</span></div>}
          {(gstSplit(biz, guestGstin, Number(tax) || 0, taxAmt) || [["Tax", tax, taxAmt]]).map(([n, r, a]) => <div key={n}><span>{n} ({r}%)</span><span>{inr(a)}</span></div>)}
          <div className="grand"><span>Total</span><span>{inr(total)}</span></div>
        </div>
        <div className="row">
          <button onClick={() => setLines([])} disabled={!lines.length}>Clear</button>
          <button className="primary" style={{ flex: 1 }} disabled={!lines.length || lines.some((l) => !l.price)} onClick={generate}><LuPrinter /> Save & Print</button>
        </div>
      </div>
    </div>
  );
}

const BLANK = { id: "", category: "", name: "", price: "", diet: "veg", unit: "", sub: "" };

function MenuEditor({ menu, setMenu }) {
  const [form, setForm] = useState(null); // null = closed, else item being added/edited
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = [...new Set(menu.map((m) => m.category))];
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = menu.filter((m) => (cat === "All" || m.category === cat) && words.every((w) => `${m.name} ${m.category}`.toLowerCase().includes(w)));

  const saveItem = () => {
    const f = { ...form, name: form.name.trim(), category: form.category.trim() || "Other", price: Number(form.price) || 0 };
    if (!f.name) return alert("Item name is mandatory");
    if (f.unit === "") delete f.unit;
    if (f.id) setMenu(menu.map((m) => (m.id === f.id ? f : m)));
    else setMenu([...menu, { ...f, id: f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36) }]);
    setForm(null);
  };
  const remove = (m) => confirm(`Delete "${m.name}" from the menu?`) && setMenu(menu.filter((x) => x.id !== m.id));
  const setPrice = (id, v) => setMenu(menu.map((m) => (m.id === id ? { ...m, price: Number(v) || 0 } : m)));
  const reset = () => confirm("Replace the whole menu with the original menu card? Your menu changes will be lost.") && setMenu(MENU);

  const exportJson = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(menu, null, 2)], { type: "application/json" }));
    const a = document.createElement("a"); a.href = url; a.download = "menu.json"; a.click();
  };
  const importJson = (e) => {
    const file = e.target.files[0]; if (!file) return;
    file.text().then((t) => { try { const d = JSON.parse(t); if (Array.isArray(d)) setMenu(d.map((m, i) => ({ id: m.id || "m" + i, ...m, price: Number(m.price) || 0 }))); } catch { alert("Invalid JSON"); } });
  };

  return (
    <div className="panel">
      <div className="mhead">
        <div><h2>Menu</h2><small>{menu.length} items · {cats.length} categories · {menu.filter((m) => !m.price).length} without price</small></div>
        <div className="row">
          <button className="primary" onClick={() => setForm({ ...BLANK, category: cat === "All" ? "" : cat })}><LuPlus /> New item</button>
          <label className="filebtn"><input type="file" accept=".json" onChange={importJson} hidden /><LuUpload /> Import</label>
          <button onClick={exportJson}><LuDownload /> Export</button>
          <button onClick={reset} title="Reset to original menu"><LuRotateCcw /> Reset</button>
        </div>
      </div>
      <div className="search" style={{ marginTop: 12 }}>
        <LuSearch /><input placeholder="Search menu items…" value={q} onChange={(e) => setQ(e.target.value)} />
        {q && <button className="icon" onClick={() => setQ("")} aria-label="Clear search"><LuX /></button>}
      </div>
      <div className="cats">
        {["All", ...cats].map((c) => { const I = c === "All" ? LuLayoutGrid : catIcon(c); return <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}><I /> {c}</button>; })}
      </div>
      <table className="mtable">
        <thead><tr><th /><th>Item</th><th>Category</th><th className="r">Price ₹</th><th /></tr></thead>
        <tbody>
          {shown.map((m) => { const I = catIcon(m.category); return (
            <tr key={m.id}>
              <td><DietMark diet={dietOf(m)} /></td>
              <td><b>{m.name}</b>{m.unit && <small className="unit"> / {m.unit}</small>}{m.sub && <div className="msub">{m.sub}</div>}</td>
              <td><span className="pill"><I /> {m.category}</span></td>
              <td className="r"><input className={"inprice" + (m.price ? "" : " empty-price")} type="number" min="0" value={m.price || ""} placeholder="—" onChange={(e) => setPrice(m.id, e.target.value)} /></td>
              <td className="r nowrap">
                <button className="icon" onClick={() => setForm({ ...BLANK, ...m, diet: dietOf(m), unit: m.unit || "", sub: m.sub || "" })} aria-label="Edit"><LuPencil /></button>
                <button className="icon danger" onClick={() => remove(m)} aria-label="Delete"><LuTrash2 /></button>
              </td>
            </tr>
          ); })}
          {!shown.length && <tr><td colSpan={5} className="empty">No items</td></tr>}
        </tbody>
      </table>

      {form && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && setForm(null)}>
          <div className="sheet" onKeyDown={(e) => { if (e.key === "Escape") setForm(null); if (e.key === "Enter" && e.target.tagName === "INPUT") saveItem(); }}>
            <div className="mhead"><h2>{form.id ? "Edit item" : "New item"}</h2><button className="icon" onClick={() => setForm(null)} aria-label="Close"><LuX /></button></div>
            <Field label="Item name"><input autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Paneer Butter Masala" /></Field>
            <div className="two">
              <Field label="Category"><input list="catlist" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Pick or type new" /></Field>
              <Field label="Price ₹"><input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0 = ask at billing" /></Field>
            </div>
            <datalist id="catlist">{cats.map((c) => <option key={c} value={c} />)}</datalist>
            <Field label="Type">
              <div className="seg">
                {[["veg", "Veg"], ["egg", "Egg"], ["nonveg", "Non-veg"]].map(([k, l]) => (
                  <button key={k} type="button" className={form.diet === k ? "on" : ""} onClick={() => setForm({ ...form, diet: k })}><DietMark diet={k} /> {l}</button>
                ))}
              </div>
            </Field>
            <div className="two">
              <Field label="Unit (optional)"><input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="per person, per plate…" /></Field>
              <Field label="Description / includes (optional)"><input value={form.sub} onChange={(e) => setForm({ ...form, sub: e.target.value })} placeholder="Roti, Dal, Sabji…" /></Field>
            </div>
            <div className="row" style={{ justifyContent: "flex-end", marginTop: 18 }}>
              {form.id && <button className="danger" style={{ marginRight: "auto" }} onClick={() => { remove(form); setForm(null); }}><LuTrash2 /> Delete</button>}
              <button onClick={() => setForm(null)}>Cancel</button>
              <button className="primary" onClick={saveItem}><LuCheck /> {form.id ? "Save changes" : "Add to menu"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}

function Settings({ biz, setBiz }) {
  const [f, setF] = useState(biz);
  const [saved, setSaved] = useState(false);
  useEffect(() => setF(biz), [biz]);
  const up = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setSaved(false); };
  const gstOk = !f.gstin || GSTIN_RE.test(String(f.gstin).toUpperCase());
  const submit = () => { setBiz({ ...f, gstin: (f.gstin || "").toUpperCase().trim(), taxPercent: Number(f.taxPercent) || 0 }); setSaved(true); };
  return (
    <div className="panel settings">
      <div className="mhead"><div><h2>Business details</h2><small>Shown on the header and every printed invoice.</small></div></div>
      <div className="two">
        <Field label="Business name"><input value={f.name || ""} onChange={up("name")} /></Field>
        <Field label="Tagline"><input value={f.tagline || ""} onChange={up("tagline")} /></Field>
      </div>
      <Field label="Address"><input value={f.address || ""} onChange={up("address")} placeholder="Village, Tehsil, District, State, PIN" /></Field>
      <div className="two">
        <Field label="Phone number"><input type="tel" value={f.phone || ""} onChange={up("phone")} placeholder="+91 98765 43210" /></Field>
        <Field label="Email"><input type="email" value={f.email || ""} onChange={up("email")} placeholder="stay@example.com" /></Field>
      </div>
      <div className="two">
        <Field label={gstOk ? "GSTIN" : "GSTIN (format looks wrong)"}><input value={f.gstin || ""} onChange={up("gstin")} placeholder="05ABCDE1234F1Z5" style={{ textTransform: "uppercase", ...(gstOk ? {} : { boxShadow: "0 0 0 1px var(--red)" }) }} maxLength={15} /></Field>
        <Field label="FSSAI licence no."><input value={f.fssai || ""} onChange={up("fssai")} placeholder="14-digit number" /></Field>
      </div>
      {f.gstin && gstOk && <p className="hint">State from GSTIN: <b>{stateOf(f.gstin)}</b> · bills will be printed as <b>Tax Invoice</b> with CGST + SGST.</p>}
      <div className="two">
        <Field label="SAC / HSN code"><input value={f.sac ?? "996331"} onChange={up("sac")} placeholder="996331 (restaurant service)" /></Field>
        <Field label="Legal / registered name (if different)"><input value={f.legalName || ""} onChange={up("legalName")} placeholder="As on GST certificate" /></Field>
      </div>
      <div className="two">
        <Field label="Default tax %"><input type="number" min="0" value={f.taxPercent ?? 5} onChange={up("taxPercent")} /></Field>
        <Field label="Invoice prefix"><input value={f.prefix || "AA"} onChange={up("prefix")} maxLength={6} /></Field>
      </div>
      <Field label="Bill footer note (optional)"><input value={f.footer || ""} onChange={up("footer")} placeholder="e.g. UPI: apnastay@upi · Check-out 11 AM" /></Field>
      <div className="row" style={{ justifyContent: "flex-end", marginTop: 18 }}>
        {saved && <span className="savedmsg"><LuCheck /> Saved</span>}
        <button className="primary" onClick={submit}><LuCheck /> Save details</button>
      </div>
    </div>
  );
}

function History({ invoices, onPrint, onDelete }) {
  const today = new Date().toDateString();
  const todays = invoices.filter((i) => new Date(i.date).toDateString() === today);
  const todayTotal = todays.reduce((s, i) => s + i.total, 0);
  return (
    <>
      <div className="stats">
        <div className="stat"><small>Today's sales</small><b>{inr(todayTotal)}</b></div>
        <div className="stat"><small>Bills today</small><b>{todays.length}</b></div>
        <div className="stat"><small>All invoices</small><b>{invoices.length}</b></div>
      </div>
      <div className="panel">
        <table>
          <thead><tr><th>No</th><th>Date</th><th>Guest</th><th>Room</th><th>Pay</th><th className="r">Total</th><th /></tr></thead>
          <tbody>
            {invoices.map((i) => (
              <tr key={i.no}>
                <td><b>{i.no}</b></td><td>{new Date(i.date).toLocaleString("en-IN")}</td><td>{i.customer || "—"}</td><td>{i.room || "—"}</td><td><span className="pill">{i.payment}</span></td>
                <td className="r"><b>{inr(i.total)}</b></td>
                <td className="r"><button className="icon" onClick={() => onPrint(i)} aria-label="Print"><LuPrinter /></button><button className="icon danger" onClick={() => confirm("Delete " + i.no + "?") && onDelete(i.no)} aria-label="Delete"><LuTrash2 /></button></td>
              </tr>
            ))}
            {!invoices.length && <tr><td colSpan={7} className="empty">No invoices yet</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PrintView({ inv, biz: current }) {
  const BUSINESS = { ...current, ...(inv.biz || {}) };
  const split = gstSplit(BUSINESS, inv.guestGstin, inv.taxPercent, inv.tax);
  const sac = BUSINESS.sac ?? "996331";
  return (
    <div id="print">
      <div className="wm" aria-hidden="true">
        <img src="/logo.png" alt="" />
        <div className="wmtext">{Array.from({ length: 14 }, (_, i) => <span key={i}>APNA STAY · </span>)}</div>
      </div>
      <div className="phead">
        <img src="/logo.png" alt="" className="plogo" />
        <div>
          <h2>{BUSINESS.name}</h2>
          <p>{BUSINESS.address}</p>
          <p>{[BUSINESS.phone && "Ph: " + BUSINESS.phone, BUSINESS.email].filter(Boolean).join("  ·  ")}</p>
          {BUSINESS.legalName && <p>{BUSINESS.legalName}</p>}
          {BUSINESS.gstin && <p><b>GSTIN: {BUSINESS.gstin}</b>{BUSINESS.fssai && <> &nbsp;·&nbsp; FSSAI: {BUSINESS.fssai}</>}</p>}
          {!BUSINESS.gstin && BUSINESS.fssai && <p>FSSAI: {BUSINESS.fssai}</p>}
        </div>
        <div className="ptag">{BUSINESS.gstin ? <>TAX<br />INVOICE</> : "INVOICE"}</div>
      </div>
      <div className="pmeta">
        <div><small>Invoice no.</small><b>{inv.no}</b></div>
        <div><small>Date</small><b>{new Date(inv.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</b></div>
        {inv.customer && <div><small>Guest</small><b>{inv.customer}</b></div>}
        {inv.room && <div><small>Room / Table</small><b>{inv.room}</b></div>}
        {BUSINESS.gstin && <div><small>Place of supply</small><b>{stateOf(inv.guestGstin) || stateOf(BUSINESS.gstin)}</b></div>}
        {inv.guestGstin && <div><small>Guest GSTIN</small><b>{inv.guestGstin}</b></div>}
      </div>
      <table>
        <thead><tr><th>Item</th>{BUSINESS.gstin && sac && <th>SAC</th>}<th className="r">Qty</th><th className="r">Rate</th><th className="r">Amt</th></tr></thead>
        <tbody>{inv.lines.map((l) => <tr key={l.id}><td>{l.name}</td>{BUSINESS.gstin && sac && <td>{sac}</td>}<td className="r">{l.qty}</td><td className="r">{inr(l.price)}</td><td className="r">{inr(l.price * l.qty)}</td></tr>)}</tbody>
      </table>
      <div className="totals">
        <div><span>Subtotal</span><span>{inr(inv.subtotal)}</span></div>
        {inv.discount > 0 && <div><span>Discount</span><span>−{inr(inv.discount)}</span></div>}
        {split && <div><span>Taxable value</span><span>{inr(inv.subtotal - (inv.discount || 0))}</span></div>}
        {(split || [["Tax", inv.taxPercent, inv.tax]]).map(([n, r, a]) => <div key={n}><span>{n} ({r}%)</span><span>{inr(a)}</span></div>)}
        <div className="grand"><span>Total</span><span>{inr(inv.total)}</span></div>
      </div>
      <div className="pfoot">
        <PaidStamp inv={inv} name={BUSINESS.name} place={BUSINESS.address} />
        <p className="thanks">Thank you for staying with us!</p>
        <p className="tag">“{BUSINESS.tagline}”</p>
        {BUSINESS.footer && <p className="fnote">{BUSINESS.footer}</p>}
      </div>
    </div>
  );
}

// Round rubber stamp: ring text, PAID band, payment + date, rough ink texture via SVG filters.
function PaidStamp({ inv, name, place }) {
  const id = "st" + String(inv.no).replace(/\W/g, "");
  const d = new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
  const ring = `${(name || "").toUpperCase()} ★ ${(place || "").split(",")[0].replace(/serene hills of /i, "").toUpperCase()} ★ `;
  const ink = "#1b8a3a";
  return (
    <svg className="stamp" viewBox="0 0 220 220" width="190" height="190" aria-label={`Paid by ${inv.payment}`}>
      <defs>
        <filter id={id + "f"} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={String(inv.no).length * 7} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2.25" result="holes" />
          <feComposite in="SourceGraphic" in2="holes" operator="in" result="speckled" />
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="w" />
          <feDisplacementMap in="speckled" in2="w" scale="2.5" />
        </filter>
        <path id={id + "p"} d="M110,110 m-81,0 a81,81 0 1,1 162,0 a81,81 0 1,1 -162,0" />
      </defs>
      <g filter={`url(#${id}f)`} fill="none" stroke={ink} opacity=".88">
        <circle cx="110" cy="110" r="104" strokeWidth="5" />
        <circle cx="110" cy="110" r="96" strokeWidth="1.5" />
        <circle cx="110" cy="110" r="68" strokeWidth="1.5" />
        <text fill={ink} stroke="none" fontSize="14" fontWeight="800" letterSpacing="2" fontFamily="Arial, sans-serif">
          <textPath href={`#${id}p`} startOffset="0" textLength="500" lengthAdjust="spacingAndGlyphs">{ring}</textPath>
        </text>
        <rect x="40" y="88" width="140" height="44" rx="4" fill="#fff" strokeWidth="3.5" />
        <rect x="45" y="93" width="130" height="34" rx="2" strokeWidth="1.2" />
        <text x="110" y="121" textAnchor="middle" fill={ink} stroke="none" fontSize="29" fontWeight="900" letterSpacing="6" fontFamily="Arial Black, Arial, sans-serif">PAID</text>
        <text x="110" y="78" textAnchor="middle" fill={ink} stroke="none" fontSize="12" fontWeight="800" letterSpacing="2" fontFamily="Arial, sans-serif">{inv.no}</text>
        <text x="110" y="152" textAnchor="middle" fill={ink} stroke="none" fontSize="13" fontWeight="800" letterSpacing="2" fontFamily="Arial, sans-serif">{String(inv.payment).toUpperCase()}</text>
        <text x="110" y="166" textAnchor="middle" fill={ink} stroke="none" fontSize="10" fontWeight="700" letterSpacing="1" fontFamily="Arial, sans-serif">{d}</text>
      </g>
    </svg>
  );
}
