const vscode = require("vscode")

function activate(context) {
  console.log("Activating NumPy Dimension Hover extension")

  // Create an output channel
  const outputChannel = vscode.window.createOutputChannel("NumPy Dimension Hover")
  outputChannel.show(true)

  outputChannel.appendLine("Extension activated")

  const hoverProvider = vscode.languages.registerHoverProvider("python", {
    provideHover(document, position, token) {
      outputChannel.appendLine("Hover provider triggered")

      const range = document.getWordRangeAtPosition(position)
      if (!range) {
        outputChannel.appendLine("No word range found at position")
        return null
      }

      const word = document.getText(range)
      outputChannel.appendLine(`Hovering over: ${word}`)

      // Always return a hover message for debugging
      return new vscode.Hover(`Hovered word: ${word}`)
    },
  })

  context.subscriptions.push(hoverProvider)

  // Register a command that can be manually triggered
  const disposable = vscode.commands.registerCommand("numpy-dimension-hover.debugLog", () => {
    outputChannel.appendLine("Debug command triggered")
    vscode.window.showInformationMessage("NumPy Dimension Hover: Debug log written")
  })

  context.subscriptions.push(disposable)

  outputChannel.appendLine("NumPy Dimension Hover extension setup completed")
}

function deactivate() {
  console.log("NumPy Dimension Hover extension deactivated")
}

module.exports = {
  activate,
  deactivate,
}

