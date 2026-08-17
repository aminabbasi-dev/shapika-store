export const categoryKeys = {
  all: ["categories"] as const,

  // برای لیست همه کتگوری‌ها
  lists: () => [...categoryKeys.all, "list"] as const,
  list: () => [...categoryKeys.lists()] as const,

  // برای یک کتگوری خاص
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};
