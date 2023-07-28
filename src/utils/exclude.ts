export const exclude = (...values: string[]): { from: (source) => string[] } => {
  return {
    from: (source: Record<string, string>) => {
      return Object.values(source).filter(value => !values.includes(value))
    }
  }
}
