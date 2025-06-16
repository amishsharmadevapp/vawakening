
"use client"; 

import { mythologyResources, MythologyResource } from '@/lib/data';
import ResourceCard from '@/components/shared/ResourceCard';
import { Brain, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'; 
import { useEffect } from 'react'; 
import { useLanguage } from '@/context/LanguageContext'; 
import Link from 'next/link'; 

export default function MythologyMeditationPage() {
  const { t, language } = useLanguage(); 

  useEffect(() => {
    document.title = t('page_title_mythology_meditation');
  }, [t, language]);

  const articles = mythologyResources.filter(r => r.type === 'article');
  const videos = mythologyResources.filter(r => r.type === 'video');
  const podcasts = mythologyResources.filter(r => r.type === 'podcast');

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent/70 via-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-block p-3 sm:p-4 bg-primary-foreground/10 rounded-full mb-6 animate-fade-in">
            <Image
              src="https://github.com/amishsharmadevapp/vivekafound/blob/main/Untitled_design__10_-removebg-preview.png?raw=true"
              alt={t('mythology_hero_alt_icon') || "Mythology & Meditation Icon"}
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12"
              priority
            />
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in delay-100">
            {t('mythology_hero_title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto animate-slide-in-up delay-300">
            {t('mythology_hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Introduction to the Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline text-2xl sm:text-3xl text-primary mb-4">{t('mythology_intro_title')}</h2>
            <p className="text-md sm:text-lg mb-6">
              {t('mythology_intro_p1')}
            </p>
          </div>
        </div>
      </section>

      {/* Removed Detailed Content Section */}
      
      <Tabs defaultValue="all" className="w-full container mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <TabsList className="grid w-full grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 mb-8 md:mb-12">
          <TabsTrigger value="all">{t('mythology_tab_all')}</TabsTrigger>
          <TabsTrigger value="articles">{t('mythology_tab_articles')}</TabsTrigger>
          <TabsTrigger value="videos">{t('mythology_tab_videos')}</TabsTrigger>
          <TabsTrigger value="podcasts">{t('mythology_tab_podcasts')}</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mythologyResources.map((resource, index) => (
              <div key={resource.id} id={resource.id} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="articles">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((resource, index) => (
               <div key={resource.id} id={resource.id} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
           {articles.length === 0 && <p className="text-center text-md sm:text-lg text-muted-foreground py-8">{t('mythology_no_articles_message') || "No articles available at the moment. Check back soon!"}</p>}
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((resource, index) => (
              <div key={resource.id} id={resource.id} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
          {videos.length === 0 && <p className="text-center text-md sm:text-lg text-muted-foreground py-8">{t('mythology_no_videos_message') || "No videos available at the moment. Check back soon!"}</p>}
        </TabsContent>
        <TabsContent value="podcasts">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {podcasts.map((resource, index) => (
              <div key={resource.id} id={resource.id} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
          {podcasts.length === 0 && <p className="text-center text-md sm:text-lg text-muted-foreground py-8">{t('mythology_no_podcasts_message') || "No podcasts available at the moment. Check back soon!"}</p>}
        </TabsContent>
      </Tabs>

      {/* Introducing Vyas Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-6 sm:p-8 md:p-12">
                <div className="mb-4">
                   <Image
                    src="https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/VYAS-removebg-preview.png"
                    alt={t('mythology_vyas_alt_icon') || "Vyas AI Spiritual Guide Icon"}
                    width={64}
                    height={64}
                    className="rounded-full"
                    data-ai-hint="AI guide spiritual"
                  />
                </div>
                <h2 className="font-headline text-2xl sm:text-3xl text-primary mb-4">{t('mythology_vyas_title')}</h2>
                <p className="text-md sm:text-lg text-foreground mb-6">
                  {t('mythology_vyas_description')}
                </p>
                <Link href="/ai-guide" className="text-md sm:text-lg text-primary font-semibold hover:text-accent">
                  {t('mythology_vyas_cta')} &rarr;
                </Link>
              </div>
              <div className="relative h-64 md:h-full flex items-center justify-center bg-muted/20 md:bg-transparent p-4">
                 <Image
                  src="https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/VYAS-removebg-preview.png"
                  alt={t('mythology_vyas_alt_guide') || "Vyas, your AI Spiritual Guide"}
                  layout="fill"
                  objectFit="contain"
                  className="p-2" 
                  data-ai-hint="AI guide wisdom"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Add to LanguageContext.tsx 'en':
// "mythology_hero_alt_icon": "Mythology & Meditation Icon",
// "mythology_no_articles_message": "No articles available at the moment. Check back soon!",
// "mythology_no_videos_message": "No videos available at the moment. Check back soon!",
// "mythology_no_podcasts_message": "No podcasts available at the moment. Check back soon!",
// "mythology_vyas_alt_icon": "Vyas AI Spiritual Guide Icon",
// "mythology_vyas_alt_guide": "Vyas, your AI Spiritual Guide",


    
