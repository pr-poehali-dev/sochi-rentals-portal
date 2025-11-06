import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const SeoContent = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Main SEO Text */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-800 mb-6">
            Аренда жилья в Сочи посуточно: квартиры и дома у моря
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p className="text-base sm:text-lg leading-relaxed">
              <strong>СочиДом</strong> — это удобный портал для аренды жилья в Сочи на любой срок. 
              У нас более <strong>500 проверенных объектов</strong> по всему городу: от бюджетных студий 
              в центре до роскошных вилл с бассейном на побережье.
            </p>
            
            <p className="text-base sm:text-lg leading-relaxed">
              Мы предлагаем <strong>прямые контакты с собственниками</strong>, что позволяет снять жилье 
              без посреднических комиссий. Каждое объявление проходит проверку, все фото реальные, 
              а цены актуальны на сегодняшний день.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Без комиссии</h3>
              <p className="text-sm text-gray-600">
                Прямая связь с владельцами. Никаких скрытых платежей
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">Быстрое бронирование</h3>
              <p className="text-sm text-gray-600">
                Забронируйте жилье за 5 минут онлайн
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Star" size={32} className="text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Лучшие цены</h3>
              <p className="text-sm text-gray-600">
                От 2200₽/сутки. Скидки при долгосрочной аренде
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Поддержка 24/7</h3>
              <p className="text-sm text-gray-600">
                Помощь в выборе и решении любых вопросов
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Districts */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-800 mb-6">
            Популярные районы для аренды в Сочи
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg mb-1">Центральный район</h4>
                    <Badge variant="secondary" className="text-xs">150+ объектов</Badge>
                  </div>
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <p className="text-sm text-gray-600">
                  Набережная, парки, рестораны. Идеально для отдыха у моря. 
                  Цены от 3000₽/сутки.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg mb-1">Адлер</h4>
                    <Badge variant="secondary" className="text-xs">120+ объектов</Badge>
                  </div>
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <p className="text-sm text-gray-600">
                  Олимпийский парк, аэропорт рядом. Развитая инфраструктура. 
                  Цены от 2500₽/сутки.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg mb-1">Красная Поляна</h4>
                    <Badge variant="secondary" className="text-xs">80+ объектов</Badge>
                  </div>
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <p className="text-sm text-gray-600">
                  Горнолыжные курорты, шикарные виды. Для активного отдыха. 
                  Цены от 5000₽/сутки.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg mb-1">Хоста</h4>
                    <Badge variant="secondary" className="text-xs">90+ объектов</Badge>
                  </div>
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <p className="text-sm text-gray-600">
                  Тихий район, чистые пляжи, Воронцовские пещеры рядом. 
                  Цены от 2200₽/сутки.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional SEO Text */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-800 mb-6">
            Как снять жилье в Сочи через СочиДом?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                1
              </div>
              <h4 className="font-bold mb-2">Выберите жилье</h4>
              <p className="text-sm text-gray-600">
                Используйте фильтры по цене, району и типу жилья
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                2
              </div>
              <h4 className="font-bold mb-2">Свяжитесь с владельцем</h4>
              <p className="text-sm text-gray-600">
                Позвоните или напишите напрямую собственнику
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                3
              </div>
              <h4 className="font-bold mb-2">Заселяйтесь</h4>
              <p className="text-sm text-gray-600">
                Оплатите и получите ключи от жилья
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <h4 className="text-lg font-bold">Почему стоит выбрать Сочи для отдыха?</h4>
            <p className="text-base leading-relaxed">
              Сочи — уникальный курортный город на побережье Черного моря. Здесь можно 
              совместить пляжный отдых с походами в горы, посетить Олимпийский парк, 
              дендрарий, океанариум и множество других достопримечательностей. 
              Субтропический климат позволяет отдыхать круглый год.
            </p>
            
            <p className="text-base leading-relaxed">
              <strong>Аренда жилья посуточно</strong> в Сочи — это возможность сэкономить 
              на проживании по сравнению с отелями, при этом получить больше комфорта 
              и свободы. Вы можете выбрать квартиру с кухней, чтобы готовить самостоятельно, 
              или снять дом с бассейном для компании друзей.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoContent;
