import type { ReactNode } from "react";

export interface SectionProps {
  title: string;
  desc?: string;
  children: ReactNode;
  actions?: ReactNode;
  id?: string;
}

export function Section({ title, desc, children, actions, id }: SectionProps) {
  const sectionId = title.toLowerCase().replace(/[^a-z0-9]+/gi, "-");

  return (
    <section aria-labelledby={`${sectionId}-title`} className="section-card" id={id}>
      <header className="section-header">
        <div>
          <h2 className="section-title" id={`${sectionId}-title`}>
            {title}
          </h2>
          {desc ? <p className="section-desc">{desc}</p> : null}
        </div>
        {actions ? <div>{actions}</div> : null}
      </header>
      <div>{children}</div>
    </section>
  );
}
