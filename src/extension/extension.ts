import vscode from 'vscode'
import { Serializer } from './notebook'
import { Kernel } from './kernel'
import { ViteServerProcess } from './server'
import { ThumbsDownProvider, ThumbsUpProvider } from './provider/rating'

const viteProcess = new ViteServerProcess()

export async function activate (context: vscode.ExtensionContext) {
  console.log('[Runme] Activating Extension')
  const kernel = new Kernel(context)

  await viteProcess.start()
  context.subscriptions.push(
    kernel,
    viteProcess,
    vscode.workspace.registerNotebookSerializer("runme", new Serializer(context), {
      transientOutputs: true,
      transientCellMetadata: {
        inputCollapsed: true,
        outputCollapsed: true,
      },
    }),
    vscode.notebooks.registerNotebookCellStatusBarItemProvider(
      "runme",
      new ThumbsUpProvider()
    ),
    vscode.notebooks.registerNotebookCellStatusBarItemProvider(
      "runme",
      new ThumbsDownProvider()
    )
  )

  console.log('[Runme] Extension successfully activated')
}

// This method is called when your extension is deactivated
export function deactivate () {
  viteProcess.stop()
}
