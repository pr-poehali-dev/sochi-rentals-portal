import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  title: string;
  thumbnail?: string;
}

interface PropertyGalleryProps {
  media: MediaItem[];
  propertyType: string;
  selectedMediaIndex: number;
  setSelectedMediaIndex: (index: number) => void;
  isGalleryOpen: boolean;
  setIsGalleryOpen: (open: boolean) => void;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  media,
  propertyType,
  selectedMediaIndex,
  setSelectedMediaIndex,
  isGalleryOpen,
  setIsGalleryOpen,
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="relative">
          {media[selectedMediaIndex].type === 'image' ? (
            <img
              src={media[selectedMediaIndex].url}
              alt={media[selectedMediaIndex].title}
              className="w-full h-96 lg:h-[500px] object-cover rounded-xl cursor-pointer"
              onClick={() => setIsGalleryOpen(true)}
            />
          ) : (
            <div className="relative w-full h-96 lg:h-[500px] rounded-xl overflow-hidden">
              <video
                src={media[selectedMediaIndex].url}
                controls
                className="w-full h-full object-cover"
                poster={media[selectedMediaIndex].thumbnail}
              />
            </div>
          )}
          <Badge className="absolute top-4 left-4 bg-white text-gray-800">
            {propertyType}
          </Badge>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
            {selectedMediaIndex + 1} из {media.length}
          </div>
        </div>

        <div className="grid grid-cols-6 lg:grid-cols-8 gap-2">
          {media.slice(0, 12).map((item, index) => (
            <div
              key={index}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                selectedMediaIndex === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setSelectedMediaIndex(index)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Icon name="Play" size={16} className="text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {media.length > 12 && (
            <Button
              variant="outline"
              className="aspect-square p-0 text-sm"
              onClick={() => setIsGalleryOpen(true)}
            >
              +{media.length - 12}
            </Button>
          )}
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => setIsGalleryOpen(true)}
            className="flex items-center space-x-2"
          >
            <Icon name="Images" size={16} />
            <span>Показать все {media.length} фото и видео</span>
          </Button>
        </div>
      </div>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0 overflow-hidden">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 right-0 z-10 bg-black/70 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold">
                  {media[selectedMediaIndex].title}
                </h3>
                <span className="text-sm opacity-80">
                  {selectedMediaIndex + 1} из {media.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsGalleryOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="w-full h-[70vh] relative bg-black flex items-center justify-center">
              {media[selectedMediaIndex].type === 'image' ? (
                <img
                  src={media[selectedMediaIndex].url}
                  alt={media[selectedMediaIndex].title}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <video
                  src={media[selectedMediaIndex].url}
                  controls
                  className="max-w-full max-h-full"
                  poster={media[selectedMediaIndex].thumbnail}
                  autoPlay
                />
              )}

              {selectedMediaIndex > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedMediaIndex(selectedMediaIndex - 1)}
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>
              )}
              
              {selectedMediaIndex < media.length - 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedMediaIndex(selectedMediaIndex + 1)}
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              )}
            </div>

            <div className="h-24 bg-gray-100 p-4 overflow-x-auto">
              <div className="flex space-x-2 h-full">
                {media.map((item, index) => (
                  <div
                    key={index}
                    className={`relative h-16 w-24 flex-shrink-0 rounded cursor-pointer border-2 transition-all ${
                      selectedMediaIndex === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMediaIndex(index)}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded">
                          <Icon name="Play" size={12} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyGallery;
