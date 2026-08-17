import { Flame } from "lucide-react";

export function TrendingProducts() {
  return (
    <li className="group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
      <span className="inline-flex items-center gap-2 relative">
        <Flame className="w-4 h-4" />
        <span>پرفروش ترین ها</span>
        <span className="absolute -bottom-1.5 right-0 w-full h-0.5 bg-linear-to-l from-red-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right rounded-full" />
      </span>
    </li>
  );
}
