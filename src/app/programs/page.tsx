
"use client"; 

import Image from 'next/image';
import { programs, Program } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, HandHelping } from 'lucide-react';
import { useEffect } from 'react'; 
import { useLanguage } from '@/context/LanguageContext'; 

export default function ProgramsPage() {
  const { t, language } = useLanguage(); 

  useEffect(() => {
    document.title = t('page_title_programs');
  }, [t, language]);

  // Program details (title, description, category) would need to be translatable
  // For this example, assume they are pre-translated or handled by a more complex system
  const categories = Array.from(new Set(programs.map(p => p.category)));

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {t('programs_hero_title')} 
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto animate-slide-in-up delay-200">
            {t('programs_hero_subtitle')}
          </p>
        </div>
      </section>

      {categories.map(category => (
        <section key={category} id={category.toLowerCase().replace(/\s\W/g, '-')} className="py-12 md:py-16 first:pt-16 md:first:pt-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-10 text-center md:text-left">
              {/* Category titles can be made translatable too if keys are added. For now, using original. */}
              {category} 
            </h2>
            <div className="grid md:grid-cols-1 gap-8 md:gap-12">
              {programs.filter(p => p.category === category).map((program, index) => (
                <Card key={program.id} id={program.id} className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card flex flex-col md:flex-row items-stretch animate-fade-in`} style={{animationDelay: `${index * 100}ms`}}>
                  <div className="md:w-1/3 relative min-h-[200px] sm:min-h-[250px] md:min-h-full">
                    <Image
                      src={program.image}
                      alt={program.title} // Program titles are not translated via t() here yet.
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={program.dataAiHint}
                      className="md:rounded-l-lg md:rounded-r-none rounded-t-lg"
                    />
                  </div>
                  <div className="md:w-2/3 flex flex-col p-4 sm:p-6">
                    <CardHeader className="p-0 pb-3 sm:pb-4">
                       <div className="flex items-center gap-2 sm:gap-3 mb-1">
                        {program.icon && <div className="text-accent h-6 w-6 sm:h-7 sm:w-7">{program.icon}</div>}
                        {/* Program titles and descriptions are from `data.ts` and not yet translated here. */}
                        {/* To translate, you would map program.title to a key like `program_title_${program.id}` */}
                        <CardTitle className="font-headline text-xl sm:text-2xl text-primary">{program.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                      <CardDescription className="text-foreground text-sm sm:text-base mb-2">{program.description}</CardDescription>
                      {program.longDescription && <p className="text-muted-foreground text-xs sm:text-sm">{program.longDescription}</p>}
                    </CardContent>
                    <div className="p-0 pt-4 sm:pt-6">
                       <Button asChild className="mt-auto bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                        <Link href="/contact">
                          {t('programs_get_involved_button')} <HandHelping className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-6">
            {t('programs_cta_title')}
          </h2>
          <p className="text-md sm:text-lg text-foreground max-w-2xl mx-auto mb-8">
            {t('programs_cta_subtitle')}
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">{t('programs_cta_button')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

