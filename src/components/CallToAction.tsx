import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface CTASettings {
  title: string;
  subtitle: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  workingHours: string;
}

const CallToAction: React.FC = () => {
  const [settings, setSettings] = useState<CTASettings>({
    title: 'Не можете выбрать жильё?',
    subtitle: 'Позвоните нам — подберём идеальный вариант под ваши требования!',
    phone: '+7 (999) 123-45-67',
    whatsapp: '+79991234567',
    telegram: 'sochi_apartments',
    workingHours: 'Ежедневно с 9:00 до 21:00'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSave = () => {
    setSettings(tempSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setIsEditing(false);
  };

  const handleCall = () => {
    window.location.href = `tel:${settings.phone.replace(/\D/g, '')}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(`https://t.me/${settings.telegram}`, '_blank');
  };

  return (
    <Card className="bg-gradient-to-r from-primary to-accent text-white p-8 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Icon name="Edit" size={16} className="mr-2" />
              Редактировать
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Настройки контактной информации</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Заголовок</label>
                <Input
                  value={tempSettings.title}
                  onChange={(e) => setTempSettings({...tempSettings, title: e.target.value})}
                  placeholder="Заголовок"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Подзаголовок</label>
                <Input
                  value={tempSettings.subtitle}
                  onChange={(e) => setTempSettings({...tempSettings, subtitle: e.target.value})}
                  placeholder="Подзаголовок"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Телефон</label>
                <Input
                  value={tempSettings.phone}
                  onChange={(e) => setTempSettings({...tempSettings, phone: e.target.value})}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">WhatsApp</label>
                <Input
                  value={tempSettings.whatsapp}
                  onChange={(e) => setTempSettings({...tempSettings, whatsapp: e.target.value})}
                  placeholder="+79991234567"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Telegram</label>
                <Input
                  value={tempSettings.telegram}
                  onChange={(e) => setTempSettings({...tempSettings, telegram: e.target.value})}
                  placeholder="sochi_apartments"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Время работы</label>
                <Input
                  value={tempSettings.workingHours}
                  onChange={(e) => setTempSettings({...tempSettings, workingHours: e.target.value})}
                  placeholder="Ежедневно с 9:00 до 21:00"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  <Icon name="Check" size={16} className="mr-2" />
                  Сохранить
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1">
                  <Icon name="X" size={16} className="mr-2" />
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
          <Icon name="Headphones" size={32} />
        </div>
        
        <h2 className="text-3xl font-bold mb-3">{settings.title}</h2>
        <p className="text-lg mb-6 text-white/90">{settings.subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button 
            onClick={handleCall}
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg shadow-lg"
          >
            <Icon name="Phone" size={24} className="mr-3" />
            {settings.phone}
          </Button>
          
          <div className="flex gap-3">
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-6"
            >
              <Icon name="MessageCircle" size={24} />
            </Button>
            <Button
              onClick={handleTelegram}
              size="lg"
              className="bg-[#0088cc] hover:bg-[#006699] text-white px-6 py-6"
            >
              <Icon name="Send" size={24} />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-white/80">
          <Icon name="Clock" size={16} />
          <span className="text-sm">{settings.workingHours}</span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle2" size={16} />
            <span>Бесплатный подбор</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} />
            <span>Проверенные объекты</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Star" size={16} />
            <span>Лучшие цены</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    </Card>
  );
};

export default CallToAction;
