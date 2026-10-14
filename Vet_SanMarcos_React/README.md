# 🐾 Veterinaria San Marcos — Unidad 2 (React + Vite)

Guía completa de trabajo para **Mauro Santiago** y **Gabriel González** correspondiente a la Unidad 2 de **DSY1104 - Desarrollo Fullstack II**.

---

## 💡 El Concepto Clave: ¿Cómo trabajamos?

Para no confundirse ni perder tiempo, ten presente esta regla fundamental:

* 💻 **Tu Computador (Local):** Es donde programas todos los días en VS Code. Al guardar cambios (`Ctrl + S`), los ves **en tiempo real** en tu navegador sin demoras. **No necesitas tocar AWS ni internet para programar.**
* ☁️ **AWS Academy EC2 (Nube):** Es solo una máquina virtual remota para **demostrar la app al profesor si él lo pide expresamente**. Solo descarga el código ya terminado desde GitHub.

---

## 🛠️ Paso 0: Requisito Único en tu PC (Windows)

Para poder programar en tu computador y ver cambios en tiempo real, **debes tener Node.js instalado en Windows** (no solo dentro de la máquina virtual de AWS).

### ¿Cómo verificar si lo tienes?
Abre PowerShell y ejecuta:
```powershell
node --version
npm --version
```

