export const catalogoProductos = [
  {
    id: '1',
    codigo: 'SRV-001',
    categoria: 'servicios',
    nombre: 'Consulta Veterinaria General',
    precio: '25.000',
    precioNumero: 25000,
    stockInicial: 10,
    descripcion: 'Evaluación clínica integral y revisión de constantes vitales para tu mascota por médicos veterinarios titulados.',
    imagen: '/images/Veterinario1.jpg',
    alt: 'Consulta Veterinaria General',
    caracteristicas: [
      'Examen físico general detallado',
      'Medición de temperatura, peso y frecuencia cardíaca',
      'Emisión de orden médica y receta profesional',
      'Recomendaciones nutricionales y preventivas'
    ]
  },
  {
    id: '2',
    codigo: 'FAR-103',
    categoria: 'farmacia',
    nombre: 'Simparica 10-20 kg',
    precio: '21.000',
    precioNumero: 21000,
    stockInicial: 15,
    descripcion: 'Comprimido masticable palatable para control eficaz y continuo de pulgas, garrapatas y sarnas durante 35 días.',
    imagen: '/images/antiparasitario.jpg',
    alt: 'Simparica Antiparasitario',
    caracteristicas: [
      'Indicado para perros de 10 a 20 kg',
      'Acción rápida desde las primeras 3 horas',
      'Sabor agradable que facilita la ingesta voluntaria',
      'Protección prolongada garantizada por 5 semanas'
    ]
  },
  {
    id: '3',
    codigo: 'PRO-201',
    categoria: 'alimentos',
    nombre: 'Alimento Perro Adulto Salmón 3 kg',
    precio: '19.990',
    precioNumero: 19990,
    stockInicial: 8,
    descripcion: 'Alimento súper premium formulado con salmón fresco para razas medianas con digestión o piel sensible.',
    imagen: '/images/comida_perro.jpg',
    alt: 'Alimento Perro Adulto Salmón',
    caracteristicas: [
      'Rico en ácidos grasos Omega 3 y 6 para pelaje brillante',
      'Sin colorantes ni conservantes artificiales',
      'Proteína de alta digestibilidad',
      'Fortalecimiento articular con glucosamina'
    ]
  },
  {
    id: '4',
    codigo: 'FAR-104',
    categoria: 'farmacia',
    nombre: 'NexGard Spectra Perros Medianos',
    precio: '23.500',
    precioNumero: 23500,
    stockInicial: 12,
    descripcion: 'Tableta masticable con doble principio activo para protección completa mensual contra parásitos externos e internos.',
    imagen: '/images/antiparasitario.jpg',
    alt: 'NexGard Spectra',
    caracteristicas: [
      'Control simultáneo de pulgas, garrapatas y gusanos intestinales',
      'Previene la dirofilaria o enfermedad del gusano del corazón',
      'Seguro para cachorros desde las 8 semanas de edad',
      'Dosis mensual de fácil administración'
    ]
  },
  {
    id: '5',
    codigo: 'PRO-202',
    categoria: 'alimentos',
    nombre: 'Snack Dental Felino 60g',
    precio: '4.990',
    precioNumero: 4990,
    stockInicial: 20,
    descripcion: 'Premios crujientes con textura porosa diseñados para limpiar dientes mecánicamente y reducir sarro en gatos.',
    imagen: '/images/comida_gato.png',
    alt: 'Snack Dental Gatos',
    caracteristicas: [
      'Ayuda a refrescar el aliento felino',
      'Textura crujiente que limpia hasta la base de los dientes',
      'Enriquecido con taurina y vitaminas esenciales',
      'Bajo en calorías para no alterar el peso corporal'
    ]
  },
  {
    id: '6',
    codigo: 'SRV-002',
    categoria: 'servicios',
    nombre: 'Peluquería y Baño Sanitario',
    precio: '18.000',
    precioNumero: 18000,
    stockInicial: 6,
    descripcion: 'Sesión integral que incluye corte de pelo según estándar de la raza, baño con champú hipoalergénico y corte de uñas.',
    imagen: '/images/champu.jpg',
    alt: 'Peluquería Canina',
    caracteristicas: [
      'Baño relajante con agua tibia y champú nutritivo',
      'Secado profesional con temperatura controlada',
      'Corte higiénico y despeje de almohadillas plantares',
      'Limpieza de oídos y glándulas anales incluida'
    ]
  }
]
