// Données fictives pour le développement

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomPercentage = () => {
  return getRandomValue(10, 95);
};

const mockData = {
  system: {
    hostname: "server-prod-01",
    uptime: 1209600, // 14 jours en secondes
    os: "Linux Ubuntu 22.04 LTS",
    kernel: "5.15.0-58-generic",
    lastBoot: "2025-03-18T10:30:45Z",
  },

  cpu: {
    model: "Intel Xeon E5-2680 v4 @ 2.40GHz",
    cores: 14,
    usage: getRandomPercentage(),
    temperature: getRandomValue(40, 75),
    loadAverage: [
      getRandomValue(0, 20) / 10,
      getRandomValue(0, 20) / 10,
      getRandomValue(0, 20) / 10,
    ],
  },

  memory: {
    total: 32 * 1024 * 1024 * 1024, // 32 GB en octets
    used: getRandomValue(8, 24) * 1024 * 1024 * 1024, // 8-24 GB
    free: getRandomValue(4, 20) * 1024 * 1024 * 1024, // 4-20 GB
    swap: {
      total: 8 * 1024 * 1024 * 1024, // 8 GB
      used: getRandomValue(0, 4) * 1024 * 1024 * 1024, // 0-4 GB
    },
  },

  storage: {
    disks: [
      {
        device: "/dev/sda",
        mountPoint: "/",
        fsType: "ext4",
        total: 500 * 1024 * 1024 * 1024, // 500 GB
        used: getRandomValue(200, 450) * 1024 * 1024 * 1024, // 200-450 GB
        free: getRandomValue(50, 200) * 1024 * 1024 * 1024, // 50-200 GB
      },
      {
        device: "/dev/sdb",
        mountPoint: "/data",
        fsType: "ext4",
        total: 2 * 1024 * 1024 * 1024 * 1024, // 2 TB
        used: getRandomValue(500, 1500) * 1024 * 1024 * 1024, // 500-1500 GB
        free: getRandomValue(500, 1500) * 1024 * 1024 * 1024, // 500-1500 GB
      },
    ],
  },

  postgresql: {
    activeConnections: getRandomValue(5, 50),
    maxConnections: 100,
    cacheHitRate: getRandomValue(85, 98) / 100,
    queriesPerSecond: getRandomValue(10, 200),
    avgResponseTime: getRandomValue(2, 50),
    activeTransactions: getRandomValue(0, 15),
    locks: getRandomValue(0, 3),
    databases: [
      {
        name: "app_production",
        size: getRandomValue(500, 2000) * 1024 * 1024, // 500-2000 MB
        connections: getRandomValue(1, 30),
      },
      {
        name: "app_analytics",
        size: getRandomValue(1000, 5000) * 1024 * 1024, // 1000-5000 MB
        connections: getRandomValue(1, 10),
      },
    ],
  },

  apache: {
    activeWorkers: getRandomValue(5, 50),
    maxWorkers: 100,
    requestsPerSecond: getRandomValue(10, 500),
    maxRequestRate: 1000,
    connections: getRandomValue(10, 200),
    avgResponseTime: getRandomValue(1, 200),
    memoryUsage: getRandomValue(50, 500) * 1024 * 1024, // 50-500 MB
    totalRequests: getRandomValue(1000, 10000),
    httpCodes: {
      200: getRandomValue(800, 8000),
      301: getRandomValue(10, 200),
      304: getRandomValue(50, 500),
      404: getRandomValue(5, 100),
      500: getRandomValue(0, 10),
    },
    topVhosts: [
      { name: "app.example.com", requests: getRandomValue(500, 5000) },
      { name: "api.example.com", requests: getRandomValue(200, 2000) },
      { name: "www.example.com", requests: getRandomValue(100, 1000) },
    ],
  },

  processes: [
    {
      pid: 1234,
      name: "postgresql",
      cpu: getRandomValue(5, 30),
      memory: getRandomValue(5, 25),
      runtime: "2d 14h",
      user: "postgres",
    },
    {
      pid: 2345,
      name: "apache2",
      cpu: getRandomValue(5, 20),
      memory: getRandomValue(4, 20),
      runtime: "5d 7h",
      user: "www-data",
    },
    {
      pid: 3456,
      name: "php-fpm",
      cpu: getRandomValue(3, 15),
      memory: getRandomValue(3, 18),
      runtime: "5d 7h",
      user: "www-data",
    },
    {
      pid: 4567,
      name: "nodejs",
      cpu: getRandomValue(2, 12),
      memory: getRandomValue(3, 15),
      runtime: "1d 3h",
      user: "node",
    },
    {
      pid: 5678,
      name: "mysql",
      cpu: getRandomValue(2, 10),
      memory: getRandomValue(5, 22),
      runtime: "5d 7h",
      user: "mysql",
    },
    {
      pid: 6789,
      name: "sshd",
      cpu: getRandomValue(0, 5),
      memory: getRandomValue(0, 8),
      runtime: "14d 2h",
      user: "root",
    },
    {
      pid: 7890,
      name: "cron",
      cpu: getRandomValue(0, 5),
      memory: getRandomValue(0, 5),
      runtime: "14d 2h",
      user: "root",
    },
    {
      pid: 8901,
      name: "rsyslogd",
      cpu: getRandomValue(0, 3),
      memory: getRandomValue(0, 4),
      runtime: "14d 2h",
      user: "syslog",
    },
  ],

  logs: generateMockLogs(100),
};

