
export interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  preview: string;
  date: string;
  author: string;
  content?: string;
}

export const articleData: Article[] = [
  {
    id: 1,
    title: "Understanding Blood Glucose Patterns",
    category: "CGM Guide",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    preview: "Learn how to interpret your CGM data to make informed decisions about diet and exercise.",
    date: "May 16, 2025",
    author: "Dr. Emily Chen"
  },
  {
    id: 2,
    title: "The Science Behind Exercise and Metabolism",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    preview: "Discover how different types of exercise affect your metabolic rate and overall health.",
    date: "May 12, 2025",
    author: "Marcus Johnson, PhD"
  },
  {
    id: 3,
    title: "Nutrition Myths Debunked by Science",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    preview: "Our expert nutritionists separate fact from fiction regarding popular nutrition claims.",
    date: "May 8, 2025",
    author: "Sarah Williams, RD"
  },
  {
    id: 4,
    title: "Sleep Quality and Its Impact on Weight Management",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    preview: "How your sleep patterns affect hormone regulation and weight management efforts.",
    date: "May 5, 2025",
    author: "Dr. James Cooper"
  },
  {
    id: 5,
    title: "Client Success Story: Jane's Journey to Metabolic Health",
    category: "Success Stories",
    image: "https://images.unsplash.com/photo-1609992556706-14a7056ea745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    preview: "Read about Jane's remarkable transformation and improved health metrics in just 90 days.",
    date: "April 30, 2025",
    author: "Rachel Thompson"
  },
  {
    id: 6,
    title: "The Connection Between Gut Health and Immunity",
    category: "Health Research",
    image: "https://images.unsplash.com/photo-1615913144274-2261c7e78409?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    preview: "New research reveals how your gut microbiome influences your immune system.",
    date: "April 25, 2025",
    author: "Dr. Michael Patel"
  }
];
