import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await open({
      filename: path.join(process.cwd(), 'database.sqlite'),
      driver: sqlite3.Database
    });

    const skillsRaw = await db.all('SELECT * FROM skills');
    const projectsRaw = await db.all('SELECT * FROM projects');

    const allSkills = skillsRaw.map((s) => ({
      title: s.title,
      count: s.count,
      skills: JSON.parse(s.skills_list)
    }));

    const projects = projectsRaw.map((p) => ({
      title: p.title,
      description: p.description,
      image: p.image,
      tags: JSON.parse(p.tags),
      previewStatus: p.previewStatus as 1 | 2 | 3,
      githubStatus: p.githubStatus as 1 | 2 | 3,
      previewUrl: p.previewUrl,
      githubUrl: p.githubUrl,
      isPrincipal: Boolean(p.isPrincipal)
    }));

    await db.close();

    return NextResponse.json({ allSkills, projects });
  } catch (error) {
    console.error("Erreur de base de données:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des données" }, { status: 500 });
  }
}
