import { NextResponse } from 'next/server';
import { projectsData } from '@/data/project-data';


export const GET = async (request) => {
    const searchParams = request.nextUrl.searchParams;
    const queryProjectId = searchParams.get('projectId');

    if (queryProjectId) {
        const project = projectsData.find(p => p.id === queryProjectId);
        if (project) return NextResponse.json({ status: 'success', data: project })
        else return NextResponse.json({ status: 'failed' });
    }

    return NextResponse.json({ status: 'success', data: projectsData });
}
