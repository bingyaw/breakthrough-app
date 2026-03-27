export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  imageUrl: string;
  author: string;
  authorAvatar: string;
  likes: number;
  readTime: string;
  isHot?: boolean;
  isTrending?: boolean;
  badge?: string;
  pullQuote?: string;
  body: string;
  tags: string[];
  relatedIds: string[];
}

export interface FounderSpotlight {
  id: string;
  name: string;
  company: string;
  title: string;
  imageUrl: string;
  story: string;
}

export const founderSpotlights: FounderSpotlight[] = [
  {
    id: "f1",
    name: "Zhang Junjie",
    company: "CHAGEE",
    title: "From $6K to $6B Tea Empire",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=500&fit=crop",
    story:
      "Zhang Junjie built CHAGEE from a single tea shop with $6,000 in savings into a $6 billion empire spanning 4,000+ stores across Asia. His obsession with quality ingredients and refusing franchise models for years set CHAGEE apart in China's hyper-competitive tea market.",
  },
  {
    id: "f2",
    name: "Jack Ma",
    company: "Alibaba",
    title: "Rejected 30 Times, Built a Giant",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    story:
      "Jack Ma was rejected from 30 jobs, including KFC. He failed his college entrance exam twice. He started Alibaba in his apartment with 17 friends, growing it into one of the world's largest e-commerce platforms worth over $200 billion.",
  },
  {
    id: "f3",
    name: "Ritesh Agarwal",
    company: "OYO Rooms",
    title: "Teen Dropout to Hotel Mogul",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    story:
      "Ritesh Agarwal dropped out of college at 17, joined the Thiel Fellowship, and built OYO Rooms into the world's third-largest hotel chain. Starting with a single hotel in Gurgaon, he scaled to 43 countries by age 26.",
  },
  {
    id: "f4",
    name: "Dian Siswarini",
    company: "XL Axiata",
    title: "Breaking Barriers in Telecom",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    story:
      "Dian Siswarini became the first female CEO of a major Indonesian telecom company when she took the helm of XL Axiata. She led a massive digital transformation, pivoting from voice to data services and expanding 4G coverage across 500+ cities.",
  },
];

