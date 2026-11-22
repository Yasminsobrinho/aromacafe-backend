// Valida as variáveis do .env na inicialização.
// Se faltar alguma obrigatória, o app não sobe e mostra qual está faltando.
export function validateEnv(config: Record<string, unknown>) {
  const obrigatorias = ['MONGODB_URI'];
  const faltando = obrigatorias.filter((nome) => !config[nome]);

  if (faltando.length > 0) {
    throw new Error(
      `Variáveis de ambiente ausentes no .env: ${faltando.join(', ')}`,
    );
  }
  return config;
}
