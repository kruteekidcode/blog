import Link from 'next/link';

interface CourseCardProps {
  title: string;
  description: string;
  slug: string;
  level?: string;
  lessons?: number;
  duration?: string;
}

export default function CourseCard({
  title,
  description,
  slug,
  level,
  lessons,
  duration,
}: CourseCardProps) {
  return (
    <article className="course-card">
      {(level || lessons || duration) && (
        <div className="course-card-badges">
          {level && <span className="course-badge">{level}</span>}
          {lessons && <span className="course-badge">{lessons} บท</span>}
          {duration && <span className="course-badge">{duration}</span>}
        </div>
      )}
      <h3 className="course-card-title">{title}</h3>
      <p className="course-card-desc">{description}</p>
      <Link href={`/courses/${slug}`} className="course-card-link">
        ดูรายละเอียด →
      </Link>
    </article>
  );
}
