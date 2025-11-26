#!/bin/bash
echo "🔧 Corrigindo configuração do Tailwind no projeto React + Vite..."

# 1. Instalar dependências necessárias
echo "📦 Instalando dependências (tailwindcss, postcss, autoprefixer)..."
npm install -D tailwindcss postcss autoprefixer

# 2. Remover configs antigas se existirem
rm -f tailwind.config.cjs postcss.config.cjs
rm -f tailwind.config.js postcss.config.js

# 3. Criar novo arquivo tailwind.config.js
cat <<EOF > tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
EOF

# 4. Criar novo arquivo postcss.config.js
cat <<EOF > postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

# 5. Garantir o conteúdo correto do src/index.css
if [ -f "src/index.css" ]; then
  echo "✅ Atualizando src/index.css"
  cat <<EOF > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100 text-gray-900;
}
EOF
else
  echo "⚠️ Criando src/index.css (não existia)"
  mkdir -p src
  cat <<EOF > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100 text-gray-900;
}
EOF
fi

echo "✅ Configuração concluída!"
echo "👉 Agora rode: npm run dev"