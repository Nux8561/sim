import { useCallback, useState } from 'react'
import { createLogger } from '@/lib/logs/console/logger'
import { exportWorkspaceToZip } from '@/lib/workflows/operations/import-export'

const logger = createLogger('useExportWorkspace')

interface UseExportWorkspaceProps {
  /**
   * Optional callback after successful export
   */
  onSuccess?: () => void
}

/**
 * Hook for managing workspace export to ZIP.
 *
 * Handles:
 * - Fetching all workflows and folders from workspace via bulk export endpoint
 * - Creating ZIP file with all workspace data
 * - Downloading the ZIP file
 * - Loading state management
 * - Error handling and logging
 *
 * @param props - Hook configuration
 * @returns Export workspace handlers and state
 */
export function useExportWorkspace({ onSuccess }: UseExportWorkspaceProps = {}) {
  const [isExporting, setIsExporting] = useState(false)

  /**
   * Export workspace to ZIP file
   */
  const handleExportWorkspace = useCallback(
    async (workspaceId: string, workspaceName: string) => {
      if (isExporting) return

      setIsExporting(true)
      try {
        logger.info('Exporting workspace', { workspaceId })

        // Single API call to get all workspace data (workflows with states + folders)
        const response = await fetch(`/api/workspaces/${workspaceId}/export`)
        if (!response.ok) {
          throw new Error('Failed to export workspace')
        }

        const { workflows: workflowsToExport, folders: foldersToExport } = await response.json()

        const zipBlob = await exportWorkspaceToZip(
          workspaceName,
          workflowsToExport,
          foldersToExport
        )

        const blobUrl = URL.createObjectURL(zipBlob)
        const a = document.createElement('a')
        a.href = blobUrl
        a.download = `${workspaceName.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.zip`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(blobUrl)

        logger.info('Workspace exported successfully', {
          workspaceId,
          workflowsCount: workflowsToExport.length,
          foldersCount: foldersToExport.length,
        })

        onSuccess?.()
      } catch (error) {
        logger.error('Error exporting workspace:', error)
        throw error
      } finally {
        setIsExporting(false)
      }
    },
    [isExporting, onSuccess]
  )

  return {
    isExporting,
    handleExportWorkspace,
  }
}
