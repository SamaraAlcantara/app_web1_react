const fs = require("fs"); // Módulo para manipulação de arquivos
const path = require("path"); // Módulo para lidar com caminhos de diretórios
const readline = require("readline"); // Módulo para entrada do usuário no terminal

const root = process.cwd(); // Diretório raiz do projeto
const oldDirs = ["app", "components", "hooks", "constants", "scripts"]; // Diretórios antigos que serão movidos ou deletados
const exampleDir = "app-example"; // Nome do diretório onde os arquivos antigos serão movidos
const newAppDir = "app"; // Novo diretório principal do app
const exampleDirPath = path.join(root, exampleDir); // Caminho completo do diretório de exemplo

// Conteúdo do arquivo index.tsx padrão
const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

// Conteúdo do arquivo _layout.tsx padrão
const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

// Interface para entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função para mover ou excluir diretórios antigos
const moveDirectories = async (userInput) => {
  try {
    if (userInput === "y") {
      // Cria o diretório app-example se o usuário escolher mover os arquivos antigos
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    // Move ou exclui os diretórios antigos
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (userInput === "y") {
          // Move o diretório para app-example
          const newDirPath = path.join(root, exampleDir, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          // Deleta o diretório
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Cria o novo diretório /app
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /app directory created.");

    // Cria o arquivo index.tsx
    const indexPath = path.join(newAppDirPath, "index.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
    console.log("📄 app/index.tsx created.");

    // Cria o arquivo _layout.tsx
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
    console.log("📄 app/_layout.tsx created.");

    // Mensagem final com os próximos passos
    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit app/index.tsx to edit the main screen.${
        userInput === "y"
          ? `\n3. Delete the /${exampleDir} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

// Pergunta ao usuário se deseja mover os arquivos ou deletá-los
rl.question(
  "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y"; // Se o usuário não digitar nada, assume "y"
    if (userInput === "y" || userInput === "n") {
      moveDirectories(userInput).finally(() => rl.close()); // Executa a função e fecha o readline
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  }
);
