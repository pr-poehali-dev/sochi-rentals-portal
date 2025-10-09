import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';
import SochiMap from '@/components/SochiMap';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [district, setDistrict] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  
  // Генерируем занятые даты для каждого объекта
  const generateBookedDates = (propertyId: number) => {
    const bookedDates: Date[] = [];
    const today = new Date();
    
    // Случайно генерируем занятые периоды
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Случайная логика для занятых дат (разная для каждого объекта)
      const hash = (propertyId * 17 + i) % 100;
      if (hash < 25) { // 25% вероятность что дата занята
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Home" size={28} className="text-primary sm:size-8" />
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-primary">СочиДом</h1>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Icon name="Menu" size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Меню</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Button variant="ghost" className="w-full justify-start">
                      <Icon name="Search" size={16} className="mr-2" />
                      Каталог
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Icon name="Map" size={16} className="mr-2" />
                      Карта
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Помощь
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="User" size={16} className="mr-2" />
                      Войти
                    </Button>
                    <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Сдать жилье
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Button variant="ghost" className="text-sm lg:text-base">Каталог</Button>
              <Button variant="ghost" className="text-sm lg:text-base">Карта</Button>
              <Button variant="ghost" className="text-sm lg:text-base">Помощь</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:size-default">
                    <Icon name="User" size={16} className="mr-2" />
                    <span className="hidden lg:inline">Войти</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Личный кабинет</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Вход</TabsTrigger>
                      <TabsTrigger value="register">Регистрация</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="space-y-4">
                      <Input placeholder="Email" type="email" />
                      <Input placeholder="Пароль" type="password" />
                      <Button className="w-full">Войти</Button>
                    </TabsContent>
                    <TabsContent value="register" className="space-y-4">
                      <Input placeholder="Имя" />
                      <Input placeholder="Email" type="email" />
                      <Input placeholder="Телефон" />
                      <Input placeholder="Пароль" type="password" />
                      <Button className="w-full">Зарегистрироваться</Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              <Button className="bg-primary hover:bg-primary/90 text-sm lg:text-base" size="sm" className="lg:size-default">
                <Icon name="Plus" size={16} className="mr-2" />
                <span className="hidden lg:inline">Сдать жилье</span>
                <span className="lg:hidden">Сдать</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-800 mb-4 sm:mb-6">
            Найдите идеальное жилье в Сочи
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Более 1000 проверенных объектов для аренды. От уютных студий до роскошных вилл с видом на море.
          </p>
          
          {/* Search Section */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <label className="text-xs sm:text-sm font-medium text-gray-700">Поиск</label>
                <Input
                  placeholder="Район, название..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Тип жилья</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="Квартира">Квартира</SelectItem>
                    <SelectItem value="Студия">Студия</SelectItem>
                    <SelectItem value="Дом">Дом</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Район</label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все районы</SelectItem>
                    {districts.map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Цена</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любая цена</SelectItem>
                    <SelectItem value="budget">До 3000₽</SelectItem>
                    <SelectItem value="mid">3000-6000₽</SelectItem>
                    <SelectItem value="luxury">От 6000₽</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button size="lg" className="w-full sm:w-auto sm:px-8 lg:px-12">
              <Icon name="Search" size={20} className="mr-2" />
              <span className="hidden sm:inline">Найти жилье</span>
              <span className="sm:hidden">Найти</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Catalog */}
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
              <Card key={property.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative cursor-pointer" onClick={() => navigate(`/property/${property.id}`)}>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-gray-800">
                    {property.type}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2" onClick={(e) => e.stopPropagation()}>
                    <Icon name="Heart" size={16} className="text-gray-600 hover:text-red-500 cursor-pointer" />
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 
                      className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 cursor-pointer"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      {property.title}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{property.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} className="sm:size-14" />
                      <span className="truncate">{property.district}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Home" size={12} className="sm:size-14" />
                      <span>{property.rooms} комн.</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Maximize" size={12} className="sm:size-14" />
                      <span>{property.area}м²</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                        <AvatarFallback className="text-xs">{property.owner[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center space-x-1 min-w-0">
                        <span className="text-xs sm:text-sm text-gray-600 truncate">{property.owner}</span>
                        {property.verified && (
                          <Icon name="CheckCircle" size={12} className="text-green-500 flex-shrink-0 sm:size-14" />
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg sm:text-2xl font-bold text-primary">{property.price}₽</div>
                      <div className="text-xs text-gray-500">за ночь</div>
                    </div>
                  </div>
                  
                  {/* Booking Section */}
                  <div className="space-y-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            setSelectedProperty(property);
                            setCheckInDate(undefined);
                            setCheckOutDate(undefined);
                            setGuests(1);
                          }}
                        >
                          <Icon name="Calendar" size={16} className="mr-2" />
                          Проверить свободные даты
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">
                            Бронирование: {property.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Calendar Section */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Выберите даты</h4>
                              <p className="text-sm text-gray-600 mb-4">
                                Выберите даты заезда и выезда. Занятые даты выделены серым.
                              </p>
                              
                              {/* Calendar Legend */}
                              <div className="flex flex-wrap gap-4 mb-4 text-xs">
                                <div className="flex items-center space-x-2">
                                  <div className="w-4 h-4 bg-primary rounded"></div>
                                  <span>Выбранные даты</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-4 h-4 bg-gray-100 border rounded"></div>
                                  <span>Занято</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-4 h-4 bg-accent rounded"></div>
                                  <span>Сегодня</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-4 h-4 border rounded"></div>
                                  <span>Доступно</span>
                                </div>
                              </div>
                              
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
                              
                              {/* Availability Summary */}
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Icon name="Info" size={16} className="text-blue-600" />
                                  <span className="text-sm font-medium text-blue-800">Доступность</span>
                                </div>
                                <div className="text-sm text-blue-700">
                                  <p>• Свободно: {getAvailableDates(property.id).length} дней в ближайшие 2 месяца</p>
                                  <p>• Занято: {generateBookedDates(property.id).length} дней</p>
                                  <p>• Минимальное бронирование: 1 ночь</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Booking Details */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Детали бронирования</h4>
                              
                              {/* Guests selector */}
                              <div className="space-y-2 mb-4">
                                <label className="text-sm font-medium">Количество гостей</label>
                                <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({length: property.maxGuests}, (_, i) => i + 1).map(num => (
                                      <SelectItem key={num} value={num.toString()}>
                                        {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* Selected dates */}
                              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Период:</span>
                                  <span className="text-sm font-medium">{formatDateRange(checkInDate, checkOutDate)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Гостей:</span>
                                  <span className="text-sm font-medium">{guests}</span>
                                </div>
                                {checkInDate && checkOutDate && (
                                  <>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Цена за ночь:</span>
                                      <span className="text-sm font-medium">{property.price}₽</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between">
                                      <span className="font-semibold">Итого:</span>
                                      <span className="font-bold text-primary">
                                        {calculateTotalPrice(property, checkInDate, checkOutDate)}₽
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            {/* Property details */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <Icon name="MapPin" size={16} className="text-gray-500" />
                                <span className="text-sm">{property.district}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Icon name="Home" size={16} className="text-gray-500" />
                                <span className="text-sm">{property.rooms} комн., {property.area}м²</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Icon name="Users" size={16} className="text-gray-500" />
                                <span className="text-sm">До {property.maxGuests} гостей</span>
                              </div>
                            </div>
                            
                            {/* Quick date selections */}
                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">Быстрый выбор:</h5>
                              <div className="grid grid-cols-2 gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    const today = new Date();
                                    const tomorrow = new Date(today);
                                    tomorrow.setDate(today.getDate() + 1);
                                    const dayAfter = new Date(tomorrow);
                                    dayAfter.setDate(tomorrow.getDate() + 1);
                                    
                                    if (!isDateBooked(tomorrow, property.id) && !isDateBooked(dayAfter, property.id)) {
                                      setCheckInDate(tomorrow);
                                      setCheckOutDate(dayAfter);
                                    }
                                  }}
                                  className="text-xs"
                                >
                                  Завтра (1 ночь)
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    const today = new Date();
                                    const nextWeek = new Date(today);
                                    nextWeek.setDate(today.getDate() + 7);
                                    const endDate = new Date(nextWeek);
                                    endDate.setDate(nextWeek.getDate() + 2);
                                    
                                    setCheckInDate(nextWeek);
                                    setCheckOutDate(endDate);
                                  }}
                                  className="text-xs"
                                >
                                  След. неделя
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    const today = new Date();
                                    const weekend = new Date(today);
                                    const daysUntilSaturday = (6 - today.getDay()) % 7;
                                    weekend.setDate(today.getDate() + daysUntilSaturday);
                                    const sunday = new Date(weekend);
                                    sunday.setDate(weekend.getDate() + 1);
                                    
                                    setCheckInDate(weekend);
                                    setCheckOutDate(sunday);
                                  }}
                                  className="text-xs"
                                >
                                  Выходные
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setCheckInDate(undefined);
                                    setCheckOutDate(undefined);
                                  }}
                                  className="text-xs"
                                >
                                  Очистить
                                </Button>
                              </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="space-y-2 pt-4">
                              <Button 
                                className="w-full" 
                                disabled={!checkInDate || !checkOutDate}
                              >
                                <Icon name="CreditCard" size={16} className="mr-2" />
                                Забронировать
                                {checkInDate && checkOutDate && (
                                  <span className="ml-2 font-bold">
                                    {calculateTotalPrice(property, checkInDate, checkOutDate)}₽
                                  </span>
                                )}
                              </Button>
                              <Button variant="outline" className="w-full">
                                <Icon name="MessageCircle" size={16} className="mr-2" />
                                Связаться с владельцем
                              </Button>
                              
                              {checkInDate && checkOutDate && (
                                <div className="text-center pt-2">
                                  <p className="text-xs text-gray-500">
                                    При бронировании потребуется депозит 20%
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Quick availability info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>Свободно в {getAvailableDates(property.id).slice(0, 7).length}/7 дней</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>До {property.maxGuests} гостей</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full group-hover:bg-primary/90 transition-colors">
                          Забронировать
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Бронирование жилья</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800">{property.title}</h4>
                            <p className="text-sm text-gray-600">{property.district}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-2xl font-bold text-primary">{property.price}₽</span>
                              <span className="text-sm text-gray-500">за ночь</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-700">Заезд</label>
                              <Input type="date" className="mt-1" />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700">Выезд</label>
                              <Input type="date" className="mt-1" />
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-700">Количество гостей</label>
                            <Select>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 гость</SelectItem>
                                <SelectItem value="2">2 гостя</SelectItem>
                                <SelectItem value="3">3 гостя</SelectItem>
                                <SelectItem value="4">4+ гостей</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="border-t pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span>2 ночи × {property.price}₽</span>
                              <span>{property.price * 2}₽</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span>Сервисный сбор</span>
                              <span>{Math.round(property.price * 0.1)}₽</span>
                            </div>
                            <div className="flex items-center justify-between font-bold text-lg border-t pt-2">
                              <span>Итого</span>
                              <span>{property.price * 2 + Math.round(property.price * 0.1)}₽</span>
                            </div>
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full bg-primary hover:bg-primary/90">
                                <Icon name="CreditCard" size={16} className="mr-2" />
                                Перейти к оплате
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Способы оплаты</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="font-semibold">Итого к оплате:</span>
                                    <span className="text-2xl font-bold text-primary">
                                      {property.price * 2 + Math.round(property.price * 0.1)}₽
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600">Включает проживание и сервисный сбор</p>
                                </div>

                                <div className="space-y-3">
                                  <h4 className="font-medium text-gray-800">Выберите способ оплаты:</h4>
                                  
                                  {/* Bank Cards */}
                                  <Card className="p-4 cursor-pointer hover:bg-blue-50 transition-colors border-2 hover:border-blue-200">
                                    <div className="flex items-center space-x-3">
                                      <div className="bg-blue-100 p-2 rounded-lg">
                                        <Icon name="CreditCard" size={20} className="text-blue-600" />
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-medium">Банковская карта</h5>
                                        <p className="text-sm text-gray-600">Visa, MasterCard, МИР</p>
                                      </div>
                                      <Badge className="bg-green-100 text-green-800">Мгновенно</Badge>
                                    </div>
                                  </Card>

                                  {/* SBP */}
                                  <Card className="p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 hover:border-purple-200">
                                    <div className="flex items-center space-x-3">
                                      <div className="bg-purple-100 p-2 rounded-lg">
                                        <Icon name="Smartphone" size={20} className="text-purple-600" />
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-medium">СБП (Система быстрых платежей)</h5>
                                        <p className="text-sm text-gray-600">Переводы через мобильный банк</p>
                                      </div>
                                      <Badge className="bg-green-100 text-green-800">Без комиссии</Badge>
                                    </div>
                                  </Card>

                                  {/* YooMoney */}
                                  <Card className="p-4 cursor-pointer hover:bg-yellow-50 transition-colors border-2 hover:border-yellow-200">
                                    <div className="flex items-center space-x-3">
                                      <div className="bg-yellow-100 p-2 rounded-lg">
                                        <Icon name="Wallet" size={20} className="text-yellow-600" />
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-medium">ЮMoney</h5>
                                        <p className="text-sm text-gray-600">Электронный кошелек</p>
                                      </div>
                                      <Badge className="bg-blue-100 text-blue-800">Быстро</Badge>
                                    </div>
                                  </Card>

                                  {/* QIWI */}
                                  <Card className="p-4 cursor-pointer hover:bg-orange-50 transition-colors border-2 hover:border-orange-200">
                                    <div className="flex items-center space-x-3">
                                      <div className="bg-orange-100 p-2 rounded-lg">
                                        <Icon name="QrCode" size={20} className="text-orange-600" />
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-medium">QIWI Кошелек</h5>
                                        <p className="text-sm text-gray-600">Оплата через QR-код</p>
                                      </div>
                                      <Badge className="bg-green-100 text-green-800">Удобно</Badge>
                                    </div>
                                  </Card>

                                  {/* Bank Transfer */}
                                  <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors border-2 hover:border-gray-200">
                                    <div className="flex items-center space-x-3">
                                      <div className="bg-gray-100 p-2 rounded-lg">
                                        <Icon name="Building" size={20} className="text-gray-600" />
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-medium">Банковский перевод</h5>
                                        <p className="text-sm text-gray-600">Переводы на расчетный счет</p>
                                      </div>
                                      <Badge className="bg-gray-100 text-gray-800">1-2 дня</Badge>
                                    </div>
                                  </Card>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Icon name="Shield" size={16} className="text-green-600" />
                                    <span className="font-medium text-green-800">Безопасные платежи</span>
                                  </div>
                                  <p className="text-sm text-green-700">
                                    Все платежи защищены SSL-шифрованием. Возврат средств при отмене бронирования.
                                  </p>
                                </div>

                                <Button className="w-full bg-primary hover:bg-primary/90">
                                  <Icon name="Lock" size={16} className="mr-2" />
                                  Продолжить оплату
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" className="w-full text-sm">
                      <Icon name="Heart" size={14} className="mr-2" />
                      В избранное
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SochiMap />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <CallToAction />
        </div>
      </section>

      {/* Contacts Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-gray-800 mb-4">
                Свяжитесь с нами
              </h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">
                Готовы помочь найти идеальное жилье или ответить на ваши вопросы
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Телефон</h4>
                      <a 
                        href="tel:+79654776220" 
                        className="text-lg text-primary font-medium hover:text-primary/80 transition-colors"
                      >
                        +7 (965) 477-62-20
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Ежедневно с 9:00 до 21:00</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Icon name="Mail" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                      <a 
                        href="mailto:shamrina555@mail.ru" 
                        className="text-lg text-primary font-medium hover:text-primary/80 transition-colors"
                      >
                        shamrina555@mail.ru
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Ответим в течение 2 часов</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Icon name="MessageCircle" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Поддержка 24/7</h4>
                      <p className="text-lg text-primary font-medium">Чат на сайте</p>
                      <p className="text-sm text-gray-600 mt-1">Мгновенные ответы на вопросы</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Contact Form */}
              <Card className="p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Быстрая связь</h4>
                <div className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Телефон" type="tel" />
                  <Input placeholder="Email" type="email" />
                  <textarea 
                    placeholder="Ваш вопрос или пожелания..."
                    className="w-full p-3 border rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button className="w-full">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить сообщение
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </div>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="mt-8 sm:mt-12 text-center">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>Быстрый ответ</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} />
                    <span>Безопасные сделки</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} />
                    <span>Проверенные владельцы</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-gray-800 mb-4">
                Часто задаваемые вопросы
              </h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">
                Ответы на самые популярные вопросы о аренде жилья в Сочи
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border shadow-sm">
                  <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-left hover:no-underline">
                    <span className="font-medium text-gray-800 text-sm sm:text-base pr-2">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 text-sm sm:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Home" size={24} className="text-accent" />
                <h4 className="text-lg sm:text-xl font-bold font-heading">СочиДом</h4>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4">
                Лучшая платформа для поиска и аренды жилья в Сочи. Надежно, удобно, выгодно.
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