### Si no lo tienes instalado:
Tienes dos opciones fáciles para instalarlo:
* **Opción A (Recomendada):** Descarga el instalador **LTS** desde [nodejs.org](https://nodejs.org/) y sigue el asistente ("Siguiente, Siguiente, Finalizar").
* **Opción B (Por comando):**
  ```powershell
  winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
  ```
*(Tras instalarlo, cierra y vuelve a abrir tu terminal o VS Code).*

---

## 🚀 Flujo Diario: Desarrollo Local en Tiempo Real

Este es el flujo normal para trabajar en clases o en casa:

### 1. Iniciar el proyecto
Abre una terminal en la carpeta del proyecto React:
```powershell
cd Vet_SanMarcos_React
npm install          # Solo la primera vez o si se agregaron paquetes nuevos
npm run dev
```

### 2. Abrir en el navegador
Vite te mostrará en pantalla la dirección local:
👉 **`http://localhost:5173/`**

### 3. Programar con recarga automática (HMR)
* Deja la terminal abierta ejecutando `npm run dev`.
* Abre y edita cualquier archivo dentro de `src/` en VS Code.
* Al presionar **`Ctrl + S`**, Vite actualizará el navegador automáticamente al instante sin tener que recargar la página.
* Para detener el servidor, pulsa `Ctrl + C` en la terminal.

### Comandos disponibles en `Vet_SanMarcos_React`:
* `npm run dev`: Inicia el servidor de desarrollo local con recarga en caliente.
* `npm run build`: Genera los archivos optimizados para producción en la carpeta `dist/`.
* `npm run lint`: Analiza el código en busca de errores de sintaxis y buenas prácticas.
* `npm run preview`: Previsualiza localmente el build de producción.

---

## 🤝 Colaboración entre Mauro y Gabriel (Git y GitHub)

Para mantener el código sincronizado entre ambos sin sobreescribir el trabajo del otro:

### Cuando termines un avance en tu PC:
```powershell
git status                    # Verifica qué archivos modificaste
git add .                     # Prepara los cambios
git commit -m "Mensaje descriptivo del avance"
git push origin main          # Sube los cambios a GitHub
```

### Antes de empezar a programar (para recibir los avances de tu compañero):
```powershell
git pull origin main          # Descarga los últimos cambios del repositorio
npm install                   # Solo si tu compañero agregó nuevas dependencias
```

> ⚠️ **Importante de seguridad:** Las claves privadas `.pem` y archivos temporales están protegidos en `.gitignore`. **Nunca subas claves privadas a GitHub**.

---

## 🏛️ Estructura del Proyecto React

```text
Vet_SanMarcos_React/
├── public/                   # Archivos estáticos directos (imágenes, favicons)
│   └── images/
├── src/                      # Código fuente de la aplicación
│   ├── components/           # Componentes reutilizables (Navbar, Producto, etc.)
│   ├── pages/                # Vistas de la aplicación (Inicio, Productos, Login, etc.)
│   ├── App.jsx               # Enrutador principal (React Router)
│   ├── index.css             # Estilos globales y paleta de colores
│   └── main.jsx              # Punto de entrada de React
├── index.html                # Plantilla HTML base
├── package.json              # Dependencias y scripts
└── vite.config.js            # Configuración de Vite
```

---

## ☁️ Despliegue en AWS Academy EC2 (Evaluación en la Nube)

> 🛑 **Usa este apartado únicamente cuando el profesor solicite evaluar o mostrar la aplicación en una instancia EC2.**

La instancia EC2 es una computadora independiente en la nube. **No se sincroniza sola con tu PC.** El flujo es: programas en tu PC → subes a GitHub (`git push`) → te conectas a EC2 → descargas los cambios (`git pull`).

### 1. Lanzar la Instancia en AWS Academy
1. Entra a AWS Vocareum y presiona **Start Lab** (espera el indicador verde).
2. Ve a **EC2 → Instancias → Lanzar instancias**.
3. **Nombre:** `VetSanMarcos-React`
4. **AMI:** Amazon Linux 2023 (`x86_64`). *(No uses Ubuntu ni Amazon Linux 2 a menos que sea necesario)*.
5. **Tipo de instancia:** `t2.micro` (permitido en el lab).
6. **Par de claves:** Crea o selecciona un par `.pem` (por ejemplo `userReactVite.pem`) y guárdalo en tu carpeta de Descargas en Windows.
7. **Red / Grupo de seguridad:**
   * **SSH (Puerto 22):** Origen `My IP`.
   * **Custom TCP (Puerto 5173):** Origen `My IP` *(para ver Vite en vivo)*.
   * **HTTP (Puerto 80):** Origen `Cualquier lugar (0.0.0.0/0)` *(solo si se monta con Nginx)*.
8. Lanza la instancia y copia el **Public IPv4 DNS** (o la **IPv4 Pública**).

### 2. Conectarse por SSH desde Windows (PowerShell)
En tu PC, abre la carpeta donde descargaste la clave `.pem`:
```powershell
cd "$HOME\Downloads"
# Ajustar permisos de la clave (solo la primera vez en Windows):
icacls "userReactVite.pem" /reset
icacls "userReactVite.pem" /grant:r "$($env:USERNAME):(R)"
icacls "userReactVite.pem" /inheritance:r

# Conectarse a la instancia:
ssh -i ".\userReactVite.pem" ec2-user@PUBLIC_IPV4_DNS
```

### 3. Instalar Node.js en la instancia EC2 (solo la primera vez)
Una vez dentro de la terminal de Amazon Linux:
```bash
sudo dnf update -y
sudo dnf install -y git curl --allowerasing

# Instalar Node 22 mediante NVM:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
```

### 4. Clonar o actualizar el repositorio en EC2
* **Primera vez (Clonar):**
  ```bash
  mkdir -p ~/Downloads
  cd ~/Downloads
  git clone https://github.com/maurosantiago23/veterinaria-san-marcos.git
  cd veterinaria-san-marcos/Vet_SanMarcos_React
  npm install
  ```
* **Actualizaciones posteriores (cuando hagas cambios desde tu PC):**
  ```bash
  cd ~/Downloads/veterinaria-san-marcos
  git pull origin main
  cd Vet_SanMarcos_React
  npm install
  ```

### 5. Mostrar la app en vivo en AWS
Para que Vite escuche peticiones externas a través de la IP de la VM, ejecútalo así:
```bash
npm run dev -- --host 0.0.0.0
```
Luego abre en el navegador de tu computador:
👉 `http://PUBLIC_IPV4_DNS:5173`

*(Para detener el servidor en la VM, presiona `Ctrl + C`).*

---

## 🧪 Pruebas Unitarias (Próximas clases)

Cuando la asignatura aborde pruebas unitarias con Vitest y React Testing Library, las herramientas a incorporar serán:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```
Y se configurará el script `"test": "vitest"` en `package.json`.