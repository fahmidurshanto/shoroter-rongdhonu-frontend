import React, { Suspense } from 'react';
import EditPostClient from './EditPostClient';

export const instant = false;

async function EditPostContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditPostClient id={id} />;
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
        </div>
      }
    >
      <EditPostContent params={params} />
    </Suspense>
  );
}
