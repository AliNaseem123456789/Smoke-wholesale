// // Mock data for the wholesale smoke shop

// export interface Product {
//   id: string;
//   name: string;
//   brand: string;
//   category: string;
//   image: string;
//   description: string;
//   flavors?: string[];
//   price: number;
//   isNew?: boolean;
//   isBestSeller?: boolean;
// }

// export interface Brand {
//   id: string;
//   name: string;
//   logo: string;
//   category: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   brands: string[];
// }

// export const categories: Category[] = [
//   {
//     id: "vapes",
//     name: "Vapes",
//     brands: ["Elf Bar", "Lost Mary", "Geek Bar", "Hyde", "Vaporesso"]
//   },
//   {
//     id: "hookah",
//     name: "Hookah",
//     brands: ["Al Fakher", "Starbuzz", "Fumari", "Social Smoke", "Tangiers"]
//   },
//   {
//     id: "disposable-vapes",
//     name: "Disposable Vapes",
//     brands: ["Puff Bar", "HQD", "Bang", "Breeze", "Air Bar"]
//   },
//   {
//     id: "accessories",
//     name: "Accessories",
//     brands: ["RAW", "Clipper", "Zippo", "Elements", "OCB"]
//   },
//   {
//     id: "glass-tools",
//     name: "Glass & Tools",
//     brands: ["Hemper", "Pulsar", "Eyce", "Grav Labs", "Empire Glassworks"]
//   }
// ];

// export const brands: Brand[] = [
//   { id: "elf-bar", name: "Elf Bar", logo: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=200&h=100&fit=crop", category: "vapes" },
//   { id: "lost-mary", name: "Lost Mary", logo: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=200&h=100&fit=crop", category: "vapes" },
//   { id: "geek-bar", name: "Geek Bar", logo: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=200&h=100&fit=crop", category: "vapes" },
//   { id: "hyde", name: "Hyde", logo: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=100&fit=crop", category: "vapes" },
//   { id: "vaporesso", name: "Vaporesso", logo: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=200&h=100&fit=crop", category: "vapes" },
//   { id: "al-fakher", name: "Al Fakher", logo: "https://images.unsplash.com/photo-1582538885592-e70a5d7ab3d3?w=200&h=100&fit=crop", category: "hookah" },
//   { id: "starbuzz", name: "Starbuzz", logo: "https://images.unsplash.com/photo-1582538885592-e70a5d7ab3d3?w=200&h=100&fit=crop", category: "hookah" },
//   { id: "fumari", name: "Fumari", logo: "https://images.unsplash.com/photo-1582538885592-e70a5d7ab3d3?w=200&h=100&fit=crop", category: "hookah" },
//   { id: "raw", name: "RAW", logo: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=200&h=100&fit=crop", category: "accessories" },
//   { id: "hemper", name: "Hemper", logo: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=200&h=100&fit=crop", category: "glass-tools" },
// ];

// export const products: Product[] = [
//   // Vapes - Elf Bar
//   {
//     id: "1",
//     name: "BC5000 Disposable Vape",
//     brand: "Elf Bar",
//     category: "vapes",
//     image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop",
//     description: "Premium disposable vape with 5000 puffs. Features mesh coil technology for consistent flavor delivery.",
//     flavors: ["Blue Razz Ice", "Strawberry Mango", "Peach Ice", "Watermelon Ice", "Mixed Berry"],
//     price: 8.99,
//     isNew: true,
//     isBestSeller: true
//   },
//   {
//     id: "2",
//     name: "TE6000 Rechargeable",
//     brand: "Elf Bar",
//     category: "vapes",
//     image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=400&h=400&fit=crop",
//     description: "Advanced rechargeable disposable with 6000 puffs and USB-C charging.",
//     flavors: ["Grape Energy", "Miami Mint", "Rainbow Candy", "Kiwi Passion Fruit"],
//     price: 10.99,
//     isBestSeller: true
//   },
//   {
//     id: "3",
//     name: "Lost Mary OS5000",
//     brand: "Lost Mary",
//     category: "vapes",
//     image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=400&fit=crop",
//     description: "Compact design with 5000 puffs and rich flavors.",
//     flavors: ["Blue Cotton Candy", "Strawberry Ice", "Pineapple Mango", "Blueberry Ice"],
//     price: 9.49,
//     isNew: true
//   },
//   {
//     id: "4",
//     name: "Geek Bar Pulse",
//     brand: "Geek Bar",
//     category: "disposable-vapes",
//     image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop",
//     description: "Innovative pulse mode technology for enhanced flavor.",
//     flavors: ["Tropical Rainbow Blast", "Sour Apple Ice", "Fcuking Fab"],
//     price: 11.99,
//     isBestSeller: true
//   },
//   {
//     id: "5",
//     name: "Hyde Edge Rave",
//     brand: "Hyde",
//     category: "disposable-vapes",
//     image: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=400&h=400&fit=crop",
//     description: "Premium disposable with LED light effects and 4000 puffs.",
//     flavors: ["Peach Mango Watermelon", "Strawberry Banana", "Blue Razz"],
//     price: 7.99,
//     isNew: false
//   },
  
