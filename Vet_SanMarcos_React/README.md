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

Esta guía está pensada para Amazon Linux en AWS Academy, no Ubuntu. Cada integrante puede crear su propia VM. Si eligen compartir una sola instancia, clonen el repositorio una sola vez. El tipo `t2.micro` y los recursos dependen de lo que permita el Learner Lab.

### 1. Iniciar el laboratorio y lanzar EC2

1. En AWS Academy/Vocareum, pulsa **Start Lab** y espera a que el indicador de AWS quede verde.
2. Abre la consola de AWS y entra a **EC2 → Instancias → Lanzar instancias**.
3. Elige Amazon Linux 2023, arquitectura `x86_64`. Si no está disponible, usa Amazon Linux 2. No elijas Ubuntu.
4. Elige el tipo permitido por el laboratorio, por ejemplo `t2.micro`.
5. Crea un par de claves RSA en formato `.pem`, por ejemplo `userReactVite.pem`, y guarda la descarga en Windows. No la subas a GitHub.
6. En red, habilita una dirección IPv4 pública (asignación automática).
7. En almacenamiento, configura el volumen raíz a **20 GiB, gp3**, si el laboratorio permite ese tamaño y tipo.
8. Configura las reglas de entrada según cómo vayas a probar:

| Tipo | Puerto | Origen | Uso |
| --- | --- | --- | --- |
| SSH | TCP 22 | My IP | Conexión remota |
| Custom TCP | TCP 5173 | My IP, temporal | Vite directo desde el navegador |
| HTTP | TCP 80 | `0.0.0.0/0`, solo si se publica con Nginx | Sitio HTTP |

Para la regla de Vite, en **Type** elige **Custom TCP**, **Port range** es `5173` y **Source type** es **My IP**. No abras el puerto 5173 a todo Internet. Si usarás el túnel SSH descrito más abajo, no necesitas crear la regla 5173.

Espera a que la instancia aparezca como **En ejecución**. En los detalles copia **Public IPv4 DNS**, que también aparece en **Connect → SSH client**. Si AWS no muestra un DNS público, usa **Public IPv4** como alternativa.

### 2. Preparar la clave PEM en Windows

En PowerShell, abre la carpeta donde descargaste `userReactVite.pem` y aplica los permisos indicados por el profesor:

```powershell
cd "$HOME\Downloads"
icacls "userReactVite.pem" /reset
icacls "userReactVite.pem" /grant:r "$($env:USERNAME):(R)"
icacls "userReactVite.pem" /inheritance:r
```

Conéctate con el usuario predeterminado de Amazon Linux usando el **Public IPv4 DNS** copiado de EC2:

```powershell
ssh -i ".\userReactVite.pem" ec2-user@PUBLIC_IPV4_DNS
```

Reemplaza `PUBLIC_IPV4_DNS` por el nombre DNS real (por ejemplo, `ec2-xx-xx-xx-xx.region.compute.amazonaws.com`). También puedes usar la IPv4 pública en su lugar. La primera conexión puede pedir confirmar la huella del host; escribe `yes`. En el grupo de seguridad limita SSH (22) a **My IP**.

### 3. Instalar herramientas y Node.js en Amazon Linux

Una vez conectado por SSH, comprueba la distribución:

```bash
cat /etc/os-release
```

Para Amazon Linux 2023:

```bash
sudo dnf update -y
sudo dnf install -y git curl --allowerasing
```

Amazon Linux 2023 puede traer `curl-minimal` preinstalado, que entra en conflicto con el paquete `curl` completo. `--allowerasing` permite a DNF reemplazar ese paquete mínimo al instalar Git y curl, como en la salida de ejemplo del laboratorio.

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

### 4. Clonar o actualizar el starter

En el primer uso, clona el repositorio en la instancia:

```bash
mkdir -p ~/Downloads
cd ~/Downloads
git clone https://github.com/maurosantiago23/veterinaria-san-marcos.git
cd ~/Downloads/veterinaria-san-marcos/Vet_SanMarcos_React
npm install
```

Si ya tienes el repositorio clonado, actualízalo e instala dependencias:

```bash
cd ~/Downloads/veterinaria-san-marcos
git pull origin main
cd Vet_SanMarcos_React
npm install
```

#### Opción A: abrir Vite directamente

En la VM, inicia el servidor accesible por la red:

```bash
npm run dev -- --host 0.0.0.0
```

Agrega temporalmente la regla **Custom TCP / TCP 5173 / My IP** al grupo de seguridad. No abras este puerto a todo Internet. Luego abre en tu computador:

```text
http://PUBLIC_IPV4_DNS:5173
```

Reemplaza `PUBLIC_IPV4_DNS` por el DNS público copiado de EC2; también puedes usar la IPv4 pública. Deja la terminal de Vite abierta mientras trabajas. Para detener el servidor, presiona `Ctrl + C`.

#### Opción B: túnel SSH sin abrir el puerto 5173

En la terminal de la VM, inicia Vite solo en localhost:

```bash
npm run dev
```

En una **segunda** terminal de PowerShell en tu computador, desde la carpeta de la PEM, crea el túnel SSH:

```powershell
ssh -i ".\userReactVite.pem" -N -L 5173:127.0.0.1:5173 ec2-user@PUBLIC_IPV4_DNS
```

Deja abiertas ambas terminales y visita `http://localhost:5173` en tu computador. Con este método solo necesitas la regla SSH TCP 22 desde **My IP**; no agregues la regla 5173. Para detener el túnel, presiona `Ctrl + C` en su terminal.

Al reiniciar la instancia, comprueba de nuevo su Public IPv4 DNS e IPv4: pueden cambiar si no se usa una Elastic IP. El Learner Lab también puede detener recursos al terminar la sesión.

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

Si usas Amazon Linux 2, instala Nginx con `sudo yum install -y nginx`. En el bloque `server` activo de `/etc/nginx/nginx.conf` o de un archivo incluido desde `/etc/nginx/conf.d/`, configura la raíz y el fallback de React Router:

```nginx
location / {
	root /usr/share/nginx/html;
	index index.html;
	try_files $uri $uri/ /index.html;
}
```

Después ejecuta `sudo nginx -t` y `sudo systemctl reload nginx`. Permite HTTP (puerto 80) en el grupo de seguridad y abre `http://PUBLIC_IPV4_DNS` o la IPv4 pública. Ejecutar Vite no requiere modificar `package.json` ni desactivar controles de host.

## Pruebas unitarias (cuando lleguemos a esa parte de la unidad)

El starter todavía no incluye pruebas ni el comando `npm test`. Según la guía del curso, cuando corresponda se instalan estas herramientas:

```bash
npm install -D vitest
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Después habrá que configurar Vitest en `vite.config.js`, importar `@testing-library/jest-dom` desde `src/setupTests.js` y agregar el script `"test": "vitest"` a `package.json`. Solo entonces se podrá ejecutar `npm test`.

## Material del curso

Los PDF, TXT y claves PEM locales no forman parte del código del proyecto. La carpeta `pdf y comandos` y los archivos `*.pem` están excluidos por `.gitignore`; no subas claves privadas a GitHub.