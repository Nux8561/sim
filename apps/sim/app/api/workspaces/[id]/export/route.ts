import { db } from '@sim/db'
import { workflow, workflowFolder } from '@sim/db/schema'
import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createLogger } from '@/lib/logs/console/logger'
import { loadBulkWorkflowsFromNormalizedTables } from '@/lib/workflows/persistence/utils'
import { getUserEntityPermissions } from '@/lib/workspaces/permissions/utils'

const logger = createLogger('WorkspaceExportAPI')

/**
 * GET /api/workspaces/[id]/export
 * Export all workspace data (workflows with states, folders) in a single request.
 * Much more efficient than fetching each workflow individually.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const startTime = Date.now()
  const { id: workspaceId } = await params

  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has access to this workspace
    const userPermission = await getUserEntityPermissions(session.user.id, 'workspace', workspaceId)
    if (!userPermission) {
      return NextResponse.json({ error: 'Workspace not found or access denied' }, { status: 404 })
    }

    // Fetch all workflows and folders in parallel (2 queries)
    const [workflows, folders] = await Promise.all([
      db.select().from(workflow).where(eq(workflow.workspaceId, workspaceId)),
      db.select().from(workflowFolder).where(eq(workflowFolder.workspaceId, workspaceId)),
    ])

    const workflowIds = workflows.map((w) => w.id)

    // Bulk load all workflow states (3 queries total via inArray)
    const workflowStates = await loadBulkWorkflowsFromNormalizedTables(workflowIds)

    // Build export data
    const workflowsExport = workflows.map((w) => {
      const state = workflowStates.get(w.id)

      // Build the workflow state with defaults if no normalized data
      const workflowState = state
        ? {
            blocks: state.blocks,
            edges: state.edges,
            loops: state.loops,
            parallels: state.parallels,
            lastSaved: Date.now(),
            isDeployed: w.isDeployed || false,
            deployedAt: w.deployedAt,
          }
        : {
            blocks: {},
            edges: [],
            loops: {},
            parallels: {},
            lastSaved: Date.now(),
            isDeployed: w.isDeployed || false,
            deployedAt: w.deployedAt,
          }

      // Extract variables from workflow record
      const variables = Object.values((w.variables as Record<string, any>) || {}).map((v: any) => ({
        id: v.id,
        name: v.name,
        type: v.type,
        value: v.value,
      }))

      return {
        workflow: {
          id: w.id,
          name: w.name,
          description: w.description,
          color: w.color,
          folderId: w.folderId,
        },
        state: workflowState,
        variables,
      }
    })

    const foldersExport = folders.map((f) => ({
      id: f.id,
      name: f.name,
      parentId: f.parentId,
    }))

    const elapsed = Date.now() - startTime
    logger.info(`Exported workspace ${workspaceId} in ${elapsed}ms`, {
      workflowsCount: workflowsExport.length,
      foldersCount: foldersExport.length,
    })

    return NextResponse.json({
      workflows: workflowsExport,
      folders: foldersExport,
    })
  } catch (error) {
    const elapsed = Date.now() - startTime
    logger.error(`Error exporting workspace ${workspaceId} after ${elapsed}ms:`, error)
    return NextResponse.json({ error: 'Failed to export workspace' }, { status: 500 })
  }
}
