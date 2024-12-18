import MoimPage from "../(main)/_component/MoimPage";

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <MoimPage initialCategory={params.category.toUpperCase()} />;
}
