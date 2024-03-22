// components/CategoryLinks.tsx
import Link from "next/link";

const CategoryLinks = () => {
  const categories = ["fashion", "travel", "tech"];

  return (
    <nav>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/posts?category=${category}`} passHref>
              <a>{category}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryLinks;
