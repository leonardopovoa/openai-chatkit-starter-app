import "https://cdn.jsdelivr.net/npm/@openai/chatkit-webcomponent@latest/dist/webcomponent.js";

export async function initSimHarvey(containerId = "simharvey-container") {
  console.log("🧠 Iniciando SimHarvey (v4)...");

  // 🔒 Recupera o client_secret com fallback seguro
  async function getClientSecret() {
    try {
      const res = await fetch("https://toonline.com.br/chatkit-start.php", {
        headers: { "Cache-Control": "no-cache" }
      });
      const data = await res.json();
      if (!data.client_secret) throw new Error("client_secret ausente");
      return data.client_secret.value || data.client_secret;
    } catch (err) {
      console.error("❌ Erro ao buscar client_secret:", err);
      return null;
    }
  }

  // 🧠 Criação do chat SimHarvey
  const chat = document.createElement("openai-chatkit");
  chat.setOptions({
    api: { getClientSecret },
    model: "workflow:wf_68ff9b3428ac8190b1a964d040fbbb860b8b4c72b245aab0@4", // versão ativa
    theme: {
      colorScheme: "light",
      color: { accent: { primary: "#6a4f9e" } },
      typography: { fontFamily: "Montserrat, sans-serif" },
    },
    startScreen: {
      greeting: "👨‍⚕️ Olá! Eu sou o SimHarvey, seu paciente virtual.",
      prompts: [
        { name: "Iniciar consulta", prompt: "Olá, qual é o motivo da sua consulta hoje?" },
        { name: "Anamnese", prompt: "Conte seus sintomas, por favor." },
        { name: "Encerrar", prompt: "Encerrar o atendimento virtual." }
      ]
    },
    composer: { placeholder: "Digite aqui sua pergunta..." }
  });

  // 💅 Estilo visual padronizado
  Object.assign(chat.style, {
    width: "100%",
    height: "650px",
    border: "none",
    borderRadius: "16px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)"
  });

  // 🚀 Renderização no container designado
  const container = document.getElementById(containerId) || document.body;
  container.innerHTML = ""; // limpa o conteúdo anterior, se houver
  container.appendChild(chat);

  console.log("✅ SimHarvey v4 carregado com sucesso!");
}

