export interface ProductSize {
  label: string;
  price: number;
  dimensions?: string;
}

export interface ProductImage {
  url: string;
  public_id: string;
}

export interface SampleProduct {
  _id: string;
  name: string;
  startingPrice: number;
  image: string;
  images: ProductImage[];
  description: string;
  story: string;
  sizes: ProductSize[];
  supportsCustomText: boolean;
  category: string;
}

export const sampleProducts: SampleProduct[] = [
  // --- FRAMES ---
  {
    _id: "sample-frames-1",
    name: "Classic Noir Frame",
    startingPrice: 1299,
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop", public_id: "frames-1-1" },
      { url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop", public_id: "frames-1-2" },
      { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", public_id: "frames-1-3" }
    ],
    description: "Elegant matte black gallery frame crafted with precision museum-grade borders.",
    story: "Designed for modern living spaces, the Classic Noir Frame features an ultra-matte black finish and custom float borders. Hand-assembled by our master framers, it draws absolute focus to the visual storytelling of your artwork.",
    sizes: [
      { label: "8x10 Frame", price: 1299, dimensions: "20x25 cm" },
      { label: "11x14 Frame", price: 1899, dimensions: "28x35 cm" },
      { label: "16x20 Frame", price: 2999, dimensions: "40x50 cm" }
    ],
    supportsCustomText: true,
    category: "frames"
  },
  {
    _id: "sample-frames-2",
    name: "Aura Gold Floating Frame",
    startingPrice: 1899,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop", public_id: "frames-2-1" },
      { url: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop", public_id: "frames-2-2" },
      { url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop", public_id: "frames-2-3" }
    ],
    description: "Minimalist brass and double glass floating frame that suspends your prints in light.",
    story: "The Aura Gold Floating Frame creates a stunning weightless effect. Sandwiched between two panes of optical-grade glass and bound by hand-polished antique brass, your photograph floats beautifully in mid-air.",
    sizes: [
      { label: "8x10 Floating", price: 1899, dimensions: "20x25 cm" },
      { label: "11x14 Floating", price: 2499, dimensions: "28x35 cm" }
    ],
    supportsCustomText: false,
    category: "frames"
  },
  {
    _id: "sample-frames-3",
    name: "Rustic Oak Poster Frame",
    startingPrice: 1499,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", public_id: "frames-3-1" },
      { url: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop", public_id: "frames-3-2" },
      { url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop", public_id: "frames-3-3" }
    ],
    description: "Warm, natural white oak frame displaying organic grains and timeless comfort.",
    story: "Crafted from sustainably sourced white oak, this frame preserves the natural grain and texture of the wood. Sealed with organic beeswax, it offers a soft, natural, warm home style for your cozy landscapes.",
    sizes: [
      { label: "8x10 Oak", price: 1499, dimensions: "20x25 cm" },
      { label: "11x14 Oak", price: 1999, dimensions: "28x35 cm" },
      { label: "16x20 Oak", price: 3199, dimensions: "40x50 cm" }
    ],
    supportsCustomText: true,
    category: "frames"
  },
  {
    _id: "sample-frames-4",
    name: "Studio Gallery Frame Set",
    startingPrice: 3499,
    image: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=800&auto=format&fit=crop", public_id: "frames-4-1" },
      { url: "https://images.unsplash.com/photo-1531244023467-06299309fc45?q=80&w=800&auto=format&fit=crop", public_id: "frames-4-2" },
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop", public_id: "frames-4-3" }
    ],
    description: "Curated set of three matching museum frames for a gorgeous wall collection.",
    story: "Transform any blank wall into a private gallery with the Studio Gallery Frame Set. Featuring three matching black wood frames, complete with archival-grade window mats and mounting guides.",
    sizes: [
      { label: "Set of 3 (8x10)", price: 3499, dimensions: "3 x 20x25 cm" },
      { label: "Set of 3 (11x14)", price: 4999, dimensions: "3 x 28x35 cm" }
    ],
    supportsCustomText: true,
    category: "frames"
  },

  // --- ALBUMS ---
  {
    _id: "sample-albums-1",
    name: "Vintage Linen Memory Book",
    startingPrice: 2499,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop", public_id: "albums-1-1" },
      { url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop", public_id: "albums-1-2" },
      { url: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop", public_id: "albums-1-3" }
    ],
    description: "Timeless photo album covered in organic neutral linen with heavy layflat sheets.",
    story: "Our signature Vintage Linen Memory Book features layflat binding, allowing full-page photographic layouts to lay perfectly flat. Each page is made from acid-free cardstock that won't fade or yellow over time.",
    sizes: [
      { label: "Standard 8x8", price: 2499, dimensions: "20x20 cm" },
      { label: "Classic 10x10", price: 3299, dimensions: "25x25 cm" },
      { label: "Grand 12x12", price: 4200, dimensions: "30x30 cm" }
    ],
    supportsCustomText: true,
    category: "albums"
  },
  {
    _id: "sample-albums-2",
    name: "Minimalist Linen Photo Journal",
    startingPrice: 1899,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop", public_id: "albums-2-1" },
      { url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop", public_id: "albums-2-2" },
      { url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=800&auto=format&fit=crop", public_id: "albums-2-3" }
    ],
    description: "A compact linen-wrapped photo journal with spaces for captions and sketches.",
    story: "Designed for visual storytellers and travelers, the Photo Journal combines warm linen covers with elegant writing paper. Perfect for scrapbooking polaroids, tickets, and writing personal diaries alongside prints.",
    sizes: [
      { label: "Journal 6x8", price: 1899, dimensions: "15x20 cm" },
      { label: "Journal 8x10", price: 2399, dimensions: "20x25 cm" }
    ],
    supportsCustomText: true,
    category: "albums"
  },
  {
    _id: "sample-albums-3",
    name: "Bespoke Leather Scrapbook",
    startingPrice: 3200,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop", public_id: "albums-3-1" },
      { url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", public_id: "albums-3-2" },
      { url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop", public_id: "albums-3-3" }
    ],
    description: "Genuine vegetable-tanned leather binder, hand-stitched with waxed threads.",
    story: "The Bespoke Leather Scrapbook is built to last centuries. Made of thick full-grain leather that acquires a rich patina with handling, it features post-binding for easy rearrangement and addition of memories.",
    sizes: [
      { label: "Standard 9x11", price: 3200, dimensions: "23x28 cm" },
      { label: "Premium 11x14", price: 4500, dimensions: "28x35 cm" }
    ],
    supportsCustomText: true,
    category: "albums"
  },
  {
    _id: "sample-albums-4",
    name: "Monochrome Gallery Album",
    startingPrice: 2199,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop", public_id: "albums-4-1" },
      { url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop", public_id: "albums-4-2" },
      { url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop", public_id: "albums-4-3" }
    ],
    description: "Sleek, deep black portfolio with glassine paper sheets between photographs.",
    story: "For fine art enthusiasts, the Monochrome Gallery Album is a luxurious presentation catalog. Translucent glassine paper sheets separate each heavy card page to prevent visual scuffs and maximize preservation.",
    sizes: [
      { label: "Portfolio 8x10", price: 2199, dimensions: "20x25 cm" },
      { label: "Portfolio 12x12", price: 3199, dimensions: "30x30 cm" }
    ],
    supportsCustomText: false,
    category: "albums"
  },

  // --- MUGS ---
  {
    _id: "sample-mugs-1",
    name: "Stoneware Speckled Mug",
    startingPrice: 799,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop", public_id: "mugs-1-1" },
      { url: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop", public_id: "mugs-1-2" },
      { url: "https://images.unsplash.com/photo-1536304997881-a372c179924b?q=80&w=800&auto=format&fit=crop", public_id: "mugs-1-3" }
    ],
    description: "Hand-thrown organic stoneware mug with dynamic natural iron speckles.",
    story: "Crafted individually by ceramic artists, the Stoneware Speckled Mug blends earth tones with daily utility. Cozy handle contours and iron-rich clay body give it warmth and tactile weight.",
    sizes: [
      { label: "Single Mug (350ml)", price: 799, dimensions: "12oz" },
      { label: "Couple Set (2 Mugs)", price: 1499, dimensions: "2 x 12oz" }
    ],
    supportsCustomText: true,
    category: "mugs"
  },
  {
    _id: "sample-mugs-2",
    name: "Marble Essence Mug",
    startingPrice: 999,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop", public_id: "mugs-2-1" },
      { url: "https://images.unsplash.com/photo-1616628188502-413f2fe46e5e?q=80&w=800&auto=format&fit=crop", public_id: "mugs-2-2" },
      { url: "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=800&auto=format&fit=crop", public_id: "mugs-2-3" }
    ],
    description: "Porcelain coffee mug showing hand-swirled marble veins and painted gold rim.",
    story: "The Marble Essence Mug features premium porcelain clay mixed with colored pigments. A delicate 24k gold hand-painted rim completes this luxury coffee companion.",
    sizes: [
      { label: "Single Mug (300ml)", price: 999, dimensions: "10oz" },
      { label: "Couple Set (2 Mugs)", price: 1899, dimensions: "2 x 10oz" }
    ],
    supportsCustomText: true,
    category: "mugs"
  },
  {
    _id: "sample-mugs-3",
    name: "Minimalist Matte Mug",
    startingPrice: 699,
    image: "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=800&auto=format&fit=crop", public_id: "mugs-3-1" },
      { url: "https://images.unsplash.com/photo-1536304997881-a372c179924b?q=80&w=800&auto=format&fit=crop", public_id: "mugs-3-2" },
      { url: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop", public_id: "mugs-3-3" }
    ],
    description: "Sleek, double-walled matte black mug that keeps drinks hot and fingers cool.",
    story: "Featuring a contemporary silhouette, this mug boasts a smooth satin matte finish. Its double-walled construction ensures heat retention while keeping the outer shell comfortable to hold.",
    sizes: [
      { label: "Matte Black (350ml)", price: 699, dimensions: "12oz" }
    ],
    supportsCustomText: true,
    category: "mugs"
  },
  {
    _id: "sample-mugs-4",
    name: "Custom Monogram Mug Set",
    startingPrice: 1599,
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop", public_id: "mugs-4-1" },
      { url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop", public_id: "mugs-4-2" },
      { url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop", public_id: "mugs-4-3" }
    ],
    description: "A pair of custom monogrammed clay mugs, perfect for morning rituals together.",
    story: "Hand-stamped with your choice of initial, these ceramic mugs are custom-glazed to order. They feature a raw clay bottom and a soft cream-colored glossy interior.",
    sizes: [
      { label: "Mug Set (2 Mugs)", price: 1599, dimensions: "2 x 12oz" }
    ],
    supportsCustomText: true,
    category: "mugs"
  },

  // --- POLAROIDS ---
  {
    _id: "sample-polaroids-1",
    name: "Polaroid Hanging String Set",
    startingPrice: 599,
    image: "https://images.unsplash.com/photo-1520187881682-12f71f92e3a0?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1520187881682-12f71f92e3a0?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-1-1" },
      { url: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-1-2" },
      { url: "https://images.unsplash.com/photo-1512446813927-4a78788c484c?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-1-3" }
    ],
    description: "Vintage retro prints on heavy gloss paper, supplied with twine and wooden pegs.",
    story: "Recreate old-school aesthetics. Your uploaded photos are optimized with warm-tone analogue filters and printed with wide borders, ready to hang in bedrooms or home offices.",
    sizes: [
      { label: "Set of 12 Prints", price: 599, dimensions: "8x10 cm prints" },
      { label: "Set of 24 Prints", price: 999, dimensions: "8x10 cm prints" }
    ],
    supportsCustomText: true,
    category: "polaroids"
  },
  {
    _id: "sample-polaroids-2",
    name: "Chamber Wooden Polaroid Box",
    startingPrice: 1299,
    image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-2-1" },
      { url: "https://images.unsplash.com/photo-1512446813927-4a78788c484c?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-2-2" },
      { url: "https://images.unsplash.com/photo-1520187881682-12f71f92e3a0?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-2-3" }
    ],
    description: "Crafted solid pine wood display box containing 20 high-quality matte prints.",
    story: "A beautiful storage and display solution. Slide open the pine wood lid to find your custom prints resting on wood shavings. The top slot allows you to stand one polaroid upright as a rotating desk frame.",
    sizes: [
      { label: "Classic Box (20 prints)", price: 1299, dimensions: "10x12 cm Box" },
      { label: "Large Box (40 prints)", price: 1999, dimensions: "10x12 cm Box" }
    ],
    supportsCustomText: true,
    category: "polaroids"
  },
  {
    _id: "sample-polaroids-3",
    name: "Mini Photo Magnet Kit",
    startingPrice: 899,
    image: "https://images.unsplash.com/photo-1512446813927-4a78788c484c?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1512446813927-4a78788c484c?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-3-1" },
      { url: "https://images.unsplash.com/photo-1520187881682-12f71f92e3a0?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-3-2" },
      { url: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-3-3" }
    ],
    description: "Ten magnetic-backed glossy square prints, ready to display on metal frames.",
    story: "Brighten up your workspace or kitchen refrigerator. Each square polaroid-style image is mounted on a thin, strong flexible magnetic back with high-gloss print layers.",
    sizes: [
      { label: "Set of 10 Magnets", price: 899, dimensions: "8x8 cm prints" }
    ],
    supportsCustomText: false,
    category: "polaroids"
  },
  {
    _id: "sample-polaroids-4",
    name: "Classic Retro Polaroid Pack",
    startingPrice: 499,
    image: "https://images.unsplash.com/photo-1512446813927-4a78788c484c?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1512446813927-4a78788c484c?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-4-1" },
      { url: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-4-2" },
      { url: "https://images.unsplash.com/photo-1520187881682-12f71f92e3a0?q=80&w=800&auto=format&fit=crop", public_id: "polaroids-4-3" }
    ],
    description: "Pure analog-feel prints with premium textured paper borders for memories.",
    story: "True retro formatting. Made with heavy textured art card, our polaroids offer wide bottom writeable borders and subtle vintage filters applied dynamically to your photos.",
    sizes: [
      { label: "Pack of 15 Prints", price: 499, dimensions: "8x10 cm" },
      { label: "Pack of 30 Prints", price: 899, dimensions: "8x10 cm" }
    ],
    supportsCustomText: true,
    category: "polaroids"
  },

  // --- POSTERS ---
  {
    _id: "sample-posters-1",
    name: "Gilded Edge Botanical Poster",
    startingPrice: 899,
    image: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=800&auto=format&fit=crop", public_id: "posters-1-1" },
      { url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop", public_id: "posters-1-2" },
      { url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop", public_id: "posters-1-3" }
    ],
    description: "Premium archival art print with metallic gold leaf foil highlighting the outlines.",
    story: "Combine digital artwork with manual gilding. Each poster is individually stamped with high-shine gold foil leaves on textured watercolor card, creating eye-catching wall statements.",
    sizes: [
      { label: "A4 Poster", price: 899, dimensions: "21x29.7 cm" },
      { label: "A3 Poster", price: 1499, dimensions: "29.7x42 cm" },
      { label: "A2 Poster", price: 2299, dimensions: "42x59.4 cm" }
    ],
    supportsCustomText: false,
    category: "posters"
  },
  {
    _id: "sample-posters-2",
    name: "Custom Typography Poster",
    startingPrice: 699,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", public_id: "posters-2-1" },
      { url: "https://images.unsplash.com/photo-1579783922619-2a1e97801351?q=80&w=800&auto=format&fit=crop", public_id: "posters-2-2" },
      { url: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=800&auto=format&fit=crop", public_id: "posters-2-3" }
    ],
    description: "Archival poster displaying custom typography of quotes or family names.",
    story: "Make your favorite quote a visual masterpiece. Choose a layout style and typeface, and we'll print it with crisp high-definition inks on heavyweight textured canvas paper.",
    sizes: [
      { label: "A4 Custom Print", price: 699, dimensions: "21x29.7 cm" },
      { label: "A3 Custom Print", price: 1199, dimensions: "29.7x42 cm" },
      { label: "A2 Custom Print", price: 1899, dimensions: "42x59.4 cm" }
    ],
    supportsCustomText: true,
    category: "posters"
  },
  {
    _id: "sample-posters-3",
    name: "Minimalist Line Art Poster",
    startingPrice: 799,
    image: "https://images.unsplash.com/photo-1579783922619-2a1e97801351?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1579783922619-2a1e97801351?q=80&w=800&auto=format&fit=crop", public_id: "posters-3-1" },
      { url: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=800&auto=format&fit=crop", public_id: "posters-3-2" },
      { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", public_id: "posters-3-3" }
    ],
    description: "Elegant fine line illustration on heavy cardstock for a sophisticated look.",
    story: "Drawn with elegant continuous line techniques. The clean, black line drawing contrasting with warm beige backgrounds matches perfectly with wooden console setups.",
    sizes: [
      { label: "A4 Line Art", price: 799, dimensions: "21x29.7 cm" },
      { label: "A3 Line Art", price: 1299, dimensions: "29.7x42 cm" }
    ],
    supportsCustomText: false,
    category: "posters"
  },
  {
    _id: "sample-posters-4",
    name: "Vintage Celestial Poster",
    startingPrice: 999,
    image: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=800&auto=format&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=800&auto=format&fit=crop", public_id: "posters-4-1" },
      { url: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=800&auto=format&fit=crop", public_id: "posters-4-2" },
      { url: "https://images.unsplash.com/photo-1579783922619-2a1e97801351?q=80&w=800&auto=format&fit=crop", public_id: "posters-4-3" }
    ],
    description: "Detailed star map or astronomical vintage drawings printed on textured kraft paper.",
    story: "For stargazers and collectors, the Vintage Celestial Poster depicts astronomical chart engravings from the 18th century, reprinted in warm golden sepia tones.",
    sizes: [
      { label: "A3 Star Chart", price: 999, dimensions: "29.7x42 cm" },
      { label: "A2 Star Chart", price: 1699, dimensions: "42x59.4 cm" }
    ],
    supportsCustomText: false,
    category: "posters"
  }
];
