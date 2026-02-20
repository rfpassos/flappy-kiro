# 📤 Como Subir o Flappy Kiro para o GitHub

## Passo 1: Inicializar o Repositório Git

Abra o terminal na pasta do projeto e execute:

```bash
git init
```

## Passo 2: Adicionar os Arquivos

```bash
git add .
```

## Passo 3: Fazer o Primeiro Commit

```bash
git commit -m "🎮 Initial commit: Flappy Kiro game with particle effects"
```

## Passo 4: Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name**: `flappy-kiro`
   - **Description**: `A modern Flappy Bird clone featuring the Kiro mascot with particle effects`
   - **Visibility**: Public (ou Private, se preferir)
   - **NÃO** marque "Initialize this repository with a README" (já temos um)
5. Clique em **"Create repository"**

## Passo 5: Conectar ao Repositório Remoto

Copie o URL do seu repositório (algo como `https://github.com/SEU_USUARIO/flappy-kiro.git`) e execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/flappy-kiro.git
```

## Passo 6: Enviar o Código

```bash
git branch -M main
git push -u origin main
```

## Passo 7: Habilitar GitHub Pages (Opcional)

Para hospedar o jogo gratuitamente no GitHub Pages:

1. Vá para o repositório no GitHub
2. Clique em **Settings**
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione **main** branch
5. Clique em **Save**
6. Aguarde alguns minutos
7. Seu jogo estará disponível em: `https://SEU_USUARIO.github.io/flappy-kiro/`

## 🎉 Pronto!

Seu projeto está no GitHub! Agora você pode:

- ✅ Compartilhar o link com outras pessoas
- ✅ Colaborar com outros desenvolvedores
- ✅ Manter um histórico de versões
- ✅ Hospedar o jogo gratuitamente com GitHub Pages

## 📝 Comandos Git Úteis

### Ver status dos arquivos
```bash
git status
```

### Fazer novos commits
```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

### Ver histórico de commits
```bash
git log --oneline
```

### Criar uma nova branch
```bash
git checkout -b nome-da-branch
```

## 🔧 Solução de Problemas

### Erro de autenticação
Se você receber erro de autenticação, pode precisar configurar um Personal Access Token:

1. Vá para GitHub → Settings → Developer settings → Personal access tokens
2. Gere um novo token com permissões de `repo`
3. Use o token como senha quando solicitado

### Arquivo muito grande
Se algum arquivo for muito grande (>100MB), adicione-o ao `.gitignore`:

```bash
echo "arquivo-grande.ext" >> .gitignore
git rm --cached arquivo-grande.ext
git commit -m "Remove large file"
```

## 📚 Recursos Adicionais

- [Documentação Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [GitHub Pages](https://pages.github.com/)

---

**Boa sorte com seu projeto! 🚀**
