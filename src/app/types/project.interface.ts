export interface Project {
  id: number;
  documentId: string;
  title: string | null;
  description: string | null;
  category: string | null;
  content: string | null;
  content_md: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  size: 'xlarge' | 'large' | 'medium' | 'small' | null;
  cover: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: any | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  localizations: any[];
}

export interface ProjectsResponse {
  data: Project[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
