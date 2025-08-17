import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Property = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);

  // Данные объектов (такие же как в Index)
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
      amenities: ['Wi-Fi', 'Кухня', 'Душ'],
      description: 'Компактная и уютная студия в самом сердце города. Идеально для пары или одного путешественника.',
      owner: 'Михаил С.',
      verified: true,
      maxGuests: 2
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
      maxGuests: 6
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

  // Функции для работы с датами (копируем из Index)
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Image */}
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
              />
              <Badge className="absolute top-4 left-4 bg-white text-gray-800">
                {property.type}
              </Badge>
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.title}</h1>
                
                <div className="flex items-center space-x-6 text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span>{property.district}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Home" size={16} />
                    <span>{property.rooms} комнаты</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Maximize" size={16} />
                    <span>{property.area}м²</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} />
                    <span>до {property.maxGuests} гостей</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                    <span className="font-semibold">{property.rating}</span>
                    <span className="text-gray-600">({property.reviews} отзывов)</span>
                  </div>
                </div>
              </div>

              {/* Owner Info */}
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-lg">{property.owner[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">Хозяин: {property.owner}</h3>
                      {property.verified && (
                        <Icon name="CheckCircle" size={16} className="text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">Проверенный владелец</p>
                  </div>
                  <Button variant="outline">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Написать
                  </Button>
                </div>
              </Card>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Описание</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Удобства</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6 shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{property.price}₽</div>
                  <div className="text-gray-600">за ночь</div>
                </div>

                {/* Quick Booking Form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Заезд</label>
                      <div className="mt-1 p-3 border rounded-md text-sm">
                        {checkInDate ? checkInDate.toLocaleDateString('ru-RU') : 'Выберите дату'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Выезд</label>
                      <div className="mt-1 p-3 border rounded-md text-sm">
                        {checkOutDate ? checkOutDate.toLocaleDateString('ru-RU') : 'Выберите дату'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Гости</label>
                    <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Calendar Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        Выбрать даты
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Выберите даты</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Calendar
                          mode="range"
                          selected={{
                            from: checkInDate,
                            to: checkOutDate,
                          }}
                          onSelect={(range) => {
                            if (range?.from) setCheckInDate(range.from);
                            if (range?.to) setCheckOutDate(range.to);
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today || isDateBooked(date, property.id);
                          }}
                          numberOfMonths={2}
                          className="rounded-md border"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  {checkInDate && checkOutDate && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span>Стоимость за {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} ночей:</span>
                        <span className="font-semibold">{calculateTotalPrice(property, checkInDate, checkOutDate)}₽</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Сервисный сбор:</span>
                        <span>{Math.round(calculateTotalPrice(property, checkInDate, checkOutDate) * 0.05)}₽</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between items-center font-bold">
                        <span>Итого:</span>
                        <span>{Math.round(calculateTotalPrice(property, checkInDate, checkOutDate) * 1.05)}₽</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    disabled={!checkInDate || !checkOutDate}
                  >
                    <Icon name="CreditCard" size={16} className="mr-2" />
                    Забронировать
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    При бронировании потребуется депозит 20%
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;