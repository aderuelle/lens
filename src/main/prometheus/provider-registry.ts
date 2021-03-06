export type PrometheusClusterQuery = {
  memoryUsage: string;
  memoryRequests: string;
  memoryLimits: string;
  memoryCapacity: string;
  cpuUsage: string;
  cpuRequests: string;
  cpuLimits: string;
  cpuCapacity: string;
  podUsage: string;
  podCapacity: string;
}

export type PrometheusNodeQuery = {
  memoryUsage: string;
  memoryCapacity: string;
  cpuUsage: string;
  cpuCapacity: string;
  fsSize: string;
  fsUsage: string;
}

export type PrometheusPodQuery = {
  memoryUsage: string;
  memoryRequests: string;
  memoryLimits: string;
  cpuUsage: string;
  cpuRequests: string;
  cpuLimits: string;
  fsUsage: string;
  networkReceive: string;
  networkTransit: string;
}

export type PrometheusPvcQuery = {
  diskUsage: string;
  diskCapacity: string;
}

export type PrometheusIngressQuery = {
  bytesSentSuccess: string;
  bytesSentFailure: string;
  requestDurationSeconds: string;
  responseDurationSeconds: string;
}

export type PrometheusQueryOpts = {
  [key: string]: string | any;
};

export interface PrometheusProvider {
  getQueries(opts: PrometheusQueryOpts): PrometheusNodeQuery | PrometheusClusterQuery | PrometheusPodQuery | PrometheusPvcQuery | PrometheusIngressQuery;
}

export type PrometheusProviderList = {
  [key: string]: PrometheusProvider;
}

export class PrometheusProviderRegistry {
  private static prometheusProviders: PrometheusProviderList = {}

  static getProvider(type: string): PrometheusProvider {
    if (!this.prometheusProviders[type]) {
      throw "Unknown Prometheus provider";
    }
    return this.prometheusProviders[type]
  }

  static registerProvider(key: string, provider: PrometheusProvider) {
    this.prometheusProviders[key] = provider
  }

  static getProviders(): PrometheusProvider[] {
    return Object.values(this.prometheusProviders)
  }
}