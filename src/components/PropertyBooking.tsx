import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface PropertyBookingProps {
  property: {
    id: number;
    price: number;
    maxGuests: number;
  };
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  checkOutDate: Date | undefined;
  setCheckOutDate: (date: Date | undefined) => void;
  guests: number;
  setGuests: (guests: number) => void;
  isDateBooked: (date: Date, propertyId: number) => boolean;
  calculateTotalPrice: (property: any, checkIn?: Date, checkOut?: Date) => number;
}

const PropertyBooking: React.FC<PropertyBookingProps> = ({
  property,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guests,
  setGuests,
  isDateBooked,
  calculateTotalPrice,
}) => {
  return (
    <Card className="sticky top-24 p-6 shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{property.price}₽</div>
          <div className="text-gray-600">за ночь</div>
        </div>

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
  );
};

export default PropertyBooking;
