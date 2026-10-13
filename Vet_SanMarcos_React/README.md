# Veterinaria San Marcos React

Punto de partida de la Unidad 2. Esta aplicación se mantiene separada de `Vet_SanMarcos`, que contiene la versión HTML, CSS y JavaScript presentada en la Unidad 1.

## Requisitos

- Node.js instalado.
- npm, incluido con Node.js.

Comprueba la instalación desde una terminal:

```powershell
node --version
npm --version
```

## Instalar y ejecutar

Desde la carpeta raíz del repositorio:

```powershell
cd Vet_SanMarcos_React
npm install
npm run dev
```

Abre en el navegador la dirección que indique Vite, normalmente `http://localhost:5173/`.

## Comandos disponibles

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

- `dev`: inicia el servidor de desarrollo con recarga automática.
- `build`: genera la versión de producción en `dist/`.
- `lint`: revisa el código con Oxlint.
- `preview`: sirve localmente la última compilación.

## Estructura inicial

```text
Vet_SanMarcos_React/
├── public/images/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Qué incluye esta base

- Rutas para Inicio, Productos y Login con React Router.
- Un Navbar compartido que usa enlaces de React Router.
- Un componente `Producto` reutilizado para mostrar ejemplos estáticos.
- Bootstrap 5 disponible mediante sus clases CSS; React-Bootstrap está instalado para seguir las prácticas de la unidad cuando se introduzca en clases.

Los productos y la página de Login son solo una estructura inicial. Todavía no implementan carrito, autenticación ni backend.

## Ejecutar en AWS Academy EC2 (Linux)

Esta guía está pensada para Amazon Linux en AWS Academy. No uses los pasos de Ubuntu de otros apuntes si esa imagen no está disponible en tu laboratorio. El tipo de instancia, por ejemplo `t2.micro`, debe ser uno permitido por el laboratorio.

### 1. Iniciar el laboratorio y lanzar EC2

1. En AWS Academy/Vocareum, pulsa **Start Lab** y espera a que el indicador de AWS quede verde.
2. Abre la consola de AWS y entra a **EC2 → Instancias → Lanzar instancias**.
3. Elige una imagen Amazon Linux disponible en el laboratorio, preferentemente Amazon Linux 2023. Usa el tipo permitido por el laboratorio, por ejemplo `t2.micro`.
4. Crea un par de claves RSA en formato `.pem`, por ejemplo `userReactVite.pem`, y guarda la descarga en Windows. No la subas a GitHub.
5. Habilita una dirección IPv4 pública y deja el almacenamiento predeterminado si el laboratorio lo permite.
6. Configura las reglas de entrada según el uso:

| Puerto | Origen recomendado | Uso |
| --- | --- | --- |
| TCP 22 | Mi IP | Conexión SSH |
| TCP 5173 | Mi IP, temporalmente | Probar Vite durante desarrollo |
| TCP 80 | `0.0.0.0/0`, solo si se publica con Nginx | Sitio HTTP |

No abras el puerto 5173 a todo Internet. Anota la IPv4 pública de la instancia cuando aparezca como **En ejecución**.

### 2. Preparar la clave PEM en Windows

En PowerShell, abre la carpeta donde descargaste `userReactVite.pem` y aplica los permisos indicados por el profesor:

```powershell
cd "$HOME\Downloads"
icacls "userReactVite.pem" /reset
icacls "userReactVite.pem" /grant:r "$($env:USERNAME):(R)"
icacls "userReactVite.pem" /inheritance:r
```

Conéctate con el usuario predeterminado de Amazon Linux:

```powershell
ssh -i ".\userReactVite.pem" ec2-user@IP_PUBLICA_EC2
```

Reemplaza `IP_PUBLICA_EC2` por la dirección pública que muestre la instancia. En el grupo de seguridad limita SSH (22) a tu IP.

### 3. Instalar herramientas y Node.js en Amazon Linux

Una vez conectado por SSH, comprueba la distribución:

```bash
cat /etc/os-release
```

Para Amazon Linux 2023:

```bash
sudo dnf update -y
sudo dnf install -y git curl
```

Si el laboratorio ofrece Amazon Linux 2, usa `yum` en lugar de `dnf`:

```bash
sudo yum update -y
sudo yum install -y git curl
```

Instala Node.js 22 sin cambiar el Node del sistema:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
node --version
npm --version
```

### 4. Clonar y ejecutar el starter

En la instancia, en el primer uso clona el repo; si ya lo clonaste antes, actualízalo con `git pull`:

```bash
mkdir -p ~/Downloads
cd ~/Downloads
git clone https://github.com/maurosantiago23/veterinaria-san-marcos.git
cd ~/Downloads/veterinaria-san-marcos/Vet_SanMarcos_React
npm install
npm run dev -- --host 0.0.0.0
```

Para actualizar un clon existente antes de ejecutar Vite:

```bash
cd ~/Downloads/veterinaria-san-marcos
git pull origin main
cd Vet_SanMarcos_React
npm install
npm run dev -- --host 0.0.0.0
```

Para probar Vite desde el navegador, agrega temporalmente una regla TCP 5173 al grupo de seguridad, limitada a la IP pública actual de tu computador. No abras este puerto a todo Internet. Luego abre:

```text
http://IP_PUBLICA_EC2:5173
```

Deja la terminal de Vite abierta mientras trabajas. Para detener el servidor, presiona `Ctrl + C`. El laboratorio puede detener la instancia y cambiar su IP pública al reiniciarla.

### 5. Publicar una compilación con Nginx (opcional)

Para servir la compilación por HTTP en vez del servidor de desarrollo:

```bash
npm run build
sudo dnf install -y nginx
sudo mkdir -p /usr/share/nginx/html
sudo cp -r dist/. /usr/share/nginx/html/
sudo nginx -t
sudo systemctl enable --now nginx
```

Si usas Amazon Linux 2, instala Nginx con `sudo yum install -y nginx`. En `/etc/nginx/conf.d/default.conf`, edita el `location /` existente para que incluya:

```nginx
location / {
	try_files $uri $uri/ /index.html;
}
```

Después ejecuta `sudo nginx -t` y `sudo systemctl reload nginx`. Permite HTTP (puerto 80) en el grupo de seguridad y abre `http://IP_PUBLICA_EC2`. Ejecutar Vite no requiere modificar `package.json` ni desactivar controles de host.

## Pruebas unitarias (cuando lleguemos a esa parte de la unidad)

El starter todavía no incluye pruebas ni el comando `npm test`. Según la guía del curso, cuando corresponda se instalan estas herramientas:

```bash
npm install -D vitest
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Después habrá que configurar Vitest en `vite.config.js`, importar `@testing-library/jest-dom` desde `src/setupTests.js` y agregar el script `"test": "vitest"` a `package.json`. Solo entonces se podrá ejecutar `npm test`.

## Material del curso

Los PDF, TXT y claves PEM locales no forman parte del código del proyecto. La carpeta `pdf y comandos` y los archivos `*.pem` están excluidos por `.gitignore`; no subas claves privadas a GitHub.