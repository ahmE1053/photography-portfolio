import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryProps {
  images?: {
    id: number;
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
}

const Gallery = ({ images = [] }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 6;

  // Default images if none provided
  const defaultImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
      alt: "عروسة وعريس في حفل زفاف",
      width: 800,
      height: 600,
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      alt: "لحظة رومانسية بين العروسين",
      width: 800,
      height: 600,
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      alt: "حفل زفاف على الشاطئ",
      width: 800,
      height: 600,
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
      alt: "تفاصيل من حفل الزفاف",
      width: 800,
      height: 600,
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      alt: "لحظة تبادل الخواتم",
      width: 800,
      height: 600,
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
      alt: "فستان العروسة",
      width: 800,
      height: 600,
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
      alt: "كيكة الفرح",
      width: 800,
      height: 600,
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&q=80",
      alt: "الرقصة الأولى",
      width: 800,
      height: 600,
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      alt: "لحظات سعيدة",
      width: 800,
      height: 600,
    },
  ];

  const displayImages = images.length > 0 ? images : defaultImages;
  const totalPages = Math.ceil(displayImages.length / imagesPerPage);
  const currentImages = displayImages.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage,
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    scrollToGalleryTop();
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
    scrollToGalleryTop();
  };

  const scrollToGalleryTop = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      setTimeout(() => {
        gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    if (selectedImage === null) return;
    const currentIndex = displayImages.findIndex(
      (img) => img.id === selectedImage,
    );
    const nextIndex = (currentIndex + 1) % displayImages.length;
    setSelectedImage(displayImages[nextIndex].id);
  };

  const handlePrevImage = () => {
    if (selectedImage === null) return;
    const currentIndex = displayImages.findIndex(
      (img) => img.id === selectedImage,
    );
    const prevIndex =
      (currentIndex - 1 + displayImages.length) % displayImages.length;
    setSelectedImage(displayImages[prevIndex].id);
  };

  const selectedImageData =
    selectedImage !== null
      ? displayImages.find((img) => img.id === selectedImage)
      : null;

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">معرض الصور</h2>
          <p className="text-lg text-gray-600">
            شوف أحلى لقطات صورتها في أجمل مناسبات
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentImages.map((image) => (
            <motion.div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleImageClick(image.id)}
            >
              <div className="aspect-w-16 aspect-h-9 h-64">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white w-full bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-medium">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-1"
            >
              <ChevronRight className="h-4 w-4" />
              السابق
            </Button>
            <div className="flex items-center px-4">
              <span className="text-sm text-gray-600">
                {currentPage + 1} من {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-1"
            >
              التالي
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl w-full bg-black bg-opacity-90 border-none p-0">
          <div className="relative">
            {selectedImageData && (
              <img
                src={selectedImageData.src}
                alt={selectedImageData.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={handleNextImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          {selectedImageData && (
            <div className="p-4 text-white">
              <p className="text-lg">{selectedImageData.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
