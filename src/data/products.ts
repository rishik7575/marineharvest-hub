
// Common product type
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

// Marine products
export const marineProducts: Product[] = [
  {
    id: "salmon-premium",
    name: "Premium Atlantic Salmon",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1583833008338-31a6657917ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Fish",
    description: "Premium quality Atlantic salmon, sustainably farmed with no antibiotics or hormones."
  },
  {
    id: "seabass-fresh",
    name: "Fresh Sea Bass",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1559589332-a2c156ada4c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Fish",
    description: "Wild-caught sea bass known for its delicate flavor and firm texture."
  },
  {
    id: "oysters-dozen",
    name: "Fresh Oysters",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1569513600253-e490a7e67e79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Shellfish",
    description: "Premium fresh oysters harvested from pristine waters. Dozen pack."
  },
  {
    id: "lobster-live",
    name: "Live Lobster",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1559574449-c474edf8f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Shellfish",
    description: "Fresh live lobster, perfect for special occasions and gourmet dining."
  },
  {
    id: "shrimp-jumbo",
    name: "Jumbo Shrimp",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1565680018093-ebb6b9ab5460?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Shellfish",
    description: "Large, succulent shrimp perfect for grilling, sautéing, or adding to pasta dishes."
  },
  {
    id: "seaweed-nori",
    name: "Dried Nori Seaweed",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1584314620467-8d36986b2daa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Seaweed",
    description: "Premium dried nori seaweed, perfect for sushi making and as a nutritious snack."
  }
];

// Farming equipment products
export const farmingProducts: Product[] = [
  {
    id: "water-quality-monitor",
    name: "Water Quality Monitor",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1543332143-4e8c27e3256f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Monitoring",
    description: "Professional water quality monitoring device with pH, temperature, and dissolved oxygen sensors."
  },
  {
    id: "automatic-feeder",
    name: "Automatic Fish Feeder",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1565027723308-0311dbee5b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Equipment",
    description: "Timer-controlled automatic fish feeder for home aquariums and small farming operations."
  },
  {
    id: "water-pump",
    name: "High-Flow Water Pump",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1635731566822-0cf8095310e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Equipment",
    description: "Energy-efficient water pump with high flow rate, perfect for aquaculture systems."
  },
  {
    id: "aquaponics-kit",
    name: "Complete Aquaponics Kit",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Systems",
    description: "All-in-one aquaponics system for growing fish and plants together in a sustainable ecosystem."
  }
];

// Sustainable farming products
export const sustainableProducts: Product[] = [
  {
    id: "organic-fish-feed",
    name: "Organic Fish Feed",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1584017711689-8660dae904b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Feed",
    description: "100% organic fish feed made from sustainable ingredients, promoting healthy fish growth."
  },
  {
    id: "floating-fish-habitat",
    name: "Floating Fish Habitat",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1596122787821-33ae219d6051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Habitat",
    description: "Environmentally friendly floating habitats that mimic natural conditions for healthier fish."
  },
  {
    id: "water-filtration-system",
    name: "Advanced Water Filtration System",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1585358682246-11495874ce0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Filtration",
    description: "Energy-efficient water filtration system that reduces waste and improves water quality."
  },
  {
    id: "solar-powered-aerator",
    name: "Solar-Powered Aerator",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1586722392117-9d839fbaaf62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Equipment",
    description: "Eco-friendly solar-powered aerator for maintaining optimal oxygen levels in fish ponds."
  }
];

// Equipment products
export const equipmentProducts: Product[] = [
  {
    id: "fishing-net",
    name: "Professional Fishing Net",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1545535408-8d170b04f7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Fishing Gear",
    description: "High-quality fishing net for professional use, durable and designed for easy handling."
  },
  {
    id: "underwater-drone",
    name: "Underwater Inspection Drone",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1589817327185-d6502a471945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    description: "Advanced underwater drone for monitoring fish health and farm conditions."
  },
  {
    id: "protective-gear",
    name: "Marine Farming Protective Gear",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1588875173858-daab9e336a9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Safety",
    description: "Complete set of protective gear for marine farming operations, including waterproof clothing."
  },
  {
    id: "feeding-system",
    name: "Automated Feeding System",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1584820308869-9ca923c10334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Automation",
    description: "Programmable feeding system for large-scale fish farming, with remote control capabilities."
  }
];
