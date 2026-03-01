import React from 'react';

export interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  previewStatus: 1 | 2 | 3; // 1: En cours, 2: Preview disable, 3: Preview active
  githubStatus: 1 | 2;      // 1: Github disable, 2: Github active
  previewUrl?: string;
  githubUrl?: string;
  isPrincipal?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  previewStatus,
  githubStatus,
  previewUrl,
  githubUrl,
  isPrincipal
}: ProjectProps) {
  return (
    <div className={`project-card ${isPrincipal ? 'project-featured' : ''}`}>
      {isPrincipal && (
        <div className="featured-badge">
          <i className="fas fa-star" style={{marginRight: '5px'}}></i> Projet Principal
        </div>
      )}
      
      <div className="project-image">
        <img src={image} alt={title} />
        <div className="project-overlay">
          <div className="project-links">
             {previewStatus === 3 && (
               <a href={previewUrl || '#'} className="project-link" target="_blank" rel="noreferrer">
                 <i className="fas fa-eye"></i>
               </a>
             )}
             {githubStatus === 2 && (
               <a href={githubUrl || '#'} className="project-link" target="_blank" rel="noreferrer">
                 <i className="fab fa-github"></i>
               </a>
             )}
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        
        <div className="project-tech">
          {tags.map((tag, i) => (
            <span key={i} className="tech-tag">{tag}</span>
          ))}
        </div>
        
        <div className="project-actions">
           {/* Preview Button logic */}
           {previewStatus === 1 && (
             <span className="project-btn btn-preview btn-disabled">
               <i className="fas fa-hourglass-half"></i> En cours
             </span>
           )}
           {previewStatus === 2 && (
             <span className="project-btn btn-preview btn-disabled">
               <i className="fas fa-external-link-alt"></i> Preview
             </span>
           )}
           {previewStatus === 3 && (
             <a href={previewUrl || '#'} className="project-btn btn-preview" target="_blank" rel="noreferrer">
               <i className="fas fa-external-link-alt"></i> Preview
             </a>
           )}

           {/* GitHub Button logic */}
           {githubStatus === 1 ? (
             <span className="project-btn btn-github btn-private">
               <i className="fab fa-github"></i> 
               <span className="text-normal">Code Privé</span>
               <span className="text-hover">Non dispo</span>
             </span>
           ) : (
             <a href={githubUrl || '#'} className="project-btn btn-github" target="_blank" rel="noreferrer">
               <i className="fab fa-github"></i> <span className="text-normal">GitHub</span>
             </a>
           )}
        </div>
      </div>
    </div>
  );
}
