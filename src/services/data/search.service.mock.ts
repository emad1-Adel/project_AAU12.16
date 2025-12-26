import { SearchResult } from '@/types';
import { newsService } from './news.service.mock';
import { projectsService } from './projects.service.mock';
import { centersService } from './centers.service.mock';
import { offersService } from './offers.service.mock';

export const searchService = {
  search: async (query: string): Promise<SearchResult[]> => {
    if (!query || query.trim().length < 2) {
      return Promise.resolve([]);
    }

    const searchQuery = query.trim().toLowerCase();
    const results: SearchResult[] = [];

    try {
      // Search news
      const news = await newsService.search(searchQuery);
      results.push(
        ...news.map((item) => ({
          id: item.id,
          type: 'news' as const,
          titleAr: item.titleAr,
          titleEn: item.titleEn,
          descriptionAr: item.descriptionAr,
          descriptionEn: item.descriptionEn,
          link: `/news/${item.slug}`,
          image: item.image,
        }))
      );

      // Search projects
      const projects = await projectsService.search(searchQuery);
      results.push(
        ...projects.map((item) => ({
          id: item.id,
          type: 'project' as const,
          titleAr: item.titleAr,
          titleEn: item.titleEn,
          descriptionAr: item.descAr,
          descriptionEn: item.descEn,
          link: `/projects-studio/${item.slug}`,
        }))
      );

      // Search centers
      const centers = await centersService.getAll();
      const filteredCenters = centers.filter(
        (c) =>
          c.titleAr.includes(query) ||
          c.titleEn.toLowerCase().includes(searchQuery) ||
          c.descAr.includes(query) ||
          c.descEn.toLowerCase().includes(searchQuery)
      );
      results.push(
        ...filteredCenters.map((item) => ({
          id: item.id,
          type: 'center' as const,
          titleAr: item.titleAr,
          titleEn: item.titleEn,
          descriptionAr: item.descAr,
          descriptionEn: item.descEn,
          link: `/centers/${item.id}`,
        }))
      );

      // Search offers
      const offers = await offersService.search(searchQuery);
      results.push(
        ...offers.map((item) => ({
          id: item.id,
          type: 'offer' as const,
          titleAr: item.titleAr,
          titleEn: item.titleEn,
          descriptionAr: item.descAr,
          descriptionEn: item.descEn,
          link: `/offers`,
          image: item.image,
        }))
      );

      return results;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  },
};
