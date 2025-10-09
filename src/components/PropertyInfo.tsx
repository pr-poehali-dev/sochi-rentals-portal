import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface PropertyData {
  title: string;
  district: string;
  rooms: number;
  area: number;
  maxGuests: number;
  rating: number;
  reviews: number;
  owner: string;
  verified: boolean;
  description: string;
  amenities: string[];
}

interface PropertyInfoProps {
  property: PropertyData;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  return (
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

      <div>
        <h3 className="text-xl font-semibold mb-4">Описание</h3>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </div>

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
  );
};

export default PropertyInfo;
