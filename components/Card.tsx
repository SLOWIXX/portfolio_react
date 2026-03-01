import React from 'react';

interface SkillProps {
  title: string;
  count: number;
  skills: string[];
}

export default function SkillCard({ title, count, skills }: SkillProps) {
  const previewCount = 2;
  const previewSkills = skills.slice(0, previewCount);
  const remainingCount = skills.length - previewSkills.length;

  return (
    <div className="card skill-card">
      <div className="card-header">
        <h3 className="title">{title}</h3>
        <span className="count-badge">{count}</span>
      </div>
      <div className="card-content">
        <div className="preview">
          {previewSkills.map((skill, index) => (
            <span key={index} className="tag tech-pill">
              {skill}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="tag more">+{remainingCount} plus</span>
          )}
        </div>
        <div className="expanded">
          {skills.map((skill, index) => (
            <span key={index} className="tag tech-pill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}