import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  district: string;
  rooms: number;
  area: number;
  amenities: string[];
  owner: string;
  verified: boolean;
  maxGuests: number;
}

interface PropertyCardProps {
  property: Property;
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  checkOutDate: Date | undefined;
  setCheckOutDate: (date: Date | undefined) => void;
  guests: number;
  setGuests: (guests: number) => void;
  setSelectedProperty: (property: Property) => void;
  isDateBooked: (date: Date, propertyId: number) => boolean;
  generateBookedDates: (propertyId: number) => Date[];
  getAvailableDates: (propertyId: number) => Date[];
  calculateTotalPrice: (property: Property, checkIn: Date, checkOut: Date) => number;
  formatDateRange: (checkIn: Date | undefined, checkOut: Date | undefined) => string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guests,
  setGuests,
  setSelectedProperty,
  isDateBooked,
  generateBookedDates,
  getAvailableDates,
  calculateTotalPrice,
  formatDateRange,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Выберите даты</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Выберите даты заезда и выезда. Занятые даты выделены серым.
                    </p>
                    
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
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Детали бронирования</h4>
                    
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
          
          <Button variant="outline" className="w-full text-sm">
            <Icon name="Heart" size={14} className="mr-2" />
            В избранное
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
