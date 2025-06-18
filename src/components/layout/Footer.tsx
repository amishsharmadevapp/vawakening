
"use client"; 

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext'; 
import { usePathname } from 'next/navigation'; // Import usePathname

const logoUrl = "https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/Blue_Purple_Business_Linkedin_Banner__1_-removebg-preview.png";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { t } = useLanguage(); 
  const pathname = usePathname(); // Get current pathname

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const footerLinks = [
    { href: '/about', labelKey: 'header_about' }, 
    { href: '/programs', labelKey: 'header_programs' },
    { href: '/blog', labelKey: 'header_blog' },
    { href: '/mythology-meditation', labelKey: 'header_resources' },
    { href: '/store', labelKey: 'header_store' },
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
                alt={t('footer_vivekananda_foundation_logo_alt', { defaultValue: "Vivekananda Awakening Foundation Logo" })}
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
               {/* Conditionally render the Admin link */}
              {pathname === '/about' && (
                <li>
                  <Link href="/admin/login" className="text-xs text-muted-foreground/70 hover:text-primary/80 transition-colors">
                    {t('footer_admin')}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-4">{t('footer_connect_with_us')}</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="https://www.facebook.com/profile.php?id=61577705844773" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
              <Link href="https://www.instagram.com/vivekanandaawakeningfoundation/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
              <Link href="https://www.linkedin.com/in/amit-sharma-42a421370/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
              <Link href="https://www.youtube.com/@VivekanandaAwakeningFoundation" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary"><Youtube size={20} /></Link>
            </div>
            <div className="text-sm" dangerouslySetInnerHTML={{ __html: t('footer_address') }} />
            <p className="text-sm mt-2">
              {t('footer_email_prompt')} <a href="mailto:info@vawakening.com" className="hover:text-primary">info@vawakening.com</a>
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
