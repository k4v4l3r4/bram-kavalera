import { LayoutProps, StudioProvider, StudioLayout, DeskTool } from "sanity"
import { Box } from "@sanity/ui"

export function MyCustomLayout({ children }: LayoutProps) {
  return (
    <Box padding={0} style={{ height: "100vh", overflow: "hidden" }}>
      {/* Render layout Studio tanpa ToolMenu */}
      <StudioLayout>
        <DeskTool />
        {children}
      </StudioLayout>
    </Box>
  )
}