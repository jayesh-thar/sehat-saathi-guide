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
  MoreHorizontal,
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
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 h-14">
        {/* LEFT: Logo + Pincode */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">Swasthya Saathi</span>
          </Link>

          <DropdownMenu open={pincodeOpen} onOpenChange={setPincodeOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-black">
                ⚡ Express delivery to
                <span className="font-medium">Select Pincode</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Set Pincode</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* RIGHT: Login | Offers | Cart */}
        <div className="flex items-center gap-6 text-sm">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Hello, {user?.name?.split(' ')[0] || 'User'}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-destructive">
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Hello, Log in
            </Link>
          )}

          <Link to="/offers" className="flex items-center gap-1">
            ⚙ Offers
          </Link>

          <Link to="/cart" className="relative flex items-center gap-1">
            <ShoppingCart className="w-4 h-4" />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs rounded-full px-1">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="sm" className="border-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l-2 border-border">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary-foreground" />
                  </div>
                  Swasthya Saathi
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive(item.path) ? 'default' : 'ghost'}
                      className="w-full justify-start gap-4 h-12 text-base"
                    >
                      <item.icon className="w-6 h-6" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* PRIMARY NAVIGATION */}
      <div className="border-t">
        <nav className="flex justify-center gap-2 py-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`gap-2 rounded-full px-4 ${isActive(item.path)
                    ? 'bg-green-600 text-white hover:bg-green-600'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full px-4 gap-2">
                <MoreHorizontal className="w-4 h-4" />
                More
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/schemes">Government Schemes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/nearby">Nearby Hospitals</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
