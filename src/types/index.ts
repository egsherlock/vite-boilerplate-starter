/**
 * Shared cross-module type aliases. Co-locate feature-specific types
 * alongside their component or hook instead of dumping everything here.
 */

export type Theme = 'light' | 'dark'

/**
 * Convenience tuple of "either undefined or non-null T" — handy for
 * narrowing async hook returns:
 *
 *   const [data, setData] = useState<Maybe<User>>(undefined)
 */
export type Maybe<T> = T | undefined
