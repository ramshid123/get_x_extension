import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

function createFiles(folderPath: string, title: string) {
  if (folderPath == undefined || folderPath == "") {
    folderPath = "Custom";
  }
  const files = [
    "state.dart",
    "controller.dart",
    "binding.dart",
    `${title.toLowerCase()}_index.dart`,
    "view.dart",
  ];

  const stateContent = `import 'package:get/get.dart';\n\nclass ${title}State{}\n`;
  const controllerContent = `import 'package:get/get.dart';\nimport '${title.toLowerCase()}_index.dart';\n\nclass ${title}Controller extends GetxController{\n  ${title}Controller();\n  final state = ${title}State();\n}\n`;
  const bindingContent = `import 'package:get/get.dart';\nimport '${title.toLowerCase()}_index.dart';\n\n\nclass ${title}Binding extends Bindings {\n  @override\n  void dependencies() {\n    // TODO: implement dependencies\n    Get.put<${title}Controller>(${title}Controller());\n  }\n}\n`;
  const indexContent = `library ${title.toLowerCase()}Library;\n\nexport 'controller.dart';\nexport 'state.dart';\nexport 'view.dart';\nexport 'binding.dart';\n`;

  files.forEach((filename) => {
    let fileContent = "";

    if (filename === "state.dart") {
      fileContent = stateContent;
    } else if (filename === "controller.dart") {
      fileContent = controllerContent;
    } else if (filename === "binding.dart") {
      fileContent = bindingContent;
    } else if (filename === `${title.toLowerCase()}_index.dart`) {
      fileContent = indexContent;
    } else if (filename === "view.dart") {
      fs.writeFileSync(path.join(folderPath, filename), "");
      return;
    }

    fs.writeFileSync(
      path.join(folderPath, filename),
      fileContent.replace(/title/g, title.toLowerCase())
    );
  });

  vscode.window.showInformationMessage("Files created successfully!");
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.createFiles",
    (uri: vscode.Uri) => {
      vscode.window
        .showInputBox({ prompt: "Enter the title:" })
        .then((title) => {
          if (title) {
            const folderPath = uri ? uri.fsPath : vscode.workspace.rootPath;
            createFiles(folderPath!, title);
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}
