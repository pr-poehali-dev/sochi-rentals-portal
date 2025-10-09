import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import SochiMap from '@/components/SochiMap';
import CallToAction from '@/components/CallToAction';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PropertyCard from '@/components/PropertyCard';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [district, setDistrict] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  
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
  
  const getAvailableDates = (propertyId: number) => {
    const bookedDates = generateBookedDates(propertyId);
    const today = new Date();
    const availableDates: Date[] = [];
    
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const isBooked = bookedDates.some(bookedDate => 
        bookedDate.toDateString() === date.toDateString()
      );
      
      if (!isBooked) {
        availableDates.push(date);
      }
    }
    
    return availableDates;
  };
  
  const isDateBooked = (date: Date, propertyId: number) => {
    const bookedDates = generateBookedDates(propertyId);
    return bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };
  
  const calculateTotalPrice = (property: any, checkIn: Date, checkOut: Date) => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights * property.price;
  };
  
  const formatDateRange = (checkIn: Date | undefined, checkOut: Date | undefined) => {
    if (!checkIn || !checkOut) return 'Выберите даты';
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return `${checkIn.toLocaleDateString('ru-RU')} - ${checkOut.toLocaleDateString('ru-RU')} (${nights} ${nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'})`;
  };

  const properties = [
    {
      id: 1,
      title: 'Современная квартира у моря',
      type: 'Квартира',
      price: 3500,
      rating: 4.8,
      reviews: 24,
      image: '/img/4a055c67-e18f-45a0-9556-e640cf3b8c52.jpg',
      district: 'Центральный',
      rooms: 2,
      area: 65,
      amenities: ['Wi-Fi', 'Кондиционер', 'Балкон'],
      owner: 'Анна С.',
      verified: true,
      maxGuests: 4
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
      amenities: ['Wi-Fi', 'Кухня', 'Близко к пляжу'],
      owner: 'Дмитрий К.',
      verified: true,
      maxGuests: 2
    },
    {
      id: 3,
      title: 'Вилла с бассейном и видом на горы',
      type: 'Дом',
      price: 8500,
      rating: 4.9,
      reviews: 31,
      image: '/img/f01c549e-d236-433e-8dc8-017b508abdc4.jpg',
      district: 'Красная Поляна',
      rooms: 4,
      area: 180,
      amenities: ['Бассейн', 'Сад', 'Парковка', 'Вид на горы'],
      owner: 'Михаил В.',
      verified: true,
      maxGuests: 8
    }
  ];

  const faqItems = [
    {
      question: 'Как забронировать жилье?',
      answer: 'Выберите понравившийся объект, укажите даты и количество гостей, затем нажмите "Забронировать". Вы получите подтверждение от владельца в течение 24 часов.'
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем оплату банковскими картами, электронными кошельками и банковскими переводами. Полная предоплата не требуется - достаточно внести депозит.'
    },
    {
      question: 'Что делать при проблемах с жильем?',
      answer: 'Обращайтесь в нашу службу поддержки 24/7. Мы поможем решить любые вопросы или найти альтернативное размещение при необходимости.'
    },
    {
      question: 'Можно ли отменить бронирование?',
      answer: 'Да, отмена возможна согласно правилам объекта. Обычно полный возврат доступен при отмене за 48 часов до заезда.'
    }
  ];

  const districts = ['Центральный', 'Адлер', 'Хоста', 'Красная Поляна', 'Лазаревское'];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = propertyType === 'all' || property.type === propertyType;
    const matchesDistrict = district === 'all' || property.district === district;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'budget' && property.price <= 3000) ||
                        (priceRange === 'mid' && property.price > 3000 && property.price <= 6000) ||
                        (priceRange === 'luxury' && property.price > 6000);
    
    return matchesSearch && matchesType && matchesDistrict && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Header />

      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        district={district}
        setDistrict={setDistrict}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        districts={districts}
      />

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-gray-800">
              Популярные предложения
            </h3>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
              <Icon name="Filter" size={14} className="sm:size-4" />
              <span>Найдено: {filteredProperties.length} объектов</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                guests={guests}
                setGuests={setGuests}
                setSelectedProperty={setSelectedProperty}
                isDateBooked={isDateBooked}
                generateBookedDates={generateBookedDates}
                getAvailableDates={getAvailableDates}
                calculateTotalPrice={calculateTotalPrice}
                formatDateRange={formatDateRange}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SochiMap />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <CallToAction />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-gray-800 mb-6 sm:mb-8 text-center">
              Часто задаваемые вопросы
            </h3>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border-0 shadow-sm">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h5 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center space-x-2">
                <Icon name="Home" size={20} className="text-accent" />
                <span>СочиДом</span>
              </h5>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Лучшие предложения по аренде жилья в Сочи
              </p>
              <div className="flex space-x-4">
                <Icon name="Phone" size={20} className="text-accent" />
                <Icon name="Mail" size={20} className="text-accent" />
                <Icon name="MessageCircle" size={20} className="text-accent" />
              </div>
            </div>
            
            <div>
              <h5 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Для гостей</h5>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li><a href="#" className="hover:text-accent transition-colors">Поиск жилья</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Карта объектов</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Помощь</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Для владельцев</h5>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li><a href="#" className="hover:text-accent transition-colors">Разместить объявление</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Управление бронированиями</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Аналитика</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Поддержка</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (862) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>shamrina555@mail.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>г. Сочи, ул. Курортный пр-т, 1</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2024 СочиДом. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
