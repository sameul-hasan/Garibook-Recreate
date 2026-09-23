import SectionHeading from '../components/SectionHeading';
import { ArrowRight } from '../components/icons';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { arrowNudge, cardLift, container, cx, section } from '../lib/classes';
import { blogPosts } from '../data/content';

export default function Blogs() {
  const scope = useSectionAnimation({ stagger: 0.12 });
  const t = useT();

  return (
    <section className={section} ref={scope}>
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            className="max-w-[720px]"
            title={t.blogs.title}
            subtitle={t.blogs.subtitle}
          />
          <a
            className="group inline-flex items-center gap-2.5 text-lg font-bold text-gb-ink transition-colors duration-300 ease-gb hover:text-gb-primary"
            href="/blogs"
            data-reveal
          >
            <span>{t.blogs.showAll}</span>
            <ArrowRight className={cx('size-5', arrowNudge)} />
          </a>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              lang={post.lang}
              className={cx(
                'group overflow-hidden rounded-2xl border border-gb-border bg-white hover:border-transparent',
                cardLift,
                post.lang === 'bn' && 'bangla'
              )}
              data-reveal
            >
              <a href={`/blogs/${encodeURIComponent(post.slug)}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-[230px] w-full object-cover transition-transform duration-800 ease-gb group-hover:scale-105"
                  />
                  <span
                    lang="en"
                    className="absolute top-4 left-4 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-gb-primary"
                  >
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-[13px] font-semibold tracking-wide text-gb-muted-2 uppercase">
                    {post.date}
                  </p>
                  <h3 className="mt-2.5 text-xl/snug font-bold transition-colors duration-300 ease-gb group-hover:text-gb-primary">
                    {post.title}
                  </h3>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
