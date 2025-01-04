import CategoryItem from "./CategoryItem";

export interface CategoryProps {
  name: string;
  value: string;
}
export default function Categories({ items }: { items: CategoryProps[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {items.map((item) => {
        return <CategoryItem key={item.name} item={item} />;
      })}
    </div>
  );
}
