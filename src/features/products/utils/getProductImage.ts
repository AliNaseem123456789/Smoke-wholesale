export const getProductImage = (
  productId: string | number,
  imageNumber: number = 1
) => {
  const SUPABASE_URL = "https://puwqurkjqembiliyjwqk.supabase.co";
  return `${SUPABASE_URL}/storage/v1/object/public/product-images/${productId}/${imageNumber}.webp`;
};
