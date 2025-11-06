import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const FloatingContact = () => {
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCallRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 11) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setPhone('');
      }, 3000);
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    
    let formatted = '+7 ';
    if (cleaned.length > 1) {
      formatted += '(' + cleaned.substring(1, 4);
      if (cleaned.length > 4) {
        formatted += ') ' + cleaned.substring(4, 7);
      }
      if (cleaned.length > 7) {
        formatted += '-' + cleaned.substring(7, 9);
      }
      if (cleaned.length > 9) {
        formatted += '-' + cleaned.substring(9, 11);
      }
    }
    return formatted;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 animate-fade-in">
      {/* Mobile Call Button */}
      <a 
        href="tel:+79001234567"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 animate-pulse md:hidden"
        aria-label="Позвонить"
      >
        <Icon name="Phone" size={24} />
      </a>

      {/* Desktop Call Widget */}
      <Card className="hidden md:block shadow-2xl border-2 border-primary/20 w-80">
        <CardContent className="p-6">
          {!isSubmitted ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
                  <Icon name="Phone" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Бесплатная консультация</h3>
                  <p className="text-sm text-gray-600">
                    Поможем выбрать жилье за 5 минут
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleCallRequest} className="space-y-3">
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="text-center text-lg font-semibold"
                  maxLength={18}
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg py-6"
                >
                  <Icon name="Phone" size={20} className="mr-2" />
                  Заказать звонок
                </Button>
              </form>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Icon name="Shield" size={14} />
                <span>Ваши данные в безопасности</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="CheckCircle" size={32} className="text-green-500" />
              </div>
              <h3 className="font-bold text-lg mb-2">Заявка принята!</h3>
              <p className="text-sm text-gray-600">
                Перезвоним через 2-3 минуты
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/79001234567?text=Здравствуйте!%20Интересует%20аренда%20жилья%20в%20Сочи"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={24} />
      </a>
    </div>
  );
};

export default FloatingContact;
