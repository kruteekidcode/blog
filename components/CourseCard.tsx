import Link from 'next/link';

interface CourseCardProps {
  title: string;
  description: string;
  slug: string;
}

export default function CourseCard({ title, description, slug }: CourseCardProps) {
  return (
    <article className="course-card">
      <h3 className="course-card-title">{title}</h3>
      <p className="course-card-desc">{description}</p>
      <Link href={`/courses/${slug}`} className="course-card-link">
        ดูรายละเอียด →
      </Link>
    </article>
  );
}
