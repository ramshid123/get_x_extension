"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function createFiles(folderPath, title) {
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
        }
        else if (filename === "controller.dart") {
            fileContent = controllerContent;
        }
        else if (filename === "binding.dart") {
            fileContent = bindingContent;
        }
        else if (filename === `${title.toLowerCase()}_index.dart`) {
            fileContent = indexContent;
        }
        else if (filename === "view.dart") {
            fs.writeFileSync(path.join(folderPath, filename), "");
            return;
        }
        fs.writeFileSync(path.join(folderPath, filename), fileContent.replace(/title/g, title.toLowerCase()));
    });
    vscode.window.showInformationMessage("Files created successfully!");
}
function activate(context) {
    let disposable = vscode.commands.registerCommand("extension.createFiles", (uri) => {
        vscode.window
            .showInputBox({ prompt: "Enter the title:" })
            .then((title) => {
            if (title) {
                const folderPath = uri ? uri.fsPath : vscode.workspace.rootPath;
                createFiles(folderPath, title);
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map