
import type { ReactNode } from 'react';
// import { BlogPostDocument } from '@/types/blog'; // No longer needed here for static posts

// String identifiers for icons. Components will map these to actual icon elements.
export type IconName = 
  | 'OmSymbol' 
  | 'Users' 
  | 'Leaf' 
  | 'Zap' 
  | 'BookOpen' 
  | 'FileText' 
  | 'Mic' 
  | 'Film';

export interface Program {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  iconName?: IconName; 
  icon?: ReactNode; // For actual JSX icon components
  image: string;
  category: string;
  dataAiHint: string;
}

export const programs: Program[] = [
  {
    id: 'meditation-mental-health',
    title: 'Mindful Living & Meditation',
    description: 'Cultivate inner peace and emotional resilience through guided meditation and mental wellness workshops.',
    longDescription: `This is a simple test description.`, // Intentionally simplified
    iconName: 'OmSymbol',
    image: 'https://github.com/amishsharmadevapp/vivekafound/blob/main/Assistant_A_Mindful_Living_&_Med.png?raw=true',
    category: 'Meditation + Mental Health',
    dataAiHint: 'meditation yoga'
  },
  {
    id: 'women-empowerment',
    title: 'Shakti: Women Empowerment',
    description: 'Empowering women with skills, education, and support for personal and economic independence.',
    longDescription: `Project Shakti is dedicated to empowering women and girls in rural and underserved communities. We offer vocational training, literacy programs, health awareness camps, and leadership development workshops. By fostering self-confidence and providing economic opportunities, we aim to create a more equitable society where women can thrive.`,
    iconName: 'Users',
    image: 'https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/refs/heads/main/Assistant_A_Shakti__Women_Empowe.webp',
    category: 'Women & Rural Empowerment',
    dataAiHint: 'women community'
  },
  {
    id: 'environmental-action',
    title: 'Prakriti: Environmental Stewardship',
    description: 'Promoting sustainable living, conservation efforts, and ecological awareness for a healthier planet.',
    longDescription: `Prakriti, our environmental initiative, focuses on promoting ecological balance and sustainable living. We conduct tree plantation drives, waste management workshops, promote renewable energy, and educate communities about conservation. Our goal is to inspire a deep respect for nature and encourage active participation in protecting our planet for future generations.`,
    iconName: 'Leaf',
    image: 'https://github.com/amishsharmadevapp/vivekafound/blob/main/imagen-4.0-generate-preview-05-20_Prakriti__Environmen.png?raw=true',
    category: 'Environmental Action',
    dataAiHint: 'nature environment'
  },
  {
    id: 'vocational-training',
    title: 'Kaushalya: Skill Development',
    description: 'Equipping youth with vocational skills for better livelihood opportunities and self-reliance.',
    longDescription: `The Kaushalya program aims to bridge the skill gap and enhance employability among youth. We offer a range of vocational training courses in areas like computer literacy, tailoring, handicrafts, and organic farming. By imparting practical skills, we empower individuals to become self-reliant and contribute to their local economies.`,
    iconName: 'Zap',
    image: 'https://github.com/amishsharmadevapp/vivekafound/blob/main/Assistant_B_Kaushalya__Skill_Dev.png?raw=true',
    category: 'Vocational Training',
    dataAiHint: 'skills training'
  },
   {
    id: 'rural-development',
    title: 'Gram Vikas: Rural Development',
    description: 'Holistic development programs for rural communities focusing on infrastructure, health, and education.',
    longDescription: `Gram Vikas focuses on the holistic development of rural areas. We work on improving infrastructure like sanitation and clean water access, enhancing educational facilities, and conducting health camps. Our approach is participatory, involving community members in planning and implementing projects to ensure sustainability and local ownership.`,
    iconName: 'Users',
    image: 'https://github.com/amishsharmadevapp/vivekafound/blob/main/Assistant_B_Gram_Vikas__Rural_De.png?raw=true',
    category: 'Women & Rural Empowerment',
    dataAiHint: 'village community'
  },
  {
    id: 'vedic-wisdom',
    title: 'Jnana: Vedic Wisdom Today',
    description: 'Exploring the timeless relevance of Vedic knowledge in contemporary life.',
    longDescription: `The Jnana initiative seeks to make the profound wisdom of the Vedas accessible and relevant to modern audiences. We organize discourses, study circles, and publish simplified interpretations of Vedic texts, highlighting their insights on ethics, cosmology, and human psychology. Our aim is to foster a deeper understanding of this ancient heritage.`,
    iconName: 'BookOpen',
    image: 'https://github.com/amishsharmadevapp/vivekafound/blob/main/Assistant_B_Jnana__Vedic_Wisdom_.png?raw=true',
    category: 'Meditation + Mental Health',
    dataAiHint: 'ancient scriptures'
  },
];