function generateMockLogs(count) {
  const levels = ["info", "warning", "error", "debug"];
  const services = [
    "nginx",
    "mysql",
    "php-fpm",
    "systemd",
    "kernel",
    "cron",
    "ssh",
  ];
  const messages = [
    "Service démarré avec succès",
    "Tentative de connexion échouée",
    "Disque presque plein (85%)",
    "Redémarrage du service",
    "Mise à jour effectuée",
    "CPU usage élevé",
    "Tentative d'accès non autorisé",
    "Connexion réussie",
    "Sauvegarde terminée",
    "Erreur lors de l'exécution de la tâche planifiée Erreur lors de l'exécution de la tâche planifiée Erreur lors de l'exécution de la tâche planifiée Erreur lors de l'exécution de la tâche planifiée",
  ];

  const logs = [];

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(Date.now() - getRandomValue(0, 86400000)); // Entre maintenant et 24h avant

    logs.push({
      id: i + 1,
      timestamp: timestamp.toISOString(),
      level: levels[getRandomValue(0, levels.length - 1)],
      service: services[getRandomValue(0, services.length - 1)],
      message: messages[getRandomValue(0, messages.length - 1)],
    });
  }

  return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Service API simulé
const mockApiService = {
  getSystemInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mise à jour des valeurs dynamiques CPU
        mockData.cpu.usage = getRandomPercentage();
        mockData.cpu.temperature = getRandomValue(40, 75);

        // Mise à jour des valeurs PostgreSQL
        mockData.postgresql.activeConnections = getRandomValue(5, 50);
        mockData.postgresql.cacheHitRate = getRandomValue(85, 98) / 100;
        mockData.postgresql.queriesPerSecond = getRandomValue(10, 200);
        mockData.postgresql.avgResponseTime = getRandomValue(2, 50);
        mockData.postgresql.activeTransactions = getRandomValue(0, 15);
        mockData.postgresql.locks = getRandomValue(0, 3);

        // Mise à jour des valeurs Apache
        mockData.apache.activeWorkers = getRandomValue(5, 50);
        mockData.apache.requestsPerSecond = getRandomValue(10, 500);
        mockData.apache.connections = getRandomValue(10, 200);
        mockData.apache.avgResponseTime = getRandomValue(1, 200);
        mockData.apache.totalRequests = getRandomValue(1000, 10000);
        mockData.apache.httpCodes = {
          200: getRandomValue(800, 8000),
          301: getRandomValue(10, 200),
          304: getRandomValue(50, 500),
          404: getRandomValue(5, 100),
          500: getRandomValue(0, 10),
        };

        // Mise à jour des processus
        mockData.processes.forEach((process) => {
          process.cpu = getRandomValue(
            Math.max(0, process.cpu - 5),
            process.cpu + 5
          );
          process.memory = getRandomValue(
            Math.max(0, process.memory - 5),
            process.memory + 5
          );
        });

        // Tri des processus par CPU (décroissant)
        mockData.processes.sort((a, b) => b.cpu - a.cpu);

        resolve({
          ...mockData.system,
          cpu: mockData.cpu,
          memory: mockData.memory,
          storage: mockData.storage,
          postgresql: mockData.postgresql,
          apache: mockData.apache,
          processes: mockData.processes,
        });
      }, 500);
    });
  },

  getCpuInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mise à jour de certaines valeurs dynamiques
        mockData.cpu.usage = getRandomPercentage();
        mockData.cpu.temperature = getRandomValue(40, 75);
        mockData.cpu.loadAverage = [
          getRandomValue(0, 20) / 10,
          getRandomValue(0, 20) / 10,
          getRandomValue(0, 20) / 10,
        ];

        resolve(mockData.cpu);
      }, 300);
    });
  },

  getMemoryInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mise à jour de certaines valeurs dynamiques
        mockData.memory.used = getRandomValue(8, 24) * 1024 * 1024 * 1024;
        mockData.memory.free = 32 * 1024 * 1024 * 1024 - mockData.memory.used;
        mockData.memory.swap.used = getRandomValue(0, 4) * 1024 * 1024 * 1024;

        resolve(mockData.memory);
      }, 300);
    });
  },

  getStorageInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mise à jour de certaines valeurs dynamiques
        mockData.storage.disks.forEach((disk) => {
          const usedSpace =
            getRandomValue(
              Math.floor((disk.total * 0.4) / (1024 * 1024 * 1024)),
              Math.floor((disk.total * 0.9) / (1024 * 1024 * 1024))
            ) *
            1024 *
            1024 *
            1024;

          disk.used = usedSpace;
          disk.free = disk.total - usedSpace;
        });

        resolve(mockData.storage);
      }, 300);
    });
  },

  getLogs: async (limit = 100, offset = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Régénérer des logs pour avoir de nouvelles données
        const allLogs = generateMockLogs(100);
        const paginatedLogs = allLogs.slice(offset, offset + limit);

        resolve(paginatedLogs);
      }, 400);
    });
  },

  getPostgreSQLInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mise à jour des valeurs PostgreSQL
        mockData.postgresql.activeConnections = getRandomValue(5, 50);
        mockData.postgresql.cacheHitRate = getRandomValue(85, 98) / 100;
        mockData.postgresql.queriesPerSecond = getRandomValue(10, 200);
        mockData.postgresql.avgResponseTime = getRandomValue(2, 50);
        mockData.postgresql.activeTransactions = getRandomValue(0, 15);
        mockData.postgresql.locks = getRandomValue(0, 3);

        resolve(mockData.postgresql);
      }, 300);
    });
  },

  getApacheInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mise à jour des valeurs Apache
        mockData.apache.activeWorkers = getRandomValue(5, 50);
        mockData.apache.requestsPerSecond = getRandomValue(10, 500);
        mockData.apache.connections = getRandomValue(10, 200);
        mockData.apache.avgResponseTime = getRandomValue(1, 200);
        mockData.apache.totalRequests = getRandomValue(1000, 10000);
        mockData.apache.httpCodes = {
          200: getRandomValue(800, 8000),
          301: getRandomValue(10, 200),
          304: getRandomValue(50, 500),
          404: getRandomValue(5, 100),
          500: getRandomValue(0, 10),
        };

        resolve(mockData.apache);
      }, 300);
    });
  },

  getProcessesInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mise à jour des processus
        mockData.processes.forEach((process) => {
          process.cpu = getRandomValue(
            Math.max(0, process.cpu - 5),
            process.cpu + 5
          );
          process.memory = getRandomValue(
            Math.max(0, process.memory - 5),
            process.memory + 5
          );
        });

        // Tri des processus par CPU (décroissant)
        mockData.processes.sort((a, b) => b.cpu - a.cpu);

        resolve(mockData.processes);
      }, 300);
    });
  },
};

export default mockApiService;
