
"use client"; 

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // Import useLanguage

const logoUrl = "https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/Blue_Purple_Business_Linkedin_Banner__1_-removebg-preview.png";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { t } = useLanguage(); // Get translation function

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const footerLinks = [
    { href: '/about', labelKey: 'header_about' }, // Reusing header keys for simplicity
    { href: '/programs', labelKey: 'header_programs' },
    { href: '/blog', labelKey: 'header_blog' },
    { href: '/mythology-meditation', labelKey: 'header_resources' },
    // { href: '/contact', labelKey: 'header_contact' }, // Removed contact link
    { href: '/sitemap', labelKey: 'footer_sitemap' },
  ];

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="block mb-4">
              <Image
                src={logoUrl}
                alt="Vivekananda Awakening Foundation Logo"
                width={190}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="text-sm">
              {t('footer_description')}
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-4">{t('footer_quick_links')}</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="hover:text-primary">{t(link.labelKey)}</Link></li>
              ))}
               <li>
                <Link href="/admin/login" className="text-xs text-muted-foreground/70 hover:text-primary/80 transition-colors">
                  {t('footer_admin')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-4">{t('footer_connect_with_us')}</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
              <Link href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary"><Youtube size={20} /></Link>
            </div>
            <p className="text-sm">
              {t('footer_address')}
            </p>
            <p className="text-sm">
              {t('footer_email_prompt')} <a href="mailto:info@vivekawell.org" className="hover:text-primary">info@vivekawell.org</a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm">
          <p>{t('footer_copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
