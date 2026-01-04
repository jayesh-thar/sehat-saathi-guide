import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Heart,
  MapPin,
  User,
  ShoppingCart,
  ChevronDown,
  Home,
  Activity,
  Lightbulb,
  Store,
  MessageCircle,
  Menu,
  LogOut,
  Building,
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const [pincodeOpen, setPincodeOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/symptoms', label: 'Symptom Tracker', icon: Activity },
    { path: '/tips', label: 'Health Tips', icon: Lightbulb },
    { path: '/store', label: 'Medicine Store', icon: Store },
    { path: '/assistant', label: 'AI Assistant', icon: MessageCircle },
    { path: '/schemes', label: 'Schemes', icon: Building }, // Shortened label
    { path: '/nearby', label: 'Hospitals', icon: MapPin }, // Shortened label
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b">
      {/* TOP BAR: Utility & Branding */}
      <div className="border-b bg-green-50/50">
        <div className="container mx-auto flex items-center justify-between px-4 h-12 text-sm">
          {/* LEFT: Branding & Location */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center shadow-sm">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-green-900 hidden sm:block">Swasthya Saathi</span>
            </Link>

            <div className="hidden md:flex items-center h-4 w-px bg-gray-300"></div>

            <DropdownMenu open={pincodeOpen} onOpenChange={setPincodeOpen}>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex items-center gap-1.5 text-gray-600 hover:text-green-700 transition-colors font-medium">
                  <MapPin className="w-4 h-4" />
                  <span>Select Location</span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Detect my location</DropdownMenuItem>
                <DropdownMenuItem>Enter Pincode</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* RIGHT: User Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Offers Link - Optional, kept as per existing */}
            <Link to="/offers" className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-green-700 font-medium transition-colors">
              <span className="text-lg">🏷️</span>
              <span>Offers</span>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium transition-colors">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="hidden sm:inline max-w-[100px] truncate">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className="w-3 h-3 opacity-50 hidden sm:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Log in</span>
              </Link>
            )}

            <Link to="/cart" className="relative group flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white ring-1 ring-green-600">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden ml-2">
                <Button variant="ghost" size="icon" className="-mr-2 text-gray-700">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="border-b pb-4 mb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
                      Swasthya Saathi
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive(item.path) ? 'secondary' : 'ghost'}
                        className={`w-full justify-start gap-3 h-11 transition-all ${isActive(item.path) ? 'bg-green-100 text-green-900 hover:bg-green-200' : 'text-gray-600 hover:text-green-900 hover:bg-green-50'
                          }`}
                      >
                        <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-green-700' : 'text-gray-500'}`} />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                  <div className="my-2 border-t border-gray-100"></div>
                  {!isAuthenticated && (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-2">
                        Log In / Sign Up
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* PRIMARY NAVIGATION (Desktop) */}
      <div className="hidden lg:block bg-white py-3">
        <nav className="container mx-auto flex items-center justify-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={`relative h-10 px-4 rounded-full transition-all duration-200 hover:bg-green-50 
                        ${active
                      ? 'text-green-700 font-semibold bg-green-50 hover:bg-green-100'
                      : 'text-gray-600 hover:text-green-700'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${active ? 'fill-current' : ''}`} />
                    {item.label}
                  </span>
                  {active && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-600"></span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
