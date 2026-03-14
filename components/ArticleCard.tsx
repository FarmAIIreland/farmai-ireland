import Link  from 'next/link';
import Image from 'next/image';
import { formatPillar } from '@/lib/formatPillar';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80';

interface ArticleCardProps {
  title:     string;
  slug:      string;
  pillar:    string;
  date:      string;
  readTime:  number;
  excerpt?:  string;
  image?:    string;
  basePath?: 'read' | 'guides';
}

export function ArticleCard({
  title,
  slug,
  pillar,
  date,
  readTime,
  excerpt,
  image,
  basePath = 'read',
}: ArticleCardProps) {
  const href   = `/${basePath}/${slug}`;
  const imgSrc = image ?? DEFAULT_IMAGE;

  const formattedDate = new Date(date).toLocaleDateString('en-IE', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  });

  return (
    <Link
      href={href}
      className="group flex flex-col bg-white rounded-[16px] border border-ui-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={imgSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        {/* Pillar tag */}
        <span className="inline-block mb-2 text-[11px] font-semibold uppercase tracking-wide text-brand-green">
          {formatPillar(pillar)}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-ui-text text-base leading-snug mb-2 group-hover:text-brand-green transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-ui-muted leading-relaxed mb-3 line-clamp-2 flex-1">
            {excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-ui-muted mt-auto pt-2 border-t border-ui-border">
          <time dateTime={date}>{formattedDate}</time>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
