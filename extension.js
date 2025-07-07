const vs = require('vscode');

function activate(context) {
	console.log("renamefile init");

	const cmd = vs.commands.registerCommand('renamefile.rename', async () => {
		const currentFile = vs.window.activeTextEditor;

		if (!currentFile) {
			vs.window.showErrorMessage("No file selected");
			return;
		}

		const fileNameWithPath = currentFile.document.fileName.split('/');
		const fileName = fileNameWithPath.pop();
		const fileNameWithExt = fileName.split('.');
		fileNameWithExt.shift();

		const newFileName = await vs.window.showInputBox({placeHolder: `Current name: ${fileName}`});
		const newFilePath = fileNameWithPath.join('/') + `/${newFileName}.${fileNameWithExt}`;

		vs.workspace.fs.rename(vs.Uri.file(currentFile.document.fileName), vs.Uri.file(newFilePath));
	});

	context.subscriptions.push(cmd);
}

function deactivate() {};

module.exports = {
	activate,
	deactivate
}