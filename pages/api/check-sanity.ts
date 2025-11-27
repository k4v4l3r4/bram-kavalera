export async function GET() {
  return Response.json({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    hasToken: !!process.env.SANITY_API_READ_TOKEN
  })
}
