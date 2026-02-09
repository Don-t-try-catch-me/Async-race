export function getTotalPages(totalItems: number, perPage: number): number {
  const itemsPerPage = perPage > 0 ? perPage : 1;

  const pages = Math.ceil(Math.max(totalItems, 0) / itemsPerPage);
  return pages > 0 ? pages : 1;
}

export function clampPage(page: number, totalPages: number): number {
  const safeTotalPages = totalPages > 0 ? totalPages : 1;

  if (page < 1) return 1;
  if (page > safeTotalPages) return safeTotalPages;
  return page;
}
