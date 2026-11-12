/* ============================================================
   MARAYA — 站点数据文件
   改这里就能改整站：品牌名、WhatsApp、邮箱、汇率、商品
   商品图片：把图片放进 assets/img/，image 填 "assets/img/xxx.jpg"
   ============================================================ */
window.STORE = {
  brand: "MARAYA",
  tagline: "Objects for slow living",
  hero: {
    eyebrow: "Handmade in small batches",
    title: "Quiet objects for the <em>slow</em> everyday.",
    lead: "Ceramics, textiles and light made by hand in limited runs — sourced, finished and packed for homes across Southeast Asia and the Gulf.",
    primary: "Explore the collection",
    secondary: "How ordering works",
    note: "Ships from our studio within 7 days · Quotations in USD, AED, MYR and more"
  },
  whatsapp: "60123456789",          /* 换成你的号码：国家码+号码，不要 + 号和空格 */
  email: "hello@maraya.studio",
  instagram: "maraya.studio",
  markets: ["Malaysia", "Singapore", "Indonesia", "Thailand", "Philippines", "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain"],
  currency: "USD",
  rates: { USD: 1, AED: 3.67, SAR: 3.75, MYR: 4.70, SGD: 1.34, IDR: 16000, PHP: 58 },
  symbols: { USD: "$", AED: "AED ", SAR: "SAR ", MYR: "RM ", SGD: "S$", IDR: "Rp ", PHP: "₱" },
  leadTime: "Dispatched in 5–7 days",
  shippingNote: "Quoted per destination — we confirm freight before you pay anything.",
  story: {
    title: "We make slowly, on purpose.",
    body: "MARAYA began in a two-room studio with a single kiln and a stubborn belief: that the objects you touch every day should be made by people, not machines. Every piece in this collection is thrown, woven or finished by hand, in runs small enough that the maker still knows each one.",
    body2: "We work directly with six family-run workshops across the region — no middle layer, no wholesale markup, no seasonal churn. When a batch sells out, it is genuinely gone until the next firing."
  },
  products: [
    {
      slug: "terra-carafe",
      name: "Terra Carafe",
      cat: "Ceramics",
      price: 48,
      tag: "New",
      tint: ["#C8B39B", "#8A7157"],
      image: "",
      blurb: "Stoneware carafe with a matte sand glaze, thrown on the wheel in a run of forty.",
      desc: "A water carafe sized for a dinner table of four. The body is thrown in stoneware, trimmed by hand and dipped in a matte sand glaze that leaves the foot lightly raw — so no two pieces share the same surface.",
      specs: [["Material", "Stoneware, food-safe glaze"], ["Capacity", "1.1 L"], ["Height", "24 cm"], ["Care", "Hand wash, not microwave safe"], ["Edition", "Run of 40"]],
      stock: "In stock"
    },
    {
      slug: "linen-throw",
      name: "Woven Linen Throw",
      cat: "Textiles",
      price: 96,
      tag: "",
      tint: ["#B9B49F", "#6F7259"],
      image: "",
      blurb: "Loom-woven linen and cotton, stonewashed twice for a softened hand.",
      desc: "Woven on a four-shaft loom in a small workshop outside Yogyakarta, then stonewashed twice. The weight sits between a blanket and a bedspread — the kind of thing that ends up on the sofa rather than the bed.",
      specs: [["Material", "55% linen, 45% cotton"], ["Size", "140 × 200 cm"], ["Weight", "780 g"], ["Care", "Machine wash cold, line dry"], ["Origin", "Indonesia"]],
      stock: "In stock"
    },
    {
      slug: "dune-table-lamp",
      name: "Dune Table Lamp",
      cat: "Lighting",
      price: 132,
      tag: "Limited",
      tint: ["#D6C3A5", "#93764E"],
      image: "",
      blurb: "Turned oak base with a hand-pleated shade, warm 2700K dimmable bulb included.",
      desc: "A low, wide lamp meant for a bedside or a reading chair. The base is turned from a single block of oak and finished with a hardwax oil; the shade is pleated by hand around a brass frame. Wired for 220–240V with an inline dimmer.",
      specs: [["Material", "Oak, cotton shade, brass"], ["Height", "38 cm"], ["Voltage", "220–240V, plug type G / C"], ["Bulb", "E27 2700K dimmable, included"], ["Cable", "1.8 m braided"]],
      stock: "6 left"
    },
    {
      slug: "oud-amber-candle",
      name: "Oud & Amber Candle",
      cat: "Wellness",
      price: 34,
      tag: "",
      tint: ["#C0A18A", "#6B4B3E"],
      image: "",
      blurb: "Coconut-soy wax, cotton wick, 48 hours. Oud, amber, dry cedar.",
      desc: "Poured in small batches into a reusable stoneware vessel. The scent opens with dry cedar, settles into oud and amber, and stays close to the room rather than filling it. Roughly 48 hours of burn time.",
      specs: [["Wax", "Coconut-soy blend"], ["Weight", "240 g"], ["Burn time", "~48 hours"], ["Scent", "Oud, amber, cedarwood"], ["Vessel", "Reusable stoneware"]],
      stock: "In stock"
    },
    {
      slug: "hand-thrown-bowl-set",
      name: "Hand-Thrown Bowl Set",
      cat: "Ceramics",
      price: 64,
      tag: "",
      tint: ["#CFC2B4", "#7E6A5B"],
      image: "",
      blurb: "Four nesting bowls in graded sizes, each one slightly different by nature.",
      desc: "Four bowls that nest, thrown as a set so the rims sit within a few millimetres of each other. Glazed inside in a soft bone white, left unglazed at the rim. Sold as a set of four only.",
      specs: [["Material", "Stoneware"], ["Sizes", "9 / 12 / 15 / 18 cm"], ["Pieces", "4"], ["Care", "Dishwasher safe"], ["Edition", "Made to order"]],
      stock: "In stock"
    },
    {
      slug: "rattan-pendant",
      name: "Rattan Pendant",
      cat: "Lighting",
      price: 88,
      tag: "New",
      tint: ["#D9C6A3", "#8C7345"],
      image: "",
      blurb: "Hand-woven rattan dome on a 1.5 m fabric cord. Casts a warm, patterned light.",
      desc: "Woven from rattan cane over a steam-bent frame. The open weave throws a soft lattice of light onto the wall behind it, which is really the point. Supplied with a 1.5 m fabric cord and ceiling cup.",
      specs: [["Material", "Natural rattan, cotton cord"], ["Diameter", "42 cm"], ["Cord", "1.5 m, adjustable"], ["Bulb", "E27, max 40W (not included)"], ["Note", "Natural shade varies"]],
      stock: "In stock"
    }
  ]
};
