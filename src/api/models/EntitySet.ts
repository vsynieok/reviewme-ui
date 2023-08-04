export default interface EntitySet<T> {
  items: T[];
  totalPages: number;
  page: number;
}
