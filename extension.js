const vs = require('vscode');

function activate(context) {
	const cmd = vs.commands.registerCommand('renamefile.rename', async () => {
		const settings = vs.workspace.getConfiguration('renamefile');
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

		if (!newFileName) {
			return;
		}

		let newFilePath = fileNameWithPath.join('/') + `/${newFileName}`;

		if (settings.get('keepExtension')) {
			newFilePath += `.${fileNameWithExt}`;
		}

		vs.workspace.fs.rename(vs.Uri.file(currentFile.document.fileName), vs.Uri.file(newFilePath));
	});

	context.subscriptions.push(cmd);
}

function deactivate() {};

module.exports = {
	activate,
	deactivate
}