// Static blog posts are now being replaced by Firestore.
// Keep this structure for reference or if needed as a fallback, but primary data source is Firestore.
// export const blogPosts: BlogPost[] = [ ... ]; // Original static data commented out or removed

export interface MythologyResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'podcast';
  description: string;
  linkOrContent: string; // For articles, this will be the content. For video/podcast, the URL.
  image: string;
  icon?: ReactNode; // For actual JSX icon components
  iconName?: IconName;
  dataAiHint: string;
}

export const mythologyResources: MythologyResource[] = [
  {
    id: 'ramayana-lessons',
    title: 'Life Lessons from the Ramayana',
    type: 'article',
    description: 'An insightful article exploring the ethical and moral teachings of the epic Ramayana.',
    linkOrContent: `The Ramayana, one of India's most revered epics, offers profound insights into dharma, karma, and the human condition. This article explores key characters and events, extracting timeless lessons applicable to modern life, such as the importance of duty, righteousness, and perseverance in the face of adversity.`,
    image: 'https://github.com/amishsharmadevapp/vivekafound/blob/main/Assistant_A_Life_Lessons_from_th.png?raw=true',
    iconName: 'FileText',
    dataAiHint: 'epic scroll'
  },
  {
    id: 'bhagavad-gita-podcast',
    title: 'Understanding the Bhagavad Gita (Podcast Series)',
    type: 'podcast',
    description: 'A podcast series breaking down the core teachings of the Bhagavad Gita for contemporary understanding.',
    linkOrContent: 'https://example.com/podcast/bhagavad-gita', 
    image: 'https://github.com/amishsharmadevapp/vivekafound/blob/main/Assistant_B_Understanding_the_Bh.png?raw=true',
    iconName: 'Mic',
    dataAiHint: 'microphone podcast'
  },
  {
    id: 'yoga-philosophy-video',
    title: 'The Philosophy of Yoga: An Introduction (Video)',
    type: 'video',
    description: 'A visually engaging video explaining the foundational principles of Yoga philosophy beyond asanas.',
    linkOrContent: 'https://www.youtube.com/watch?v=example', 
    image: 'https://github.com/amishsharmadevapp/vivekafound/blob/main/Assistant_B_The_Philosophy_of_Yo.png?raw=true',
    iconName: 'Film',
    dataAiHint: 'yoga silhouette'
  },
   {
    id: 'upanishads-explained',
    title: 'Core Concepts of the Upanishads',
    type: 'article',
    description: 'A clear explanation of Brahman, Atman, and Maya as discussed in the Upanishads.',
    linkOrContent: `The Upanishads form the philosophical core of Hinduism, exploring profound metaphysical questions. This article demystifies key concepts like Brahman (the ultimate reality), Atman (the individual self or soul), and Maya (the illusion of the material world), and discusses their implications for understanding existence and achieving spiritual liberation.`,
    image: 'https://github.com/amishsharmadevapp/vivekafound/blob/main/Assistant_B_Core_Concepts_of_the.jpeg?raw=true',
    iconName: 'FileText',
    dataAiHint: 'ancient wisdom'
  },
];

// The BlogPost interface (previously here) is now in /src/types/blog.ts as BlogPostDocument and BlogPostDisplay
// The blogPosts array (previously here) is now fetched from Firestore via functions in /src/app/admin/dashboard/blogs/actions.ts


