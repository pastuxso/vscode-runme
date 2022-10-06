export enum OutputType {
  shell = 'stateful.runme/shell-stdout',
  vercel = 'stateful.runme/vercel-stdout',
  html = 'stateful.runme/html-stdout',
  script = 'stateful.runme/script-stdout',
  error = 'error'
}

export const STATE_KEY_FOR_ENV_VARS = 'executionEnv'
export const CONFIGURATION_SHELL_DEFAULTS = {
  interactive: true,
  closeTerminalOnSuccess: true
} as const
