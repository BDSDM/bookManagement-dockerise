export interface Book {
  id?: number;
  title: string;
  author: string;
  total: number;
  status: boolean;
  image?: string;
  userid?: number; // utilisé pour le formulaire
  user?: { id: number }; // pour correspondre à l'entité backend
}
