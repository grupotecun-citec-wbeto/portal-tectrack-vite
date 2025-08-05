src/
│
├── app/                        # Configuración global de la app
│   ├── routes/                  # Definición de rutas
│   ├── store/                   # Redux / Zustand / Context
│   └── config/                  # Configuración global
│
├── shared/                      # Shared Kernel (módulos y UI compartidos)
│   ├── components/              # Widgets reutilizables
│   │   ├── WidgetSelector/
│   │   ├── WidgetTextInput/
│   │   ├── WidgetNumberInput/
│   │   ├── WidgetMultiSelect/
│   │   ├── WidgetSegmentEditor/
│   │   └── WidgetPrediagnosticoEditor/
│   ├── utils/                   # Funciones auxiliares reutilizables
│   ├── hooks/                   # Hooks comunes
│   └── types/                   # Tipos y modelos compartidos
│
├── features/                    # Feature-Based Design
│
│   ├── authentication/          # Contexto: Autenticación
│   │   ├── application/         # Servicios de aplicación (casos de uso)
│   │   ├── domain/              # Entidades y lógica de dominio
│   │   ├── infrastructure/      # Adaptadores API, persistencia
│   │   └── ui/                  # Componentes de UI de autenticación
│
│   ├── segments/                # Contexto: Segmentos
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│
│   ├── cases/                   # Contexto: Casos
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│
│   ├── operations/              # Contexto: Operaciones en Terreno
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│
│   ├── reports/                 # Contexto: Reportes
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│
│   ├── expenses/                 # Contexto: Viáticos
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│
│   └── config-ops/               # Contexto: Configuración Operaciones
│       ├── application/
│       ├── domain/
│       ├── infrastructure/
│       └── ui/
│
└── index.tsx                     # Punto de entrada
