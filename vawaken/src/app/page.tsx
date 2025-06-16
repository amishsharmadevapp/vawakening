
"use client"; // Mark as client component to use LanguageContext

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getFeaturedBlogPosts } from '@/app/admin/dashboard/blogs/actions';
import type { BlogPostDisplay, BlogPostDocument } from '@/types/blog';
import { format } from 'date-fns';
import { stripHtml } from '@/lib/utils';
// Metadata export removed as this is now a Client Component
// import type { Metadata } from 'next';
import { useEffect, useState } from 'react'; // For fetching data client-side
import { useLanguage } from '@/context/LanguageContext'; // Import useLanguage

// Helper function to transform BlogPostDocument to BlogPostDisplay
function transformPostForDisplay(postDoc: BlogPostDocument): BlogPostDisplay {
  let tagsArray: string[] = [];
  if (postDoc.tags && typeof postDoc.tags === 'string') {
    tagsArray = postDoc.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  }

  return {
    ...postDoc,
    created_at: postDoc.created_at,
    date: postDoc.created_at ? format(new Date(postDoc.created_at), 'PPP') : 'Date not available',
    tags: tagsArray,
    image: postDoc.thumbnailUrl || 'https://placehold.co/600x400.png',
  };
}

// export const metadata: Metadata = { // Removed for Client Component
//   title: 'Vivekananda Awakening Foundation',
// };

export default function HomePage() {
  const { t, language } = useLanguage(); // Get language context
  const [featuredPosts, setFeaturedPosts] = useState<BlogPostDisplay[]>([]);
  const [rawFeaturedPostsLength, setRawFeaturedPostsLength] = useState(0);

  useEffect(() => {
    document.title = t('page_title_home');
  }, [t, language]);

  useEffect(() => {
    async function fetchPosts() {
      const rawPosts = await getFeaturedBlogPosts(2);
      setFeaturedPosts(rawPosts.map(transformPostForDisplay));
      setRawFeaturedPostsLength(rawPosts.length);
    }
    fetchPosts();
  }, []);


  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section>
        <div className="w-full">
          <div className="bg-secondary text-center relative overflow-hidden min-h-screen flex flex-col justify-center items-center px-4 md:px-6 py-8 md:py-16">
            <div
              className="absolute inset-0 blur-xs"
              style={{
                backgroundImage: "url('https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/Untitled%20design%20(9).png')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              data-ai-hint="spiritual abstract"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                {t('home_hero_title')}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground mb-10 animate-slide-in-up delay-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                {t('home_hero_subtitle')}
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 animate-slide-in-up delay-400">
                <Link href="/about">{t('home_explore_button')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-primary mb-4 sm:mb-6">
                {t('home_welcome_title')}
              </h2>
              <p className="text-lg sm:text-xl italic text-center text-primary my-4 sm:my-6">
                {t('home_welcome_tagline')}
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4">
                {t('home_welcome_p1')}
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4">
                {t('home_welcome_p2')}
              </p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/about">{t('home_learn_more_button')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <div className="hidden md:block animate-fade-in delay-200">
              <Image
                src="https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/Untitled%20design%20(7).png"
                alt="Person meditating peacefully"
                width={600}
                height={400}
                className="rounded-lg shadow-xl object-cover"
                data-ai-hint="meditation serene woman"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section id="featured-articles" className="py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-left mb-8 md:mb-12">
            <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-primary mb-2 sm:mb-4">{t('home_featured_articles_title')}</h2>
          </div>
          {featuredPosts.length > 0 ? (
            <div className="space-y-8 md:space-y-12">
              {featuredPosts.map((post, index) => (
                <div key={post.id} className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} animate-fade-in`} style={{animationDelay: `${index * 150}ms`}}>
                  <div className="md:w-1/2 lg:w-2/5">
                    <Link href={`/blog/${post.slug || post.id}`}>
                      <h3 className="font-headline text-lg sm:text-xl md:text-2xl text-primary mb-2 sm:mb-3 hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-foreground mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
                      {stripHtml(post.excerpt)}
                    </p>
                    <Button asChild variant="muted" size="sm" className="bg-muted text-muted-foreground hover:bg-muted/70">
                      <Link href={`/blog/${post.slug || post.id}`}>Read More</Link>
                    </Button>
                  </div>
                  <div className="md:w-1/2 lg:w-3/5">
                    <Link href={`/blog/${post.slug || post.id}`}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-md object-cover aspect-[3/2] hover:opacity-90 transition-opacity"
                        data-ai-hint={post.dataAiHint || 'featured article'}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-foreground text-center">No featured articles available at the moment.</p>
          )}
          {rawFeaturedPostsLength > 0 && (
                 <div className="text-center mt-8 md:mt-12">
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
                        <Link href="/blog">{t('home_view_all_articles_button')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                 </div>
            )}
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-accent/80 to-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            {t('home_discover_programs_title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto">
            {t('home_discover_programs_subtitle')}
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <Link href="/programs">{t('home_explore_programs_button')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
