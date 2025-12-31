import React, { useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../data/mockData';
import { ProductCard } from './ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onProductClick }) => {
  const sliderRef = useRef<Slider>(null);

  if (!products || products.length === 0) return null;

  const showArrows = products.length > 1;

  const settings = {
    dots: false,
    infinite: products.length > 4,
    speed: 500,
    slidesToShow: Math.min(4, products.length),
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(3, products.length), slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: Math.min(2, products.length), slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="relative group/carousel">
      {showArrows && (
        <>
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover/carousel:opacity-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover/carousel:opacity-100"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      <Slider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <ProductCard product={product} onClick={onProductClick} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
