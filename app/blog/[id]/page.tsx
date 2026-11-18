import React, { Suspense } from 'react';
import SinglePostClient from './SinglePostClient';

export const instant = false;

async function SinglePostContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SinglePostClient id={id} />;
}

export default function SinglePostPage({
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
      <SinglePostContent params={params} />
    </Suspense>
  );
}