export const storyBubbles = [
  { id: "s1", name: "AI News", imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop", hasNew: true },
  { id: "s2", name: "SpaceX", imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=100&h=100&fit=crop", hasNew: true },
  { id: "s3", name: "Startups", imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop", hasNew: false },
  { id: "s4", name: "Science", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop", hasNew: true },
  { id: "s5", name: "Crypto", imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop", hasNew: false },
  { id: "s6", name: "Health", imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&h=100&fit=crop", hasNew: true },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "OpenAI's New Model Can Reason Like a PhD Scientist",
    subtitle: "GPT-5 passes graduate-level benchmarks across physics, biology, and math",
    category: "Tech",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=800&fit=crop",
    author: "Sarah Chen",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    likes: 2847,
    readTime: "5 min",
    isHot: true,
    badge: "AI",
    pullQuote: "We're not just building tools anymore — we're building thinking partners.",
    body: "OpenAI's latest model represents a quantum leap in artificial intelligence capabilities. The model demonstrates PhD-level reasoning across multiple scientific disciplines, from theoretical physics to molecular biology.\n\nIn controlled tests, the model successfully solved graduate-level problems that typically require years of specialized training. It can formulate hypotheses, design experiments, and interpret results with remarkable accuracy.\n\nThe implications for scientific research are profound. Laboratories worldwide are already integrating AI assistants into their workflows, accelerating discovery timelines from years to months.\n\nCritics warn about the need for robust verification systems, as AI-generated scientific claims require the same rigorous peer review as human-generated ones. But supporters argue this is the beginning of a new era in scientific discovery.",
    tags: ["AI", "Machine Learning", "Science", "OpenAI"],
    relatedIds: ["3", "5"],
  },
  {
    id: "2",
    title: "CHAGEE's IPO Shakes Up the Tea Industry",
    subtitle: "Zhang Junjie's premium tea chain valued at $6 billion",
    category: "Founders",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop",
    author: "Michael Wong",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    likes: 1923,
    readTime: "4 min",
    isTrending: true,
    badge: "Business",
    pullQuote: "Quality is not expensive — it's priceless.",
    body: "CHAGEE, the premium Chinese tea chain founded by Zhang Junjie, has filed for what analysts predict will be one of 2024's most anticipated IPOs. The company's valuation of $6 billion reflects the massive growth of China's new-style tea market.\n\nStarting with just $6,000 in savings and a small shop in Yunnan province, Zhang built CHAGEE into a brand synonymous with quality. Unlike competitors who franchised aggressively, Zhang maintained direct control over every location for years.\n\nThe company's secret: sourcing premium tea leaves directly from high-altitude plantations and refusing to cut corners on ingredients. Each drink uses freshly brewed tea rather than concentrates.\n\nWith 4,000+ stores across Southeast Asia and plans to enter the US market, CHAGEE represents a new wave of Asian brands going global with premium positioning.",
    tags: ["Business", "IPO", "Food & Beverage", "Asia"],
    relatedIds: ["4", "6"],
  },
  {
    id: "3",
    title: "SpaceX Starship Completes First Mars Trajectory Test",
    subtitle: "Full-duration burn puts Mars colonization timeline ahead of schedule",
    category: "Space",
    imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600&h=900&fit=crop",
    author: "Alex Rivera",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    likes: 4201,
    readTime: "6 min",
    isHot: true,
    badge: "Space",
    pullQuote: "Mars is no longer a question of if — it's a question of when in this decade.",
    body: "In what SpaceX engineers are calling a 'historic milestone,' the Starship vehicle completed its first full-duration burn simulating a Mars transfer orbit. The 6-minute engine firing demonstrated the vehicle's capability to carry payloads to the Red Planet.\n\nThe test, conducted from SpaceX's Starbase facility in Boca Chica, Texas, verified the performance of all 33 Raptor engines in a sustained firing configuration. Telemetry data showed all systems performing within nominal parameters.\n\nThis achievement puts SpaceX potentially years ahead of its original Mars colonization timeline. The company now plans a series of orbital refueling tests before attempting the first uncrewed Mars landing.\n\nNASA and international space agencies have expressed interest in utilizing Starship for their own Mars missions, potentially reshaping the entire landscape of planetary exploration.",
    tags: ["Space", "SpaceX", "Mars", "Technology"],
    relatedIds: ["1", "7"],
  },
  {
    id: "4",
    title: "How OYO's Ritesh Agarwal Rebuilt After the Pandemic",
    subtitle: "The youngest billionaire CEO on resilience and reinvention",
    category: "Founders",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=700&fit=crop",
    author: "Priya Sharma",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    likes: 1567,
    readTime: "7 min",
    badge: "Founders",
    pullQuote: "The pandemic didn't break us — it showed us what we were really made of.",
    body: "When COVID-19 devastated the global hospitality industry, OYO Rooms lost 80% of its revenue overnight. For Ritesh Agarwal, the 26-year-old CEO, it was the ultimate test of the resilience that had defined his journey from teen dropout to billionaire.\n\nAgarwal's response was swift and unconventional. He personally called 100 hotel partners daily, renegotiated thousands of contracts, and pivoted to long-stay accommodations for quarantined travelers and healthcare workers.\n\nThe company reduced its workforce by 30% but invested heavily in technology, building AI-driven pricing systems and contactless check-in solutions. By 2023, OYO had not only recovered but was posting its first-ever operating profits.\n\nNow expanding into vacation rentals and premium segments, Agarwal sees the post-pandemic hospitality landscape as an opportunity. 'Every crisis creates a new category leader,' he says. 'We intend to be that leader.'",
    tags: ["Founders", "Hospitality", "Startups", "Resilience"],
    relatedIds: ["2", "6"],
  },
  {
    id: "5",
    title: "Quantum Computing Breakthrough: 1000-Qubit Processor",
    subtitle: "Google and IBM race to achieve quantum advantage in real-world problems",
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=600&fit=crop",
    author: "Dr. James Liu",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    likes: 3102,
    readTime: "8 min",
    isTrending: true,
    badge: "Science",
    pullQuote: "We've crossed the threshold where quantum computers can solve problems classical computers simply cannot.",
    body: "In a landmark achievement for quantum computing, researchers have demonstrated a 1000-qubit processor capable of solving optimization problems exponentially faster than classical supercomputers.\n\nThe processor, developed through a collaboration between academic institutions and tech giants, maintains quantum coherence for record durations — long enough to perform meaningful calculations in drug discovery, materials science, and cryptography.\n\nThe breakthrough hinges on a new error-correction technique that dramatically reduces the noise that has historically limited quantum computers. This 'topological qubit' approach provides inherent protection against environmental interference.\n\nIndustry applications are already being explored. Pharmaceutical companies are using early access to simulate molecular interactions, potentially cutting drug development timelines from decades to years.",
    tags: ["Science", "Quantum Computing", "Technology", "Research"],
    relatedIds: ["1", "7"],
  },
  {
    id: "6",
    title: "Indonesia's XL Axiata Leads 5G Revolution in Southeast Asia",
    subtitle: "CEO Dian Siswarini's digital transformation playbook",
    category: "Tech",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=500&fit=crop",
    author: "Rina Tanaka",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    likes: 892,
    readTime: "5 min",
    badge: "Telecom",
    body: "Under Dian Siswarini's leadership, XL Axiata has become the unlikely frontrunner in Southeast Asia's 5G rollout. The Indonesian telecom company has deployed 5G networks across 50 cities, focusing on industrial applications rather than consumer markets.\n\nSiswarini's strategy defied conventional wisdom. Instead of competing on consumer data plans, she partnered with manufacturing firms, ports, and agricultural cooperatives to build private 5G networks. The result: higher margins and stickier enterprise contracts.\n\nThe company's 'Digital Villages' initiative has connected 300+ rural communities, bringing high-speed internet to areas previously reliant on 2G connections. This has catalyzed a wave of rural e-commerce and digital banking adoption.\n\nAnalysts now point to XL Axiata as a model for how mid-sized telecom operators can thrive against larger competitors by focusing on digital transformation rather than scale.",
    tags: ["Tech", "Telecom", "5G", "Indonesia"],
    relatedIds: ["2", "4"],
  },
  {
    id: "7",
    title: "CRISPR 3.0: Gene Editing Without Cutting DNA",
    subtitle: "Base editing opens door to treating 60% of genetic diseases",
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=750&fit=crop",
    author: "Dr. Emily Watson",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    likes: 2456,
    readTime: "6 min",
    isHot: true,
    badge: "Biotech",
    pullQuote: "We can now fix genetic typos without breaking the book of life.",
    body: "A new generation of CRISPR technology can edit individual DNA bases without making double-strand breaks, dramatically reducing the risk of unintended mutations. This 'base editing' approach could make gene therapy viable for thousands of genetic conditions.\n\nThe technique works like a molecular pencil eraser — precisely changing one DNA letter to another without cutting the double helix. This is crucial because traditional CRISPR cuts can sometimes lead to large deletions or rearrangements.\n\nClinical trials for sickle cell disease and progeria have shown remarkable results, with patients experiencing significant symptom improvement within months of treatment. The technology has also been applied to agricultural crops, creating disease-resistant varieties without introducing foreign DNA.\n\nRegulatory agencies are fast-tracking approval pathways for base editing therapies, recognizing the improved safety profile compared to earlier gene editing approaches.",
    tags: ["Science", "Biotech", "CRISPR", "Health"],
    relatedIds: ["5", "1"],
  },
  {
    id: "8",
    title: "The Rise of AI-Native Startups in Southeast Asia",
    subtitle: "How a new generation is building AI-first companies",
    category: "Tech",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=450&fit=crop",
    author: "David Tan",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    likes: 1234,
    readTime: "5 min",
    isTrending: true,
    badge: "Startups",
    body: "Southeast Asia is experiencing an AI startup boom, with over 200 AI-native companies founded in the last 18 months alone. Unlike their Silicon Valley counterparts, these startups are tackling uniquely regional problems — from tropical crop disease detection to multilingual customer service across 11 official languages.\n\nVenture capital flowing into the region's AI sector has tripled year-over-year, with Singapore, Indonesia, and Vietnam emerging as key hubs. The availability of large, diverse datasets and lower operating costs give these startups a competitive edge.\n\nNotable successes include an Indonesian agtech startup using computer vision to detect palm oil disease, and a Vietnamese company building real-time translation for ASEAN business meetings. Both have achieved profitability within two years of founding.",
    tags: ["AI", "Startups", "Southeast Asia", "Venture Capital"],
    relatedIds: ["1", "6"],
  },
  {
    id: "9",
    title: "NASA's James Webb Discovers New Earth-Like Exoplanet",
    subtitle: "K2-18 b shows signs of ocean and atmosphere compatible with life",
    category: "Space",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=800&fit=crop",
    author: "Maria Santos",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    likes: 5678,
    readTime: "7 min",
    badge: "Space",
    pullQuote: "For the first time, we have strong evidence of a water world orbiting a distant star.",
    body: "NASA's James Webb Space Telescope has detected compelling evidence of a water ocean on exoplanet K2-18 b, a super-Earth located 124 light-years from our solar system. The discovery marks the most promising candidate yet for extraterrestrial habitability.\n\nSpectroscopic analysis of the planet's atmosphere revealed the presence of water vapor, carbon dioxide, and potentially dimethyl sulfide — a molecule on Earth produced only by living organisms. The findings have sent ripples of excitement through the astrobiology community.\n\nK2-18 b orbits within its star's habitable zone, where temperatures could allow liquid water to exist on the surface. The planet is roughly 8.6 times the mass of Earth, classifying it as a 'Hycean' world — a hydrogen-rich planet with a potential water ocean.\n\nFollow-up observations are planned to confirm the dimethyl sulfide detection and search for additional biosignatures. If confirmed, this would represent the strongest evidence yet that we are not alone in the universe.",
    tags: ["Space", "NASA", "Exoplanets", "Astronomy"],
    relatedIds: ["3", "5"],
  },
  {
    id: "10",
    title: "Jack Ma Returns to Lead Alibaba's AI Pivot",
    subtitle: "The founder quietly reshapes China's biggest tech company",
    category: "Founders",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=500&fit=crop",
    author: "Li Wei",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    likes: 3456,
    readTime: "6 min",
    badge: "Tech",
    body: "After years of maintaining a low profile, Jack Ma has re-emerged as the driving force behind Alibaba's ambitious artificial intelligence strategy. Sources close to the company say Ma has been personally reviewing AI product roadmaps and recruiting top talent from global research labs.\n\nThe pivot represents Alibaba's biggest strategic shift since its founding. The company is investing $15 billion over three years in AI infrastructure, including custom chip development and large language model training facilities.\n\nMa's return signals a broader thaw in the relationship between Chinese tech giants and regulators. Industry observers note that the government is increasingly viewing AI capabilities as a matter of national strategic importance.\n\nAlibaba's new AI products span cloud computing, e-commerce personalization, and logistics optimization. Early results show a 40% improvement in delivery route efficiency and a 25% increase in click-through rates on personalized recommendations.",
    tags: ["Founders", "AI", "China", "Tech"],
    relatedIds: ["1", "2"],
  },
];

export const getArticlesByCategory = (category: string): Article[] => {
  if (category === "For You") return articles;
  return articles.filter((a) => a.category === category);
};

export const getArticleById = (id: string): Article | undefined =>
  articles.find((a) => a.id === id);
