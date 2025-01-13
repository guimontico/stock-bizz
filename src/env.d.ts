declare interface Env {
  readonly NODE_ENV: string;

  NG_APP_POLYGON_BASE_URL: string;
  NG_APP_ALPHA_VANTAGE_BASE_URL: string
  NG_APP_ALPHA_VANTAGE_KEY: string
}

// Use import.meta.env.YOUR_ENV_VAR in your code.
declare interface ImportMeta {
  readonly env: Env;
}
