import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
  district: string;
  setDistrict: (district: string) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  districts: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  propertyType,
  setPropertyType,
  district,
  setDistrict,
  priceRange,
  setPriceRange,
  districts,
}) => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-800 mb-4 sm:mb-6">
          Найдите идеальное жилье в Сочи
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
          Более 1000 проверенных объектов для аренды. От уютных студий до роскошных вилл с видом на море.
        </p>
        
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
  );
};

export default HeroSection;
