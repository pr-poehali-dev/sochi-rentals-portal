import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Property {
  id: number;
  title: string;
  position: [number, number];
  price: number;
  type: string;
  bedrooms: number;
}

const SochiMap: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    { id: 1, title: 'Апартаменты в Центральном районе', position: [43.5855, 39.7231], price: 5000, type: 'Квартира', bedrooms: 2 },
    { id: 2, title: 'Студия у моря в Адлере', position: [43.4275, 39.9208], price: 3500, type: 'Студия', bedrooms: 1 },
    { id: 3, title: 'Коттедж в Красной Поляне', position: [43.6849, 40.2634], price: 12000, type: 'Коттедж', bedrooms: 4 },
    { id: 4, title: 'Пентхаус на набережной', position: [43.5987, 39.7304], price: 15000, type: 'Пентхаус', bedrooms: 3 },
    { id: 5, title: 'Уютная квартира в Хосте', position: [43.5163, 39.8783], price: 4000, type: 'Квартира', bedrooms: 2 },
    { id: 6, title: 'Вилла с бассейном', position: [43.5755, 39.7850], price: 20000, type: 'Вилла', bedrooms: 5 },
    { id: 7, title: 'Квартира-студия в Лазаревском', position: [43.9089, 39.3315], price: 2800, type: 'Студия', bedrooms: 1 },
    { id: 8, title: 'Апартаменты в Имеретинской бухте', position: [43.4058, 39.9558], price: 6500, type: 'Квартира', bedrooms: 2 },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEditStart = (property: Property) => {
    setEditingId(property.id);
    setEditTitle(property.title);
  };

  const handleEditSave = (id: number) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, title: editTitle } : p
    ));
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-4 px-4 pt-4">
        <div>
          <h2 className="text-2xl font-bold">Карта объектов в Сочи</h2>
          <p className="text-gray-600">Выберите жильё на карте или свяжитесь с нами для персонального подбора</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Icon name="Edit" size={16} className="mr-2" />
              Управление объектами
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Редактирование названий объектов</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {properties.map((property) => (
                <Card key={property.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      {editingId === property.id ? (
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="mb-2"
                          placeholder="Название объекта"
                        />
                      ) : (
                        <div>
                          <h3 className="font-semibold">{property.title}</h3>
                          <p className="text-sm text-gray-600">
                            {property.type} • {property.bedrooms} спальни • {property.price}₽/ночь
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {editingId === property.id ? (
                        <>
                          <Button size="sm" onClick={() => handleEditSave(property.id)}>
                            <Icon name="Check" size={16} />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleEditCancel}>
                            <Icon name="X" size={16} />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleEditStart(property)}>
                          <Icon name="Edit" size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[43.5855, 39.7231]}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {properties.map((property) => (
            <Marker key={property.id} position={property.position}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-base mb-1">{property.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {property.type} • {property.bedrooms} спальни
                  </p>
                  <p className="text-primary font-bold text-lg mb-3">{property.price}₽/ночь</p>
                  <Button size="sm" className="w-full">
                    <Icon name="Phone" size={14} className="mr-1" />
                    Забронировать
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SochiMap;
