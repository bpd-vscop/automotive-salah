import Link from "next/link";
import Image from "next/image";

const categories = [
  // Your categories array remains the same...
  {
    name: "Car Remotes",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/keydiy-remote-logo-main.png",
    href: "#",
  },
  {
    name: "Key Cutting Machines",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/keydiy-remote-logo-main.png",
    href: "#",
  },
  {
    name: "Car Remotes", // Note: Duplicate name, consider unique names or keys if data changes
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/xhorse-cat-logo-main.png",
    href: "#",
  },
  {
    name: "Tools",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/access-tools.png",
    href: "#",
  },
  {
    name: "Xhorse Remotes",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/xhorse-cat-logo-main.png",
    href: "#",
  },
  {
    name: "Access Tools",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/access-tools.png",
    href: "#",
  },
  {
    name: "Keydiy Remotes",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/keydiy-remote-logo-main.png",
    href: "#",
  },
  {
    name: "Locksmith Tools",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories/additional-adapter-2.png",
    href: "#",
  },
  {
    name: "Locks",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories/emulator.png",
    href: "#",
  },
  {
    name: "Autel Remotes",
    icon: "https://www.key4.com/thumbnail/crop/120/120/manufacturers-logo/cables-logo-x.png",
    href: "#",
  },
  {
    name: "Remote Shells",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/keydiy-remote-logo-main.png",
    href: "#",
  },
  {
    name: "Accessories",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/xhorse-cat-logo-main.png",
    href: "#",
  },
  {
    name: "Key Shell",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories-icons/access-tools.png",
    href: "#",
  },
  {
    name: "Adapters",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories/additional-adapter-2.png",
    href: "#",
  },
  {
    name: "Transponder Keys",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories/emulator.png",
    href: "#",
  },
  {
    name: "Emulator",
    icon: "https://www.key4.com/thumbnail/crop/120/120/categories/emulator.png",
    href: "#",
  },
  {
    name: "Cables",
    icon: "https://www.key4.com/thumbnail/crop/120/120/manufacturers-logo/cables-logo-x.png",
    href: "#",
  },
  {
    name: "Emergency Keys",
    icon: "https://www.key4.com/thumbnail/crop/120/120/manufacturers-logo/cables-logo-x.png",
    href: "#",
  },
];

export function CategoryGrid() {
  return (
    // Increased gap for more spacing between larger items
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-8 p-4">
      {categories.map((category, index) => (
        <Link
          key={`${category.name}-${index}`}
          href={category.href}
          className="group flex flex-col items-center text-center p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {/* Icon Container - Increased size */}
          <div
            className="
              relative h-20 w-20 mb-5 /* Increased size (h/w-16 -> h/w-20), increased margin bottom */
              flex items-center justify-center
              rounded-full
              border-2 border-gray-200 dark:border-gray-700
              transition-all duration-300 ease-in-out
              group-hover:border-[#FF6F61]
              group-hover:scale-105
              bg-white dark:bg-gray-800
            "
          >
            {/* Image Component - Increased base size */}
            {category.icon ? (
              <Image
                src={category.icon}
                alt={category.name}
                width={100} // Increased base width (was 80)
                height={100} // Increased base height (was 80)
                className="
                  absolute inset-0 m-auto
                  object-contain p-1
                  scale-110 /* Initial scale remains */
                  transition-all duration-300 ease-in-out
                  group-hover:scale-125 /* Hover scale remains */
                  z-10
                "
                sizes="(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 12vw" // Adjusted sizes estimate
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xs text-gray-400">No Icon</span>
              </div>
            )}
          </div>

          {/* Category Name - Increased font size */}
          <span
            className="
              text-base font-medium text-gray-700 dark:text-gray-300 /* Increased size (text-sm -> text-base) */
              transition-colors duration-300 ease-in-out
              group-hover:text-red-600"
          >
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}