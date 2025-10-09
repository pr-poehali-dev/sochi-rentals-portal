import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Home" size={28} className="text-primary sm:size-8" />
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-primary">СочиДом</h1>
          </div>
          
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
            <Button className="bg-primary hover:bg-primary/90 text-sm lg:text-base" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              <span className="hidden lg:inline">Сдать жилье</span>
              <span className="lg:hidden">Сдать</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
