
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Languages } from 'lucide-react'; // Added Languages icon
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLanguage, type Language } from '@/context/LanguageContext'; // Import useLanguage

interface NavItem {
  href: string;
  labelKey: string; // Changed to labelKey for translation
}

const logoUrl = "https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/Blue_Purple_Business_Linkedin_Banner__1_-removebg-preview.png";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage(); // Get language context

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  const toggleLanguage = () => {
    setLanguage((prevLang: Language) => (prevLang === 'en' ? 'hi' : 'en'));
  };

  const logoLinkContent = (
    <Image
      src={logoUrl}
      alt="Vivekananda Awakening Foundation Logo"
      width={228}
      height={60}
      priority
      className="object-contain"
    />
  );

  const navItems: NavItem[] = [
    { href: '/', labelKey: 'header_home' },
    { href: '/about', labelKey: 'header_about' },
    { href: '/programs', labelKey: 'header_programs' },
    { href: '/mythology-meditation', labelKey: 'header_resources' },
    { href: '/blog', labelKey: 'header_blog' },
    { href: '/ai-guide', labelKey: 'header_vyas' },
    // { href: '/contact', labelKey: 'header_contact' }, // Removed Contact link
  ];

  const languageToggleButton = (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-muted-foreground hover:text-primary px-2 sm:px-3"
      data-hide="true" // For hiding from bots
      aria-label={language === 'en' ? t('header_toggle_to_hindi') : t('header_toggle_to_english')}
    >
      <Languages className="h-5 w-5 sm:mr-1" />
      <span className="hidden sm:inline">{language === 'en' ? t('header_toggle_to_hindi') : t('header_toggle_to_english')}</span>
    </Button>
  );
  
  const mobileLanguageToggleButton = (
     <Button
        variant="ghost"
        onClick={() => {
          toggleLanguage();
          closeSheet();
        }}
        className={cn(
            "w-full justify-start text-base font-medium transition-colors hover:text-primary py-1.5 px-2 rounded-md",
            "text-foreground"
        )}
        data-hide="true"
        aria-label={language === 'en' ? t('header_toggle_to_hindi') : t('header_toggle_to_english')}
    >
        <Languages className="mr-2 h-5 w-5" />
        {language === 'en' ? t('header_toggle_to_hindi') : t('header_toggle_to_english')}
    </Button>
  );


  if (!isMounted) {
    // Fallback for non-JS environments or before hydration - simpler layout
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center">
            {logoLinkContent}
          </Link>
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  "font-medium transition-colors text-muted-foreground hover:text-primary px-3 py-2"
                )}
              >
                {t(item.labelKey)} 
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
           <div className="hidden md:flex">{languageToggleButton}</div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      {/* Mobile Header */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:hidden">
        <Link href="/" className="flex items-center flex-shrink-0" onClick={closeSheet}>
          {logoLinkContent}
        </Link>
        <div className="flex items-center">
          {/* Language toggle button for mobile, outside the sheet trigger */}
          {languageToggleButton}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <SheetHeader className="mb-6 flex flex-row items-center justify-between">
                <Link href="/" className="flex items-center" onClick={closeSheet}>
                    {logoLinkContent}
                </Link>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={closeSheet} className="-mr-2">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetTrigger>
              </SheetHeader>
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSheet}
                      className={cn(
                      "text-base font-medium transition-colors hover:text-primary py-1.5 px-2 rounded-md",
                      pathname === item.href ? "text-primary bg-muted" : "text-foreground"
                    )}
                  >
                    {t(item.labelKey)} 
                  </Link>
                ))}
                {/* Mobile language toggle inside the sheet */}
                <div className="pt-2 border-t border-border mt-2">
                 {mobileLanguageToggleButton}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="container mx-auto hidden h-16 items-center justify-center px-4 md:flex md:relative md:px-6">
        <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
          <Link href="/" className="flex items-center" onClick={closeSheet}>
            {logoLinkContent}
          </Link>
        </div>

        <nav className="flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                "font-medium transition-colors text-muted-foreground hover:text-primary",
                pathname === item.href ? "text-primary" : "",
                "px-3"
              )}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2">
          <div className="flex items-center">
            {languageToggleButton}
          </div>
        </div>
      </div>
    </header>
  );
}
