import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const sessionData = await request.json();

    // logs 디렉토리 경로 (프로젝트 루트)
    const logsDir = join(process.cwd(), 'logs');

    // logs 디렉토리가 없으면 생성
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true });
    }

    // 파일명: session_id 또는 타임스탬프
    const fileName = `${sessionData.id || Date.now()}.json`;
    const filePath = join(logsDir, fileName);

    // JSON 파일로 저장
    await writeFile(
      filePath,
      JSON.stringify(sessionData, null, 2),
      'utf-8'
    );

    console.log(`✅ Session saved: ${fileName}`);

    return NextResponse.json({
      success: true,
      message: 'Session saved successfully',
      fileName,
    });
  } catch (error) {
    console.error('❌ Error saving session:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
