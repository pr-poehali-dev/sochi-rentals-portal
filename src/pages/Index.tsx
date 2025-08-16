import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [district, setDistrict] = useState('all');

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
      verified: true
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
      verified: true
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
      verified: true
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
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Home" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold font-heading text-primary">СочиДом</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost">Каталог</Button>
              <Button variant="ghost">Карта</Button>
              <Button variant="ghost">Помощь</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Icon name="User" size={16} className="mr-2" />
                    Войти
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
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Сдать жилье
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold font-heading text-gray-800 mb-6">
            Найдите идеальное жилье в Сочи
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Более 1000 проверенных объектов для аренды. От уютных студий до роскошных вилл с видом на море.
          </p>
          
          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Поиск</label>
                <Input
                  placeholder="Район, название..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
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
            <Button size="lg" className="w-full md:w-auto px-12">
              <Icon name="Search" size={20} className="mr-2" />
              Найти жилье
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Catalog */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold font-heading text-gray-800">
              Популярные предложения
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Icon name="Filter" size={16} />
              <span>Найдено: {filteredProperties.length} объектов</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-gray-800">
                    {property.type}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                    <Icon name="Heart" size={16} className="text-gray-600 hover:text-red-500 cursor-pointer" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                      {property.title}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{property.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{property.district}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Home" size={14} />
                      <span>{property.rooms} комн.</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Maximize" size={14} />
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{property.owner[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">{property.owner}</span>
                        {property.verified && (
                          <Icon name="CheckCircle" size={14} className="text-green-500" />
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{property.price}₽</div>
                      <div className="text-xs text-gray-500">за ночь</div>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-heading text-gray-800 mb-4">
              Карта объектов в Сочи
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Изучите расположение доступного жилья на интерактивной карте города
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-green-200/30"></div>
              <div className="text-center z-10">
                <Icon name="Map" size={64} className="text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Интерактивная карта Сочи</h4>
                <p className="text-gray-600 mb-6">Здесь будет отображена карта с объектами недвижимости</p>
                
                {/* Mock map points */}
                <div className="absolute top-8 left-8 bg-primary text-white rounded-full p-2 animate-pulse">
                  <Icon name="MapPin" size={16} />
                </div>
                <div className="absolute top-16 right-16 bg-accent text-white rounded-full p-2 animate-pulse">
                  <Icon name="MapPin" size={16} />
                </div>
                <div className="absolute bottom-12 left-1/3 bg-secondary text-white rounded-full p-2 animate-pulse">
                  <Icon name="MapPin" size={16} />
                </div>
                
                <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
                  <Icon name="Maximize2" size={16} className="mr-2" />
                  Открыть полную карту
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-heading text-gray-800 mb-4">
                Свяжитесь с нами
              </h3>
              <p className="text-gray-600">
                Готовы помочь найти идеальное жилье или ответить на ваши вопросы
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
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

                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
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

                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
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
              <Card className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Быстрая связь</h4>
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
            <div className="mt-12 text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-heading text-gray-800 mb-4">
                Часто задаваемые вопросы
              </h3>
              <p className="text-gray-600">
                Ответы на самые популярные вопросы о аренде жилья в Сочи
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <span className="font-medium text-gray-800">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Home" size={24} className="text-accent" />
                <h4 className="text-xl font-bold font-heading">СочиДом</h4>
              </div>
              <p className="text-gray-300 mb-4">
                Лучшая платформа для поиска и аренды жилья в Сочи. Надежно, удобно, выгодно.
              </p>
              <div className="flex space-x-4">
                <Icon name="Phone" size={20} className="text-accent" />
                <Icon name="Mail" size={20} className="text-accent" />
                <Icon name="MessageCircle" size={20} className="text-accent" />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Для гостей</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-accent transition-colors">Поиск жилья</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Карта объектов</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Помощь</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Для владельцев</h5>
              <ul className="space-y-2 text-gray-300">
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
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 СочиДом. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;