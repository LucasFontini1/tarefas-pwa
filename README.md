Como rodar o projeto

passo 1: Rodar o docker do backend com o seguinte codigo no terminal(powershell como admnistrador se for windows): docker run -p 8001:8001 lcsftn/gerenciamento-tarefas-2026:4.1

passo 2: Criar um usuario no swagger na seguinte url: http://localhost:8001/docs#/auth/register_api_users_register_post - Clical no botão try it out e crie um user com email e password

passo 3: se for rodar na sua maquina pule para o proximo passo, se quiser apenas ver no vercel abra a url: https://tarefas-pwa-five.vercel.app/ - e faça login

passo 4: para rodar na sua maquina clone o repositorio e faça o npm install

passo 5 crie a .env exatamente assim: 

VITE_API_BASE_URL=http://localhost:8001
VITE_VAPID_PUBLIC_KEY=BEBiQ5Zw_CbEYQgKhsmEufYYFuMaBo_WV79nn8a9op2GLSD8hpjOFgJHhD8NOUawvH1YUgjNKNKZUCw0t1SFJJY

passo 6: faça o npm run dev e abra o projeto na url: http://localhost:5173/ - e faça o login com o usuario criado anteriormente.
