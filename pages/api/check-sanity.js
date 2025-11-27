export default function handler(req, res) {
  try {
    res.status(200).json({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "NULL",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "NULL",
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "NULL",
      tokenLength: process.env.SANITY_API_READ_TOKEN 
        ? process.env.SANITY_API_READ_TOKEN.length 
        : "NO_TOKEN"
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      stack: error.stack
    })
  }
}
