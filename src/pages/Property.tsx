import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PropertyGallery from '@/components/PropertyGallery';
import PropertyInfo from '@/components/PropertyInfo';
import PropertyBooking from '@/components/PropertyBooking';

const Property = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const generateMediaGallery = (propertyId: number) => {
    const media = [];
    const baseImages = [
      '/img/fe79e0c8-c5e2-4c43-b41b-9b8c32a5d74e.jpg',
      '/img/8c86fc06-8581-4a01-9b2c-5923832e1894.jpg',
      '/img/c3b8f123-4a5e-6d7f-8e9c-1a2b3c4d5e6f.jpg'
    ];

    media.push({ 
      type: 'image', 
      url: baseImages[propertyId - 1] || baseImages[0],
      title: 'Главное фото'
    });

    for (let i = 1; i <= 25; i++) {
      media.push({
        type: 'image',
        url: baseImages[(propertyId + i - 1) % baseImages.length],
        title: `Фото ${i + 1}`
      });
    }

    media.push(
      { 
        type: 'video', 
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        title: 'Обзор квартиры',
        thumbnail: baseImages[0]
      },
      { 
        type: 'video', 
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        title: 'Вид из окна',
        thumbnail: baseImages[1]
      }
    );

    return media;
  };

  const properties = [
    {
      id: 1,
      title: 'Роскошная квартира с видом на море',
      type: 'Квартира',
      price: 3500,
      rating: 4.8,
      reviews: 24,
      image: '/img/fe79e0c8-c5e2-4c43-b41b-9b8c32a5d74e.jpg',
      district: 'Центральный',
      rooms: 2,
      area: 65,
      amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Балкон'],
      description: 'Великолепная квартира в самом центре Сочи с потрясающим видом на Черное море. Современный ремонт, все удобства, до пляжа 5 минут пешком.',
      owner: 'Анна К.',
      verified: true,
      maxGuests: 4,
      media: generateMediaGallery(1)
    },
    {
      id: 2,
      title: 'Уютная студия в центре',
      type: 'Студия',
      price: 2200,
      rating: 4.6,
      reviews: 18,
      image: '/img/8c86fc06-8581-4a01-9b2c-5923832e1894.jpg',
      district: 'Центральный',
      rooms: 1,
      area: 35,
      amenities: ['Wi-Fi', 'Кухня', 'Душ'],
      description: 'Компактная и уютная студия в самом сердце города. Идеально для пары или одного путешественника.',
      owner: 'Михаил С.',
      verified: true,
      maxGuests: 2,
      media: generateMediaGallery(2)
    },
    {
      id: 3,
      title: 'Семейный дом у моря',
      type: 'Дом',
      price: 5000,
      rating: 4.9,
      reviews: 31,
      image: '/img/c3b8f123-4a5e-6d7f-8e9c-1a2b3c4d5e6f.jpg',
      district: 'Адлер',
      rooms: 3,
      area: 120,
      amenities: ['Wi-Fi', 'Парковка', 'Сад', 'Барбекю'],
      description: 'Просторный семейный дом с собственным садом и местом для барбекю. Идеально для отдыха большой компанией.',
      owner: 'Елена П.',
      verified: true,
      maxGuests: 6,
      media: generateMediaGallery(3)
    }
  ];

  const property = properties.find(p => p.id === parseInt(id || '1'));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Объект не найден</h2>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться к поиску
          </Button>
        </div>
      </div>
    );
  }

  const generateBookedDates = (propertyId: number) => {
    const bookedDates: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const hash = (propertyId * 17 + i) % 100;
      if (hash < 25) {
        bookedDates.push(date);
      }
    }
    
    return bookedDates;
  };

  const isDateBooked = (date: Date, propertyId: number) => {
    const bookedDates = generateBookedDates(propertyId);
    return bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };

  const calculateTotalPrice = (property: any, checkIn?: Date, checkOut?: Date) => {
    if (!checkIn || !checkOut) return 0;
    const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return days * property.price;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      
      if (event.key === 'ArrowLeft' && selectedMediaIndex > 0) {
        setSelectedMediaIndex(selectedMediaIndex - 1);
      } else if (event.key === 'ArrowRight' && selectedMediaIndex < property.media.length - 1) {
        setSelectedMediaIndex(selectedMediaIndex + 1);
      } else if (event.key === 'Escape') {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen, selectedMediaIndex, property.media.length]);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Назад к поиску</span>
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Share" size={16} className="mr-2" />
                Поделиться
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Heart" size={16} className="mr-2" />
                В избранное
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery
              media={property.media}
              propertyType={property.type}
              selectedMediaIndex={selectedMediaIndex}
              setSelectedMediaIndex={setSelectedMediaIndex}
              isGalleryOpen={isGalleryOpen}
              setIsGalleryOpen={setIsGalleryOpen}
            />

            <PropertyInfo property={property} />
          </div>

          <div className="lg:col-span-1">
            <PropertyBooking
              property={property}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              guests={guests}
              setGuests={setGuests}
              isDateBooked={isDateBooked}
              calculateTotalPrice={calculateTotalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