//   // Hookah Products
//   {
//     id: "6",
//     name: "Double Apple Hookah Tobacco",
//     brand: "Al Fakher",
//     category: "hookah",
//     image: "https://images.unsplash.com/photo-1582538885592-e70a5d7ab3d3?w=400&h=400&fit=crop",
//     description: "Premium hookah tobacco with authentic double apple flavor. 250g package.",
//     price: 12.99,
//     isBestSeller: true
//   },
//   {
//     id: "7",
//     name: "Mint Hookah Tobacco",
//     brand: "Al Fakher",
//     category: "hookah",
//     image: "https://images.unsplash.com/photo-1582538885592-e70a5d7ab3d3?w=400&h=400&fit=crop",
//     description: "Cool refreshing mint flavor. 250g package.",
//     price: 12.99,
//     isNew: false
//   },
//   {
//     id: "8",
//     name: "Blue Mist Hookah Tobacco",
//     brand: "Starbuzz",
//     category: "hookah",
//     image: "https://images.unsplash.com/photo-1582538885592-e70a5d7ab3d3?w=400&h=400&fit=crop",
//     description: "Signature Blue Mist blend. 250g package.",
//     price: 15.99,
//     isBestSeller: true
//   },
//   {
//     id: "9",
//     name: "Spiced Chai Hookah Tobacco",
//     brand: "Fumari",
//     category: "hookah",
//     image: "https://images.unsplash.com/photo-1582538885592-e70a5d7ab3d3?w=400&h=400&fit=crop",
//     description: "Rich spiced chai flavor. 100g package.",
//     price: 9.99,
//     isNew: true
//   },

//   // Accessories
//   {
//     id: "10",
//     name: "RAW Classic King Size Papers",
//     brand: "RAW",
//     category: "accessories",
//     image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=400&fit=crop",
//     description: "Premium rolling papers. 50 packs per box.",
//     price: 24.99,
//     isBestSeller: true
//   },
//   {
//     id: "11",
//     name: "RAW Organic Hemp Papers",
//     brand: "RAW",
//     category: "accessories",
//     image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=400&fit=crop",
//     description: "100% organic hemp rolling papers. 50 packs per box.",
//     price: 27.99,
//     isNew: false
//   },
//   {
//     id: "12",
//     name: "Clipper Lighters Display",
//     brand: "Clipper",
//     category: "accessories",
//     image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=400&fit=crop",
//     description: "Refillable flint lighters. 48 count display.",
//     price: 35.99,
//     isBestSeller: true
//   },

//   // Glass & Tools
//   {
//     id: "13",
//     name: "Beaker Bong 12 inch",
//     brand: "Hemper",
//     category: "glass-tools",
//     image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=400&fit=crop",
//     description: "Classic beaker design with ice catcher. Thick borosilicate glass.",
//     price: 45.99,
//     isBestSeller: true
//   },
//   {
//     id: "14",
//     name: "Straight Tube Bong 14 inch",
//     brand: "Pulsar",
//     category: "glass-tools",
//     image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=400&fit=crop",
//     description: "Premium straight tube with percolator.",
//     price: 52.99,
//     isNew: true
//   },
//   {
//     id: "15",
//     name: "Silicone Dab Rig",
//     brand: "Eyce",
//     category: "glass-tools",
//     image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=400&fit=crop",
//     description: "Unbreakable silicone construction with glass bowl.",
//     price: 38.99,
//     isNew: false
//   },

//   // Additional products for variety
//   {
//     id: "16",
//     name: "Vaporesso XROS 3 Pod Kit",
//     brand: "Vaporesso",
//     category: "vapes",
//     image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop",
//     description: "Refillable pod system with adjustable airflow.",
//     price: 19.99,
//     isNew: true
//   },
//   {
//     id: "17",
//     name: "Elements Rice Papers",
//     brand: "Elements",
//     category: "accessories",
//     image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=400&fit=crop",
//     description: "Ultra-thin rice rolling papers. 50 packs per box.",
//     price: 26.99,
//     isBestSeller: false
//   },
//   {
//     id: "18",
//     name: "Puff Bar Flow",
//     brand: "Puff Bar",
//     category: "disposable-vapes",
//     image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop",
//     description: "Smooth airflow disposable with 1000 puffs.",
//     flavors: ["Cool Mint", "Lush Ice", "Banana Ice", "Strawberry"],
//     price: 5.99,
//     isNew: false
//   },
//   {
//     id: "19",
//     name: "Social Smoke Passion Fruit Mojito",
//     brand: "Social Smoke",
//     category: "hookah",
//     image: "https://images.unsplash.com/photo-1582538885592-e70a5d7ab3d3?w=400&h=400&fit=crop",
//     description: "Exotic passion fruit mojito blend. 250g package.",
//     price: 13.99,
//     isNew: true
//   },
//   {
//     id: "20",
//     name: "Grav Labs Helix Pipe",
//     brand: "Grav Labs",
//     category: "glass-tools",
//     image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=400&fit=crop",
//     description: "Signature Helix design with cooling spirals.",
//     price: 29.99,
//     isBestSeller: true
//   },
// ];

// export const getProductsByBrand = (brandName: string): Product[] => {
//   return products.filter(p => p.brand === brandName);
// };

// export const getProductsByCategory = (categoryId: string): Product[] => {
//   return products.filter(p => p.category === categoryId);
// };

// export const getFeaturedProducts = (): Product[] => {
//   return products.slice(0, 12);
// };

// export const getNewArrivals = (): Product[] => {
//   return products.filter(p => p.isNew);
// };

// export const getBestSellers = (): Product[] => {
//   return products.filter(p => p.isBestSeller);
// };

// export const getProductById = (id: string): Product | undefined => {
//   return products.find(p => p.id === id);
// };

// export const getSuggestedProducts = (currentProductId: string): Product[] => {
//   const currentProduct = getProductById(currentProductId);
//   if (!currentProduct) return [];
  
//   return products
//     .filter(p => p.id !== currentProductId && 
//                  (p.brand === currentProduct.brand || p.category === currentProduct.category))
//     .slice(0, 4);
// };
