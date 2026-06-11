import type { Metadata } from 'next';
import { getAllCourses } from '@/lib/content';
import CourseCard from '@/components/CourseCard';

export const metadata: Metadata = {
  title: 'หลักสูตร',
  description: 'หลักสูตรสอน Programming สำหรับผู้เริ่มต้น โดยครูทีกิด',
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="courses-page">
      <div className="courses-page-header">
        <h1 className="courses-page-title">หลักสูตร</h1>
      </div>

      {courses.length > 0 ? (
        <div className="courses-page-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.slug}
              title={course.title}
              description={course.description}
              slug={course.slug}
              level={course.level}
              lessons={course.lessons}
              duration={course.duration}
            />
          ))}
        </div>
      ) : (
        <div className="blog-page-empty">
          <p>กำลังเตรียมหลักสูตร — รอติดตามนะครับ 📚</p>
        </div>
      )}
    </div>
  );
}
